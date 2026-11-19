# Site settings and SEO

Place `grimoire.yml` next to `docs/`.

```yaml
title: Engineering Handbook
description: Setup, operations, and release notes for the project.
siteUrl: https://docs.example.com/
author: Documentation Team
socialImage: assets/share.avif
locale: en
magicMode: true
footer:
  label: Engineering Team
  url: https://example.com/engineering/
```

## Library footer

Set `footer.label` to show a publisher, team, or project name at the end of the bookshelf and index. Set `footer.url` to link that name to an absolute HTTP(S) address. Omit the URL for a plain label. The footer also links to the Grimoire3D repository.

## Titles and social cards

The build produces standalone HTML for every chapter, including the text, navigation, page title, description, and Open Graph metadata. Visitors and crawlers can read the articles without JavaScript.

Set `siteUrl` to get canonical URLs and a sitemap. Set `socialImage` to an absolute HTTP(S) URL or an image path relative to `docs/`. At the domain root the build also emits `robots.txt` pointing to the sitemap.

## Google Tag Manager and additional head tags

To include the same tags on the library and each book and chapter page, add this setting to `grimoire.yml`.

```yaml
headFile: head.html
```

Create `head.html` next to `grimoire.yml`.

```html
<!-- Paste the head snippet from your Google Tag Manager installation dialog here. -->

<!-- To verify site ownership, replace your-token and uncomment the next line. -->
<!-- <meta name="google-site-verification" content="your-token"> -->
```

Follow [Google's web container setup](https://support.google.com/tagmanager/answer/14847097?hl=en) to get the snippet for your site. The file contains individual `script`, `meta`, `link`, or `style` tags. Scripts in it run on the published site with the same privileges as the rest of the page, so use snippets from sources you trust.

Run `npx grimoire3d build` to insert the fragment. To test the tags before publishing, serve the built output and open a library or chapter URL. The live `serve` preview skips the fragment so ordinary editing does not send analytics traffic.

The build reports and rejects tags Grimoire3D manages, such as `<title>`, the canonical link, and its description and Open Graph fields. Use the site and chapter settings for those values. Without a `headFile` setting, the site uses its built-in head.

## Chapter metadata

Supply `title`, `description`, or `socialImage` in a chapter's YAML front matter. A chapter-level image path is relative to that chapter.

```markdown
---
title: Deployment guide
description: Publish the project to a static web host.
socialImage: ./assets/deploy.avif
---
# Deployment
```

### Keep a chapter out of search results

Set `noindex: true` in the chapter's front matter.

```markdown
---
noindex: true
---
# Review notes
```

The generated chapter remains readable by URL, and its HTML tells search engines to leave the page out of search results. Its URL is also left out of the sitemap. If this is the book's first chapter, URLs that open directly to that chapter get the same directive. A site with only opted-out URLs skips sitemap generation.

Share the URL for a chapter or a specific heading, for example `/read/publishing/metadata/#chapter-metadata`. Existing links that start with `#/` also work.
