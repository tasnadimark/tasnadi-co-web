export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  previewUrl: string;
  categories: string[];
  description: string;
  fitReason: string;
}

export const templates: Template[] = [
  {
    id: "t1",
    name: "QuantumLab",
    thumbnail: "https://cdn.prod.website-files.com/68a342b7066c56fa60eb3af1/68cc44b1b1fb931297391491_quantum-home-v1-page-ai-research-lab-webflow-template.png",
    previewUrl: "https://quantumlabtemplate.webflow.io/",
    categories: ["Bold", "Modern"],
    description:
      "A dark, high-contrast AI Research Lab template with 16+ pages, bold typography, and dynamic grid layouts. Includes 3 home, blog & contact page variations.",
    fitReason:
      "Its dark aesthetic and bold grid system project authority — perfect for tech, AI, and research-driven brands.",
  },
  {
    id: "t2",
    name: "Agentflow",
    thumbnail: "https://cdn.prod.website-files.com/68a342b7066c56fa60eb3af1/68cc2938b007e6b09434b4d8_quantum-home-v1-top-page-ai-research-lab-webflow-template.png",
    previewUrl: "https://agentflowtemplate.webflow.io/",
    categories: ["Modern", "Minimal"],
    description:
      "A sleek Terminal AI Assistant template with 20+ pages, gradient accents, and a developer-friendly feel. Features pricing, sign-in, and demo request pages.",
    fitReason:
      "Its modern, developer-centric design positions your product as cutting-edge and trustworthy.",
  },
  {
    id: "t3",
    name: "Catalis",
    thumbnail: "https://cdn.prod.website-files.com/690a3d4b70be67fbdfcdc08a/691e541afd27be3eb791b112_home1-page.avif",
    previewUrl: "https://catalis-temlis.webflow.io/",
    categories: ["Minimal", "Classic"],
    description:
      "An elegant consulting template with 15+ pages, clean whitespace, and refined serif accents. Includes 3 home, blog & contact page variations.",
    fitReason:
      "Classic elegance meets clean simplicity — ideal for consulting, services, and professional brands.",
  },
];

export function scoreTemplates(allTemplates: Template[], userStyles: string[]): Template[] {
  const scored = allTemplates
    .map((t) => ({
      ...t,
      score: t.categories.filter((c) => userStyles.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score);

  // Return top 3, or all if fewer than 3
  return scored.slice(0, 3);
}
