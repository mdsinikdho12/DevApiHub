"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export default function CommandCopy({ command ="NULL"}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <button
        onClick={handleCopy}
        className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition-all duration-200 group">
        <div className="flex items-center gap-3 text-left">
          <Terminal size={20} className="text-emerald-400 flex-shrink-0" />
         
          <span className="text-slate-100 font-mono text-sm flex-1 break-all">
            {command}
          </span>
          <div className="flex-shrink-0 ml-auto">
            {copied ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <Check size={18} />
                <span className="text-xs font-medium">Copied!</span>
              </div>
            ) : (
              <Copy
                size={18}
                className="text-slate-500 group-hover:text-slate-300 transition-colors"
              />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
