---
layout: post
---
This post is for myself (so that I won't forget) and the only [other
reader](http://blog.superfluo.org/) of this blog.

Background: you have a shining new web application written with Ruby on Rails
3.0.\*, which uses an engine; this engine employs various static assets (CSS
stylesheets, images, etc.) stored in the engine's <tt>public</tt> directory.

You code your way and during development everything works. Then, a day, you
fire up Thin or Mongrel in production mode and... where the heck are the
stylesheets?

## Static assets in production

Ruby on Rails 3.0.\* does not serve static assets (i.e., the contents of
<tt>public</tt>) in production mode. The reasons are that your application
server is usually fronted with a web server and this piece of software is
better suited then anything else to quickly serve files.

But you insist: you want to see you app, in production mode, on your
development machine, running just Thin. Ok, then change the value of
<tt>config.serve_static_assets</tt> in
<tt>config/environments/production.rb</tt> to true or comment out that row.

Restart Thin, reload the app and there they are, your stylesheets, your
images, etc. There's almost everything, but the engine's assets! And the app
is strangely slow...

Turns out that there's another optimization for production environment at
work: **X-Sendfile**.

## Engine's static assets in production

Even if you've just reenabled serving static assets, that setting influences
only the contents of your app's <tt>public</tt> directory. Engines' assets are
affected by <tt>config.action_dispatch.x_sendfile_header</tt>: if its value is
one out of a short list and not nil, every response containing your assets is
replaced with an empty body and a particular header that a well configured web
server would intercept and manage for you trasparently.

So, comment out also that row in <tt>config/environments/production.rb</tt>,
restart Thin and, lo!, all your assets are there.

## Clean up before deployment

First of all, remember to restore your <tt>production.rb</tt> file.

Then, double check that the web server used in production can handle
**X-Sendfile/X-Accel-Redirect**: if it can't, either replace it with another
software or comment out again
<tt>config.action_dispatch.x_sendfile_header</tt> in <tt>production.rb</tt>.
It will slow down your app, because engines' assets will have to be handled by
the application server, but they'll at least be there.
