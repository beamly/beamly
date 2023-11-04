import { test as base } from "@playwright/test";

import { PlaylistSummary, TrackSummary, User } from "@/types/audius";

// Define a Playwright test fixture that sets up mock Audius user, playlists, and tracks
export const test = base.extend<{
  user: User;
  playlists: PlaylistSummary[];
  tracks: TrackSummary[];
}>({
  user: async ({}, use) => {
    const user = {
      album_count: 0,
      artist_pick_track_id: "D7KyD",
      bio: "Makin' moves & keeping you on your toes.\nlinktr.ee/browniesandlemonade",
      cover_photo: {
        "640x":
          "https://audius.prod.capturealpha.io/content/QmcVZH5C2ygxoVS4ihPBJrkFrS1Ua6YJB5srNtXafPzihZ/640x.jpg",
        "2000x":
          "https://audius.prod.capturealpha.io/content/QmcVZH5C2ygxoVS4ihPBJrkFrS1Ua6YJB5srNtXafPzihZ/2000x.jpg",
      },
      followee_count: 26,
      follower_count: 34503,
      does_follow_current_user: false,
      handle: "TeamBandL",
      id: "nlGNe",
      is_verified: true,
      location: "Los Angeles, CA",
      name: "Brownies & Lemonade",
      playlist_count: 2,
      profile_picture: {
        "150x150":
          "https://audius.prod.capturealpha.io/content/QmU9L4beAM96MpiNqqVTZdiDiCRTeBku1AJCh3NXrE5PxV/150x150.jpg",
        "480x480":
          "https://audius.prod.capturealpha.io/content/QmU9L4beAM96MpiNqqVTZdiDiCRTeBku1AJCh3NXrE5PxV/480x480.jpg",
        "1000x1000":
          "https://audius.prod.capturealpha.io/content/QmU9L4beAM96MpiNqqVTZdiDiCRTeBku1AJCh3NXrE5PxV/1000x1000.jpg",
      },
      repost_count: 5,
      track_count: 10,
      is_deactivated: false,
      is_available: true,
      erc_wallet: "0x8bc337e467cec1e7b05e54c7d1f90814a78d259e",
      spl_wallet: "WXBYqzejMr5qxmuDrvVTDQopr7vdZt5szsoSSb3EvQH",
      supporter_count: 9,
      supporting_count: 0,
      total_audio_balance: 3123,
    };
    await use(user);
  },
  playlists: async ({}, use) => {
    const playlists = [
      {
        id: "0",
        playlist_name: "Playlist 0",
        playlist_name_formatted: "playlist-0",
      },
      {
        id: "1",
        playlist_name: "Playlist 1",
        playlist_name_formatted: "playlist-1",
      },
      {
        id: "2",
        playlist_name: "Playlist 2",
        playlist_name_formatted: "playlist-2",
      },
    ];
    await use(playlists);
  },
  tracks: async ({ user }, use) => {
    const tracks = [
      {
        id: "1",
        title: "Track 1",
        user: user,
      },
      {
        id: "2",
        title: "Track 2",
        user: user,
      },
      {
        id: "3",
        title: "Track 3",
        user: user,
      },
    ];
    await use(tracks);
  },
});
