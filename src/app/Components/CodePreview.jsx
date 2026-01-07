"use client";
import React from "react";
import { Terminal, Copy, Check } from "lucide-react";

const CodePreview = () => {
  const [copied, setCopied] = React.useState(false);

  const codeString = `fetch('https://api.devapihub.com/v1/weather?city=Dhaka')
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => console.error("Error:", error));`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 relative bg-[#0B0F14] overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#7B61FF]/5 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 leading-tight mb-4">
                Designed for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-blue-400">
                  Developers
                </span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                DevApiHub provides a streamlined API experience with minimal
                setup and maximum efficiency. Build your next project with
                confidence using our comprehensive, well-documented endpoints
                that integrate seamlessly into any development workflow.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Key Features
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    label: "Lightning-Fast Response Times",
                    desc: "Optimized infrastructure for sub-100ms latency",
                  },
                  {
                    label: "Zero Setup Required",
                    desc: "Start building immediately without credit cards",
                  },
                  {
                    label: "Comprehensive Documentation",
                    desc: "Clear guides and examples for every endpoint",
                  },
                  {
                    label: "Enterprise-Grade Reliability",
                    desc: "99.9% uptime SLA with dedicated support",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded bg-gradient-to-r from-[#7B61FF] to-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm font-medium">
                        {item.label}
                      </p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7B61FF]/30 via-blue-500/30 to-[#7B61FF]/30 rounded blur opacity-0 group-hover:opacity-100 transition duration-1000 -z-10"></div>

            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded border border-slate-800/50 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900/80 to-slate-800/50 border-b border-slate-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5" />
                  example.js
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#7B61FF] hover:bg-slate-800/50 transition-all duration-300"
                  aria-label="Copy code">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <pre>
                  <code className="text-slate-300">
                    <span className="text-pink-400">fetch</span>(
                    <span className="text-emerald-400">
                      'https://api.devapihub.com/v1/weather?city=Dhaka'
                    </span>
                    )
                    <br />
                    &nbsp;&nbsp;.<span className="text-blue-400">then</span>
                    (response =&gt; response.
                    <span className="text-blue-400">json</span>())
                    <br />
                    &nbsp;&nbsp;.<span className="text-blue-400">then</span>
                    (data =&gt; {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;console.
                    <span className="text-blue-400">log</span>(
                    <span className="text-emerald-400">"Success:"</span>, data);
                    <br />
                    &nbsp;&nbsp;{"}"})
                    <br />
                    &nbsp;&nbsp;.<span className="text-blue-400">catch</span>
                    (error =&gt; console.
                    <span className="text-pink-400">error</span>(
                    <span className="text-emerald-400">"Error:"</span>, error));
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePreview;
