/** @param {string} value */
export function videoEmbed(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port)
    return undefined;

  const [, first, second, extra] = url.pathname.replace(/\/$/, "").split("/");
  let id;
  switch (url.hostname) {
    case "youtu.be":
      if (!second) id = first;
      break;
    case "youtube.com":
    case "www.youtube.com":
    case "m.youtube.com":
    case "www.youtube-nocookie.com":
      if (first === "watch" && !second) id = url.searchParams.get("v");
      if (
        (first === "embed" || first === "shorts" || first === "live") &&
        !extra
      )
        id = second;
      break;
    case "vimeo.com":
    case "www.vimeo.com":
    case "player.vimeo.com": {
      if (extra) return undefined;
      const player = url.hostname === "player.vimeo.com";
      const video =
        player && first === "video" ? second : player ? undefined : first;
      if (!video || !/^\d+$/.test(video)) return undefined;
      const source = new URL(`https://player.vimeo.com/video/${video}`);
      const access = player ? url.searchParams.get("h") : second;
      if (access && /^[a-z\d]+$/i.test(access))
        source.searchParams.set("h", access);
      return { source: source.href, provider: "Vimeo" };
    }
  }
  if (!id || !/^[\w-]{11}$/.test(id)) return undefined;
  const source = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  source.searchParams.set("playsinline", "1");
  const start = url.searchParams.get("start") ?? url.searchParams.get("t");
  if (start && /^\d{1,6}s?$/.test(start))
    source.searchParams.set("start", start.replace(/s$/, ""));
  return { source: source.href, provider: "YouTube" };
}
