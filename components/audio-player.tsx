"use client";

import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import {
  NextTrackButton,
  PauseButton,
  PlayButton,
  PreviousTrackButton,
} from "@/components/buttons/audio-buttons";
import { SelectGenre } from "@/components/select-genre";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAudio } from "@/hooks/use-audio";
import { truncateString } from "@/lib/utils";
import { Genre, PlaylistSummary, TrackSummary } from "@/types/audius";

import { AudioSlider } from "./audio-slider";

export interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  host: string;
  genre: Genre;
  playlist: PlaylistSummary;
  track: TrackSummary;
  nextTrackRoute: string;
  previousTrackRoute: string;
}

export function AudioPlayer({
  host,
  genre,
  playlist,
  track,
  nextTrackRoute,
  previousTrackRoute,
  className,
  ...props
}: AudioPlayerProps) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  const autoplay = searchParams.get("autoplay") === "true";

  const audio = useAudio(track.id, autoplay, host, nextTrackRoute);

  return (
    <>
      <div className="items-start justify-center gap-6 rounded-lg p-2 sm:p-16 sm:grid">
        <Card className="w-full sm:w-[400px]">
          <CardHeader>
            <SelectGenre genre={genre} />
          </CardHeader>
          <CardContent>
            <Card className="bg-accent text-accent-foreground">
              <CardContent className="pt-8">
                <h2
                  id="track-title"
                  className="text-md font-medium text-gray-900 dark:text-gray-100"
                  aria-label="Track Title"
                >
                  {truncateString(track.title, 30)}
                </h2>
                <p
                  id="track-user"
                  className="text-sm text-gray-500 dark:text-gray-400"
                  aria-label="Track User"
                >
                  {truncateString(track.user.name, 30)}
                </p>
                <div
                  className="h-2"
                  style={{
                    opacity: audio.isWaiting ? 1 : 0,
                    transition: "0.5s ease-in-out",
                  }}
                >
                  {
                    <PulseLoader
                      color={theme === "dark" ? "#fff" : "#000"}
                      size={5}
                      loading={audio.isWaiting}
                      speedMultiplier={0.5}
                    />
                  }
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-4 p-4 mt-6">
              <div className="flex items-center justify-between">
                <PreviousTrackButton
                  path={`${previousTrackRoute}?autoplay=${audio.userClickedPlay}`}
                  onClick={() => {
                    audio.resetTrackProgress();
                  }}
                />
                {audio.userClickedPlay ? (
                  <PauseButton
                    onClick={() => {
                      audio.pause();
                    }}
                  />
                ) : (
                  <PlayButton
                    onClick={async () => {
                      audio.play();
                    }}
                  />
                )}
                <NextTrackButton
                  path={`${nextTrackRoute}?autoplay=${audio.userClickedPlay}`}
                />
              </div>
              <AudioSlider
                className="p-2"
                skipToPoint={audio.skipToPoint}
                sliderValue={audio.sliderValue}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
