import { Template } from "@/data/templates";

interface TemplateResultsProps {
  templates: Template[];
  onSelect: (template: Template) => void;
  onCustom: () => void;
}

export default function TemplateResults({
  templates,
  onSelect,
  onCustom,
}: TemplateResultsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Your Top Matches
        </h2>
        <p className="mt-1 text-sm text-muted">
          Based on your preferences, here are 3 templates we think you&apos;ll love.
        </p>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {templates.map((t, i) => (
          <div
            key={t.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-zinc-600 hover:bg-card-hover"
          >
            {/* Thumbnail */}
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={t.thumbnail}
                alt={t.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{t.name}</h3>
                <a
                  href={t.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted transition-colors hover:text-foreground"
                >
                  Preview ↗
                </a>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {t.fitReason}
              </p>
              <div className="mt-auto pt-3">
                <button
                  onClick={() => onSelect(t)}
                  className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Select This Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom build escape hatch */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onCustom}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          None of these fit. Build me something custom &rarr;
        </button>
      </div>
    </div>
  );
}
