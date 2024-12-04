"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const setUserStoreUsername = useUserStore((state) => state.setUsername);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim()) {
      setUserStoreUsername(username);
      localStorage.setItem("username", username);
      document.cookie = `username=${username}; path=/`;
      router.push("/order");
    } else {
      alert("Please provide a valid name");
    }
  };

  return (
    <main className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center gap-12 bg-welcome bg-cover bg-bottom before:absolute before:inset-0 before:bg-black before:opacity-70 before:content-['']">
      <Image
        src="/img/logo.png"
        alt="logo Burger Xpress"
        width={500}
        height={500}
        priority
        className="z-10 cursor-pointer"
      />
      <Card className="z-10 flex h-fit flex-col items-center justify-center gap-4 bg-transparent p-8 backdrop-blur">
        <h1 className="z-10 text-3xl font-semibold text-white">
          Welcome, please enter your name
        </h1>
        <div className="z-10 h-0.5 w-full bg-foreground"></div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="bg-white p-2"
          />
          <Button
            className="w-full bg-foreground font-bold text-white hover:bg-white hover:text-foreground"
            type="submit"
            variant="secondary"
          >
            Get started
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default Welcome;
