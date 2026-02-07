"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Briefcase } from "lucide-react";

interface CompletionScreenProps {
  type: "template" | "custom";
  templateName?: string;
  onBack: () => void;
}

export default function CompletionScreen({
  type,
  templateName,
  onBack,
}: CompletionScreenProps) {
  const isTemplate = type === "template";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      {/* Icon */}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          isTemplate ? "bg-emerald-500/10" : "bg-blue-500/10"
        }`}
      >
        {isTemplate ? (
          <CheckCircle2 size={32} className="text-emerald-500" />
        ) : (
          <Briefcase size={32} className="text-blue-500" />
        )}
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold tracking-tight">
        {isTemplate ? "Great choice!" : "Request Received"}
      </h2>

      {/* Description */}
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        {isTemplate
          ? `We're spinning up your ${templateName} environment. You'll receive an email when your site is ready to customize.`
          : "We're handing your brief to our AI Design specialist. Expect a draft in 24 hours."}
      </p>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-4 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );
}
