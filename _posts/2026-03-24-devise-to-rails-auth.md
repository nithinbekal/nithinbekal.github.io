---
title: Migrate from Devise to Rails authentication generator
layout: post
categories:
- ruby
- rails
date: 2026-03-24
og_image: devise-to-rails-auth.png
---

Although Devise is a fantastic authentication library, I've been reaching for [Rails's built in authentication generator](https://nithinbekal.com/posts/rails-8-auth/) since it was introduced in Rails 8. Almost all of my hobby apps are for a single user (me!) so I don't really need all the features of devise.

Recently, I finally removed devise from an old project and replaced it with the generated authentication code. This turned out to be far easier than expected. Here are my notes:

### Run the generator

The first thing to do is to run the generator:

```bash
rails generate authentication
```

This creates a bunch of files and overwrites some of our existing code, especially the `User` model. ([Here's an excellent walkthrough of the generated code](https://www.bigbinary.com/blog/rails-8-introduces-a-basic-authentication-generator).)

### Create a new migration for users table

The generator creates a `CreateUsers` migration, but we already have a users table. I deleted the generated migration, and created a new one that updates the table to match what the generated code expects.

```ruby
class MigrateUsersFromDevise < ActiveRecord::Migration[8.1]
  def change
    rename_column :users, :email, :email_address
    rename_column :users, :encrypted_password, :password_digest

    change_column_default :users, :email_address, nil
    change_column_default :users, :password_digest, nil

    remove_index :users, name: "index_users_on_reset_password_token"

    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime
    remove_column :users, :remember_created_at, :datetime
  end
end
```

The generator uses `email_address` instead of Devise's `email` column. Keeping the name could have worked, but I decided to switch to the new name for the sake of consistency across projects.

### Restore the `User` model

The generator overwrote `app/models/user.rb`. Keep the generated `has_secure_password`, `has_many :sessions`, and `normalizes :email_address` lines, then restore all the other validations, associations, or any methods that you might have.

```diff
class User < ApplicationRecord
-  devise :database_authenticatable, :registerable,
-    :recoverable, :rememberable, :validatable
+  has_secure_password
+  has_many :sessions, dependent: :destroy
+
+  normalizes :email_address, with: ->(e) { e.strip.downcase }
+
+  validates :email_address, presence: true, uniqueness: true
+  validates :password, length: { minimum: 6 }, allow_nil: true
  
  # other code
end
```

### Update the routes

The generator would already have added the new routes for sessions and passwords, but we still have a `devise_for :users` line, which should be removed.

### Fix up `ApplicationController`

Devise exposes a `current_user` helper that I use everywhere in the views, but the generated code exposes the current user using `CurrentAttributes`. I decided to add the helpers I was already using to `ApplicationController`:

```ruby
class ApplicationController < ActionController::Base
  include Authentication

  def current_user = Current.user
  def user_signed_in? = Current.user.present?
end
```

### Fix test helpers

`Devise::Test::IntegrationHelpers` was included in `test_helper.rb`, so I removed it. The generator added a `test/test_helpers/session_test_helper.rb` file with a `sign_in_as` method. I added a `sign_in` alias for that method, so I don't have to change all the existing tests in the same PR.

The fixtures file got replaced by the generator, which needed to be cleaned up. I made sure that the fixtures I needed were still there:

```yaml
<% password_digest = BCrypt::Password.create("password", cost: 1) %>

admin:
  email_address: admin@example.com
  password_digest: <%= password_digest %>
```

### Add `RegistrationsController`

The generator doesn't add a sign up route, so I had to manually add it. This is documented in my previous [post about the authentication generator](/posts/rails-8-auth/#adding-registrations-to-rails-8).

### Replace devise path helpers

The devise path helper names are different, so we need to update those in the views:

- Login: `new_session_path` instead of `new_user_session_path`
- Logout: `session_path` instead of `destroy_user_session_path`

### Fix system tests

Devise includes `Warden::Test::Helpers` in `ApplicationSystemTestCase`, which provides a `login_as` helper. Warden is no longer a dependency, so we need to remove that and the `teardown` block that references it:

```diff
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
-  include Warden::Test::Helpers
-
-  teardown do
-    Warden.test_reset! # Reset Warden after each test
-  end
end
```

We can now replace the helper with a new method:

```ruby
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  # ...

  def sign_in(user)
    session = user.sessions.create!
    visit root_url
    signed_value = signed_cookie_value(session.id)

    page.driver.browser.manage.add_cookie(
      name: "session_id",
      value: signed_value,
      path: "/",
    )
    visit current_url
  end

  private

  def signed_cookie_value(value)
    key_generator = ActiveSupport::KeyGenerator.new(
      Rails.application.secret_key_base, iterations: 1000
    )
    secret = key_generator.generate_key("signed cookie")
    ActiveSupport::MessageVerifier.new(secret).generate(value)
  end
end
```

### Remove devise completely

Now that everything else is fixed, we can remove all references to `devise` in the code:

- Remove `gem "devise"` from `Gemfile` and run `bundle install`
- Delete `config/initializers/devise.rb`
- Delete `config/locales/devise.en.yml`

### Wrapping up

With that, I was able to remove another dependency from the project. If I had more complex authentication requirements, I'd have kept devise on. However, it is overkill for an app only for myself. The migration was quite easy, and now I have one less dependency to worry about.
