---
layout: page
title: "Phoenix Framework"
---

git clone https://github.com/phoenixframework/phoenix.git
cd phoenix
git checkout v0.10.0
mix do deps.get, compile

mix phoenix.new ../test-app

mix phoenix.server
