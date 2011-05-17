---
layout: post
title: "New cucumber-rails: adios Webrat!"
---
So, cucumber-rails 0.5.0 has been released today and among the other changes
there's the final blow to Webrat. Now, the [tortuosities I wrote
about](/2010/12/06/coercing-cucumber-and-webrat-to-cooperate.html) some months
ago are not needed anymore... but may a lightning strike me right now if I've
been able to use it right out of the box!

To fix the all too frequent "undefined method \`visit'" error message I had to
add a couple of require statements:

<script src="https://gist.github.com/977000.js?file=capybara-workaround.rb">false;</script>

Dropped that file in the <tt>support</tt> directory and everything turned
green.
