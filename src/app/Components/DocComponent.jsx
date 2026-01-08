"use client";
import React, { useState } from "react";
import {
  Book,
  Terminal,
  Code2,
  Rocket,
  Lock,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Languages,
} from "lucide-react";

const DocsPage = () => {
  const [lang, setLang] = useState("en");
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: "Documentation",
      subtitle:
        "Learn how to integrate DevApiHub APIs and build amazing projects.",
      apiTitle: "What is an API?",
      apiDesc:
        "An API (Application Programming Interface) acts as a messenger between two applications. Think of it as a waiter in a restaurant: you (the client) ask for food (data), the waiter (API) takes your request to the kitchen (server), and brings the food back to you.",
      apiExample:
        "Example: When you check the weather on your phone, an API fetches that data from a weather server.",
      methodsTitle: "HTTP Methods (GET vs POST)",
      fetchTitle: "What is Fetch?",
      fetchDesc:
        "fetch() is a modern JavaScript method used to call an API. It allows you to make network requests to get data without refreshing the page.",
      limitTitle: "Usage & Subscription",
      freePlan: "Free Plan: Collect up to 10 API endpoints for free.",
      proPlan: "Premium Plan: Get unlimited access to all endpoints.",
      projectTitle: "Project Ideas",
      btnText: "Upgrade Now",
    },
    bn: {
      title: "ডকুমেন্টেশন (Docs)",
      subtitle:
        "কিভাবে DevApiHub API আপনার প্রোজেক্টে ব্যবহার করবেন তা এখান থেকে শিখুন।",
      apiTitle: "API আসলে কি?",
      apiDesc:
        "API (Application Programming Interface) হলো দুটি অ্যাপ্লিকেশনের মধ্যে একটি বার্তাবাহক। এটি একটি রেস্টুরেন্টের ওয়েটারের মতো: আপনি (ক্লায়েন্ট) খাবার (ডাটা) চান, ওয়েটার (API) আপনার অর্ডারটি রান্নাঘরে (সার্ভার) নিয়ে যায় এবং খাবারটি আপনার কাছে নিয়ে আসে।",
      apiExample:
        "উদাহরণ: আপনি যখন ফোনে আবহাওয়া দেখেন, তখন একটি API সার্ভার থেকে সেই তথ্যটি নিয়ে আসে।",
      methodsTitle: "HTTP মেথড (GET বনাম POST)",
      fetchTitle: "Fetch কি?",
      fetchDesc:
        "fetch() হলো একটি আধুনিক জাভাস্ক্রিপ্ট মেথড যা দিয়ে API কল করা হয়। এটি পেজ রিফ্রেশ না করেই সার্ভার থেকে ডাটা আনতে সাহায্য করে।",
      limitTitle: "ব্যবহার এবং সাবস্ক্রিপশন",
      freePlan:
        "ফ্রি প্ল্যান: সর্বোচ্চ ১০টি API এন্ডপয়েন্ট সংগ্রহ করতে পারবেন।",
      proPlan:
        "প্রিমিয়াম প্ল্যান: আনলিমিটেড API অ্যাক্সেস এবং দ্রুত রেসপন্স পাবেন।",
      projectTitle: "প্রোজেক্ট আইডিয়া",
      btnText: "এখনই সাবস্ক্রাইব করুন",
    },
  };

  const t = content[lang];
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070C10] font- hind text-gray-300 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="flex items-center gap-2 bg-[#0F1720] border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-all text-sm font-medium text-blue-400">
            <Languages size={18} />
            {lang === "en" ? "Switch to Bangla" : "Switch to English"}
          </button>
        </div>

        <header className="mb-16  border-b border-white/5 pb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
            <Book className="text-blue-500" /> {t.title}
          </h1>
          <p className="text-lg text-gray-400">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1  font-hind lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Zap size={24} className="text-yellow-400" /> {t.apiTitle}
              </h2>
              <p className="leading-relaxed mb-4">{t.apiDesc}</p>
              <div className="bg-[#0F1720] border-l-4 border-blue-500 p-4 rounded-r-xl italic text-sm">
                {t.apiExample}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 text-green-400">
                <ArrowRight size={24} /> {t.methodsTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0F1720] border border-white/10 p-5 rounded-2xl">
                  <h3 className="text-blue-400 font-bold mb-2">GET Method</h3>
                  <p className="text-sm text-gray-400">
                    {lang === "en"
                      ? "Retrieve data from server."
                      : "সার্ভার থেকে ডাটা গ্রহণ করা।"}
                  </p>
                </div>
                <div className="bg-[#0F1720] border border-white/10 p-5 rounded-2xl">
                  <h3 className="text-green-400 font-bold mb-2">POST Method</h3>
                  <p className="text-sm text-gray-400">
                    {lang === "en"
                      ? "Send data to server."
                      : "সার্ভার ডাটা পাঠানো।"}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code2 size={24} className="text-purple-400" /> {t.fetchTitle}
              </h2>
              <p className="leading-relaxed mb-6">{t.fetchDesc}</p>
              <pre className="bg-black/40 p-6 rounded-2xl text-xs text-blue-300 border border-white/10 overflow-x-auto font-mono">
                {`fetch('https://api.devapihub.com/v1/usd-to-bdt')
  .then(res => res.json())
  .then(data => console.log(data));`}
              </pre>
            </section>
          </div>

          {/* --- Sidebar --- */}
          <div className="space-y-8">
            <div className="bg-[#0F1720] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <Terminal size={18} className="text-green-400" />{" "}
                {t.projectTitle}
              </h3>
              <ul className="text-xs space-y-4 text-gray-400">
                <li className="p-3 bg-white/5 rounded-lg border border-white/5">
                  Currency Converter
                </li>
                <li className="p-3 bg-white/5 rounded-lg border border-white/5">
                  Weather Dashboard
                </li>
              </ul>
              <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                {t.btnText} <Rocket size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
