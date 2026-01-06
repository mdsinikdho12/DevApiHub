"use client";
import React from "react";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  MapPin,
  Bell,
  HelpCircle,
  Store,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function DropdownMenu({ session }) {
  const userRole = session?.user?.role || "user";

  const baseMenuItems = [
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      divider: false,
      roles: ["user", "seller", "admin"],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      divider: true,
      roles: ["user", "seller", "admin"],
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/support",
      divider: false,
      roles: ["user", "seller", "admin"],
    },
  ];

  const roleMenuItems = {
    user: [
      {
        icon: User,
        label: "My Profile",
        href: "/user/profile",
        divider: false,
      },
      {
        icon: ShoppingBag,
        label: "My Orders",
        href: "/orders",
        divider: false,
      },
      {
        icon: Heart,
        label: "Wishlist",
        href: "/wishlist",
        divider: false,
      },
      {
        icon: MapPin,
        label: "Addresses",
        href: "/addresses",
        divider: false,
      },
    ],
    seller: [
      {
        icon: Store,
        label: "Seller Profile",
        href: "/seller/profile",
        divider: false,
      },
      {
        icon: ShoppingBag,
        label: "My Products",
        href: "/seller/products",
        divider: false,
      },
      {
        icon: BarChart3,
        label: "Analytics",
        href: "/seller/analytics",
        divider: false,
      },
      {
        icon: ShoppingBag,
        label: "Orders",
        href: "/seller/orders",
        divider: false,
      },
    ],
    admin: [
      {
        icon: BarChart3,
        label: "Dashboard",
        href: "/admin/dashboard",
        divider: false,
      },
      {
        icon: User,
        label: "Users",
        href: "/admin/users",
        divider: false,
      },
      {
        icon: Store,
        label: "Sellers",
        href: "/admin/sellers",
        divider: false,
      },
      {
        icon: ShoppingBag,
        label: "Products",
        href: "/admin/products",
        divider: false,
      },
      {
        icon: ShoppingBag,
        label: "Orders",
        href: "/admin/orders",
        divider: false,
      },
    ],
  };

  const roleSpecificItems = roleMenuItems[userRole] || roleMenuItems.user;
  const menuItems = [...roleSpecificItems, ...baseMenuItems];

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const roleConfig = {
    user: { color: "purple", title: "User" },
    seller: { color: "blue", title: "Seller" },
    admin: { color: "red", title: "Admin" },
  };

  const config = roleConfig[userRole] || roleConfig.user;

  return (
    <div className="relative">
      <div className="absolute right-0 w-56 mt-3 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden">
        <div
          className={`bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">{session?.user?.name}</p>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">
              {config.title}
            </span>
          </div>
          <p className="text-xs opacity-90">{session?.user?.email}</p>
        </div>

        {/* Menu items */}
        <ul className="py-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index}>
                <Link href={item.href}>
                  <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3 group">
                    <IconComponent
                      className={`w-4 h-4 text-gray-600 group-hover:text-${config.color}-500 transition-colors`}
                    />
                    <span
                      className={`text-sm text-gray-700 group-hover:text-${config.color}-600 font-medium`}>
                      {item.label}
                    </span>
                  </li>
                </Link>
                {item.divider && <hr className="my-2 border-gray-100" />}
              </div>
            );
          })}
        </ul>

        {/* Logout button */}
        <div className="border-t border-gray-100 p-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-150 rounded-md font-medium text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
