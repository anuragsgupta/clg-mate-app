import Constants from "expo-constants";
import { Platform } from "react-native";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { AdConfig } from "./types";

/**
 * AdManager - Centralized ad configuration and initialization
 *
 * Benefits:
 * - Single source of truth for ad settings
 * - Easy to test (can mock this service)
 * - Easy to disable ads globally
 * - Environment-aware (test vs production IDs)
 */

class AdManager {
  private initialized = false;
  private config: AdConfig;

  constructor() {
    const extra = Constants.expoConfig?.extra || {};

    this.config = {
      enabled: extra.admobEnabled ?? true,
      testMode: extra.environment !== "production",
      androidBannerId: extra.admobBannerAndroid || "",
      iosBannerId: extra.admobBannerIos || "",
    };
  }

  /**
   * Initialize AdMob SDK
   * Call this once at app startup
   */
  async initialize(): Promise<void> {
    if (this.initialized || !this.config.enabled) {
      return;
    }

    try {
      await mobileAds().initialize();

      // Set content rating for college audience (17+)
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.MATURE_AUDIENCE,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      });

      this.initialized = true;
      console.log("✅ AdMob initialized successfully");
    } catch (error) {
      console.error("❌ AdMob initialization failed:", error);
      this.config.enabled = false; // Disable ads on error
    }
  }

  /**
   * Get banner ad unit ID for current platform
   */
  getBannerAdUnitId(): string {
    if (!this.config.enabled) {
      return "";
    }

    return Platform.select({
      ios: this.config.iosBannerId,
      android: this.config.androidBannerId,
      default: "",
    });
  }

  /**
   * Check if ads are enabled
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Check if in test mode
   */
  isTestMode(): boolean {
    return this.config.testMode;
  }

  /**
   * Get current configuration (for debugging)
   */
  getConfig(): AdConfig {
    return { ...this.config };
  }

  /**
   * Disable ads at runtime (e.g., for premium users)
   */
  disable(): void {
    this.config.enabled = false;
  }

  /**
   * Enable ads at runtime
   */
  enable(): void {
    this.config.enabled = true;
  }
}

// Singleton instance
export const adManager = new AdManager();
