---
layout: post
---
An [old friend](http://blog.superfluo.org) of mine recently needed to start
using [Bundler](http://gembundler.com) in a scenario managed by
[Chef](http://www.opscode.com/chef/) via <tt>chef-solo</tt>.

Up to now, the gems in that setup had been managed semi-manually (a simple
list of gems to be installed used by Chef's <tt>gem_package</tt> resource) and
the Chef's standard <tt>deploy</tt> resource does not support using Bundler
right out of the box. Fortunately, the hooks provided via the four callbacks
are more than enough.

So, my homemade solution was to use the <tt>before_migrate</tt> callback:

<script src="https://gist.github.com/667489.js?file=before_migrate.rb"></script>

Nesting a script resource inside the deploy resource forced me to "extract"
some things from <tt>new_resource</tt> (the <tt>deploy</tt> resource) and
store all in local variables, but at the end of the day the code is clear and
tidy, the intent is evident and everything **works** perfectly.
