import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-red-700 to-background px-12 py-6">
      <div
        id="container"
        className="flex h-[calc(100vh-3rem)] w-[1400px] flex-col overflow-hidden rounded-lg border-2 border-red-950 bg-slate-50 shadow-xl"
      >
        {/* Navbar Skeleton */}
        <div className="h-12 border-b border-red-950">
          <Skeleton className="size-full" />
        </div>

        <div id="body" className="flex flex-1 overflow-y-auto">
          {/* Aside Skeleton */}
          <aside className="w-1/4 p-4">
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-4 h-8 w-1/2" />
            <Skeleton className="mb-4 h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1 p-6">
            <Skeleton className="mb-6 h-10 w-2/3" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-5/6" />
            <Skeleton className="mb-4 h-6 w-4/5" />
            <Skeleton className="h-6 w-3/4" />
          </main>
        </div>
      </div>
    </main>
  );
}
