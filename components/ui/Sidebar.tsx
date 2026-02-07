"use client";

import { Globe, CreditCard, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { icon: Globe, label: "Sites", active: true },
  { icon: CreditCard, label: "Billing", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <Image
          src="/logo.svg"
          alt="Tasnadi.co"
          width={120}
          height={24}
          className="h-6 w-auto"
        />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted hover:text-foreground transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-b border-border bg-background px-4 pb-3 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "text-foreground bg-card"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r border-border bg-background px-3 py-6">
        <div className="mb-8 px-3">
          <Image
            src="/logo.svg"
            alt="Tasnadi.co"
            width={120}
            height={24}
            className="h-6 w-auto"
          />
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "text-foreground bg-card"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
