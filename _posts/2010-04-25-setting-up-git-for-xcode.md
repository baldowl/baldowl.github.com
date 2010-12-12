---
layout: post
title: Setting up Git for Xcode
---
[<img src="/images/posts/dscpq.jpg" class="float-right" />](http://www.pragprog.com/titles/dscpq/cocoa-programming)
Even if I don't particularly like Objective-C, given the recent release of [Cocoa Programming](http://www.pragprog.com/titles/dscpq/cocoa-programming) I've started to play a bit with Xcode; after the big upgrade to **Xcode 3.2.2** and a huge backup I created a new project and put together a really nasty interface, crammed with controls, just to "taste" Interface Builder.

But that's not the point of this story.

After playing around for a while with the many windows, I thought about **SCM**: what do "pros" do? They probably use what's already there... As Steinberg wrote, _nobody likes whiners,_ so I'm not going to complain about Xcode lacking support for Git or the fact that it seems to constantly rewrite the project's setting files even if nothing changed; yet, I prefer not to use CVS or Subversion and Terminal is always the first window that pops up on my desktop, so that's not a problem.

The real issue is: what should be **left out** and what must be included in a repository, irrespective of the used VCS? Well, [Cocoa Programming](http://www.pragprog.com/titles/dscpq/cocoa-programming) is silent on this side and the Apple's official documentation does not seem to include a simple list "In/Out", but after perusing documents about project structure and source code management with Xcode, I think to have **a basic, starting list** of things to ignore, so here it is, according to the Git parlance:

<script src="http://gist.github.com/378312.js?file=.gitignore">false;</script>

Apple writes that you should include the <tt>.pbxuser</tt> files because they store user settings; I'm not so sure it be a good idea or not, but I've just started to play with Xcode :-)

Given that Apple itself writes that there's no value in comparing and merging XML files, it's better to tweak Git (I'm so bold as to include in the following list also the XML Nib files):

<script src="http://gist.github.com/378312.js?file=.gitattributes">false</script>

I know, there are other lists circulating on the net; what's above it's just my "two cents", nothing more.
