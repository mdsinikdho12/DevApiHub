"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Zap,
  Activity,
  BarChart3,
  AlertCircle,
  ArrowUpRight,
  RefreshCcw,
  Star,
  Key,
  FolderPlus,
  X, // ক্লোজ করার জন্য
} from "lucide-react";
import { getUserLimit } from "@/action/user.action";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [limits, setLimits] = useState({ copeidToday: 0, Dailylimit: 0 });
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    async function fetchLimits() {
      if (session?.user?.id) {
        const res = await getUserLimit(session.user.id);
        if (!res.error) {
          setLimits({
            copeidToday: res.copeidToday || 0,
            Dailylimit: res.Dailylimit || 0,
          });
        }
        setLoading(false);
      }
    }
    fetchLimits();
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center ">
        <div className="flex flex-col items-center gap-2">
          <RefreshCcw className="h-6 w-6 animate-spin text-blue-500" />
          <p className="text-sm text-slate-500 font-medium">
            Loading Statistics...
          </p>
        </div>
      </div>
    );
  }

  const usagePercentage =
    limits.Dailylimit > 0
      ? Math.min(
          Math.round((limits.copeidToday / limits.Dailylimit) * 100),
          100
        )
      : 0;
  const remaining = limits.Dailylimit - limits.copeidToday;

  return (
    <div className="relative min-h-screen p-6 lg:p-10 text-slate-200">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" size={24} />
              Usage Overview
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome, {session?.user?.name}.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
            <div className="bg-amber-500/10 p-2 rounded-md text-amber-500">
              <Zap size={18} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Plan Type
              </p>
              <p className="text-sm font-bold text-white capitalize">
                {session?.user?.subscriptionPlan || "Free"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded border border-slate-800 bg-slate-900 p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Daily Copy Usage
                  </p>
                  <h2 className="text-4xl font-black text-white mt-1">
                    {usagePercentage}%
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                    Remaining
                  </p>
                  <p className="text-lg font-bold text-blue-400">
                    {remaining < 0 ? 0 : remaining}
                  </p>
                </div>
              </div>
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              <div className="mt-6 flex justify-between text-sm font-medium">
                <span className="text-slate-300">
                  {limits.copeidToday} Used
                </span>
                <span className="text-slate-500">
                  {limits.Dailylimit} Daily Limit
                </span>
              </div>
            </div>
            <BarChart3 className="absolute -right-4 -bottom-4 text-slate-800/20 w-32 h-32" />
          </div>

          <div className="rounded border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <AlertCircle size={20} />
              </div>
              <ArrowUpRight className="text-slate-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Your limit resets every 24 hours.
              </p>
              <button className="mt-4 w-full py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Tabs */}
        <div className="grid gap-4 md:grid-cols-3 mt-8">
          {/* Add Review Card - Triggering State */}
          <button
            onClick={() => setIsReviewOpen(true)}
            className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 group-hover:scale-110 transition-transform">
                <Star size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white">Add Review</h3>
                <p className="text-xs text-slate-500">Share your feedback</p>
              </div>
            </div>
          </button>

          <Link
            href="/dashboard/add-api"
            className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
                <Key size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white">Add API Key</h3>
                <p className="text-xs text-slate-500">Manage your access</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/add-project"
            className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform">
                <FolderPlus size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white">Add Project</h3>
                <p className="text-xs text-slate-500">Launch new project</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center gap-3 text-slate-500 text-xs px-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Active: {session?.user?.email}
        </div>
      </div>

      {/* --- Review Box Modal --- */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star
                  className="text-yellow-500"
                  size={20}
                  fill="currentColor"
                />
                Submit a Review
              </h3>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Tell us what you think about our service..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                onClick={() => {
                  console.log("Review:", reviewText);
                  setIsReviewOpen(false);
                }}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
