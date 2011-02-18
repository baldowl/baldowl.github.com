---
layout: post
---
A couple of days ago I spent the lunch playing, again, with
[fog](https://github.com/geemus/fog); this time I was interested in
[S3](http://aws.amazon.com/s3)'s multipart upload feature, so fired up fog's
cli and started typing away to test it.

Fog still does not have any model for this recently added feature, so I had to
resort to use the lower level mechanism of requests. Here's a (bad,
procedural, defective of any error checking) script I wrote afterward by
collecting and cleaning up the cli session:

<script src="https://gist.github.com/833374.js?file=multipart_upload.rb">false;</script>

So, roughly speaking, I started asking AWS the list of pending multipart
uploads (and so discovered a couple of them initiated by another tool and
dating back from an earlier upload gone south twice), set up a new one and
uploaded the previously split parts, ending that section showing the parts'
identifiers assigned by AWS, just to be sure they were really there, and,
again, the list of pending multipart uploads to confirm that somehow I did
something right; then I asked AWS to reassemble the file, check that there
were no more pending uploads and get the new file metadata.

Some notes:

* I think it's better to pass File objects to fog instead of reading files
  into memory and passing their contents to fog (a File object will be read
  and transfered in chunks by [excon](https://github.com/geemus/excon));
* I prefer to wrap file operation (even the upload of single files) in a block
  passed to <tt>File::open</tt>, so that the file is automatically closed when
  done.

Inspired by the experience (or disgusted by the amount of low level
operations?), I jotted down what I'd like to see as higher level interface...
perhaps I should try to find some time to fork fog :-)
