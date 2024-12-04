import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-amber-500 to-red-900 px-12 py-6">
      <div
        id="container"
        className=" flex h-[calc(100vh-3rem)] w-[1400px] flex-col overflow-hidden rounded-lg border-2 border-red-950 bg-slate-50 shadow-xl"
      >
        <Navbar />
        <div id="body" className="flex flex-1 overflow-y-auto">
          <Aside />
          <Main />
        </div>
      </div>
    </main>
  );
}
