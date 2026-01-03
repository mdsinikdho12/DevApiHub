"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

function GithubButton() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/mdsinikdho12/DevApiHub", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(0));
  }, []);

  return (
    <Link
      href="https://github.com/mdsinikdho12/DevApiHub"
      target="_blank"
      className="group relative inline-flex items-center justify-center p-[1px] rounded-full transition-all duration-300 active:scale-95">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-800 via-slate-600 to-amber-500/50 opacity-100 group-hover:from-slate-700 group-hover:to-amber-400 transition-all duration-300"></div>

      <div className="relative flex items-center gap-3 bg-[#0D1117] px-5 py-2 rounded-full leading-none overflow-hidden">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
          <span className=" md:text-xl font-bold text-slate-100 tracking-tight">
            {stars !== null ? stars.toLocaleString() : "..."}
          </span>
        </div>

        <div className="w-[1px] h-6 bg-slate-800 mx-1"></div>

        <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full transition-all duration-500 group-hover:rotate-[360deg]">
          <Image
            src="/github.svg"
            width={22}
            height={22}
            alt="GitHub"
            className="invert-0"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="absolute -z-10 inset-0 rounded-full blur-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300"></div>
    </Link>
  );
}

export default GithubButton;
