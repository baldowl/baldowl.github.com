---
layout: post
tag: arduino
---
Once in a while I check the [optiboot
project](http://code.google.com/p/optiboot/) and I'm glad to see it's active.
Today I saw version 5.0a had been released some weeks ago and so I thought it
was due time to recompile and replace it on my toy board.

Let's review the official instructions:

* I don't have a single Windows system, so I cannot say anything about that
  world;
* for Mac, if you use [MacPorts](http://www.macports.org) you don't need
  [CrossPack](http://www.obdev.at/products/crosspack/index.html): just install
  the `avr-libc` port (if you use Homebrew, you'll have to search for a good
  formula);
* for Linux (let's say a Xubuntu 13.04 for argument's sake), you need to
  install the `avr-libc` package (which depends on the `gcc-avr` package; if
  you installed only the latter, you wouldn't be able to build the
  bootloader).

Official instructions hint to use Arduino IDE's AVR GCC: I've never been able
to make it works and it's older than what can be installed on Mac and Linux,
so let's forget it (and after all, setting up a minimalistic local development
environment is not so hard, isn't it?).

Anyway, after you have a working compiler, it's just a matter of running
`make` with the right target; and given that these days UARTs are
configurable, building a bootloader which uses another UART is a breeze:

{% gist 6542730 %}

**Awesome!**

*[UART]: Universal Asynchronous Receiver-Transmitter
