---
layout: post
---
I took a few days off after Christmas, but I cannot really stop tinkering with
computers at large, so I returned to play with
[knife](http://help.opscode.com/faqs/chefbasics/knife). I really like it, but
have a few wishes, in no particular order, which I hope to see fulfilled.

* I'd like the <tt>ssh</tt> subcommand optionally made use of
  <tt>known_hosts</tt>.

  In an ever changing environment, like a cloud, it would probably be a
  hassle, but over the years I've appreciated this checking of the hosts' keys
  at least a couple of time and in a more stable environment I really cannot
  think about living without it.

* I'd like more things could be specified inside the configuration file (e.g.,
  SSH username and identity files, EC2 region, etc.).

  I like the subcommands' great flexibility, but for daily use with
  homogeneously configured machines, I'd rather if most of those
  connection/identity/service related options could be written once and for
  all, with CLI flag taking precedence.

* I'd like [knife](http://help.opscode.com/faqs/chefbasics/knife) itself were
  a separate gem, depending on [Chef](http://www.opscode.com/chef/), the
  various SSH gems and [fog](http://rubygems.org/gems/fog).

  Granted, you don't need
  [knife](http://help.opscode.com/faqs/chefbasics/knife) on every machine, but
  keeping track of what it needs just in case you have to use it somewhere
  else, is a (really small) nuisance.

One more thing... Happy New Year!
