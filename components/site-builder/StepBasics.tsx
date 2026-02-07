"use client";

interface StepBasicsProps {
  data: {
    businessName: string;
    industry: string;
    goal: string;
  };
  onChange: (data: StepBasicsProps["data"]) => void;
}

const industries = ["Tech", "Retail", "Services", "Creative", "Other"];
const goals = ["Lead Gen", "Portfolio", "E-commerce", "Blog"];

export default function StepBasics({ data, onChange }: StepBasicsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">The Basics</h2>
        <p className="mt-1 text-sm text-muted">Tell us about your business.</p>
      </div>

      {/* Business Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted">Business Name *</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => onChange({ ...data, businessName: e.target.value })}
          placeholder="e.g. Acme Inc."
          className="border-b border-border bg-transparent py-2 text-foreground placeholder:text-zinc-600 outline-none transition-colors focus:border-foreground"
        />
      </div>

      {/* Industry */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted">Industry</label>
        <select
          value={data.industry}
          onChange={(e) => onChange({ ...data, industry: e.target.value })}
          className="border-b border-border bg-transparent py-2 text-foreground outline-none transition-colors focus:border-foreground appearance-none cursor-pointer"
        >
          <option value="" className="bg-background">Select an industry</option>
          {industries.map((ind) => (
            <option key={ind} value={ind} className="bg-background">
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Goal */}
      <div className="flex flex-col gap-3">
        <label className="text-sm text-muted">Primary Goal</label>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => onChange({ ...data, goal })}
              className={`rounded-lg border px-4 py-3 text-sm transition-all ${
                data.goal === goal
                  ? "border-foreground text-foreground"
                  : "border-border text-muted hover:border-zinc-600 hover:text-foreground"
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
