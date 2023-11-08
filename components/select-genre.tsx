"use client";

import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { toTitleCase } from "@/lib/utils";
import { Genre } from "@/types/audius";

interface SelectGenreProps extends React.HTMLAttributes<HTMLDivElement> {
  genre: Genre;
}

export function SelectGenre({ genre, className, ...props }: SelectGenreProps) {
  const genres = ["lo-fi", "instrumental", "ambient", "classical", "house"];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Select Genre">
            {toTitleCase(genre)}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[160px] lg:w-[200px] ">
              {genres.map((item) => (
                <li key={item}>
                  <Link href={`/${item}`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {toTitleCase(item)}
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
