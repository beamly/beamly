import { test, expect } from "@playwright/test";

test("audioPlayer", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/");

  await page.getByLabel("Track Title").click();

  expect(page.getByLabel("Track Title")).toHaveText(/.+/);

  expect(page.getByLabel("Track User")).toHaveText(/.+/);

  const audioSrc = await page.evaluate(() => {
    return window.audio?.src ?? "";
  });

  const urlRegex: RegExp =
    /(https?:\/\/www\.|http?:\/\/www\.|https?:\/\/|http?:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/;

  // Expect audioSrc string to by any valid URL (host is selected at random)
  expect(audioSrc).toMatch(urlRegex);

  console.log(audioSrc);

  // Click play button and test that audio starts playing
  const isPlayingPromise = page.evaluate(() => {
    return new Promise((resolve) => {
      window.audio?.addEventListener(
        "playing",
        () => {
          resolve(true);
        },
        { once: true },
      );
    });
  });

  await page.getByLabel("Play Track").click();

  const isPlaying = await isPlayingPromise;

  expect(isPlaying).toBe(true);

  // Click 'skip forward' button and test that a new track starts playing
  await page.getByLabel("Skip Forward").click();
  await page.waitForURL(/.*\/1\?autoplay=true$/);

  const newAudioSrc = await page.evaluate(() => {
    return window.audio?.src ?? "";
  });

  // Expect audioSrc string to by any valid URL (host is selected at random)
  expect(newAudioSrc).toMatch(urlRegex);

  expect(newAudioSrc).not.toBe(audioSrc);

  // Click pause button and test that audio stops playing
  const isPausedPromise = page.evaluate(() => {
    return new Promise((resolve) => {
      window.audio?.addEventListener(
        "pause",
        () => {
          resolve(true);
        },
        { once: true },
      );
    });
  });

  await page.getByLabel("Pause Track").click();

  const isPaused = await isPausedPromise;

  expect(isPaused).toBe(true);
});
