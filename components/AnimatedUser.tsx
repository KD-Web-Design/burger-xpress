"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

export default function AnimatedUser() {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return <Player ref={playerRef} icon={ICON} />;
}
