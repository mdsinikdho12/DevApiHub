import Navber from "./Components/Navber";
import HeroSection from "./Components/HeroSection";
import Allapi from "./Components/Allapi";

export default function Home({ searchParams }) {
  return (
    <>
      <Navber />
      <HeroSection />
      <Allapi searchParams={searchParams} />
    </>
  );
}
