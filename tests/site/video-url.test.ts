import { expect, it } from "vitest";
import { videoEmbed } from "../../cli/video-url.js";

it("recognizes supported HTTPS video URLs and leaves ordinary URLs alone", () => {
  expect(videoEmbed("https://youtu.be/M7lc1UVf-VE?t=24s")).toEqual({
    provider: "YouTube",
    source:
      "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?playsinline=1&start=24",
  });
  expect(videoEmbed("https://vimeo.com/76979871/cafe")).toEqual({
    provider: "Vimeo",
    source: "https://player.vimeo.com/video/76979871?h=cafe",
  });
  expect(
    videoEmbed("https://youtube.com.example.org/watch?v=M7lc1UVf-VE")
  ).toBeUndefined();
  expect(videoEmbed("http://youtu.be/M7lc1UVf-VE")).toBeUndefined();
  expect(
    videoEmbed("https://malicious.example@youtube.com/watch?v=M7lc1UVf-VE")
  ).toBeUndefined();
});
