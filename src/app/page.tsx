import { HomeScene } from "@/components/home/HomeScene";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StackColumns } from "@/components/home/StackColumns";
import { WinsCarousel } from "@/components/home/WinsCarousel";
import { Stats } from "@/components/home/Stats";

export default function Home() {
  return (
    <>
      <HomeScene />
      <SelectedWork />
      <StackColumns />
      <WinsCarousel />
      <Stats />
    </>
  );
}
