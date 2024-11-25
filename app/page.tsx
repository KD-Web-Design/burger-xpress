import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      id="container"
      className="flex h-screen w-[1400px] flex-col overflow-hidden rounded-lg bg-white"
      style={{ height: "calc(100vh - 3rem)" }}
    >
      <Navbar />
      <div id="body" className="flex flex-1 overflow-y-auto">
        <Aside />
        <Main />
      </div>
    </div>
  );
}
