---
layout: post
---
Yesterday afternoon I had to share some rather big files with a client, so I
decided to put them in a [S3](http://aws.amazon.com/s3) bucket and let him
download them at his pleasure. Nothing too special, but I could not let the
whole world to see these files nor I could force any form of explict
authentication upon this client, so I was left with the signed URLs.

While waiting for the last couple of uploads to finish, I thought "Why not
scripting the remaining boring part?", so fired up
[fog](https://github.com/geemus/fog)'s cli and wrote something like following
lines (amended to hide the real names and fit the page):

<script src="https://gist.github.com/796353.js?file=gistfile1.rb">false;</script>

Operations could have been chained a little bit more, but I prefer to build
things piece by piece. I used ActiveSupport because I'm too lazy to do the
time math by myself; the last <tt>#map</tt> is "necessary evil" for European
buckets (at least with fog 0.4.1, available yesterday afternoon).

**Update 2011-02-03**: setting the right region in the <tt>~/.fog</tt> file
(say **eu-west-1**) has a couple of nice effects: first you avoid a
redirection when connecting to S3 and then the signed URLs change from
<tt>https://s3.amazonaws.com/yourbucket/...</tt> to
<tt>https://s3-eu-west-1.amazonaws.com/yourbucket/...</tt> and this makes the
last <tt>map {}</tt> unnecessary.
