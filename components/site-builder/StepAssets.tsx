"use client";

import { Upload, Image as ImageIcon } from "lucide-react";

export default function StepAssets() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Assets</h2>
        <p className="mt-1 text-sm text-muted">
          Upload your logo and brand images. You can always add more later.
        </p>
      </div>

      {/* Logo upload zone */}
      <div className="flex flex-col gap-3">
        <label className="text-sm text-muted">Logo</label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-12 text-muted transition-colors hover:border-zinc-600 hover:text-foreground cursor-pointer">
          <Upload size={32} strokeWidth={1.5} />
          <span className="text-sm">Drop your logo here or click to upload</span>
          <span className="text-xs text-zinc-600">PNG, SVG, or JPG up to 5MB</span>
        </div>
      </div>

      {/* Images upload zone */}
      <div className="flex flex-col gap-3">
        <label className="text-sm text-muted">Brand Images</label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-12 text-muted transition-colors hover:border-zinc-600 hover:text-foreground cursor-pointer">
          <ImageIcon size={32} strokeWidth={1.5} />
          <span className="text-sm">Drop images here or click to upload</span>
          <span className="text-xs text-zinc-600">Up to 10 images, 5MB each</span>
        </div>
      </div>

      <p className="text-xs text-muted">
        File upload is a placeholder for v0.1 — your assets will be requested after template selection.
      </p>
    </div>
  );
}
