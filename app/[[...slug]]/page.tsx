import { AudioPlayer } from "@/components/audio-player";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  fetchAudiusPlaylists,
  fetchAudiusPlaylistTracks,
  getAudiusHost,
} from "@/lib/audius";
import {
  getNextTrackRoute,
  getPreviousTrackRoute,
  parseGenre,
  parseIndex,
  parsePlaylistIndex,
} from "@/lib/utils";
import { PlaylistSummary, TrackSummary } from "@/types/audius";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const host = await getAudiusHost();

  const { slug } = params;
  const [genreSlug, playlistSlug, trackIndexSlug] = slug || [];

  const genre = parseGenre(genreSlug);

  const playlists: PlaylistSummary[] = await fetchAudiusPlaylists(genre);

  const playlistIndex: number = parsePlaylistIndex(
    decodeURIComponent(playlistSlug),
    playlists,
  );

  const tracks: TrackSummary[] = await fetchAudiusPlaylistTracks(
    playlists[playlistIndex].id,
  );

  const trackIndex: number = parseIndex(trackIndexSlug, tracks);

  const nextTrackRoute = getNextTrackRoute(
    genre,
    playlists,
    playlistIndex,
    tracks,
    trackIndex,
  );

  const previousTrackRoute = getPreviousTrackRoute(
    genre,
    playlists,
    playlistIndex,
    tracks,
    trackIndex,
  );

  return (
    <>
      <Header />
      <AudioPlayer
        host={host}
        genre={genre}
        playlist={playlists[playlistIndex]} // make this playlistIndex
        track={tracks[trackIndex]}
        nextTrackRoute={nextTrackRoute}
        previousTrackRoute={previousTrackRoute}
      />
      <Footer />
    </>
  );
}
