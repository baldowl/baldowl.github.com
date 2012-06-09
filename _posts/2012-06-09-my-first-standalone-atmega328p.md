---
layout: post
title: My First Standalone ATmega328p
---
Writing small sketches and playing around with Arduino is funny, but I was
curious about reducing the component numbers, the board size and skipping the
bootloader to recover those precious 0.5 KB.

It turned out it's quite simple, even if there are contradictory informations
scattered around the net.

Armed with the following board definition (which works flawlessly with
versions 1.0 and 1.0.1 of the IDE), an Arduino Uno, a breadboard, a brand new
ATmega328p, a bunch of wires, a crystal, some capacitors, an LED and a couple
of resistors I was able to upload a sketch without any bootloader and see it
working :)

<script src="https://gist.github.com/2900406.js?file=gistfile1.txt"></script>

A better name could be "ATmega328p (16 MHz, w/o bootloader)", but for someone
like me who's still wet behind the ears, "Arduino Uno (w/o bootloader)" seems
better :)

Not bad, not bad at all... and, more importantly, funny :)

<img src="/images/posts/my-first-standalone-atmega328p.jpg" class="centered"
alt="Programming a standalone ATmega328p with a stupid blinking sketch"
title="Programming a standalone ATmega328p with a stupid blinking sketch"/>
