import Link from "next/link";
import Image from "next/image";

function GithubButton() {
  return (
    <Link
      href="https://github.com/mdsinikdho12/DevApiHub"
      target="_blank"
      aria-label="View DevApiHub on GitHub"
      className="
        group
        w-[53px] h-[53px]
        flex items-center justify-center
        rounded-full
        bg-[#B7B7B7]
        transition-all duration-300
        hover:scale-105
      ">
      <div
        className="
          w-[47px] h-[47px]
          flex items-center justify-center
          rounded-full
          bg-white
          ring-1 ring-white
          transition-all duration-300
          group-hover:ring-gray-400
        ">
        <Image
          src="/github.svg"
          width={100}
          height={100}
          alt="GitHub"
          className="transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>
    </Link>
  );
}

export default GithubButton;
