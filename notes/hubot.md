---
layout: page
title: "Hubot"
date:  2016-06-17 15:20:25 +05:30
categories: 
---

# Setup Hubot for Slack

- Install Heroku toolbelt - https://toolbelt.heroku.com

heroku login
heroku create
git push heroku master

Slack > Apps and Integrations > Search for Hubot > Add

You will get the token here.

heroku config:add HUBOT_SLACK_TOKEN=xoxb-48911438619-GKRCyMERRV49HKQ1ZObRj7wx
