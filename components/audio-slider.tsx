import React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider>;

interface AudioSliderProps extends SliderProps {
  sliderValue: number;
  skipToPoint: (position: number) => void;
}
export function AudioSlider({
  className,
  sliderValue,
  skipToPoint,
}: AudioSliderProps) {
  return (
    <Slider
      value={[sliderValue]}
      onValueChange={(value) => {
        value.length && skipToPoint(value[0]);
      }}
      min={0}
      max={100}
      //step={1}
      className={cn("w-[100%]", className)}
    />
  );
}
