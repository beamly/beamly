import { expect } from "@playwright/test";

import {
  formatStringForUrl,
  getNextIndex,
  getNextTrackRoute,
  getPreviousIndex,
  getPreviousTrackRoute,
  parseGenre,
  parseIndex,
  retry,
  toTitleCase,
  truncateString,
} from "@/lib/utils";
import { test } from "@/tests/unit/audius-fixture";

test("toTitleCase", () => {
  expect(toTitleCase("hello")).toBe("Hello");
  expect(toTitleCase("hello world")).toBe("Hello World");
});

test("retry", async ({}) => {
  let count = 0;
  const func = async () => {
    count++;
    if (count < 3) {
      throw new Error("Throwing error to test the `retry()` function.");
    }
    return "Success";
  };

  const result = await retry(func, 5);

  expect(result).toBe("Success");
  expect(count).toBe(3);
});

test("parseGenre", () => {
  expect(parseGenre("lo-fi")).toBe("lo-fi");
  expect(parseGenre("instrumental")).toBe("instrumental");
  expect(parseGenre("ambient")).toBe("ambient");
  expect(parseGenre("classical")).toBe("classical");
  expect(parseGenre("house")).toBe("house");
  // Test fallback to default genre (lo-fi)
  expect(parseGenre("invalid")).toBe("lo-fi");
});

test("parseIndex", () => {
  expect(parseIndex(0, [1, 2, 3])).toBe(0);
  expect(parseIndex(1, [1, 2, 3])).toBe(1);
  expect(parseIndex(2, [1, 2, 3])).toBe(2);
  // Test fallback to zeroth index
  expect(parseIndex(3, [1, 2, 3])).toBe(0);
});

test("truncateString", () => {
  expect(truncateString("hello", 3)).toBe("...");
  expect(truncateString("hello", 4)).toBe("h...");
  expect(truncateString("hello", 5)).toBe("hello");
  expect(truncateString("hello", 10)).toBe("hello");
  expect(truncateString("hello world", 5)).toBe("he...");
  expect(truncateString("hello world", 10)).toBe("hello...");
  expect(truncateString("hello world", 20)).toBe("hello world");
});

test("getNextIndex", () => {
  expect(getNextIndex([1, 2, 3], 0)).toBe(1);
  expect(getNextIndex([1, 2, 3], 1)).toBe(2);
  expect(getNextIndex([1, 2, 3], 2)).toBe(0);
});

test("getPreviousIndex", () => {
  expect(getPreviousIndex([1, 2, 3], 0)).toBe(0);
  expect(getPreviousIndex([1, 2, 3], 1)).toBe(0);
  expect(getPreviousIndex([1, 2, 3], 2)).toBe(1);
  expect(getPreviousIndex([1, 2, 3], 3)).toBe(2);
});

test("getNextTrackRoute", ({ playlists, tracks }) => {
  // Test going to the next track in the same playlist
  expect(getNextTrackRoute("lo-fi", playlists, 0, tracks, 0)).toBe(
    "/lo-fi/playlist-0/1",
  );
  expect(getNextTrackRoute("ambient", playlists, 1, tracks, 1)).toBe(
    "/ambient/playlist-1/2",
  );
  // Test going to the first track in the next playlist
  expect(getNextTrackRoute("classical", playlists, 2, tracks, 2)).toBe(
    "/classical/playlist-0/0",
  );
});

test("getPreviousTrackRoute", ({ playlists, tracks }) => {
  // Test going to the previous track in the same playlist
  expect(getPreviousTrackRoute("lo-fi", playlists, 0, tracks, 1)).toBe(
    "/lo-fi/playlist-0/0",
  );
  expect(getPreviousTrackRoute("ambient", playlists, 1, tracks, 2)).toBe(
    "/ambient/playlist-1/1",
  );
  expect(getPreviousTrackRoute("classical", playlists, 2, tracks, 2)).toBe(
    "/classical/playlist-2/1",
  );

  // The `getPreviousTrackRoute()` function does not currenlty support going to the last track in the previous playlist
  // Instead, it navigates to the first track in the previous playlist
  expect(getPreviousTrackRoute("lo-fi", playlists, 1, tracks, 0)).toBe(
    "/lo-fi/playlist-0/0",
  );
});

test("formatStringForUrl", () => {
  expect(formatStringForUrl("hello")).toBe("hello");
  expect(formatStringForUrl("hello world")).toBe("hello-world");
  expect(formatStringForUrl("hello-world")).toBe("hello-world");
  expect(formatStringForUrl("hello_world")).toBe("hello_world");
});
