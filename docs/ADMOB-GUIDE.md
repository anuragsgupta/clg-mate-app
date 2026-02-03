# AdMob Integration Guide

## 📦 What's Configured

✅ **react-native-google-mobile-ads** installed  
✅ **Test IDs** configured (safe for development)  
✅ **Loosely coupled** ad modules (easy to modify/test)  
✅ **iOS & Android** support

---

## 🚀 Quick Start

### 1. Initialize AdMob at App Startup

```typescript
// app/_layout.tsx
import { useEffect } from 'react';
import { adManager } from '@/services/ads/AdManager';

export default function RootLayout() {
  useEffect(() => {
    // Initialize AdMob once at app startup
    adManager.initialize();
  }, []);

  return (
    // Your app layout
  );
}
```

### 2. Add Banner Ads to Any Screen

```typescript
// screens/02-discovery/01-home-feed.tsx
import AdBanner from '@/services/ads/AdBanner';

export default function HomeFeed() {
  return (
    <View style={styles.container}>
      {/* Your content */}

      {/* Bottom banner ad */}
      <AdBanner
        position="bottom"
        size="banner"
        onAdEvent={{
          onAdLoaded: () => console.log('Ad ready'),
          onAdFailedToLoad: (error) => console.error('Ad failed:', error),
        }}
      />
    </View>
  );
}
```

---

## 🔧 Configuration Files

### `app.config.ts`

- AdMob plugin with test IDs
- Environment variables for production IDs
- GDPR consent message

### `services/ads/AdManager.ts`

- Centralized ad configuration
- SDK initialization
- Enable/disable ads globally
- Test mode detection

### `services/ads/AdBanner.tsx`

- Reusable banner component
- Error handling
- Event callbacks
- Auto-hides on failure

### `services/ads/types.ts`

- Type definitions
- Easy to extend for new ad types

---

## 🎯 Recommended Placement Strategy

### ✅ Good Placements (Low Impact on UX)

1. **Home Feed (Bottom)** - During profile browsing
2. **Between Match Views** - After 3-5 profiles
3. **Chat List (Bottom)** - Not in active chats

### ❌ Avoid These

- Active chat screens (kills engagement)
- Login/registration screens (first impression matters)
- Profile edit screens (user is focused)
- Payment screens (looks unprofessional)

---

## 📊 Expected Revenue (Realistic)

| Users  | Daily Active | Impressions/Day | Revenue/Month (₹) |
| ------ | ------------ | --------------- | ----------------- |
| 1,000  | 200 (20%)    | 1,000           | ₹4,000-10,000     |
| 5,000  | 1,000 (20%)  | 5,000           | ₹20,000-50,000    |
| 10,000 | 2,000 (20%)  | 10,000          | ₹40,000-1,00,000  |

**Assumptions:**

- CPM: ₹200-500 (India average)
- 5 ad views per active user per day
- 20% daily active rate

---

## 🔐 Production Setup

### Step 1: Create AdMob Account

1. Go to [https://apps.admob.com/](https://apps.admob.com/)
2. Sign in with Google account
3. Click "Get Started" → "Add your first app"

### Step 2: Register Your App

**For Android:**

1. Select Android platform
2. Enter app name: "ClgMate"
3. Choose "Yes, it's listed on Google Play" (or No if testing)
4. Copy the App ID: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`

**For iOS:**

1. Select iOS platform
2. Enter app name: "ClgMate"
3. Copy the App ID

### Step 3: Create Ad Units

1. Go to "Ad Units" section
2. Click "Add Ad Unit" → "Banner"
3. Name it: "Home Feed Banner"
4. Copy the Ad Unit ID: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`

### Step 4: Update Environment Variables

Create `.env` file:

```bash
# Production AdMob IDs
ADMOB_ANDROID_APP_ID=ca-app-pub-YOUR-ANDROID-APP-ID
ADMOB_IOS_APP_ID=ca-app-pub-YOUR-IOS-APP-ID
ADMOB_BANNER_ANDROID=ca-app-pub-YOUR-ANDROID-BANNER-ID
ADMOB_BANNER_IOS=ca-app-pub-YOUR-IOS-BANNER-ID
ADMOB_ENABLED=true
```

### Step 5: Rebuild App

```bash
# After changing AdMob IDs, rebuild the app
eas build --profile production --platform all
```

---

## 🧪 Testing

### Test Ads (Current Setup)

- Currently using Google's **official test IDs**
- Safe to test without violating policies
- No risk of account suspension

### Test in Development

```bash
# Start development server
npx expo start

# Ads will show test banners (clearly labeled "Test Ad")
```

### Verify Ad Loading

Check console logs:

```
✅ AdMob initialized successfully
✅ Ad loaded successfully
```

---

## ⚠️ Privacy & Compliance

### GDPR (EU Users)

If you have EU users, you **must** show consent dialog:

```typescript
import { AdsConsent } from "react-native-google-mobile-ads";

// Request consent before showing ads
const consentInfo = await AdsConsent.requestInfoUpdate();
if (consentInfo.isConsentFormAvailable) {
  await AdsConsent.showForm();
}
```

### Privacy Policy Update Required

Add to your privacy policy:

```
We use Google AdMob to show advertisements. AdMob may collect:
- Device information (OS, model, unique IDs)
- Usage data (app interactions, ad views)
- Location data (if granted)

For more information: https://policies.google.com/privacy
```

### Age Restriction

- Your app is for college students (18+)
- AdMob configured for **MATURE_AUDIENCE**
- No child-directed content

---

## 🛠️ Advanced Usage

### Disable Ads for Premium Users

```typescript
import { adManager } from "@/services/ads/AdManager";

// After user purchases premium
const upgradeToPremium = () => {
  adManager.disable();
  // Save preference to database
};
```

### Track Ad Revenue

```typescript
<AdBanner
  onAdEvent={{
    onAdLoaded: () => {
      // Track ad impression
      analytics.track('ad_impression', { placement: 'home_feed' });
    },
    onAdClicked: () => {
      // Track ad click
      analytics.track('ad_click', { placement: 'home_feed' });
    },
  }}
/>
```

### A/B Test Ad Placements

```typescript
const showAd = Math.random() < 0.5; // 50% of users see ads

{showAd && <AdBanner position="bottom" />}
```

---

## 🐛 Troubleshooting

### "Ad failed to load" Error

**Causes:**

1. No internet connection
2. AdMob account not approved yet (takes 24-48 hours)
3. Test IDs used in production build
4. Ad inventory unavailable in your region

**Solution:**

```typescript
// Component automatically hides on error
// Check console for specific error message
```

### Ads Not Showing

1. Check if `ADMOB_ENABLED=true` in .env
2. Verify AdMob IDs are correct
3. Wait 24-48 hours after AdMob account creation
4. Check AdMob dashboard for approval status

### Test Ads in Production Build

**DO NOT** use test IDs in production! This violates AdMob policies and can get you banned.

---

## 📱 Platform-Specific Notes

### Android

- Requires `google-services.json` file
- Will add to project automatically when you connect Firebase

### iOS

- No additional files needed
- Works with test IDs immediately

---

## 🎓 Best Practices

1. **Limit Ad Frequency**
   - Don't show ads every screen
   - Max 1-2 ads per user session

2. **Strategic Placement**
   - Bottom of screens (less intrusive)
   - Between natural breaks in content

3. **Monitor Performance**
   - Track fill rate (% of successful ad loads)
   - Track CTR (click-through rate)
   - Remove low-performing placements

4. **User Experience First**
   - Ads should never block content
   - Easy to dismiss if needed
   - Don't surprise users with full-screen ads

---

## 📚 Resources

- [AdMob Official Docs](https://developers.google.com/admob)
- [React Native Google Mobile Ads](https://github.com/invertase/react-native-google-mobile-ads)
- [AdMob Policy Center](https://support.google.com/admob/answer/6128543)

---

## ✅ Next Steps

1. ✅ AdMob configured with test IDs
2. ⏳ **You decide:** Where to place banners
3. ⏳ Initialize AdMob in `app/_layout.tsx`
4. ⏳ Add `<AdBanner />` to chosen screens
5. ⏳ Create AdMob account when ready
6. ⏳ Replace test IDs with production IDs
7. ⏳ Submit app for review
8. ⏳ Monitor revenue in AdMob dashboard

**Current Status:** ✅ Ready to add banners to screens!
