---
cover: blue
description: Build a static site from Markdown and publish it to a static web host.
---
# Publishing

## Build a static site

Run this from the directory containing `docs/`.

```sh
npx grimoire3d build
```

The output is `dist/` by default. To choose a different output directory, use `--out-dir site` or set `outDir: site` in `grimoire.yml`. The CLI protects existing files in an unrelated output directory.

## Upload the output

Publish the contents of the output directory with a static host such as Cloudflare Pages or GitHub Pages. This documentation uses GitHub Pages. Upload the complete output so chapter URLs, styles, images, and video work together. Chapter URLs have their own HTML files, so direct links work on a host that serves directory indexes.

For a site under a subpath, such as a GitHub Pages project at `https://example.github.io/handbook/`, include that path in `siteUrl` before you build.

[Configure your site metadata](./metadata.md) before you publish.
