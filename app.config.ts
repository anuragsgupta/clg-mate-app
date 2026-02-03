import { ConfigContext, ExpoConfig } from "expo/config";

// Environment detection
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.clgmate.app.dev";
  if (IS_PREVIEW) return "com.clgmate.app.preview";
  return "com.clgmate.app"; // Production ID
};

const getAppName = () => {
  if (IS_DEV) return "ClgMate (Dev)";
  if (IS_PREVIEW) return "ClgMate (Preview)";
  return "ClgMate"; // Production Name
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "clgmate-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "clgmate", // Deep linking scheme
  userInterfaceStyle: "dark", // Force dark mode for Midnight Garden theme

  // Splash screen with Midnight Garden colors
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0f0f1a", // Midnight Garden primary
  },

  // Privacy & Legal (REQUIRED for app store approval)
  // privacy: "unlisted", // or "public" for production

  // Performance optimization
  assetBundlePatterns: ["**/*"],

  // iOS Configuration
  ios: {
    supportsTablet: false,
    bundleIdentifier: getUniqueIdentifier(),
    buildNumber: "1.0.0",

    // App Store metadata
    appStoreUrl: "https://apps.apple.com/app/clgmate", // Update when live

    // iOS permissions - ONLY notifications
    infoPlist: {
      // Notification permissions
      NSUserNotificationsUsageDescription:
        "We'll notify you about new messages, matches, and reveals.",

      // Appearance
      UIUserInterfaceStyle: "Dark",

      // Background modes for notifications
      UIBackgroundModes: ["remote-notification"],
    },

    // Push notifications
    // usesApnsEntitlement: true,
  },

  // Android Configuration
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0f0f1a", // Midnight Garden primary
    },
    package: getUniqueIdentifier(),
    versionCode: 1,

    // Play Store metadata
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.clgmate.app", // Update when live

    // ONLY notification permissions
    permissions: ["POST_NOTIFICATIONS"], // Android 13+ notification permission

    // Push notifications
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON || "./google-services.json",

    // Security: Block screenshots in sensitive screens (optional for privacy)
    // blockedPermissions: ["RECORD_AUDIO", "CAMERA", "READ_EXTERNAL_STORAGE"],
  },

  // Web Configuration
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  // Plugins for production features
  plugins: [
    "expo-router",
    "expo-secure-store", // Secure token storage
    [
      "expo-notifications",
      {
        icon: "./assets/images/notification-icon.png",
        color: "#00d4aa", // Midnight Garden accent primary
        sounds: ["./assets/sounds/notification.wav"], // Optional custom sound
      },
    ],
    [
      "react-native-google-mobile-ads",
      {
        // AdMob App IDs (use test IDs in development)
        androidAppId:
          process.env.ADMOB_ANDROID_APP_ID ||
          "ca-app-pub-3940256099942544~3347511713", // Test ID
        iosAppId:
          process.env.ADMOB_IOS_APP_ID ||
          "ca-app-pub-3940256099942544~1458002511", // Test ID

        // User Messaging Platform (GDPR/Privacy consent)
        userTrackingPermission:
          "We use your data to show personalized ads and improve your experience.",
      },
    ],
    // Optional: Sentry for crash reporting
    // ["@sentry/react-native/expo", { project: "clgmate", organization: "your-org" }],
  ],

  // Modern routing
  experiments: {
    typedRoutes: true, // Type-safe navigation
  },

  // Environment variables & metadata
  extra: {
    // Supabase (Backend)
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

    // AdMob Configuration
    admobAndroidAppId:
      process.env.ADMOB_ANDROID_APP_ID ||
      "ca-app-pub-3940256099942544~3347511713",
    admobIosAppId:
      process.env.ADMOB_IOS_APP_ID || "ca-app-pub-3940256099942544~1458002511",
    admobBannerAndroid:
      process.env.ADMOB_BANNER_ANDROID ||
      "ca-app-pub-3940256099942544/6300978111", // Test ID
    admobBannerIos:
      process.env.ADMOB_BANNER_IOS || "ca-app-pub-3940256099942544/2934735716", // Test ID
    admobEnabled: process.env.ADMOB_ENABLED === "true" || !IS_DEV, // Disable in dev by default

    // App metadata
    appVersion: "1.0.0",
    buildNumber: "1",
    environment: IS_DEV ? "development" : IS_PREVIEW ? "preview" : "production",

    // Legal URLs (REQUIRED for app stores)
    privacyPolicyUrl: "https://clgmate.app/privacy",
    termsOfServiceUrl: "https://clgmate.app/terms",
    supportEmail: "support@clgmate.app",

    // Feature flags
    enableAnalytics: !IS_DEV,
    enableCrashReporting: !IS_DEV,

    // EAS Project
    eas: {
      projectId: process.env.EAS_PROJECT_ID || "your-project-id-here",
    },
  },

  // Over-the-Air Updates configuration
  updates: {
    url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
    fallbackToCacheTimeout: 0, // Instant updates
    checkAutomatically: "ON_LOAD", // Check for updates on app launch
  },

  // Runtime version for updates
  runtimeVersion: {
    policy: "sdkVersion", // Or "appVersion" for custom versioning
  },
});
