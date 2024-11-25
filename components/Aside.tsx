import React from "react";

export default function Aside() {
  return (
    <aside className="flex w-1/3 flex-col bg-white shadow-2xl">
      <div
        id="aside-top"
        className="flex justify-between bg-slate-950 p-4 text-3xl font-semibold text-foreground"
      >
        <h1>Total</h1>
        <span>0,00 €</span>
      </div>
      <div id="aside-body" className="flex flex-1 items-center justify-center">
        <h2 className="text-2xl text-slate-800">Your basket is empty. 😢</h2>
      </div>
      <div id="aside-footer" className="bg-slate-950 p-4 text-center">
        <span className="text-xs">Made by KD Web Design</span>
      </div>
    </aside>
  );
}
