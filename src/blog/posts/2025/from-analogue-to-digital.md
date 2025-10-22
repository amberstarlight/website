---
title: From Analogue to Digital
subtitle: A breakdown of my video game collection and setup
date: 2025-10-22
tags:
  - gaming
---

I like to play video games; it's a pleasant thing on an afternoon after work
to be able to grab a controller from the drawer, turn on a console, and indulge
in play. The majority of my collection spans from the late 1990s to the early
2010s, and as such features a number of consoles that output video signals and
use connectors that modern televisions and displays have long since abandoned.
Some people will be horrified that this era is now considered "retro" and to
a large extent I am one of them!

This is a particularly broad topic and there are several camps of opinion that
so-called "retro-gamers" have entrenched themselves into; I have my opinions
and have curated my setup to fit my needs, but yours will be different and so
I advise taking the time to research different solutions. There's some further
reading at the bottom of this post which should serve as some jumping off
points. Remember - there is no "perfect setup", only the setup that is perfect
_for you_.

## What are the options?

You could, if you so desired, turn to things like emulation - be that software
based (PCSX2, Dolphin, Project64, and others) or hardware based (MiSTer,
Analogue FPGA systems) - but for many reasons I dislike emulation:

1. You're not getting the full experience. You often don't get to use (due to
   needing various adapters) the original controllers.

2. Not all features of the hardware are supported - not all emulators support
   all games, some don't link to other instances for multiplayer, etc.

3. The console menus/boot screens are often not present - a key part of the
   nostalgia for those who owned them back in the day. The Xbox flubber, the
   GameCube blocks, etc. This is a particular pet peeve of mine.[^1]

4. You don't use original discs: flipping through your digital list of games
   isn't the same as getting up and looking at the shelf, pulling out a game and
   reading the cover and manual[^2]. Remember thick game manuals?

5. I harbour a little bit of a grudge against emulation as I grew up in an era
   where most emulators for the more modern consoles (6th gen!) were ropey at
   best and incapable of loading games at worst. They've since come a long way,
   but I can't shake those initial impressions. You are more than likely to have
   a Good Enough experience in 2025 with software emulation.

So my choice for retro gaming is to use original hardware, with modification
where that improves the quality of life of the system. I currently have
8 consoles plugged in to my TV setup; the complete collection of both 6th
generation (Dreamcast, PlayStation 2, Xbox, GameCube), 7th generation (Xbox 360,
Wii, PlayStation 3) and a Switch. I would like to have a Nintendo 64 in this mix
too, but I am running out of space as it is, and as a 'toploader' it can't be
stacked. Save for the three consoles that can output HDMI directly (X360, PS3,
Switch), the remaining five do not have outputs that my 4K TV supports; it's
HDMI only, and please - standard resolutions or it'll complain. In the search
for the ultimate setup, I wanted to be able to have every console plugged in
and able to be switched on and played without fumbling with cables and cheapo
adapters. Everything should output its highest quality video signal, with
minimal input latency, and have modern improvements where they make sense.

## Input, Output

With so many systems, my first goal was to harmonise on one standard of video
cable for everything that isn't outputting HDMI. Why not HDMI mods? Simply -
the cost of doing that for 5 consoles is more than using a dedicated scaler[^3].
Thankfully, cable choice was essentially made for me; the Xbox, PlayStation 2,
and the Wii have readily available Component video (YPbPr) cables, with which
they output good clean video signals. Most people (in PAL regions) will remember
using SCART or Composite video (a yellow RCA cable). Lots of these cables just
shoved Composite video and stereo audio into a little rectangle and a minimal
version of SCART came out the other end. However, higher quality video cables
were available (we were still a few years away from going fully digital). If you
have exclusively PAL consoles, especially 5th generation and older, you may find
RGB output/mods are your preference (if not required); adding an N64 to my setup
would involve Tim Worthington's RGB mod, for instance.

The odd one out here is the GameCube. Early models (DOL-001) had two video
outputs: Analog AV Out, and _Digital AV Out_. The digital port will output
YCbCr[^4] that, with the OEM Nintendo component cable, gets converted to
analogue YPbPr through a proprietary ASIC. If you have this cable (now worth
a considerable amount of money), you also need to use the Analog AV cable for
stereo audio; Nintendo didn't include a DAC for audio in the Component cable.
The alternative option is to use a GCVideo solution. I'm using the Insurrection
Industries Carby and pairing it with a HDMI to YPbPr Component converter. This
is so that I can upscale and process the output in the same way for all of my
analogue consoles. (Carby Component Cable please come back!)

The Dreamcast has the ability to output VGA, which bypasses the switch box and
goes straight to the upscaler; it's native VGA and doesn't need any conversion
or special cables, the cheap Dreamcast VGA cables on eBay work _perfectly_ here.

The video pipeline is as follows:

1. The first stage: analogue output. Component video comes out of the Xbox,
   GameCube, Wii, and PlayStation 2 - where it goes into a switch box. I have
   a Monoprice 103027 unit I found used on eBay, but anything that is either
   fully mechanical switching or uses high quality matrix switching ICs would
   be ideal.

2. Analogue to digital conversion stage: one component cable comes out of
   the switch box and goes into my Open Source Scan Converter (OSSC), which I
   upgraded to 1.xx+ firmware. The Dreamcast VGA comes into the OSSC on AV3. The
   OSSC is an upscaler, meaning it can convert and upscale the analogue video
   signals into digital signals that modern displays can accept and process.
   It'll do anything from line doubling (480p to 960p) to line sextupling (240p
   to 1440p!) dependent on the source. Here I also apply scanlines through the
   OSSC to help get the feel of the original CRT experience back.

3. Digital switching: HDMI comes out of the OSSC and goes into an Extron
   SW4 HDMI switch box. In the other three inputs are HDMI from the Xbox 360,
   PlayStation 3, and the Switch.

4. The final stage: one HDMI cable comes out of the Extron and goes into my
   Philips 4K TV. Audio comes out of the TV through HDMI ARC and goes into an
   S.M.S.L AO300 amplifier, then into Monitor Audio Monitor 100 speakers. Nice
   speakers are of course optional!

This might seem like a complex process, and it is - but it's worth it to see
just how good you can make this analogue content look. The Xbox has some games
that even output 720p or 1080i video, which is worth the price of admission
alone; 1080i from the Xbox! The console from 2001!

## The Fleet

It's not just about plugging everything in, of course. Much effort has gone
into choosing the parts of the system, researching the options, and lots of the
consoles in my collection have gone under the knife many times to have upgrades
and repairs. Let's walk through the proverbial hangar together:

### Xbox

The first home console I owned, the Xbox is perhaps my favourite. _Halo_ and
_Halo 2_ were pivotal to my ongoing love for Sci-Fi, leading me to all sorts
of media including Bungie's big inspiration, _Alien_ and _Aliens_. I'll never
forget the jaw-dropping wonder I had when stepping out of the crashed lifeboat
for the first time and looking up at the ringworld in _Halo_. Other games
I still play from back in the day include _Midnight Club 3: DUB Edition_,
undoubtedly fuelling my love for the Max Power scene and underground automotive
culture in an era of _Fast and Furious_, and the _Burnout_ series; _Burnout:
Revenge_ will always make my top 10 list of games.

Sadly this Xbox isn't the same unit I owned as a child, but it's become a
staple of play with only a few mods - an OpenXenium chip and a 1TB SATA HDD.
The PC-like architecture is a huge boon to the system with hardmodded Xboxes
(Xboxen?) still reigning supreme as some of the best emulation machines out
there. In the future I'd like to transplant the guts of this console into
either a [Crystal Xbox][crystalxbox] shell or one of the seemingly vaporware
Retro Game Restore shells. There's also the option of dyeing the crystal shell a
different colour...

- OpenXenium modchip, with EvoX M8+ Titan patched BIOS
- 1TB SATA HDD (StarTech adapter with 80-wire IDE cable)

### PlayStation 2

I never owned any of Sony's consoles as a child, and my foray into PlayStation
only started a few years ago when I purchased this special edition [Aqua
Blue][ps2] PlayStation 2. I'm continually amazed by its massive library of games
that include some very interesting exclusives - _The Getaway_ is a personal
favourite and a complete time capsule of the turn of the millennium in London.
The popularity of the PS2 means that you can to this day find great deals on
games in even high street secondhand shops. The backwards-compatibility with the
PlayStation is a huge bonus and gives me an additional console's worth of games
to play, including heavy hitters like _Metal Gear Solid_.

Softmodding is very straightforward here, you can grab a memory card preloaded
with FreeMCBoot on eBay for very little money, but I'd recommend going down the
HDD adapter + SATA board route as you can put FreeHDBoot on the hard drive and
gain back a memory card slot. This way you can also install something called
HDDOSD which lets you browse the drive in the main menu.

- FreeHDBoot
- PS2 Network adapter with SATA conversion board + 1TB HDD

### GameCube

What hasn't been written about the GameCube? Perhaps the underdog of the 6th
Generation, the GameCube maintains a cult following (much like the Dreamcast)
not just for its stellar library of games, but also a very comfortable
controller with twin-stage 'ana-digi' triggers: most of the way in they're
analog, with a digital button right at the end of their travel. Having the
A button be physically larger also helps with comfort and lets you roll your
thumb to reach the other face buttons quite satisfyingly. The first time I saw
a GameCube, I played _Star Fox Assault_ with a friend; the multiplayer mode is
really quite fun and a good arena shooter! Recently I ripped all my games using
CleanRip and started playing through the _Resident Evil_ remake.

Originally released in 'Indigo' purple (the first GameCube I owned was this
colour), 'Platinum' silver and 'Jet Black', I picked up a ['Spice' orange][gcn]
to complement my collection of limited-edition or differently coloured consoles.
The GameCube is the most kitted-out console in the collection, with some
rarities like the broadband adapter (DOL-015) that I purchased from CeX (of all
places!) and a matching 'Spice' orange Game Boy Player; Game Boy games on the
big screen look absolutely fantastic through the OSSC's upscaler. The original
miniDVD drive is gone, with a GC Loader sporting a suitably large SD card in its
place, running SwissGC as a homebrew solution. Save files are dealt with by a
MemCard PRO GC. In serial port 2 sits an SD2SP2 for configuration backup.

- Game Boy Player
- Broadband Adapter
- GC Loader ODE
- SD2SP2
- MemCard PRO GC
- CR2032 holder for replaceable clock batteries

### Dreamcast

I hadn't considered a Dreamcast as a contender for my collection until I
realised it was the only console missing to complete my 6th generation set.
After all, much of the system exclusives made their way to other platforms in
the form of ports or remakes. _Jet Set Radio_, _Shenmue_, and _Soul Caliber_
are standouts here in that many consider the Dreamcast the best or only way to
play. I'd like to get a GDEMU for my system, if only to make the system a lot
quieter! It's particularly cool that the Dreamcast supports outputting VGA, but
unfortunately it's not supported by all games on the system.

### Wii

The hacking scene around the Wii is quite interesting, and these days
softmodding is the way to go for the Wii; the SD card slot makes it so easy.
You may have even heard of the "Letterbomb" hack, as it's fairly ubiquitous. The
Homebrew Channel and its theme are fantastic and blend into the console well,
which is perfect for someone like me who appreciates the "OEM plus" aesthetic.

There are some interesting games made for the Wii (it would be remiss of
me not to mention _Super Smash Bros. Brawl_, of which I spent a lot of time
playing with school friends), but I am quite fond of a few lesser-known titles.
_Pokémon Battle Revolution_, the sort-of-but-not-quite spiritual successor to
_Pokémon Stadium_, comes to mind as a game that showed a lot of potential but
ultimately was too reliant on the player also having a Nintendo DS and _Pokémon
Diamond/Pearl_. I'm also obliged to mention _No More Heroes_ as a title that
deserves your attention.

### Xbox 360

The almighty Xbox's younger brother, the 360 doesn't have me [turning 360
degrees and walking away][360] as I spent a significant amount of time lusting
after this console when I was in secondary school. I was eventually able to
convince my parents to buy me one, and it was a black Xbox 360 Elite - marketed
by its codename _Jasper_. Very cool at the time, but in recent years I've
become more fond of the original white colour of the system. Without a doubt
the most important games of this era for me were _Halo 3_, _Halo 3: ODST_,
_Halo Reach_ (come on, did you really think anything different? I was there for
[the Beta][reachbeta]!), _Forza Motorsport 4_, and _Forza Horizon_. I actually
pre-ordered the limited editions of both Forza titles! Fans of this series
didn't know how good we had it with _Motorsport 4_.

This particular 360 in my collection is a kitbashed console, made using
my original Jasper console's internals and a dead _Halo 3 limited edition_
console's shell I bought on eBay. This era of gaming is, at the time of writing,
incredibly inexpensive to get into - so if you've been holding out, consider
this a sign. Future plans for this console include RGH 1.2 with a 'CoolRunner'
chip, a Sonus 360 to add some Halo SFX like the _Halo: Reach_ Xbox 360 S, an
SSD to replace the aging HDD, and to bring back the blades dashboard that so
intrigued me back in the day. I'd like to pick up the HD-DVD accessory as it's
an interesting novelty!

### PlayStation 3

Let's be honest, the main reason anyone bought a PS3 was because it had a
Blu-ray player integrated into the console. And that's what mine adds to my
setup; a dedicated 1080p Blu-ray machine, with the added bonus of being a games
console. The launch price of the system was [fairly steep][ps3] and has gone
down in history as a meme (599 USD), but again this was primarily due to the
additional cost of that Blu-ray drive (and the licencing). If you take into
consideration that Blu-ray players were even more expensive and didn't have
the rest of a PS3 attached to them, it was a fairly good deal! In terms of
exclusives, the big names here that I'm seeking out are _Demon's Souls_, the
_Gran Turismo_ series, _Metal Gear Solid 4_, the _Motorstorm_ series, and the
_Ratchet & Clank_ series.

In terms of modding, I think I'll end up looking at some form of custom firmware
as then I can have a region-free Blu-ray player. Unfortuna

### Switch

I haven't very much to say about the Nintendo Switch that I haven't [talked
about already][dpad] - my custom translucent JoyCons with multicoloured face
buttons, hall effect thumbsticks, and white indicator LEDs being the only
modifications. I'm quite impressed with the Switch as a portable console -
seeing _Burnout Paradise Remastered_ run flawlessly in handheld mode when I'd
previously played it on my Xbox 360 was a fun reminder of how far Moore's Law
has held up!

There are some modchips for the Switch like the [picofly][picofly], which
looks like the defacto option for homebrew and backups, but the scene is still
evolving.

## Future Plans, and the Bad Bits

As much as I like the current setup, there are some downsides. Primarily, the
component switch box I have requires a remote (or getting up and pressing a
button, shock horror) to switch inputs. I intend to get an automatic switcher;
either a [gcompsw][gcompsw] or, if I can find one, an Extron Crosspoint
component matrix switch. The more automated I can get the switching of the
video inputs in the setup to be, the more friction-free playing games will be -
meaning I play them more.

The OSSC does not have a Composite video input, meaning any new console that
I add to the collection will need to output RGB via SCART or YPbPr through
Component; this means hardware modification for essentially all remaining
consoles I see myself owning. That isn't necessarily a bad thing, but it would
be good to have a Composite input to this setup, not just for games but also
for other video sources such as my VHS player or a future LaserDisc player (yes,
I do own some!). There's the possibility of adding a transcoder here like the
[Koryuu][koryuu], or even upgrading my upscaler.

There's one more thing that frustrates me about the OSSC: it suffers from what
I call "single board computer syndrome" in that its array of input ports are
scattered on all different sides of the unit: this makes it a bit of a cable
mess if you don't use right angle adapters to send all the cables behind it.
The OSSC Pro doesn't fix this problem either, with the SCART and expansion ports
on the sides of the unit! The RetroTINK 4K does the same thing, there's just no
escaping it.

My Extron SW4 HDMI is also fully utilised, and doesn't support video sources
beyond 1080p. This is not necessarily an issue right now, but the most modern
upscalers (Retrotink 4K, PixelFX Morph et al.) can upscale 1080p HDMI content
up to 4K, and they would do a better job at it than any internal scaler in a
typical television set, alongside the ability to do additional video processing
on these sources. This would be an attractive proposition for 7th generation
consoles, and even PCs! I could run all my HDMI sources through a HDMI 4K
switcher and then a single cable into the TV would simplify the digital side of
my setup.

The Philips 4K TV is fussy about video inputs and will display "Video content
not supported" on the screen constantly on some combinations of upscaled video.
Thankfully the OSSC can pass through unscaled video in these instances but I
would much prefer that the TV didn't do the scaling here. It seems to just be
an issue with this particular model, so it may be solved with a firmware update
(can you believe this is where we are at as a society?).

Cable management of all of this gear is also a massive frustration; every
console has its own power supply and video cable, each of my switching boxes
has its own power supply, the amplifier has its own power supply, and the
amount of cabling around the switching units can become quite a rat's nest.
This is especially frustrating as the setup is currently the only way I can
test video output from any of the 6th generation consoles; so if I am working
on a repair or mod and have the console in pieces I have to pull cables out
and it just becomes even more of a mess. I would like a dedicated test monitor
with Composite/Component/SCART/HDMI inputs so that I can test everything on
the workbench; there are a plenty of smaller TVs from the early "HDTV" era that
could do this but I'd like something with a display of around 9". I dream of
having a Sony PVM-9044QM professional broadcast CRT...

Many of the consoles I own also do not have their own integrated power supply,
so there are quite a lot of power bricks behind the setup. Thankfully in 2025
we have access to USB Power Delivery standards that can provide up to 240 W
of power, meaning there are already many drop-in power boards that make these
consoles powered by a USB-C cable! This does a lot to reduce the bulk of the
power bricks and reduces the dependence of the consoles on 20+ year old power
supplies. The GameCube, Wii, and Xbox definitely have these available.

## Further Reading

If you want to start delving into the scene more, some excellent resources are
available:

- [My Life in Gaming RGB Video Masterclass][mlig] - the MLiG guys are really
  passionate about their setups and have been very inspirational for me in keeping
  my passion for retro games alive.

- The [ConsoleMods.org][consolemods] Wiki, which also has a lot of information
  about each console I've talked about and was incredibly useful in finding out
  what was possible.

- [RetroRGB](https://www.retrorgb.com/) which I still keep up to date with for
  news about new mods and scaler firmware updates.

---

[^1] This is why (or at least part of why) I don't play any of the Halo series
on the Master Chief Collection, because the menu 'flythroughs' aren't present;
in fact, none of the original game menus are present. This greatly dampens the
experience, especially because the music and menus are meant to settle you into
a particular mood before playing that the MCC strips away; it almost feels like
whitewashing the history of the series due to the amount of time we'd spend in
those menus queueing for multiplayer matches or even leaving the menus on to
listen to the music. Visit [halome.nu][hmenu] to see what I mean. For a long
time I wouldn't even recommend playing _Combat Evolved (Anniversary)_ via the
MCC because it was based on the buggy Gearbox port and retained a lot of those
bugs, and wouldn't let you switch to the original sound effects/music!

[^2] I do, where possible, rip or dump my games to the console. Neither the
drive lasers nor the discs themselves will last forever! This does mean I am
also 'looking through a digital list of games' - but I do have the cases and
manuals for the majority of my game collection, and frequently have to pull the
manuals out to remind myself of the control scheme.

[^3] This was true when I started collecting, there may be some cheaper kits now
especially in the open source space. However, an ElectronAVE for the Wii starts
at £61 which is about half the cost of a brand-new OSSC!

[^4] You don't need to know the ins and outs of the technical details around
Component video. Just know that you get a better video signal quality by using
either it or RGB over Composite.

[crystalxbox]: https://consolevariations.com/collectibles/microsoft-xbox-crystal-console
[ps2]: https://consolevariations.com/collectibles/sony-playstation-2-50-millionth-edition-aqua-blue-console
[gcn]: https://consolevariations.com/collectibles/nintendo-gamecube-spice-orange-console-jp
[360]: https://i.kym-cdn.com/photos/images/original/001/265/714/fd1.gif
[reachbeta]: https://youtu.be/MRRlauFtDO8
[ps3]: https://web.archive.org/web/20251002062201/https://www.theguardian.com/technology/2007/feb/01/games.guardianweeklytechnologysection2
[dpad]: /blog/joycons-and-other-thoughts/
[picofly]: https://www.retrosix.wiki/picofly-hwfly-rp2040-nintendo-switch
[gcompsw]: https://consolemods.org/wiki/AV:Gcompsw
[koryuu]: https://videogameperfection.com/products/koryuu-transcoder/
[hmenu]: https://halome.nu
[mlig]: https://youtube.com/playlist?list=PLTNBVisVMbSR1ZDDQRgjg6S9D2YQ4rwnZ
[consolemods]: https://consolemods.org/wiki/Main_Page
