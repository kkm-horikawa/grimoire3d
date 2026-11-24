#!/usr/bin/env node

import { createReadStream, watch } from "node:fs";
import {
  copyFile,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import {
  basename,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { contentType, lookup } from "mime-types";
import { readLibrary, readSettings } from "./content.js";
import { readLibraryHall, writeHallPages } from "./hall.js";
import { readHeadFile } from "./head-file.js";
import { previewHead, writeStaticPages } from "./static-pages.js";

const template = fileURLToPath(new URL("../dist/site/", import.meta.url));
const marker = ".grimoire3d-output.json";

function json(value) {
  return JSON.stringify(value);
}

async function listFiles(root, directory = "") {
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...(await listFiles(root, path)));
    else results.push(path.split(sep).join("/"));
  }
  return results.sort();
}

async function existingOutput(output, locale) {
  const info = await lstat(output).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return undefined;
  });
  if (!info) return false;
  const files = info.isDirectory() ? await listFiles(output) : ["unknown"];
  if (!files.length) return true;
  const previous = await readFile(join(output, marker), "utf8")
    .then(JSON.parse, () => undefined)
    .catch(() => undefined);
  if (
    Array.isArray(previous) &&
    files
      .filter((name) => name !== marker)
      .every((file) => previous.includes(file))
  )
    return true;
  throw new Error(
    locale === "ja"
      ? `${output} には既存のファイルがあります。--out-dir で空の出力先を指定してください。`
      : `${output} contains existing files. Use --out-dir to select an empty directory.`
  );
}

function serializedLibrary(library) {
  return new Map([
    ["library.json", json(library.manifest)],
    ...library.books.map((book) => [`books/${book.id}.json`, json(book)]),
    ["search/library.json", json(library.searchBooks)],
    ...library.searchBooks.map((book) => [
      `search/books/${book.id}.json`,
      json([book]),
    ]),
  ]);
}

async function populateLibrary(destination, library, headMarkup) {
  await cp(template, destination, { recursive: true });
  for (const [name, content] of serializedLibrary(library)) {
    const path = join(destination, name);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }
  for (const [name, source] of library.assets) {
    const path = join(destination, "content", name);
    await mkdir(dirname(path), { recursive: true });
    await copyFile(source, path);
  }
  await writeStaticPages(template, destination, library, headMarkup);
}

async function replaceOutput(cwd, outDir, locale, populate) {
  const output = resolve(cwd, outDir);
  const exists = await existingOutput(output, locale);
  const parent = dirname(output);
  await mkdir(parent, { recursive: true });
  const temporary = await mkdtemp(join(parent, ".grimoire3d-"));
  const staging = join(temporary, "site");
  const backup = join(temporary, "previous");
  let preserveBackup = false;
  try {
    await populate(staging);
    await writeFile(join(staging, marker), json(await listFiles(staging)));
    if (exists) await rename(output, backup);
    try {
      await rename(staging, output);
    } catch (error) {
      if (exists) {
        preserveBackup = true;
        await rename(backup, output);
        preserveBackup = false;
      }
      throw error;
    }
  } finally {
    if (!preserveBackup) await rm(temporary, { recursive: true, force: true });
  }
  return output;
}

async function writeStaticSite(cwd, outDir, library, headMarkup) {
  return replaceOutput(cwd, outDir, library.manifest.locale, (staging) =>
    populateLibrary(staging, library, headMarkup)
  );
}

async function writeStaticHall(cwd, outDir, hall, headMarkup) {
  return replaceOutput(cwd, outDir, hall.manifest.locale, async (staging) => {
    await cp(template, staging, { recursive: true });
    await writeHallPages(template, staging, hall.manifest, headMarkup);
    for (const [id, child] of hall.children) {
      await populateLibrary(join(staging, id), child, headMarkup);
    }
  });
}

function showIssues(library) {
  if (!library.issues.length) return;
  const label =
    library.manifest.locale === "ja"
      ? "参照先が見つかりません"
      : "Unresolved reference";
  for (const issue of library.issues) console.error(`${label}: ${issue}`);
}

function snapshot(library) {
  return {
    files: serializedLibrary(library),
    manifest: library.manifest,
    assets: library.assets,
    error: null,
  };
}

function serve(cwd, port, initial, docsDir) {
  let current = snapshot(initial);
  let watchedDirectory = initial.docsDirectory;
  let docsWatcher = watch(watchedDirectory, { recursive: true }, schedule);
  let timer;
  let changes = 0;
  const clients = new Set();
  const notify = () => {
    for (const client of clients) client.write("event: update\ndata: {}\n\n");
  };
  async function refresh() {
    const revision = ++changes;
    try {
      const library = await readLibrary(cwd, await readSettings(cwd), docsDir);
      if (revision !== changes) return;
      if (library.docsDirectory !== watchedDirectory) {
        const nextWatcher = watch(
          library.docsDirectory,
          { recursive: true },
          schedule
        );
        docsWatcher.close();
        docsWatcher = nextWatcher;
        watchedDirectory = library.docsDirectory;
      }
      current = snapshot(library);
      showIssues(library);
    } catch (error) {
      if (revision !== changes) return;
      current = { ...current, error: error.message };
      console.error(error.message);
    }
    notify();
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => void refresh(), 140);
  }
  const settingsWatcher = watch(cwd, (_event, name) => {
    if (name === "grimoire.yml") schedule();
  });

  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      const name = decodeURIComponent(url.pathname.slice(1)) || "index.html";
      if (name === "__grimoire_events") {
        response.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
        });
        response.write(": connected\n\n");
        clients.add(response);
        response.on("close", () => clients.delete(response));
        return;
      }
      if (current.error && name === "library.json") {
        response
          .writeHead(422, { "Content-Type": "application/json" })
          .end(json({ error: current.error }));
        return;
      }
      const content = current.files.get(name);
      if (content !== undefined) {
        response
          .writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          })
          .end(content);
        return;
      }
      const requested = resolve(template, name);
      if (
        name.startsWith("content/") &&
        !current.assets.has(name.slice("content/".length))
      ) {
        response.writeHead(404).end();
        return;
      }
      const asset = current.assets.get(name.slice("content/".length));
      const diff = relative(template, requested);
      if (diff === ".." || diff.startsWith(`..${sep}`) || isAbsolute(diff)) {
        response.writeHead(404).end();
        return;
      }
      const path = name.startsWith("content/") ? asset : requested;
      const file = await stat(path);
      if (!file.isFile()) {
        response.writeHead(404).end();
        return;
      }
      const mediaType = contentType(lookup(path) || "application/octet-stream");
      if (name === "index.html") {
        const html = await readFile(path, "utf8");
        response.writeHead(200, {
          "Content-Type": mediaType,
          "Cache-Control": "no-store",
        });
        response.end(
          html
            .replace(
              '<html lang="en">',
              `<html lang="${current.manifest.locale}">`
            )
            .replace("</head>", () => `${previewHead(current.manifest)}</head>`)
        );
        return;
      }
      const headers = {
        "Content-Type": mediaType,
        "Cache-Control": "no-cache",
        "Content-Length": file.size,
      };
      let status = 200;
      let slice;
      if (typeof mediaType === "string" && mediaType.startsWith("video/")) {
        headers["Accept-Ranges"] = "bytes";
        const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range ?? "");
        if (range) {
          const [, from, to] = range;
          const start = from
            ? Number(from)
            : Math.max(0, file.size - Number(to));
          const end =
            from && to ? Math.min(Number(to), file.size - 1) : file.size - 1;
          if (!Number.isSafeInteger(start) || start > end) {
            response
              .writeHead(416, {
                "Accept-Ranges": "bytes",
                "Content-Range": `bytes */${file.size}`,
              })
              .end();
            return;
          }
          status = 206;
          slice = { start, end };
          headers["Content-Length"] = end - start + 1;
          headers["Content-Range"] = `bytes ${start}-${end}/${file.size}`;
        }
      }
      response.writeHead(status, headers);
      if (request.method === "HEAD") response.end();
      else
        createReadStream(path, slice)
          .on("error", () => response.destroy())
          .pipe(response);
    } catch (error) {
      if (response.headersSent) response.destroy();
      else response.writeHead(error.code === "ENOENT" ? 404 : 400).end();
    }
  });
  const stopWatchers = () => {
    clearTimeout(timer);
    docsWatcher.close();
    settingsWatcher.close();
  };
  server.on("error", (error) => {
    stopWatchers();
    console.error(error.message);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    const label = initial.manifest.locale === "ja" ? "プレビュー" : "Preview";
    console.log(`${label}: http://127.0.0.1:${server.address().port}/`);
  });
}

function hallSnapshot(hall) {
  return {
    manifest: hall.manifest,
    children: new Map(
      [...hall.children].map(([id, child]) => [id, snapshot(child)])
    ),
    watchedDirectories: [...hall.children.values()].map(
      (child) => child.docsDirectory
    ),
    error: null,
  };
}

async function respondTemplateFile(
  request,
  response,
  name,
  current,
  extraHead = ""
) {
  const requested = resolve(template, name);
  if (
    name.startsWith("content/") &&
    !current.assets.has(name.slice("content/".length))
  ) {
    response.writeHead(404).end();
    return;
  }
  const asset = current.assets.get(name.slice("content/".length));
  const diff = relative(template, requested);
  if (diff === ".." || diff.startsWith(`..${sep}`) || isAbsolute(diff)) {
    response.writeHead(404).end();
    return;
  }
  const path = name.startsWith("content/") ? asset : requested;
  const file = await stat(path);
  if (!file.isFile()) {
    response.writeHead(404).end();
    return;
  }
  const mediaType = contentType(lookup(path) || "application/octet-stream");
  if (name === "index.html") {
    const html = await readFile(path, "utf8");
    response.writeHead(200, {
      "Content-Type": mediaType,
      "Cache-Control": "no-store",
    });
    response.end(
      html
        .replace('<html lang="en">', `<html lang="${current.manifest.locale}">`)
        .replace(
          "</head>",
          () => `${extraHead}${previewHead(current.manifest)}</head>`
        )
    );
    return;
  }
  const headers = {
    "Content-Type": mediaType,
    "Cache-Control": "no-cache",
    "Content-Length": file.size,
  };
  let status = 200;
  let slice;
  if (typeof mediaType === "string" && mediaType.startsWith("video/")) {
    headers["Accept-Ranges"] = "bytes";
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range ?? "");
    if (range) {
      const [, from, to] = range;
      const start = from ? Number(from) : Math.max(0, file.size - Number(to));
      const end =
        from && to ? Math.min(Number(to), file.size - 1) : file.size - 1;
      if (!Number.isSafeInteger(start) || start > end) {
        response
          .writeHead(416, {
            "Accept-Ranges": "bytes",
            "Content-Range": `bytes */${file.size}`,
          })
          .end();
        return;
      }
      status = 206;
      slice = { start, end };
      headers["Content-Length"] = end - start + 1;
      headers["Content-Range"] = `bytes ${start}-${end}/${file.size}`;
    }
  }
  response.writeHead(status, headers);
  if (request.method === "HEAD") response.end();
  else
    createReadStream(path, slice)
      .on("error", () => response.destroy())
      .pipe(response);
}

function serveHall(cwd, port, initial) {
  let current = hallSnapshot(initial);
  let watchers = [];
  let timer;
  let changes = 0;
  const clients = new Set();
  const notify = () => {
    for (const client of clients) client.write("event: update\ndata: {}\n\n");
  };
  function syncWatchers(directories) {
    for (const watcher of watchers) watcher.close();
    watchers = [...new Set(directories)].map((dir) =>
      watch(dir, { recursive: true }, schedule)
    );
  }
  async function refresh() {
    const revision = ++changes;
    try {
      const settings = await readSettings(cwd);
      const hall = await readLibraryHall(cwd, settings, readLibrary);
      if (revision !== changes) return;
      current = hallSnapshot(hall);
      syncWatchers(current.watchedDirectories);
      showIssues(hall);
    } catch (error) {
      if (revision !== changes) return;
      current = { ...current, error: error.message };
      console.error(error.message);
    }
    notify();
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => void refresh(), 140);
  }
  syncWatchers(current.watchedDirectories);
  const settingsWatcher = watch(cwd, (_event, name) => {
    if (name === "grimoire.yml") schedule();
  });

  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      const rawPath = decodeURIComponent(url.pathname.slice(1));
      if (
        rawPath === "__grimoire_events" ||
        rawPath.endsWith("/__grimoire_events")
      ) {
        response.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
        });
        response.write(": connected\n\n");
        clients.add(response);
        response.on("close", () => clients.delete(response));
        return;
      }
      if (rawPath && !rawPath.includes("/") && current.children.has(rawPath)) {
        response.writeHead(302, {
          Location: `/${encodeURIComponent(rawPath)}/`,
        });
        response.end();
        return;
      }
      const slash = rawPath.indexOf("/");
      const maybeShelf = slash >= 0 ? rawPath.slice(0, slash) : "";
      if (maybeShelf && current.children.has(maybeShelf)) {
        const child = current.children.get(maybeShelf);
        const childName = rawPath.slice(slash + 1) || "index.html";
        const content = child.files.get(childName);
        if (content !== undefined) {
          response
            .writeHead(200, {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            })
            .end(content);
          return;
        }
        await respondTemplateFile(request, response, childName, child);
        return;
      }
      const name = rawPath || "index.html";
      if (name === "shelves.json") {
        if (current.error) {
          response
            .writeHead(422, { "Content-Type": "application/json" })
            .end(json({ error: current.error }));
          return;
        }
        response
          .writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          })
          .end(json(current.manifest));
        return;
      }
      await respondTemplateFile(
        request,
        response,
        name,
        { manifest: current.manifest, assets: new Map() },
        '<meta name="grimoire-hall" content="true">\n'
      );
    } catch (error) {
      if (response.headersSent) response.destroy();
      else response.writeHead(error.code === "ENOENT" ? 404 : 400).end();
    }
  });
  const stopWatchers = () => {
    clearTimeout(timer);
    for (const watcher of watchers) watcher.close();
    settingsWatcher.close();
  };
  server.on("error", (error) => {
    stopWatchers();
    console.error(error.message);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    const label = initial.manifest.locale === "ja" ? "プレビュー" : "Preview";
    console.log(`${label}: http://127.0.0.1:${server.address().port}/`);
  });
}

async function main() {
  const {
    positionals: [command],
    values,
  } = parseArgs({
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      port: { type: "string" },
      "docs-dir": { type: "string" },
      "out-dir": { type: "string" },
    },
  });
  if (!command || values.help) {
    console.log(
      "grimoire3d serve [--docs-dir docs] [--port 3000]\ngrimoire3d build [--docs-dir docs] [--out-dir dist]"
    );
    return;
  }
  if (!["serve", "build"].includes(command))
    throw new Error(`Unknown command: ${command}. See --help.`);
  const cwd = process.cwd();
  const settings = await readSettings(cwd);
  const docsDir = values["docs-dir"];
  const isHall = settings.shelves !== undefined && !docsDir;
  if (command === "build") {
    const headMarkup = await readHeadFile(cwd, settings.headFile);
    const outDir = values["out-dir"] ?? settings.outDir ?? "dist";
    let output;
    if (isHall) {
      const hall = await readLibraryHall(cwd, settings, readLibrary);
      showIssues(hall);
      output = await writeStaticHall(cwd, outDir, hall, headMarkup);
    } else {
      const library = await readLibrary(cwd, settings, docsDir);
      showIssues(library);
      output = await writeStaticSite(cwd, outDir, library, headMarkup);
    }
    const label = settings.locale === "ja" ? "書き出し先" : "Built to";
    console.log(`${label}: ${basename(output)}/ (${output})`);
    return;
  }
  const port = Number(values.port ?? 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(
      settings.locale === "ja"
        ? "--port は 0 から 65535 の整数にしてください。"
        : "--port must be an integer from 0 to 65535."
    );
  }
  if (isHall) {
    const hall = await readLibraryHall(cwd, settings, readLibrary);
    showIssues(hall);
    serveHall(cwd, port, hall);
    return;
  }
  const library = await readLibrary(cwd, settings, docsDir);
  showIssues(library);
  serve(cwd, port, library, docsDir);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
