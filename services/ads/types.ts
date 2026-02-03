/**
 * Ad Service Type Definitions
 *
 * Loosely coupled types for ad functionality
 */

export type AdPosition = "top" | "bottom";

export type AdSize = "banner" | "large-banner" | "medium-rectangle";

export interface AdConfig {
  enabled: boolean;
  testMode: boolean;
  androidBannerId: string;
  iosBannerId: string;
}

export interface AdEventCallbacks {
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
  onAdOpened?: () => void;
  onAdClosed?: () => void;
  onAdImpression?: () => void;
  onAdClicked?: () => void;
}

export interface AdAnalytics {
  impressions: number;
  clicks: number;
  revenue: number;
  lastShown: Date | null;
}
