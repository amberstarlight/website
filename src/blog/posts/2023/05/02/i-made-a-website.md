---
title: I Made A Website
subtitle: (or "How I Learned To Love Static Site Generators")
date: 2023-05-02
---

So, I've finally made my own website. And I did it without serving you 50 megs
of JavaScript.

Snark aside, I'm not a 'web developer'. My job title (at the time of writing) is
"DevOps Engineer", and surely my colleagues who *do* have job titles like "Frontend
Developer" would probably hate my decision to forgo the modern web frameworks
and just write Markdown files rendered using some templating engine. But here
it is, and as you've probably guessed, it's built using a static site generator;
[11ty][1], (Eleventy).

Ok, but why?

The Internet is going through a bit of a *thing* right now; mostly because
[the world's most divorced man has recently purchased the world's worst website][2],
and whilst he goes about making it [the world's worst website that barely functions][3],
many of the terminally online have realised (in a sort of *Stallman Was Right*
kind of fashion) that having their entire Internet presence on centralised
platforms owned by [billionaires with horrible opinions][4] is probably not a
very good idea, actually. If you've been on the internet for as long as I have,
you probably remember how browsing the web has gone from visiting many hundreds
of small websites, often written by young people from their bedrooms - an
experimental and democratising period in the history of the web - to *today's*
web that consists of six websites, each consisting of screenshots of the other
five. All of which now prioritise *~shareholder value~* ahead of user experience,
making horrible decisions (often called '[enshittification][5]') that eventually
topple their reign (see: Twitter).

There's a real beauty in web browsing that has been lost. Things are a lot more
ephemeral than before; link rot is getting worse and will only continue to do so,
especially as centralised sites die. It's only due to efforts like that of Jason
Scott's Archive Team that much of GeoCities was able to be preserved. Today, I'd
wager that most people are just writing posts on social media instead of their
own sites (or using sites like GeoCities). The look-and-feel and identity that
the personal web had has been all but stripped bare; so sites like [cohost][9]
stand alone in the *Alternative Social Media* landscape as the most customisable
social media.

At the same time, I've been wanting to craft a nicer web presence. As a *Woman
In Tech*, having a place that I can direct people to in order to show them my
work (and evidence what I am capable of, *because patriarchy*) is important to
me. Alongside this, I've been following the [IndieWeb][6] project for a while
after a friend linked it in the `#development` channel of my friend group's
Discord server. So as I find myself at the intersection of these thought
processes; *I had to make a website*.

If you're like me, a bit of an 'everything hobbyist' - a term once used by
[Emma Essex][7] to (I assume) describe the kind of neurodivergence that means
anything that interests you becomes a hyperfixation/hobby - you'll want to dive
into making the perfect website. I wanted to make something flashy, slick, that
was powered by the newest and hottest in frontend. But I'd get so bogged down
in the tediums of writing 50+ React components, dealing with state management,
writing (and re-writing) endless reams of CSS that I'd grow bored, pick up
another hyperfixation, and forget about my perfect website.

This website, the one you're (hopefully) reading this article on, is probably
the fourth or fifth such attempt at making that 'perfect website'. If there's
one thing I've learned from my time in software engineering, it's that there's
no 'perfect' in software engineering. Only the 'good enough'. Remember that
phrase, "the perfect is the enemy of the good"? It applies here, too. Spending
all my time making the perfect website meant I'd actually just created several
half-finished git repositories and had no website at all.

As it turns out, what I actually needed for the perfect website was:

- the ability to write articles in Markdown, without having to write my own
parser
- something that would build out to static files so I could drop them on an S3
bucket (duh)
- something that didn't *need* the user to run JavaScript (or download a bundle
[larger than DOOM][10])

So I decided I'd use a static site generator. I don't particularly like Ruby,
don't know Go, and I'm not hosting documentation - which meant that 11ty seemed
like the perfect fit. And yes, I'm not making anything complex here - I could have
chosen any one of the millions of options - but 11ty was easy to set up. It's one
`devDependency` in my `package.json`, it's bloody fast, and extensible with
JavaScript (with which I'm comfortable). I wouldn't have been happy with one of
the more popular options anyway, because that's not my style.

So what's next then?

The plan for this site is fairly straightforward. It'll have a blog (so you can
read my ~~diatribe~~ musings), links to my photography, and a [Now page][8] so
that the curious can see what I'm up to. I'll be writing more about things that
interest me, curating my personal space on the web, and most importantly - *I'll
be in control*.

[1]: https://www.11ty.dev/
[2]: https://en.wikipedia.org/wiki/Acquisition_of_Twitter_by_Elon_Musk
[3]: https://web.archive.org/web/20230501213801/https://twitter.com/JUNlPER/status/1653144319446904832
[4]: https://www.pbs.org/newshour/economy/twitter-quietly-removes-policy-against-deadnaming-transgender-people
[5]: https://www.wired.com/story/tiktok-platforms-cory-doctorow/
[6]: https://indieweb.org/
[7]: https://heckscaper.com/
[8]: https://nownownow.com/about
[9]: https://cohost.org/rc/welcome
[10]: https://www.wired.com/2016/04/average-webpage-now-size-original-doom/
