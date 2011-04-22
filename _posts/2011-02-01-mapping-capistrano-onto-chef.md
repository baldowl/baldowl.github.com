---
layout: post
---
Chef is growing stronger every day and after reading that [Engine Yard has
decided to drop their Capistrano based deployment
process](http://www.engineyard.com/blog/2011/appcloud-cli-deploy-process-is-the-future/),
I found myself thinking about mapping between Capistrano e Chef...

<p><a href="/images/posts/deploy-to-chef.png" target="_blank"><img
src="/images/posts/deploy-to-chef-thumbnail.png" class="float-right"
alt="Capistrano's deploy task to Chef's deploy resource" title="Capistrano's
deploy task to Chef's deploy resource"/></a></p>

Chef's stock deploy resource is approximately equivalent to Capistrano's
<tt>deploy</tt> task (or <tt>deploy:migrations</tt>, both with the remote
cache strategy thrown in): some things are done in a slightly different order,
but the results are largely the same. Even if the process is particularly
suited to Ruby on Rails applications, it's general enough to be usable with
other type of web applications. Engine Yard's deploy resource is quite
different from Chef's one, but the principles are the same.

A key difference between Capistrano's standard recipe and Chef's stock deploy
resource is that the latter is not so flexible as the former: you can tweak
the resource behaviour via a given number of attributes and you have another
given, small number of spots where you can insert custom code via callbacks;
with Capistrano, you can insert callbacks pratically anywhere. When switching
from Capistrano to Chef you are obliged to rework your custom deployment
recipes, eventually merging or rearranging your callbacks.

So, roughly speaking:
<a href="/images/posts/deploy-migrations-to-chef.png" target="_blank"><img
src="/images/posts/deploy-migrations-to-chef-thumbnail.png"
class="float-right" alt="Capistrano's deploy:migrations to Chef's deploy
resource" title="Capistrano's deploy:migrations to Chef's deploy
resource"/></a>

* whatever you ran before <tt>deploy</tt> or <tt>deploy:migrations</tt>,
  before or after <tt>update_code</tt> and before or after
  <tt>finalize_update</tt> in Capistrano, now you must put it in Chef's
  <tt>before_migrate</tt> callback;

* whatever you ran after <tt>migrate</tt> and before <tt>symlink</tt> in
  Capistrano, now you must put it in Chef's <tt>before_symlink</tt> callback;

* whatever you ran after <tt>symlink</tt> and before <tt>restart</tt> in
  Capistrano, now you must put it in Chef's <tt>before_restart</tt> callback;

* whatever you ran after <tt>restart</tt> or after <tt>deploy:migrations</tt>
  in Capistrano, now you must put it in Chef's <tt>after_restart</tt>
  callback.

Don't bother adding code equivalent to Capistrano's <tt>deploy:cleanup</tt>
task: Chef's stock deploy resource already cleans up after itself, keeping a
small, fixed number of deployed releases (5, at the moment).
