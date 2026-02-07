"use client";

import { Minimize2, Zap, Monitor, Crown } from "lucide-react";

interface StepStyleProps {
  data: {
    styles: string[];
    targetAudience: string;
  };
  onChange: (data: StepStyleProps["data"]) => void;
}

const styleOptions = [
  { label: "Minimal", icon: Minimize2, desc: "Clean lines, lots of whitespace" },
  { label: "Bold", icon: Zap, desc: "High-impact, attention-grabbing" },
  { label: "Modern", icon: Monitor, desc: "Sleek, cutting-edge aesthetic" },
  { label: "Classic", icon: Crown, desc: "Timeless, refined elegance" },
];

export default function StepStyle({ data, onChange }: StepStyleProps) {
  const toggleStyle = (style: string) => {
    const styles = data.styles.includes(style)
      ? data.styles.filter((s) => s !== style)
      : [...data.styles, style];
    onChange({ ...data, styles });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Style & Vibe</h2>
        <p className="mt-1 text-sm text-muted">
          Select one or more styles that match your vision. *
        </p>
      </div>

      {/* Style Cards */}
      <div className="grid grid-cols-2 gap-4">
        {styleOptions.map((opt) => {
          const selected = data.styles.includes(opt.label);
          return (
            <button
              key={opt.label}
              onClick={() => toggleStyle(opt.label)}
              className={`flex flex-col items-center gap-3 rounded-xl border p-6 transition-all ${
                selected
                  ? "border-foreground bg-card text-foreground"
                  : "border-border text-muted hover:border-zinc-600 hover:text-foreground"
              }`}
            >
              <opt.icon size={24} strokeWidth={1.5} />
              <span className="text-sm font-medium">{opt.label}</span>
              <span className="text-xs text-muted">{opt.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Target Audience */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted">Target Audience</label>
        <input
          type="text"
          value={data.targetAudience}
          onChange={(e) => onChange({ ...data, targetAudience: e.target.value })}
          placeholder="e.g. Small business owners aged 25-45"
          className="border-b border-border bg-transparent py-2 text-foreground placeholder:text-zinc-600 outline-none transition-colors focus:border-foreground"
        />
      </div>
    </div>
  );
}
