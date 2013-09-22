---
layout: post
title: Adjusting To GitHub's 2FA
tag: ruby
---
When GitHub announced the [introduction of
2FA](https://github.com/blog/1614-two-factor-authentication), I decided to
wait for a few days before trying it (you know, shutting yourself out of your
own account is like closing the door with your keys still on the kitchen
table: it's not funny).

Setting up 2FA is easy and quick; the only thing I'd like they changed is the
fact that those recovery codes should not be still accessible in the settings
section, imho. But I'm digressing.

The first thing to notice is that, unfortunately, the most famous Android
applications for GitHub ([the official
application](https://play.google.com/store/apps/details?id=com.github.mobile),
[Hubdroid](https://play.google.com/store/apps/details?id=net.idlesoft.android.apps.github)
and [Octodroid](https://play.google.com/store/apps/details?id=com.gh4a)) do
not currently support 2FA and thus they're unable to authenticate after you've
activated it; easy workaround: authenticate them before switching 2FA on.

Interacting with the APIs is a bit different: Basic Authentication is still
usable, but you need to pass the OTP in a specific header and if you have a
very long script with multiple commands, that OTP is going to expire too soon;
authenticating via OAuth is still the same however.

At this point I started playing a bit with the latest [Octokit
gem](https://github.com/octokit/octokit.rb), which changed quite a lot
starting with version 2.0.0, and wrote some toy scripts.

The first toy was this:

{% gist 6658258 octokit-basic-auth-with-otp.rb %}

If you'd already activated 2FA, it asked you an OTP and retried. It worked,
but that OTP expires quickly and you'd have to add the `X-GitHub-OTP` header
to each request. Unrealistic.

Using OAuth2 tokens is much better, so my second toy first used Basic
Authentication to create a brand new token and then used it to iterate over
some repositories:

{% gist 6658258 octokit-disposable-tokens.rb %}

This second toy assumes you're using 2FA and creates a lot of garbage over
time in your Personal Access Tokens panel: those tokens are clearly labeled as
"Disposable", but it's not funny to have to remove tons of tokens after some
months of use, is it?

Maybe reusing a single token is better, so my third toy used Basic
Authentication to retrieve an existing token, aptly named "Toy 3", from GitHub
and then used it over and over again:

{% gist 6658258 octokit-retrieves-token-from-github.rb %}

Storing a token locally instead of grabbing one from GitHub (and thus having
to type a new OTP each time you have to use a script) is probably better.
Where could it be stored? `.netrc` could be an option (it's a portable
solution, fully supported by Octokit gem), but... These days I use a Mac, so
after a while I started thinking that using OS X's keychain is, maybe,
slightly better than having your token in a plain text file and so I added a
token to my default keychain with some optional flags to clearly make it stand
out:

{% gist 6658258 gistfile1.sh %}

Then my fourth toy used the `security` command to retrieve that token:

{% gist 6658258 octokit-retrieves-token-from-keychain.rb %}

I'm not 100% sure that the `find-generic-password` sub-command has the `-w`
flag even in older OS X releases; anyway, when this fourth toy ran, I was
asked to grant `security` access to the token (because of that `-T` flag
`security` was not automatically authorized) and then the script went on
without issues.

I purposely used the `-D` flag to specify a "custom" kind instead of mixing
the token with the other application passwords when creating the item and
tried to identify accurately the entry for `find-generic-password`: changing
values for `-a` and `-s` it should be possible to add more than one token, if
necessary.

So, in the end, I can say that using GitHub's APIs with 2FA is slightly more
inconvenient, but not too much to force someone to turn it off and that I
spent some pleasant time playing with the Octokit gem and getting to know it a
little bit better.

*[2FA]: Two-factor authentication
*[OTP]: One-time Password
