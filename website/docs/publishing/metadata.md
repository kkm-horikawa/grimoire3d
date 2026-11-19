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

Share the URL for a chapter or a specific heading, for example `/read/publishing/metadata/#chapter-metadata`. Existing links that start with `#/` also work.
