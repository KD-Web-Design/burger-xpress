import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between bg-red-950 p-4 text-white shadow-2xl">
      <Link href="#">
        <Image
          src="/img/logo.png"
          alt="Burger Xpress"
          width={200}
          height={200}
        />
      </Link>
      <div id="user" className="grid grid-cols-2 items-center gap-2">
        <div className="text-center">
          <h2>
            Hey, <span className="font-bold text-foreground">Paul</span>
          </h2>
          <Link href="#" className="text-xs">
            Logout
          </Link>
        </div>
        <CircleUser size={40} />
      </div>
    </nav>
  );
}
