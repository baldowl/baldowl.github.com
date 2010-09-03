---
layout: post
---
These days I need something to do in the evening instead of watching bad football/soccer matches (Germany played a good one...), so I started to play more seriously with RubyCocoa.

While my mind was wandering around, partially distracted by noises produced by TV in the living room, a question arose: if an application written with RubyCocoa uses one or more libraries distributed as gems, what can I do to ensure that the application can be used on a prospective user's system without hassles?

Obviously, the libraries must be "vendored" in some way, so what I needed was a robust solution to help me storing the gems inside the application, managing the load paths correctly and possibly cutting off access to the system's libraries (more on this below). A possibility is the <tt>standaloneify.rb</tt> script, buried inside the RubyCocoa's directory, but I got an error trying to use it to "bundle" **ActiveSupport**...

Enters **Bundler08**.

This gem is a "spin-off" of **Bundler**, the gem/tool developed by the Ruby on Rails core team to manage the dependencies of a Ruby on Rails application (and more generally of whatever you want). Around version 0.9, the tool was modified to store the managed dependencies in a "repository" inside the user's home directory by default and to generate an <tt>environment.rb</tt> file which uses *absolute paths* to point to the libraries, but it's not always been this way...

**Bundler08** is a version of **Bundler** which still stores libraries inside the "root" directory of your project and the generated <tt>environment.rb</tt> file uses *relative paths* to point to the libraries, so that the net result is a relocatable application.

So, here what I did to add a gem to a toy app using **Bundler08**:

1. installed the **bundler08** gem in the usual way;
2. moved to the app's "root" directory and generated a <tt>Gemfile</tt> running <tt>gem bundle --init</tt> (the content is a simple introduction to **Bundler08**);
3. replaced the <tt>Gemfile</tt>'s content with the following lines:
<script src="http://gist.github.com/441750.js?file=Example%20of%20a%20Gemfile">false;</script>
4. ran <tt>gem bundle</tt>, which downloaded the listed gem and installed it into <tt>vendor</tt>;
5. added the following lines at the beginning of the standard <tt>rb_main.rb</tt>:
<script src="http://gist.github.com/441750.js?file=Additions%20to%20rb_main.rb">false;</script>
6. added **both** <tt>Gemfile</tt> (normal way) and <tt>vendor</tt> (as a directory reference) to the Xcode project;
7. added **both** <tt>Gemfile</tt> and <tt>vendor</tt> to the Git repository (I think there's no need to ignore some of <tt>vendor</tt>'s contents).

What I ended up with? A toy app which knew how to pluralize words, among other funny things, which did not use any of my system's gems and could be moved around without problems.

I disabled explicitly the system's gems because what's on a user's system cannot be safely predicted, even if it's the content of <tt>/System</tt> (I, for example, have upgraded most of the system's gems and removed the old versions).

A good evening indeed.
