---
title: Film Photography On Linux
subtitle: My (mostly) open source workflow for negatives
date: 2023-12-06
---

"On Linux" is a phrase that just about every Linux user has tacked into the end
of a Google search at _some_ point during their Linux journey. Usually it'll be
because I've forgotten the switches for `tar` - as a woman I'm not allowed to
use `man` (it's `xf`, eXtract Files) - but sometimes you end up in a situation
where being _on Linux_ makes life a little more complicated. _Such is the price
of freedom_, one supposes. And so, now that I'm at the stage in my film journey
that I've bought a scanner (spoiler alert), I found myself searching "film
negative workflow on linux".

## Background

I'm an analogue photographer. I don't own a DSLR, or indeed _any_ digital camera
(unless you count the weak cameras of my smartphone), so at some point there's
a digitisation step that has to happen so that I can convert my negatives
into files on my computer. There's a number of methods that you can use to do
the digitisation step. Many people who are already digital photographers will
do lightbox DSLR scanning (taking photos of their negatives, set atop a
lightbox, with their DSLR on a stand). It's more technical than this - you need
the right lens and the right settings - but I won't go into detail on how to
do that here. That's the easiest method, because most cameras have removable
storage which you can plug into your machine and you've got your files. Skip to
step 2.

Scanning, in the traditional sense (a flatbed and scanning something like
a passport), is straightforward enough on Linux. There's a piece of software
called SANE (Scanner Access Now Easy) which has been around since [before I was
born][1] that various desktop environment frontend packages use. And it just
works. And that might in fact be fine if you have one of the recommended flatbed
units (think Epson V600) and/or need to scan formats that aren't 35mm. The Epson
(and its competitors) are supported in SANE, too.

However, there are some special 35mm scanners, and I was recommended a specific
model by a friend: the _Plustek OpticFilm 8200i SE_. But there's no Linux driver
available from Plustek. They supply Windows and Mac OS drivers, along with a
copy of SilverFast SE (which is about the same age as SANE). Specialised film
scanners are unfortunately a dead industry. The big players left the market as
it shrank due to the adoption of digital cameras, so the only ones left are the
flatbeds and the Plustek scanners. The software bundled with the scanners that
are left are essentially abandoned, too. Pretty much all the cheap film scanners
aren't worth talking about here. They're not recommended by anyone.

So; if you're on Linux, and you have a special scanner, you're SOL. _Or are
you?_

Enter [VueScan][2]. This (sadly proprietary, but we can't win all our battles)
software supports a vast number of scanners, with (I presume) reverse engineered
drivers. And they have Linux binaries available! That was good enough for me;
I decided that the Plustek would suit my available space (it's fairly petite)
and that I would buy a VueScan licence. Helpfully, Hamrick offer a limited/
demo version of the software - you can simply download it and test it out with
your setup before committing to buying. If you're below a certain age, we used
to call this _shareware_. Some functions are limited, and it adds watermarks to
actual saved files, but the rest of the program works flawlessly. Well, once I'd
installed `vuescan-bin` [from the AUR][3] (I use Arch btw) it did. If you use
any of the more normal distributions you can use the `.deb`, `.rpm`, or `.tgz`.

## Actually Doing the Scanning Part

So we have our negatives, we have our scanner, and we have our scanning software
stack. But now we must get some positives. That is, perform colour inversion. On
Windows and Mac OS, it's more likely that you'll have Lightroom, and therefore
you'll probably get pointed to [Negative Lab Pro][4]. The analogue community
recommend NLP for a reason - the results are _stunning_. I refuse to give any
money to Adobe (and I don't want to fiddle with WINE or cracked versions of
Photoshop) so NLP is out of the question. What you'd normally do from here is
scan DNGs and perform colour inversion in your editing software.

However, I'm comfortable in saying that VueScan's inversion is actually quite
good, so we can get good results off the scanner.

Here's what I do for each film stock:

1. In VueScan, set your media **B/W negative** or **Color negative** (depending
   on what stock you're scanning). Any settings in the **Color** tab are up to
   you; **Auto levels** is probably fine/ what you want.

2. Load a strip of negatives into the scanner. Offset the frames on purpose
   (or use an empty frame/section of leader) so when you scan, you get a strip
   of unexposed but developed film. We're going to use that to lock down the
   settings in VueScan. Grab a **Preview** of the current frame.

![](assets/img/linux-film-workflow/1.webp "Selecting an unexposed strip of film
in between two frames")

3. Crop your selection down to the unexposed part of the film. That might be
   as small as the black strip in between frames - but you only want unexposed
   negative in the crop box. This is why we offset the frames, as it's easier to
   get a decent chunk of unexposed negative by using the film in between exposed
   frames. Hit **Preview** again, then **Lock exposure**.

4. Hit **Preview** again. Then, select **Lock film base color**. These will be
   your settings for every scan on this roll of film from now on. Don't change
   them!

![](assets/img/linux-film-workflow/2.webp "Locking exposure and film base
colour")

5. Reseat your film strip in the holder so the frames aren't offset.

6. Preview a frame again, crop selection down to only select exposed negative
   (if you do select any unexposed frame edges you _can_ just crop them out when
   editing the scan), and then go for a full-res scan.

![](assets/img/linux-film-workflow/3.webp "Scanning a frame using these
settings")

7. Save out your full-res scan. I save TIFFs.

8. At this point, _save your profile_ in VueScan. Then you can load this profile
   up any time you're scanning the same film stock.

If you're a pedant (or a Reddit commenter, but what's the difference), you may
wish to perform this incantation for each roll of film you scan - I'm told by
some that not every roll of film is created equal, or something. I'm happy with
the results that I've yielded, though.

## Editing

Okay, we're back to being able to use open source again. At this point you can
take your scanned positives into whichever image editing software you prefer.
[darktable][5] or [RawTherapee][6] are probably what you'll find being touted
as the top options here, but trying to use the UI in darktable makes me want to
jump out of a window and I wasn't ever able to get a decent positive using the
negadoctor module. RawTherapee also has a UI that gives me nightmares but it's
at least somewhat nicer to use.

If you scanned negatives out to DNG, what you're _supposed_ to do is use one
of the negative workflow modules: [negadoctor][7] in darktable, or [Film
Negative][8] in Rawtherapee - but they're actually not very intuitive or even
good compared to my VueScan workflow. If you're in the same situation I'm in and
you're screaming at your screen because I'm doing it wrong and you find those
modules easy to get great results with, email me!

darktable has been forked by Aurélien Pierre, an ex-maintainer, into [Ansel][9],
ostensibly a better version of darktable. Pierre has written a scathing report
on the problems of darktable: [_crashing into the wall in slow-motion_][10],
which sounds about right for open source software dealing with graphics or
images (users of GIMP, you can nod along at home). [vkdt][11] may be the answer,
according to Pierre. Vulkan Darktable (not a Vulkan rewrite of darktable) has a
node-graph pipeline which you'll recognise if you use [Blender][12]. However,
it's very prototypical at the moment. Maybe in the future this will be the best
option for photography in the FLOSS world. Right now, I'm sticking with Ansel,
which is like darktable on crack. It's like Aurélien knows what he's doing, or
something.

It's worth noting that there's no 'true' colours of a film stock and it's all
very dependent on the scanner and the inversion's interpretation of the colour.
This is not just me attempting to cover up poor scans, film is 'just film' and
was really not intended for the scanning process - but as we want to digitise
instead of making prints in the darkroom, here we are. In my experience,
underexposure is much harder to correct for in post - you're just going to end
up with a lot of noise and harsh grain. So when in doubt, overexpose. ;)

## Closing Thoughts

I expected scanning to be a bit of a pain, and truthfully getting to a point
where I'm happy with my workflow has been stressful. If you're not a huge nerd
like me and you don't intend to be primarily an analogue photographer, it might
be worth just paying for scanning with your local lab. With the amount of film
that I shoot, getting a scanner and a VueScan licence was cheaper long-term
than paying for scanning on every roll.

Since I started writing this post, I've bought a medium format camera (a Zenza
Bronica ETRSi) and my scanner only holds 35mm film stock. Maybe it's time to
research 120 film scanners...

[1]: https://sane-devel.alioth.debian.narkive.com/iwO4b2L3/history-of-sane
[2]: https://www.hamrick.com/
[3]: https://aur.archlinux.org/packages/vuescan-bin
[4]: https://www.negativelabpro.com/
[5]: https://www.darktable.org/
[6]: http://www.rawtherapee.com/
[7]: https://docs.darktable.org/usermanual/4.0/en/module-reference/processing-modules/negadoctor/
[8]: https://rawpedia.rawtherapee.com/Film_Negative
[9]: https://ansel.photos/
[10]: https://ansel.photos/en/news/darktable-dans-le-mur-au-ralenti
[11]: https://github.com/hanatos/vkdt
[12]: https://blender.org/
