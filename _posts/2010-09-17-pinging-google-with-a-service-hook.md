---
layout: post
---
Recently I added a [sitemap](http://www.sitemaps.org) to this site; Jekyll
facilitated the creation act, so what was left to do? Pinging Google, just to
say a name, **automatically.**

First of all, I thought about using something like the <tt>post-merge</tt> Git
hook, but, assuming it worked, it would force a strict workflow (always work
in a topic branch and merge on master only when you have a working
connection). Another option could be to wrap everything in a micro-script to
call **manually** after receiving Github's notification of a successful
rebuild. Then a "crazy" idea started to elbow its way toward my cortex... but
first, a bit of background (for myself, actually, so that I can remember why I
did things in a given way).

Let's take Google's instructions:

* identify sitemap's URL (say, <tt>http://www.example.com/sitemap.xml</tt>);
* escape it (<tt>http%3A%2F%2Fwww.example.com%2Fsitemap.xml</tt>);
* use it to build the **complete ping URL** (<tt>http://www.google.com/webmasters/tools/ping?sitemap=http%3A%2F%2Fwww.example.com%2Fsitemap.xml</tt>);
* then "ping" that last URL with wget or curl; if you get a 200 response, then
  you're done.

**N.B.:** A simple use of wget or curl will generate a **GET** request.

Let's turn to Github. In the administrative section of every repository
there's a long list of service hooks; the official [Github's
guide](http://help.github.com/post-receive-hooks/) is **The Source** of
information about them, but let me note here that service hooks are **POST**
requests with a given payload.

So, GET vs. POST? Can we POST to Google to report an updated sitemap? Maybe...
if Google does not adhere to the REST credo.

<script src="http://gist.github.com/583814.js?file=Pinging%20Google%20with%20a%20POST%20request">false;</script>

As of today, in response to the preceding command Google returns a 200
response, i.e., it seems we can "ping" Google with a **POST** request and even
extra data. Will it hold? Time will tell.

Back again to Github: the general post-receive service hook is the way to go
because (at least at the moment) there's no more specific hook. Let's add the
complete URL (that one with the escaped sitemap URL at the end) to the list
and then test it: if it works we're done.

If everything holds, when we push to the on-line repository Github will notify
Google about the updated sitemap and rebuild the site. Maybe, occasionally,
Github's queue could be a bit clogged and Google could have some spare
resources to re-read the sitemap before the refresh... in that case a manual
(!) "ping" will fix the problem.
