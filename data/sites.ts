export interface SavedSite {
  id: string;
  businessName: string;
  industry: string;
  goal: string;
  styles: string[];
  targetAudience: string;
  inspirationLinks: string[];
  templateId: string | null;
  templateName: string | null;
  templateThumbnail: string | null;
  templatePreviewUrl: string | null;
  type: "template" | "custom";
  createdAt: string;
}

const STORAGE_KEY = "tasnadi_sites";

export function getSavedSites(): SavedSite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSite(site: SavedSite): void {
  const sites = getSavedSites();
  sites.unshift(site);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

export function deleteSite(id: string): void {
  const sites = getSavedSites().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}
