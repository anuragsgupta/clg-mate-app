import SplashScreen from "@/screens/01-auth/01-splash-screen";
import OnboardingVibeCheck from "@/screens/01-auth/02-onboarding-vibe-check";
import CollegeVerification from "@/screens/01-auth/03-college-verification";
import HomeFeed from "@/screens/02-discovery/01-home-feed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

type AppState = "splash" | "onboarding" | "verification" | "home";

export default function WelcomeScreen() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const handleSplashComplete = () => {
    setAppState("onboarding");
  };

  const handleOnboardingNext = (vibes: string[]) => {
    setSelectedVibes(vibes);
    console.log("Selected vibes:", vibes);
    setAppState("verification");
  };

  const handleVerificationComplete = (data: any) => {
    setUserData(data);
    console.log("User data:", data);
    setAppState("home");
  };

  if (appState === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === "onboarding") {
    return <OnboardingVibeCheck onNext={handleOnboardingNext} />;
  }

  if (appState === "verification") {
    return <CollegeVerification onComplete={handleVerificationComplete} />;
  }

  if (appState === "home") {
    return <HomeFeed />;
  }

  return null;
}

const styles = StyleSheet.create({});
