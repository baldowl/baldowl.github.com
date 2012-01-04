---
layout: post
title: Moving a Time Machine Disk
tag: os x
---
Recently I had to upgrade to OS X _Lion_; given that I didn't want to lose all
the backups performed since my first days in OS X's world, back in April 2008,
I studied for a while a plan that allowed me to move a _Time Machine_ disk
across.

I know, I know: had I used _Migration Assistant_, there probably would have
been no issues at all, but I moved things manually and took the time to clean
up a bit some things. Anyway, moving such a disk is not difficult, really, it
just takes a lot of time.

## What?!?!?

Before going on, however, maybe it's better to clarify what I mean with
"move": I don't refer to moving the _machine directory_ from a smaller disk to
a larger one (another easy operation: fire up _Disk Utility_ and "restore" the
smaller disk onto the larger one; you'll end up with a "clone", just bigger),
I mean using the same _machine directory_ with a differt machine, keeping the
history and list of every backup already performed.

With _Lion_, there's no need to fiddle with ACLs, extended attributes, MAC
addresses and so on, thanks to the addition of _tmutil_; nevertheless, there
will certainly be some troubles due to "insufficient" _Spotlight_'s indexes
that will slow down backups if we don't improve the situation (would you like
if your backups lasted *hours* and you logs filled up with tons of `Waiting
for index to be ready (100)`? No, I guess the answer is no).

Please, note that the following operations are potentially destructive, will
prevent you from using again the backup disk with the old Mac, should not be
performed if you're not comfortable with the terminal and you don't know what
you're doing. Moreover, **in no event I shall be liable for any claim, damages
or other liability**. If you accept that risks are all yours, go on.

## How?!?!?

Let's assume the following:

* backup disk is called **MyBackupDisk**;
* the Mac is called **MyMac**;
* old Mac's disk is called **MyOldDisk**.

So, without further ado:

* turn off automatic backups (`sudo tmutil disable`);
* connect the backup disk;
* associate that disk with the Mac:
<script src="https://gist.github.com/1523007.js?file=tm_ops.sh"></script>
* "reset" _Spotlight_'s indexes:
<script src="https://gist.github.com/1523007.js?file=mds_ops.sh"></script>
* reindexing everything will take a lot of time, so you'll have to wait
  patiently;
* turn on automatic backups (`sudo tmutil enable`).

With brand new _Spotlight_'s indexes, _Time Machine_ won't have any problem to
quickly backup your machine and all your old backups will be at your disposal.

Before ending, let me repeat: I have personally executed this procedure
successfully, but it involves direct manipulation of your backups, so take
your time to think about it before doing anything and be ready to take the
consequences.
