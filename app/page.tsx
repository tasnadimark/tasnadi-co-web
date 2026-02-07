"use client";

import { useState, useEffect } from "react";
import { Plus, ExternalLink, Trash2, Paintbrush } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/ui/Sidebar";
import SiteBuilderModal from "@/components/site-builder/SiteBuilderModal";
import { SavedSite, getSavedSites, deleteSite } from "@/data/sites";

export default function Dashboard() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [sites, setSites] = useState<SavedSite[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load sites from localStorage on mount
  useEffect(() => {
    setSites(getSavedSites());
    setMounted(true);
  }, []);

  const handleSiteCreated = (site: SavedSite) => {
    setSites((prev) => [site, ...prev]);
  };

  const handleDelete = (id: string) => {
    deleteSite(id);
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const hasSites = mounted && sites.length > 0;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      {/* Main content */}
      <main className="flex flex-1 flex-col p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Sites</h1>
            <p className="mt-1 text-sm text-muted">
              {hasSites
                ? `${sites.length} site${sites.length > 1 ? "s" : ""} created`
                : "Create your first site to get started"}
            </p>
          </div>
          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Plus size={16} />
            New Site
          </button>
        </div>

        {/* Sites grid or empty state */}
        {hasSites ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site, i) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-zinc-600"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  {site.templateThumbnail ? (
                    <img
                      src={site.templateThumbnail}
                      alt={site.templateName ?? site.businessName}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Paintbrush size={32} className="text-zinc-700" />
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                        site.type === "template"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {site.type === "template" ? "Template" : "Custom"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {site.businessName}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted">
                        {site.templateName
                          ? `${site.templateName} template`
                          : "Custom build"}
                        {" · "}
                        {formatDate(site.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {site.styles.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                    {site.industry && (
                      <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-muted">
                        {site.industry}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    {site.templatePreviewUrl && (
                      <a
                        href={site.templatePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-foreground"
                      >
                        <ExternalLink size={12} />
                        Preview
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(site.id)}
                      className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
                      title="Delete site"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add new site card */}
            <button
              onClick={() => setShowBuilder(true)}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border transition-colors hover:border-zinc-600"
            >
              <Plus size={24} className="text-muted" strokeWidth={1.5} />
              <span className="text-sm text-muted">Add another site</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-48 w-72 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border transition-colors hover:border-zinc-600">
                <div className="text-muted">
                  <Plus size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm text-muted">No sites yet</p>
              </div>
              <button
                onClick={() => setShowBuilder(true)}
                className="flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Plus size={16} />
                New Site
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Builder modal */}
      <AnimatePresence>
        {showBuilder && (
          <SiteBuilderModal
            onClose={() => setShowBuilder(false)}
            onSiteCreated={handleSiteCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
