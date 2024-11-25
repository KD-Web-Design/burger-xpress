import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      id="container"
      className="flex h-[94vh] w-[1400px] flex-col overflow-hidden rounded-lg bg-white"
    >
      <Navbar />
      <div id="body" className="flex h-full">
        <Aside />
        <Main />
      </div>
    </div>
  );
}
