import getAlluser from "@/action/admin.action";
import { getApiCount } from "@/action/api.action";
import {
  Users,
  Database,
  ShieldCheck,
  TrendingUp,
  Settings,
  ArrowRight,
  MoreVertical,
  Mail,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";

export default async function AdminDashboard() {
  const usersRes = await getAlluser();
  const apiRes = await getApiCount();

  const allUsers = usersRes?.data || [];
  const totalUsers = allUsers.length;
  const totalApis = apiRes?.count || 0;

  return (
    <div className="min-h-screen  p-6 lg:p-10 text-slate-200 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-blue-500" size={32} />
              Admin Control Center
            </h1>
            <p className="text-slate-400 mt-2">
              Platform insight and user management.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 transition-all text-slate-400">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Total Users
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {totalUsers}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <Database size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Active APIs
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {totalApis}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded overflow-hidden backdrop-blur-md">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Registered Users</h2>
              <p className="text-sm text-slate-500">
                A detailed list of all users on your platform.
              </p>
            </div>
            <button className="text-sm font-semibold text-blue-500 hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">User Details</th>
                  <th className="px-8 py-4">Email Address</th>
                  <th className="px-8 py-4">Plan</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {allUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <UserIcon size={20} className="text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {user.name || "Anonymous"}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            ID: {user._id.toString().slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-600" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          user.subscriptionPlan === "Pro"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}>
                        {user.subscriptionPlan || "Free"}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-slate-600 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allUsers.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-500 text-sm italic">
                No users found in the database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
