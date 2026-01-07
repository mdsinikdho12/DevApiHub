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
} from "lucide-react";
import { getUserLimit } from "@/action/user.action";
export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [limits, setLimits] = useState({ copeidToday: 0, Dailylimit: 0 });
  const [loading, setLoading] = useState(true);

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
      <div className="flex h-screen items-center justify-center bg-slate-950">
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
    <div className="min-h-screen p-6 lg:p-10 text-slate-200">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" size={24} />
              Usage Overview
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome, {session?.user?.name}. Monitor your daily API copy limits
              here.
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
                Your limit resets every 24 hours. Need more?
              </p>
              <button className="mt-4 w-full py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 text-slate-500 text-xs px-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Active: API limits are syncing in real-time with{" "}
          {session?.user?.email}
        </div>
      </div>
    </div>
  );
}
