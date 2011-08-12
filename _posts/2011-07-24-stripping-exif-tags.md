---
layout: post
tag: nanoc
---
I've recently started to use [nanoc](http://nanoc.stoneship.org/) more often;
I still like [Jekyll](http://jekyllrb.com/), but it's better to have more
options in one's toolbox and I'll probably try other generator in the not so
distant future.

Just today's has been released [version
3.2](http://nanoc.stoneship.org/blog/32/), which allows you to create custom
commands! Super! Anyway, for the kind of "transformation" I needed, the
well-known filter mechanism was the essential ingredient and was already
available about a month ago, when I needed it :-)

I had an image gallery and wanted to remove every Exif tag from every photo.
It's a menial task when you have the right tool, i.e. the wonderful
[ExifTool](http://owl.phy.queensu.ca/~phil/exiftool/), but first of all I
didn't want to do it manually and then I wanted to keep the original files
untouched.

So, here's what I came up with:

<script src="https://gist.github.com/1102821.js?file=strip_exif_tags_filter.rb"></script>

It's a really, really simple filter... I'd dare to say it's rather stupid :-)
and its use is a no-brainer.
