import { api } from "@/lib/api";

export interface AnalyticsSettings {
  ga4Id: string | null;
  gtmId: string | null;
  googleAdsId: string | null;
  metaPixelId: string | null;
  msClarityId: string | null;
  tiktokPixelId: string | null;
  pinterestTagId: string | null;
  googleSiteVerification: string | null;
  whatsappNumber: string | null;
  maintenanceMode: boolean;
}

export async function getAnalyticsSettings(): Promise<AnalyticsSettings | null> {
  try {
    const { data } = await api.get<{ data: AnalyticsSettings }>("/v1/settings/analytics");
    return data.data;
  } catch {
    return null;
  }
}
