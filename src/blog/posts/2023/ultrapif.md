---
title: Reviving the UltraPIF
subtitle: Blowing the dust off the Nintendo 64's best mod
date: 2023-08-14
tags:
  - hardware
---

If you, like me, are a fan of retro gaming, you may have a Nintendo 64. Chances
are that if you do, you either have bought (or have thought about buying) an
[Everdrive][1], and for good reason; in 2023 it's the only way to play titles
like _ClayFighter: Sculptor's Cut_ (_without_ selling your internal organs
and remortgaging your house), the [_Dinosaur Planet_ prototype][2] (which later
became one of my favourite games, _Star Fox Adventures_), or - more importantly
for me - **different region games** on your own system.

## Or is it?

For those that aren't content with the Everdrive, and have mismatched-region
cartridges and console - there is the _UltraPIF_; a replacement for the N64's
Peripheral Interface chip - the custom silicon that handles the CIC (and by
extension, region-locking). Now this isn't news; RetroRGB [covered this][3]
back in 2020, but in 2023 the only place to get it is from [Mod In France][4].
Not to discount Romi (thank you for keeping this mod alive and in stock),
but I wasn't going to be content with just buying one; especially not when the
mod is open source - both firmware and hardware. That's somewhat of a rarity
when it comes to advanced console modding. Understandably so; these projects
have a lot of work put into them, and open sourcing a project like this often
ends up with a multitude of clones ([that may or may not even work at all][5])
on AliExpress without attribution.

But that doesn't seem to be the case here. The UltraPIF, really, is a bit of an
oddball mod; most people _can_ just buy an Everdrive and be done with it. I have
a different scenario, though. I have an NTSC-J (that is, Japanese import) N64;
I wanted a specific colour, namely the "[Clear Red][6]" console - but I live
in the UK (a PAL region) and thus have PAL cartridges. I didn't have an N64
as a child - being born in '97 puts me a few years too late to have owned one
when they were still new - but I have fond memories of playing Pokémon Stadium
minigames with my older cousins.

So the stage is set: I wanted my Nintendo 64 to be a true region-free console;
that is, it will happily boot NTSC (U or J) or PAL cartridges as if it could do
that from the factory floor.

## Doing It Myself

If you browse around [Jan's UltraPIF repositories][7] (there are multiple - one
for the KiCad files, one for the MCU bootloader, one for the MCU code itself,
and another for the FPGA's VHDL {that is, the _Very High Speed Integrated
Circuit Hardware Description Language_, or the code that programs the FPGA}) you
will stumble upon the following warning:

> The firmware/software repositories are still incomplete.  
> So you cannot bring a self-made UltraPIF to life at the moment.

This wasn't going to stop me; in fact saying that I can't build one of these
myself is essentially issuing me a challenge. I also didn't believe it at all,
given that Mod In France had a batch made; what is that if not self-made? My
partner and I (of _"Cutie Club"_) have designed and assembled many PCBs over
the years for various electronic niches so we're no strangers to ~~love~~ a
hot air gun. So I cloned the repos and got to work exporting the [gerbers][8]
so I could get a set of PCBs made. Most of the parts for the UltraPIF are
easily obtainable; generic capacitors, resistors, a ferrite, a clock generator
IC (an Si5351A), an inverter, a clock crystal, and an STM32 microcontroller
(STM32F070). The star of the show is an FPGA (a _field-programmable gate
array_): a Lattice _LCMXO2-2000HC-4TG100C_. What a mouthful. We'll just call it
_the Lattice_.

Those reading who are somewhat interested in electronics probably know what's
coming next, given that in 2023 we're _still_ experiencing the fallout from what
Wikipedia calls the ["2020-present global chip shortage"][9]: I struggled to
find a source for the FPGA. Since July 2021, the Lattice has been out of stock
or on pretty much a perpetual backorder. Mouser estimated that 2,500 units would
be in stock on the 12th of June (which seemed like a very generous number) but I
had to do the unthinkable and buy one from a Chinese seller on Taobao. (I still
don't know if it's not a counterfeit, but I'm getting ahead of myself).

To save some time, I actually paid for assembly on the parts that the fabricator
(JLCPCB) had in stock. I thought this would be useful - let's just solder what
we _need_ to - but actually this ended up being useless for the main FPGA board
as we had to transfer everything to a spare PCB (twice). Let me explain. There's
actually multiple PCBs at work here - an adapter PCB that gets soldered into
place of the original [PIF-NUS][10] with a mezzanine connector. Specifically, a
Hirose DF12A; with 0.5mm pin pitch. This thing is truly horrid to solder. It's
not _so_ bad on the adapter board, (especially as it's the only thing on there),
but on the FPGA board it's on the _underside_. So you have to do it last, after
doing everything on the top side - and hope that you don't ruin a trace or lift
a pad at this point lest you have to desolder _everything_ and start again.
Which is what happened to us. _Twice_.

The pain of messing up the PCBs led me down another path; what if we improved
the PCB?

## A New Revision?

Looking at the PCB in KiCad reveals that Jan, despite his great worth of
knowledge on the Nintendo 64, isn't the best at laying out a PCB. I'm sorry,
Jan, but it's a bit of a mess here. So, my partner and I decided that our best
course of action was to create a new revision of the FPGA board, more suited for
at-home small batch production.

From looking around the hardware repo's wiki, you can see that there appears
to be a revision 7 of the board that hasn't been released/uploaded to GitHub.
That board has a triangular looking cutout on the bottom left-hand corner.
This, as we found out, is because the N64's heatsink is in the way and doesn't
seat properly with the revision 6 UltraPIF installed. The first thing I did in
the new revision was make a generous cut there to (hopefully) get the heatsink
seated correctly. We can also get rid of the flat flex connector, P2, because we
aren't using it. There are 0.1" pin header holes to program the various ICs that
we can use.

<!-- This is horribly ugly because I can't wrap it. -->

![A photograph of the printed circuit board that holds the FPGA. It is marked
'Rev. 7' and features a strange 5-sided shape due to a triangular cutout
in the lower left corner.](https://raw.githubusercontent.com/wiki/jago85/UltraPIF_Hardware/images/interface_top.jpg "The unreleased Revision 7 FPGA
board")

I've moved as many components off of the underside of the board as possible.
Having to rework two sides proved irritating for us, so minimising the
opportunity to end up overheating components on the opposite side of the board
was important. I say overheating because this board has some thick power traces
that during the soldering process act as big heatsinks, spreading heat through
the board. Also, there was now more space on the top side now, so we could
put these passive parts closer to the chips that needed them.

I also switched the STM32 to its QFN package because it's easier for us to
rework, and then I switched the crystal to a smaller part to save board space,
and then I standardised the size of all the passives to 0603 imperial because
that's easier to solder than the 0402 that are on the board. This redesign soon
snowballed into me deleting all the traces and moving most of the components
around on the top side.

In the software industry, this process is called [_yak shaving_][11] and we try
to avoid doing it because it's a productivity death spiral. As you will have
imagined, this means that so far I've not actually completed the new revision of
the board. Sorry about that. This will, however, allow me to split this into a
series of posts about the mod and how I will (hopefully) finally make this mod
a far easier and more accessible option than it currently is.

## Raspberry UltraPI(F)?

Whilst writing this post, my partner also did some detective work to see how we
could contact Jan. In doing so, we found that he's been posting his work online.
If you can read (or translate) German, an [update][12] on the **circuit-board.de**
forums suggests that Jan is working on a new version of the UltraPIF using the
Raspberry Pi Foundation's RP2040 IC - a fast dual-core microcontroller IC with
unique Programmable IO subsystem. That's the same chip found at the heart of the
Raspberry Pi Pico.

> 26 May 2023, 08:14  
> ...  
> _Small side note because I hardly post anything:_  
> Over the winter I had started with some attempts to implement the
> UltraPIF with a RP2040 (Raspberry Pi Pico). With the RP2040 the HW would
> be significantly cheaper. My prototype was also ready. Unfortunately, I
> absolutely cannot get the PCB ready. (Is very fumbled due to the much smaller
> chip.)

My partner suggested that we reach out to Jan and offer to help completing this;
we've worked on numerous electronics projects with complex PCB layouts. If we
manage to get in contact with Jan, it might be that I don't have to work around
the limitations of the Lattice and the current two-board stackup. We could be
closer to reviving the UltraPIF. Until then, though, I'll be working on making
the current solution more tenable for DIY - and if that comes to pass before an
UltraPIF powered by the RP2040, we'll be talking about the _missing firmware_.

[1]: https://krikzz.com/our-products/cartridges/ed64x7.html
[2]: https://tcrf.net/Proto:Star_Fox_Adventures/Dinosaur_Planet
[3]: https://www.retrorgb.com/ultrapif-multi-region-n64-pif-replacement.html
[4]: https://shop.modinfrance.fr/en/nintendo-64/25-ultra-pif-N64.html
[5]: https://www.retrorgb.com/beware-of-fake-gcloaders.html
[6]: https://consolevariations.com/variation/console/n64-clear-red-white
[7]: https://github.com/jago85?tab=repositories&q=UltraPIF
[8]: https://en.wikipedia.org/wiki/Gerber_format
[9]: https://en.wikipedia.org/wiki/2020%E2%80%93present_global_chip_shortage
[10]: https://n64brew.dev/wiki/PIF-NUS
[11]: https://americanexpress.io/yak-shaving/
[12]: https://circuit-board.de/forum/index.php/Thread/24209-WIP-UltraPIF-Multi-Region-N64-PIF-Replacement/?postID=1034156#post1034156
