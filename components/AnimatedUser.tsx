"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import avatarIcon from "../public/lordicons/avatar.json";

export default function AnimatedUser() {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playFromBeginning();
    }
  }, []);

  const mouseOver = () => {
    if (playerRef.current && !playerRef.current.isPlaying) {
      playerRef.current.playFromBeginning();
    }
  };

  return (
    <div onMouseOver={mouseOver} className="cursor-pointer">
      <Player ref={playerRef} icon={avatarIcon} colorize="#fff" size={40} />
    </div>
  );
}
