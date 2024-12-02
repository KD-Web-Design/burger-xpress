"use client";

import { useSuperUserStore, useUserStore } from "@/store/store";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state) => state.logout);
  const { toast } = useToast();
  const { isAdmin, toggleAdmin } = useSuperUserStore();
  return (
    <nav className="flex w-full items-center justify-between bg-red-950 p-4 text-white shadow-2xl">
      <Link href="#">
        <Image
          src="/img/logo.png"
          alt="Burger Xpress"
          width={200}
          height={200}
          priority
        />
      </Link>
      <div className="flex items-center space-x-2">
        <Label htmlFor="super-user-mode">Super User Mode</Label>
        <Switch
          id="super-user-mode"
          onCheckedChange={(checked) => {
            toggleAdmin();
            if (checked) {
              toast({
                title: "Super User Mode Activated 🚀",
              });
            }
          }}
          checked={isAdmin}
        />
      </div>
      <div id="user" className="grid grid-cols-2 items-center gap-2">
        <div className="text-center">
          <h2>
            Hey, <span className="font-bold text-foreground">{username}</span>
          </h2>
          <Link href="/" className="text-xs" onClick={logout}>
            Logout
          </Link>
        </div>
        <CircleUser size={40} />
      </div>
    </nav>
  );
}
