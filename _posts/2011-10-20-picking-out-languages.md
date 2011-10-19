---
layout: post
tags:
  - nginx
  - jekyll
  - nanoc
---
I like static [site](http://jekyllrb.com/)
[generators](http://nanoc.stoneship.org/): you need less resources to host
your sites (even one of the almost useless EC2's micro instances could be
enough) and you can move them around more easily, even to other hosting
services with very little fuss. Obviously, there are some inherent
limitations, but some of them can be overcome easily by using external
services, while others cannot be reliably defeated without help from the
hosting platform.

An example which intrigued me recently: your site is translated in multiple
languages and the users should be offered the "best" language.

What's the "best" language? The official one spoken in the users' countries or
the system/browser language chosen by the users themselves?

In the first case, we should try to locate the users via some geolocation
mechanism, but is it really the right way to **guess** the users' languages? I
mean, I live in Italy but for many years (and to some extent still these days)
I haven't used Italian as the primary language of my computers; a good friend
of mine lives, at the moment, in a German-speaking country but I don't think
he's using his system in German. No, I think geolocation should not be used to
**guess** the users' languages, but it can be useful if your site's contents
are more tailored to countries than languages.

What's left? Asking the users/browsers. Enter the **Accept-Language** header.

Good browsers send requests with the Accept-Language header listing the
**preferred** languages, each with an optional priority values, and usually
ordered according to these priorities. Users can modify this list at system or
browser level (setting the system language is usually enough), so assuming it
reflects the languages our users would like to use is a safer bet, I think.

Forgetting (unportable? unreliable? impossible?) attempts to get this list via
JavaScript, we must rely on the web server because it's the only "active" part
of our system. My preferred one is [Nginx](http://nginx.com/), at the moment;
to have it parse the Accept-Language header we must use a third-party module,
the [Nginx Accept Language
module](https://github.com/giom/nginx_accept_language_module/) (adding it is
not really difficult and thanks to a smart guy I've learnt a couple of ways to
automate the process).

The module's doc already shows how to use the detected language value but here
are my two cents:

<script src="https://gist.github.com/1299102.js?file=gistfile1.txt"></script>

In this way, every generic, "language-less" request will have a chance to lead
users to a translated resource, but, assuming internal links are correctly
namespaced, requests for already translated resources won't force another
language upon our users.

So, with a little help from the web server we can try to **guess** users'
preferred languages; we're left with problems like how to organize the static
site with minimal duplication and how to reduce the effort to keep the
different languages in sync, but here Nginx cannot help us :-)
