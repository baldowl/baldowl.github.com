---
layout: post
tag: os x
---
After the recent upgrade to OS X _Lion_, I installed the latest release of
_Xcode_ (version **4.2.1** when I'm writing these words).

I used to download big disk image files from [Apple Developer
site](http://developer.apple.com/), but this time, given that I'm not a member
of any of Apple Developer Programs, I had to turn to the _App Store_... which
downloaded the _Install Xcode.app_. Confident enough, I started it, but the
interface was too simple and sleek, with no way to tweak the installation
process.

Digging a bit into the application bundle, it turned out that the old
interface is still there, because the new installer just wrap the meta package
and the product packages, so opening _Xcode.mpkg_, hidden into the
`Contents/Resources` folder, brought up the usual interface which allows one
to deselect some optional components.

Doing it from the terminal is actually much, much easier:

<script src="https://gist.github.com/1561249.js?file=gistfile1.sh"></script>
