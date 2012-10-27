---
layout: post
title: "Bigger AVR MCU: ATmega1284P"
tag: arduino
---
Some weeks ago I received this little MCU:

![A virgin ATmega1284P](/images/posts/bigger-avr-mcu-atmega1284p.jpg){:
.centered title="An ATmega1284P just after unboxing"}

Compared to ATmega328P, this ATmega1284P is not really a "little MCU", it's
**big** (and I'm not talking about the physical dimensions):

| Feature       | 328P  | 1284P  |
|---------------|-------|--------|
| SRAM          | 2 kB  | 16 kB  |
| Flash         | 32 kB | 128 kB |
| EEPROM        | 1 kB  | 4 kB   |
| UART          | 1     | 2      |
| IO Pins       | 23    | 32     |
| Interrupts    | 2     | 3      |
| Analog Inputs | 6     | 8      |
{: .centered}

Health, work and "real" life plotted against me and so I haven't been able to
play with it until recently. Anyway, after quickly connecting an Arduino Uno
and this ATmega1284P via the ICSP interface, here's the abriged content of
that chip out of the box (courtesy of the [ATmega Board Detector][sketches]{:
target="_blank"} sketch):

[sketches]: https://github.com/nickgammon/arduino_sketches

*[ICSP]: In Circuit Serial Programming

<script src="https://gist.github.com/3965122.js?file=Content of an ATmega1284P"></script>

Standard fuse setup and "blank" program memory: everything looked in order.

Unfortunately there seems to be a "plague" which affects ATmega1284P's first
UART and so, even if the chips was running at just 16 MHz, after burning a
version of the Optiboot bootloader prepared for this MCU, I couldn't load any
program via RX0/TX0. A way to mitigate this problem seems to be [adding a 10
kΩ resistor and a 100 pF
capacitor](http://www.avrfreaks.net/index.php?name=PNphpBB2&file=viewtopic&t=107115){:
target="_blank"}, which I didn't have at hand, so I don't know if they would
have been the right solution to my problems.

*[UART]: Universal Asynchronous Receiver-Transmitter

I tried lowering the speed in vain, but perhaps I didn't reduce it enough
because later I haven't had any issue with using the first UART to communicate
with peripherals or the serial monitor...

Fortunately, tweaking Optiboot's code to use RX1/TX1 was not very difficult
(but I would have saved some time if I had checked the project's page
beforehand...) and so after a while I was able to load programs without
problems. Here's what the [ATmega Fuse Calculator][sketches]{:
target="_blank"} sketch running on ATmega1284P says about the Arduino Uno
board's chip:

<script src="https://gist.github.com/3965122.js?file=Fuses of an Arduino UNO"></script>