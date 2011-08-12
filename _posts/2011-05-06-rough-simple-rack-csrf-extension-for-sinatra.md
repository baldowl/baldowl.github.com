---
layout: post
title: Rough, simple Rack::Csrf extension for Sinatra
---
Here is a really simple extension for [Sinatra](http://www.sinatrarb.com/) to
ease even more the use of [Rack::Csrf](https://github.com/baldowl/rack_csrf)
with this beautiful micro-framework/DSL. It's totally untested, written on the
spot, published as is.

<script src="https://gist.github.com/958530.js?file=csrf.rb"></script>

The activation is delayed until <tt>apply_csrf_protection</tt> to allow
passing options to [Rack::Csrf](https://github.com/baldowl/rack_csrf).

<script src="https://gist.github.com/958530.js?file=classic_app.rb"></script>

<script src="https://gist.github.com/958530.js?file=modular_app.rb"></script>

If you use [sinatra-contrib](https://github.com/sinatra/sinatra-contrib), then
you should not use [Rack::Csrf](https://github.com/baldowl/rack_csrf).
