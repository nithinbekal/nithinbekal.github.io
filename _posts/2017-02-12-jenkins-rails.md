---
layout: post
title: "Setting Up Jenkins on Ubuntu 16.04 for Ruby on Rails CI"
date:  2017-02-12 20:20:00 +05:30
categories: rails
---

When looking for a hosted continuous integration platform,
one problem is that most services don't support self hosted repositories.
I was setting up CI for a team that has git repos on self hosted Gitlab.
[Jenkins](https://jenkins.io) is a great option for such cases.
In this article we'll set up the following:

- Jenkins 2.45 on Ubuntu 16.04
- Nginx as reverse proxy for Jenkins
- Get an SSL certificate from Letsencrypt
- Install Ruby with RVM and Postgres 9.5 for Rails
- Run the Rails project's tests on git push

I'm using a [Digital Ocean VPS](https://m.do.co/c/863244c8a721) with 2GB RAM for this setup.
Spin up a VPS with Ubuntu 16.04 and
make sure you're able to SSH as root before continuing.

## Install Jenkins

First of all, we will use apt-get to install Jenkins.

{% highlight bash %}
wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | apt-key add -
echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list
apt update
apt install -y jenkins
{% endhighlight %}

Go to `http://your-ip-address:8080/` to get the Jenkins page.
You will be asked for admin password to unlock Jenkins,
which you can get here:

{% highlight bash %}
cat /var/lib/jenkins/secrets/initialAdminPassword
{% endhighlight %}

Once you have unlocked Jenkins,
install the suggested plugins in the "getting started" wizard,
and then create an admin account.

# Install Ruby

Next, we will set up Ruby 2.3.3 on the server.
Replace 2.3.3 below with whichever version you're using.

{% highlight bash %}
apt install -y build-essential git-core curl nodejs

curl -L https://get.rvm.io | bash -s stable --ruby=2.3.3

echo 'source "/var/lib/jenkins/.rvm/scripts/rvm"' >> /var/lib/jenkins/.bashrc
chmod 755 /var/lib/jenkins/.bashrc

su jenkins # switch to jenkins user
rvm install 2.3.3
gem install bundler
{% endhighlight %}

## Install Postgres

In this tutorial, we will be installing Postgres 9.5.

{% highlight bash %}
apt install -y libpq-dev postgresql postgresql-client
{% endhighlight %}

Make the following change in the `pg_hba.conf` file.
You can find its location by running `find / -name "pg_hba.conf"`,
but in our case its most likely location is `/etc/postgresql/9.5/main/pg_hba.conf`.

{% highlight diff %}
- local   all             postgres                                peer
+ local   all             postgres                                md5
{% endhighlight %}

Restart the postgres service with `service postgresql restart`.
You might want to set up the database user for your project.

{% highlight bash %}
$ su - postgres
$ psql
postgres=# create user foobar with password 'mysecretpassword';
{% endhighlight %}

## Install Nginx

Although we can access Jenkins on port 8080,
it's always a good idea to enable SSL on a site.
The easiest way to do this is to set up Nginx as a reverse proxy to Jenkins,
and use an SSL certificate from Let's Encrypt.
Let's install Nginx:

{% highlight bash %}
apt install nginx
{% endhighlight %}

## SSL with Letsencrypt

We can get a free SSL certificate from [Lets Encrypt](https://letsencrypt.org).
It is as easy as running the following two commands.

{% highlight bash %}
$ apt install letsencrypt
$ letsencrypt certonly --webroot -w /var/www/html -d ci.example.com

 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/ci.example.com/fullchain.pem. Your
   cert will expire on 2017-05-11. To obtain a new version of the
   certificate in the future, simply run Let's Encrypt again.
{% endhighlight %}

Here `ci.example.com` should be changed to whatever subdomain you're using.
You can read more about setting up LetsEncrypt SSL certificates
[here](https://certbot.eff.org/#ubuntuxenial-nginx).

## Configure Nginx

Digital Ocean has an excellent tutorial on
[setting up Nginx as a reverse proxy for Jenkins](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-with-ssl-as-a-reverse-proxy-for-jenkins).
My Nginx conf is based on that tutorial,
so please refer to that tutorial if you need to learn more about this config.
Change `/etc/nginx/sites-enabled/default` to something like below.
Replace `ci.example.com` with the subdomain you'll be using.

{% highlight nginx %}
upstream jenkins {
  server 127.0.0.1:8080 fail_timeout=0;
}

server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
    listen 443;
    server_name ci.example.com;

    ssl_certificate           /etc/letsencrypt/live/ci.example.com/cert.pem;
    ssl_certificate_key       /etc/letsencrypt/live/ci.example.com/privkey.pem;

    ssl on;
    ssl_session_cache  builtin:1000  shared:SSL:10m;
    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    ssl_prefer_server_ciphers on;

    access_log            /var/log/nginx/jenkins.access.log;

    location / {
      proxy_set_header        Host $host;
      proxy_set_header        X-Real-IP $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header        X-Forwarded-Proto $scheme;
      proxy_pass              http://jenkins;
      proxy_read_timeout      90;
      proxy_redirect          http://jenkins https://ci.example.com;
    }
  }
}
{% endhighlight %}

Now you should be able to access Jenkins on the subdomain using https.

## Add public key

Before we set up Jenkins to run our tests,
we need to make sure that it has access to our git repo.
Create an SSH key pair and copy the public key.
You will need to paste it as a deploy key for your project
on Github, Gitlab or whichever host you're using.

{% highlight bash %}
su jenkins
cd ~
ssh-keygen -t rsa -C "nithin@example.com"
{% endhighlight %}

At this point, you should be able to git clone the repo
when logged in as Jenkins.

## Jenkins project configuration

Login to Jenkins dashboard and create a new freestyle project.
You will be redirected to the project configuration page.
Set the repository URL in the source code management section.
In the build section, add a new build step and paste the following:

{% highlight bash %}
#!/bin/bash

export RAILS_ENV=test
source $HOME/.bashrc

cd .  # Force RVM to load the correct Ruby version

bundle install
bundle exec rails db:create db:schema:load db:migrate
bundle exec rails test
{% endhighlight %}

Save the project, and check that the build is working
by clicking the "build now" link.

Now that you have the build working,
you need to make sure that a build is triggered
whenever someone pushes code or creates a pull request.
Our repo is on a self hosted Gitlab installation,
so I needed to install the Gitlab plugin on Jenkins
and enable the "Build when a change is pushed to GitLab" option.
There are plugins available for other services as well.

One minor drawback of Jenkins is cluttered UI.
[Blue Ocean](https://jenkins.io/projects/blueocean/)
is a project aiming to bring a modern UI to Jenkins,
and will eventually replace the existing UI.
I highly recommend trying out the beta version,
which is available as a Jenkins plugin.

## Links

- [Jenkins home page](https://jenkins.io)
- [Blue Ocean](https://jenkins.io/projects/blueocean/) -
  Modern UI for Jenkins
- [How To Configure Nginx with SSL as a Reverse Proxy for Jenkins](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-with-ssl-as-a-reverse-proxy-for-jenkins)
