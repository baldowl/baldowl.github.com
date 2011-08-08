---
layout: post
---
This is partially a rant; you have been warned!

I do not hate ignorance: there are simply too many things in the world to not
be ignorant of something. **I cannot stand ignorance and pertinaciousness
together.**

It happend to me to work with people who sold themself like stellar
programmers, yet they had never used a <abbr title="Version Control
System">VCS</abbr>. Being told to study the available documentation about a
given VCS, they started to work on the assigned projects right away, trusting
in their ego and the help of their preferred <abbr title="Integrated
Development Environment">IDE</abbr>, only to fail miserably after having
committed log and temporary files, assets generated and maipulated at runtime
by the application, their personal IDE's project settings and having reached a
point where the VCS itself could not tell apart a working directory from the
recycle bin and the repository did not work properly. I have never been able
to reproduce that mess and still do not know how they could achive those
"wonderful" results. Being tasked with fixing corrupted working directories
and wrecked repositories is not really funny, but it is definitely too much
when you know everything could have been avoided just by spending a couple of
hours studying some very basic docs.

The given VCS was **[Subversion](http://subversion.apache.org/).** Many years
ago, switching from <abbr title="Concurrent Versions System">CVS</abbr> to
Subversion I felt at ease in a very short time and I still think Subversion is
a simple but good VCS. Then came **[Git.](http://git-scm.com)**

My first contact with Git was a bit more traumatic: I do not remember what I
started reading, but I thought "What the heck is all this?!?". I threw
everything away but returned to it after a while, only to be shocked again;
the story repeated itself a couple of time before I saw the "light". Now I use
Git everywhere for everything and also installed and maitained an instance of
**[Gitosis](http://eagain.net/gitweb/?p=gitosis.git)** to watch over a couple
of Git repositories at work for a while; then I realized that if Subversion
had not been understood well enough to use it in a basic, straitforward way,
Git would have caused way too many troubles.

Others have written about why Subversion should stay alive, but I do not care
too much about things like enterprise penetration; Git and the other <abbr
title="Distributed Version Control System">DVCS</abbr>s are so flexible,
provide sofisticated ways to handle and rearrange source code and add the
complexity of decentralization on top of it. My experience tells me some
people just cannot start to use Git as their first VCS (and some should not
use it at all), but I do not think it to be Git's fault: when people do not
want to learn, you cannot give them enough rope to hang themself without
seeing them strung up after a short while.

**For this single, simple, selfish reason, I say that Subversion must live and
prosper.**
