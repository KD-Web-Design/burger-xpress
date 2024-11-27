"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const setUserStoreUsername = useUserStore((state) => state.setUsername);
  const router = useRouter();

  const handleSubmit = () => {
    if (username.trim()) {
      setUserStoreUsername(username);
      localStorage.setItem("username", username);
      router.push("/order");
    } else {
      alert("Veuillez entrer un nom valide.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-3xl font-semibold">Bienvenue !</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Entrez votre nom"
        className="mb-4 rounded border p-2"
      />
      <button
        onClick={handleSubmit}
        className="rounded bg-blue-500 p-2 text-white"
      >
        Commencer
      </button>
    </div>
  );
};

export default Welcome;
