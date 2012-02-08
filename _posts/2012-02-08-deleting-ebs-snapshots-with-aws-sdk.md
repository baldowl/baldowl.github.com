---
layout: post
title: Deleting EBS Snapshots with aws-sdk
tags:
  - aws
  - ruby
---
Removing a lot of EBS snapshots by hand with AWS's web console is not really
funny, isn't it? Scripting it with [fog](https://github.com/geemus/fog) is
easy, but this time I decided to try the
[aws-sdk](http://aws.amazon.com/sdkforruby/) gem.

[aws-sdk](http://aws.amazon.com/sdkforruby/) is AWS's official SDK for Ruby.
It's definitely a late addition and I didn't pay to much attention to it when
it was announced some months ago, but being an official AWS's product,
**maybe** it's in a better position to follow the evolution of the many AWS's
web services. Anyway, after quickly scouring [the online API
docs](http://docs.amazonwebservices.com/AWSRubySDK/latest/frames.html) and
setting the right environment variables with AWS credentials, I wrote a bunch
of lines in IRB and, voilà!, the unneeded snapshots were removed.

Here's an edited version of that bunch of lines:

<script src="https://gist.github.com/1772132.js?file=gistfile1.rb"></script>

Simple, short, and above all else **labor-saving**.

I still like fog and I think it's a great library, but, maybe, aws-sdk is not
so bad after all and it deserves more study.
