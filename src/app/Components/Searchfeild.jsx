"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, ChevronDown, Search } from "lucide-react";

const ApiSearchBar = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(
    params.get("category") || "All categories"
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "All categories",
    "Finance",
    "Data Science",
    "Social Media",
    "Weather",
    "Entertainment",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSeacrch = () => {
    router.push(
      `?category=${category || "All categories"}&search=${search}&page=1`
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-10">
      <div className="flex items-center w-full border border-slate-800 rounded-xl bg-[#0F172A] shadow-lg">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-5 py-4 text-slate-300 hover:bg-slate-800 transition-colors border-r border-slate-800 min-w-[180px] text-left">
            <LayoutGrid size={18} className="text-slate-400" />
            <span className="text-sm font-medium whitespace-nowrap flex-1">
              {category}
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#1E293B] border border-slate-700 rounded-lg shadow-2xl z-[100] py-2 animate-in fade-in zoom-in duration-150">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    category === cat
                      ? "bg-[#7B61FF] text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center px-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for APIs..."
            className="w-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-sm py-3 focus:ring-0"
          />
        </div>

        <button
          onClick={handleSeacrch}
          className="flex items-center gap-2 bg-[#7B61FF] hover:bg-[#6344f5] text-white px-6 py-4 transition-all font-semibold text-sm active:scale-95 rounded-r-xl">
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default ApiSearchBar;
