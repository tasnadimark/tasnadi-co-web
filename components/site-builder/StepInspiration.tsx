"use client";

import { Link as LinkIcon } from "lucide-react";

interface StepInspirationProps {
  data: {
    links: string[];
  };
  onChange: (data: StepInspirationProps["data"]) => void;
}

export default function StepInspiration({ data, onChange }: StepInspirationProps) {
  const updateLink = (index: number, value: string) => {
    const links = [...data.links];
    links[index] = value;
    onChange({ ...data, links });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Inspiration</h2>
        <p className="mt-1 text-sm text-muted">
          Share up to 3 websites you like. We&apos;ll use them as design references.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0 text-muted" />
            <input
              type="url"
              value={data.links[i] || ""}
              onChange={(e) => updateLink(i, e.target.value)}
              placeholder={`https://example${i + 1}.com`}
              className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-zinc-600 outline-none transition-colors focus:border-foreground"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-muted">
        These are optional but help us understand your taste better.
      </p>
    </div>
  );
}
