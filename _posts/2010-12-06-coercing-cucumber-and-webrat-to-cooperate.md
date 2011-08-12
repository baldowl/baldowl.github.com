---
layout: post
---
After the release of Ruby on Rails 3, using Webrat with Cucumber in a Ruby on
Rails 3 application is not something that works out of the box as before.

The following assumes **Cucumber 0.9.4, Cucumber-rails 0.3.2** and **Webrat
0.7.2.**

## Rack mode

First of all, if we let Cucumber's generator do its work, we get an
<tt>env.rb</tt> file which is unsuitable for Ruby on Rails 3: the Webrat's
mode is wrong. We can edit that file, trusting that our VCS will help us to
recover the needed modifications next time we upgrade Cucumber, or we can drop
a new file in <tt>features/support/</tt> and override the configuration:

<script src="https://gist.github.com/729996.js?file=webrat.rb"></script>

## Rack::Test

Then we have to fix **Rack::Test**, which is used by Webrat's Rack mode and
Rails's integration testing classes. What's wrong with it?

Webrat and Rails use **"example.com"** as default host; Rack::Test uses
**"example.org"** as default host in the fake session automatically built by
its methods which simulate HTTP requests. This difference influences
negatively Webrat's capability to follow the usual, "internal" redirection
which usually comes after, for example, record updates: the hosts do not
match, so the redirection is not considered an internal one and Webrat does
not follow it.

We must redefine a Rack::Test's constant; Ruby will produce a warning, but
it's **harmless noise** in this case.

<script src="https://gist.github.com/729996.js?file=rack-test-default-host.rb"></script>

**Update 2011-03-07**: A [reader](https://github.com/jschairb) kindly reminded
me about <tt>Kernel::silence_warnings</tt>, so you can optionally redefine
that Rack::Test's constant as follows and never see that **noise** again:

<script src="https://gist.github.com/729996.js?file=silent-rack-test-default-host.rb"></script>

Please, beware of the peril of "playing with constants" and don't blame
neither of us if your application blows up misteriously :-) any time later.

## HTML5 data attributes

So now we have almost everything working again... until we smash into the
following problem.

Let's say we have a list of records, each paired with a "Delete" link. We have
the following scenario, spiced up with the help of [Pickle](https://github.com/ianwhite/pickle):

<script src="https://gist.github.com/729996.js?file=gistfile1.feature"></script>

We run Cucumber and the scenario does not pass. Webrat uses link's **onclick**
to decide if GET or something else must be used, but Ruby on Rails 3 does not
produce the same, old HTML code: it now embraces the unobtrusiveness way of
life, so it **got rid of onclick attributes** and replaced them with HTML5
**data attributes**:

<script src="https://gist.github.com/729996.js?file=gistfile2.html"></script>

Until a fix emerges for this, a workaround could be something like the
following step definition:

<script src="https://gist.github.com/729996.js?file=user_steps.rb"></script>

## The happy end

There's no doubt that life was simpler in the old days of Ruby on Rails 2 :-) but with just a bunch of tweaks everything works almost as before and things will probably get better as the dust settles.
