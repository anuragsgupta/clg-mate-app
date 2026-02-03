import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    BannerAd,
    BannerAdSize
} from "react-native-google-mobile-ads";
import { adManager } from "./AdManager";
import { AdEventCallbacks, AdPosition, AdSize } from "./types";

interface AdBannerProps {
  position?: AdPosition;
  size?: AdSize;
  onAdEvent?: AdEventCallbacks;
}

/**
 * AdBanner - Reusable banner ad component
 *
 * Usage:
 * ```tsx
 * <AdBanner
 *   position="bottom"
 *   size="banner"
 *   onAdEvent={{
 *     onAdLoaded: () => console.log("Ad loaded"),
 *     onAdFailedToLoad: (error) => console.error(error),
 *   }}
 * />
 * ```
 *
 * Benefits:
 * - Self-contained component
 * - Easy to add/remove from any screen
 * - Handles errors gracefully
 * - Respects global ad settings
 */
export default function AdBanner({
  position = "bottom",
  size = "banner",
  onAdEvent,
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show ads if enabled
    setIsVisible(adManager.isEnabled());
  }, []);

  if (!isVisible) {
    return null;
  }

  const adUnitId = adManager.getBannerAdUnitId();

  // Get banner size
  const getBannerSize = () => {
    switch (size) {
      case "large-banner":
        return BannerAdSize.LARGE_BANNER;
      case "medium-rectangle":
        return BannerAdSize.MEDIUM_RECTANGLE;
      default:
        return BannerAdSize.BANNER;
    }
  };

  const handleAdLoaded = () => {
    console.log("✅ Ad loaded successfully");
    onAdEvent?.onAdLoaded?.();
  };

  const handleAdFailedToLoad = (error: Error) => {
    console.warn("⚠️ Ad failed to load:", error.message);
    setIsVisible(false); // Hide ad container on error
    onAdEvent?.onAdFailedToLoad?.(error);
  };

  const handleAdOpened = () => {
    console.log("👆 Ad opened by user");
    onAdEvent?.onAdOpened?.();
  };

  const handleAdClosed = () => {
    console.log("❌ Ad closed by user");
    onAdEvent?.onAdClosed?.();
  };

  return (
    <View
      style={[
        styles.container,
        position === "top" ? styles.top : styles.bottom,
      ]}
    >
      <BannerAd
        unitId={adUnitId}
        size={getBannerSize()}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
        onAdOpened={handleAdOpened}
        onAdClosed={handleAdClosed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  top: {
    marginBottom: 8,
  },
  bottom: {
    marginTop: 8,
  },
});
