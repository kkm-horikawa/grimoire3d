# Contributing to grimoire3d

Thank you for your interest in contributing!

## Development Setup

### Prerequisites

- An up-to-date Node.js 22, 24, or 26 release
- npm

### Clone and Setup

```bash
git clone https://github.com/kkm-horikawa/grimoire3d.git
cd grimoire3d

npm ci
```

> **Note**: `npm ci` sets up Husky pre-commit hooks via the `prepare` script.

### Previewing and building the documentation

The public library and development demo are built by Grimoire3D directly from `docs/`. Edit the Markdown there and use the CLI to preview or build it.

```sh
npm run dev
```

`npm run dev` builds the package and starts the local Grimoire3D preview server for `docs/`. If `dist/` is already built, you can run `node cli/cli.js serve` directly.

Run `npm run docs:build` (or `node cli/cli.js build`) from the repository root to regenerate `dist-site/`. The root `grimoire.yml` reads `docs/` by default and writes the static site to `dist-site/` so it does not collide with the package build in `dist/`. The GitHub Pages site publishes the built files from the root of `gh-pages`. Add an empty `.nojekyll` file to the deployment copy when updating that branch.

### Running Tests

```bash
npm test -- --run
```

### Code Style

We use [Biome v2](https://biomejs.dev/) for linting and formatting:

```bash
# Lint
npm run lint

# Format
npm run format

# Check everything (lint + format)
npm run check

# Fix everything
npm run check:fix
```

## Coding Standards

### Overview

| Item | Standard |
|------|----------|
| Linter/Formatter | [Biome v2](https://biomejs.dev/) |
| Line length | 80 characters |
| Quotes | Double quotes `"` |
| Type hints | Required for public APIs |
| Docstrings | JSDoc style |
| TypeScript | 7 with strict mode |
| React | 19+ with functional components |

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `BookViewer`, `PageFlip` |
| Function | camelCase | `handlePageFlip`, `renderContent` |
| Variable | camelCase | `currentPage`, `totalPages` |
| Constant | UPPER_SNAKE_CASE | `MAX_PAGES`, `DEFAULT_THEME` |
| Type/Interface | PascalCase | `PageContent`, `ThemeConfig` |
| File (component) | PascalCase | `BookViewer.tsx` |
| File (utility) | camelCase | `parseMarkdown.ts` |

### Type Annotations

Required for:
- All function parameters and return types
- Public component props
- Exported functions

```typescript
interface PageProps {
  id: string;
  title: string;
  content: ReactNode;
}

function renderPage(props: PageProps): JSX.Element {
  // ...
}
```

### Comment Conventions

#### JSDoc Comments (Required for public APIs)

```typescript
/**
 * Flips the page to the specified index.
 *
 * @param pageIndex - The zero-based index of the target page
 * @returns Whether the flip was successful
 *
 * @example
 * ```ts
 * flipToPage(3); // Flips to page 4
 * ```
 */
function flipToPage(pageIndex: number): boolean {
  // ...
}
```

#### Inline Comments

- Use `//` for single-line comments
- Explain **"why"**, not "what"
- Keep comments up-to-date with code changes

```typescript
// Bad: Describes what (obvious from code)
// Increment the counter
counter++;

// Good: Explains why
// Reset to 0 when reaching max to create a loop
if (counter >= MAX_PAGES) counter = 0;
```

#### TODO/FIXME Comments

Link to issues when possible:

```typescript
// TODO(#12): Implement drag gesture support
// FIXME(#34): Safari has backface-visibility issue
```

### Import Order

Biome automatically organizes imports. Use `node:` prefix for Node.js built-ins:

```typescript
// 1. Node.js built-ins (with node: prefix)
import { resolve } from "node:path";

// 2. External packages
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// 3. Internal modules
import { BookViewer } from "./components/BookViewer";
import type { PageContent } from "./types";
```

### Testing Standards

#### Test Structure

```
tests/
├── setup.ts                  # Test setup
├── cli/
│   └── content.test.ts
├── components/
│   └── BookViewer.test.tsx
└── site/
    └── BookReader.test.tsx
```

#### Test Naming

```typescript
describe("BookViewer", () => {
  it("renders the cover page by default", () => {
    // ...
  });

  it("flips to next page when clicking right side", () => {
    // ...
  });

  it("does not flip past the last page", () => {
    // ...
  });
});
```

#### Running Tests

```bash
# Run all tests
npm test -- --run

# Run with coverage
npm test -- --run --coverage

# Run specific test file
npm test -- --run tests/components/BookViewer.test.tsx
```

## Project Structure

```
grimoire3d/
├── assets/
│   ├── book/                 # Blender book generator, materials, and GLB models
│   └── shelf-plate/          # Blender brass shelf plate source and render scripts
├── cli/                      # Grimoire3D CLI (serve / build)
├── docs/                     # Public documentation and local development demo
├── src/
│   ├── index.ts              # Main library exports
│   ├── components/           # Public React BookViewer component
│   ├── site/                 # Standalone 3D bookshelf, reader, and Library Hall app
│   ├── styles/
│   └── types/
├── tests/
├── grimoire.yml
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vite.site.config.ts
└── biome.json
```

## Branch Strategy

We use a modified Git Flow strategy:

### Branch Types

| Branch | Purpose | Base | Merge To |
|--------|---------|------|----------|
| `main` | Production releases | - | - |
| `develop` | Development integration | `main` | `main` |
| `feature/*` | New features | `develop` | `develop` |
| `fix/*` | Bug fixes | `develop` | `develop` |
| `hotfix/*` | Urgent production fixes | `main` | `main` + `develop` |
| `chore/*` | Maintenance, config | `develop` | `develop` |
| `docs/*` | Documentation updates | `develop` | `develop` |

### Branch Naming

```
feature/<issue-number>-<short-description>
fix/<issue-number>-<short-description>
hotfix/<issue-number>-<short-description>
chore/<short-description>
docs/<short-description>
```

Examples:
- `feature/1-book-viewer-component`
- `fix/12-page-flip-animation`
- `chore/update-dependencies`
- `docs/api-reference`

## Development Workflow

### For External Contributors (Fork-based)

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/grimoire3d.git
   cd grimoire3d
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/kkm-horikawa/grimoire3d.git
   ```
4. **Create a branch from develop**:
   ```bash
   git fetch upstream
   git checkout -b feature/<issue-number>-<description> upstream/develop
   ```
5. **Make changes, commit, and push to your fork**:
   ```bash
   git push origin feature/<issue-number>-<description>
   ```
6. **Create a Pull Request** from your fork to `upstream/develop`

### For Maintainers (Direct)

1. Check existing issues before starting work
2. Create a branch from `develop`
3. Make changes and test
4. Push and create PR to `develop`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add page flip animation"
git commit -m "fix: resolve Safari backface-visibility issue"
git commit -m "docs: update installation guide"
git commit -m "chore: update dependencies"
```

## Questions?

Open an [Issue](https://github.com/kkm-horikawa/grimoire3d/issues) for questions or discussions.
