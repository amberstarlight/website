# website

My website, using static site generator [11ty](https://www.11ty.dev/).

For licensing, please see [`COPYING.md`](COPYING.md)

## Development

This repository contains a [Makefile](./Makefile) to simplify builds and
development for the website. Run `make serve` to start the website in
development mode.

Generating opengraph images uses `node-canvas`, which may need to be compiled
for your machine. See their [compiling][canvas] instructions for detail.

[canvas]: https://github.com/Automattic/node-canvas?tab=readme-ov-file#compiling
