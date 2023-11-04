"use client";

import { useRouter } from "next/navigation";
import React from "react";

declare global {
  interface Window {
    audio: HTMLAudioElement | null;
  }
}

export type UseAudioReturnType = {
  audio: React.MutableRefObject<HTMLAudioElement | null>;
  userClickedPlay: boolean;
  isWaiting: boolean;
  sliderValue: number;
  play: () => void;
  pause: () => void;
  resetTrackProgress: () => void;
  skipToPoint: (position: number) => void;
};

export const useAudio = (
  trackId: string,
  autoplay: boolean,
  host: string,
  nextTrackRoute: string,
): UseAudioReturnType => {
  const router = useRouter();

  const audio = React.useRef<HTMLAudioElement>(
    typeof Audio !== "undefined" ? new Audio() : null,
  );

  if (typeof window !== "undefined") {
    // Connect to window so Playwright can interact with it
    window.audio = audio.current;
  }

  const [userClickedPlay, setUserClickedPlay] =
    React.useState<boolean>(autoplay);

  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [sliderValue, setSliderValue] = React.useState<number>(0);

  const animationFrame = React.useRef<number>(0);

  const animate = React.useCallback(() => {
    if (audio.current) {
      const { currentTime, duration } = audio.current;
      const position = (currentTime / duration) * 100;
      setSliderValue(position);
    }
    animationFrame.current = requestAnimationFrame(animate);
  }, []);

  const play = React.useCallback(() => {
    setUserClickedPlay(true);
    if (audio.current) {
      const playPromise = audio.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
            animationFrame.current = requestAnimationFrame(animate);
            router.prefetch(`${nextTrackRoute}?autoplay=true`);
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
            setUserClickedPlay(false);
          });
      }
    }
  }, [animate]);

  const pause = React.useCallback(() => {
    setUserClickedPlay(false);
    if (audio.current) {
      audio.current.pause();
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    }
  }, []);

  const resetTrackProgress = React.useCallback(() => {
    if (audio.current) {
      audio.current.currentTime = 0;
      setSliderValue(0);
    }
  }, []);

  const skipToPoint = React.useCallback((position: number) => {
    setSliderValue(position);
    if (audio.current && audio.current.duration && audio.current.currentTime) {
      const { duration } = audio.current;
      audio.current.currentTime = (position / 100) * duration;
    }
  }, []);

  const handleWaitingListener = React.useCallback((e: Event) => {
    setIsWaiting(true);
  }, []);

  const handleCanPlayListener = React.useCallback((e: Event) => {
    setIsWaiting(false);
  }, []);

  const handleEndedListener = React.useCallback((e: Event) => {
    router.push(`${nextTrackRoute}?autoplay=true`);
  }, []);

  React.useEffect(() => {
    if (audio.current && trackId) {
      audio.current.src = `${host}/v1/tracks/${trackId}/stream`;

      // Add listeners
      audio.current.addEventListener("waiting", handleWaitingListener);
      audio.current.addEventListener("canplay", handleCanPlayListener);
      audio.current.addEventListener("ended", handleEndedListener);

      autoplay && play();
    }
  }, [trackId]);

  React.useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      if (audio.current) {
        pause();
        resetTrackProgress();
        audio.current.src = "";
        audio.current.remove();

        // Remove listeners
        audio.current.removeEventListener("waiting", handleWaitingListener);
        audio.current.removeEventListener("canplay", handleCanPlayListener);
        audio.current.removeEventListener("ended", handleEndedListener);
      }
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return {
    audio,
    userClickedPlay,
    isWaiting,
    sliderValue,
    play,
    pause,
    resetTrackProgress,
    skipToPoint,
  };
};
