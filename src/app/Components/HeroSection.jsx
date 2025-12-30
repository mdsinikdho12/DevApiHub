import Image from "next/image";

function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto w-full relative">
      <Image
        src="/image/hero.png"
        width={1200}
        height={600}
        alt="Hero area"
        className="w-full h-auto object-cover"
        priority
      />

      <div
        className="
          absolute inset-0
          flex flex-col items-center
          text-center
          z-10
          pt-24
          lg:pt-60
          px-4
        ">
        <h1
          className="
            font-bold
            text-[#D7DBE0]
            text-3xl sm:text-4xl md:text-5xl lg:text-[64px]
          ">
          Discover the Best Free APIs for Developers
        </h1>

        <div
          className="
            mt-4
            bg-[#C5C9CF]/20
            rounded-full
            px-5 py-2
            max-w-[597px]
          ">
          <span className="text-sm lg:text-[14px] font-medium text-[#94A3B8]">
            Over 500+ curated APIs for your next project. Open-source and easy
            to integrate.
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
