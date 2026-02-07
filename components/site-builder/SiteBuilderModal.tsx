"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import StepBasics from "./StepBasics";
import StepStyle from "./StepStyle";
import StepInspiration from "./StepInspiration";
import StepAssets from "./StepAssets";
import TemplateResults from "./TemplateResults";
import CompletionScreen from "./CompletionScreen";
import { templates, scoreTemplates, Template } from "@/data/templates";
import { SavedSite, saveSite } from "@/data/sites";

type Phase = "form" | "results" | "completion";

interface FormData {
  businessName: string;
  industry: string;
  goal: string;
  styles: string[];
  targetAudience: string;
  links: string[];
}

interface SiteBuilderModalProps {
  onClose: () => void;
  onSiteCreated?: (site: SavedSite) => void;
}

const TOTAL_STEPS = 4;

export default function SiteBuilderModal({ onClose, onSiteCreated }: SiteBuilderModalProps) {
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<Phase>("form");
  const [completionType, setCompletionType] = useState<"template" | "custom">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    goal: "",
    styles: [],
    targetAudience: "",
    links: ["", "", ""],
  });

  const canProceed = () => {
    if (step === 1) return formData.businessName.trim().length > 0;
    if (step === 2) return formData.styles.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Move to results
      setPhase("results");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const createSavedSite = (
    type: "template" | "custom",
    template?: Template
  ): SavedSite => ({
    id: crypto.randomUUID(),
    businessName: formData.businessName,
    industry: formData.industry,
    goal: formData.goal,
    styles: formData.styles,
    targetAudience: formData.targetAudience,
    inspirationLinks: formData.links.filter((l) => l.trim() !== ""),
    templateId: template?.id ?? null,
    templateName: template?.name ?? null,
    templateThumbnail: template?.thumbnail ?? null,
    templatePreviewUrl: template?.previewUrl ?? null,
    type,
    createdAt: new Date().toISOString(),
  });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCompletionType("template");
    const site = createSavedSite("template", template);
    saveSite(site);
    onSiteCreated?.(site);
    setPhase("completion");
  };

  const handleCustom = () => {
    setCompletionType("custom");
    const site = createSavedSite("custom");
    saveSite(site);
    onSiteCreated?.(site);
    setPhase("completion");
  };

  const handleBackToDashboard = () => {
    onClose();
  };

  const recommendedTemplates = scoreTemplates(templates, formData.styles);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    handleNext();
  };

  const goBack = () => {
    setDirection(-1);
    handleBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Top bar */}
      {phase === "form" && <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />}

      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm text-muted">
          {phase === "form" && `Step ${step} of ${TOTAL_STEPS}`}
          {phase === "results" && "Choose your template"}
          {phase === "completion" && ""}
        </span>
        <button
          onClick={onClose}
          className="text-muted transition-colors hover:text-foreground"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-8">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={phase === "form" ? `step-${step}` : phase}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {phase === "form" && step === 1 && (
                <StepBasics
                  data={{
                    businessName: formData.businessName,
                    industry: formData.industry,
                    goal: formData.goal,
                  }}
                  onChange={(d) =>
                    setFormData({ ...formData, ...d })
                  }
                />
              )}
              {phase === "form" && step === 2 && (
                <StepStyle
                  data={{
                    styles: formData.styles,
                    targetAudience: formData.targetAudience,
                  }}
                  onChange={(d) =>
                    setFormData({ ...formData, ...d })
                  }
                />
              )}
              {phase === "form" && step === 3 && (
                <StepInspiration
                  data={{ links: formData.links }}
                  onChange={(d) =>
                    setFormData({ ...formData, ...d })
                  }
                />
              )}
              {phase === "form" && step === 4 && <StepAssets />}

              {phase === "results" && (
                <div className="max-w-3xl mx-auto">
                  <TemplateResults
                    templates={recommendedTemplates}
                    onSelect={handleSelectTemplate}
                    onCustom={handleCustom}
                  />
                </div>
              )}

              {phase === "completion" && (
                <CompletionScreen
                  type={completionType}
                  templateName={selectedTemplate?.name}
                  onBack={handleBackToDashboard}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation (form only) */}
      {phase === "form" && (
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="text-sm text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {step === TOTAL_STEPS ? "Generate Recommendations" : "Next"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
