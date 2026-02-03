import { createTextStyle, theme } from "@/design-system/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigate after 3 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Background with subtle gradient */}
      <LinearGradient
        colors={[
          theme.colors.background.primary,
          theme.colors.background.secondary,
          theme.colors.background.primary,
        ]}
        style={styles.gradient}
        locations={[0, 0.5, 1]}
      />

      {/* Floating particles background effect */}
      <View style={styles.particlesContainer}>
        <View style={[styles.particle, styles.particle1]} />
        <View style={[styles.particle, styles.particle2]} />
        <View style={[styles.particle, styles.particle3]} />
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo placeholder - overlapping profiles with bloom effect */}
        <View style={styles.logoContainer}>
          <View style={[styles.profile, styles.profileSolid]} />
          <View style={[styles.profile, styles.profileEthereal]} />
        </View>

        {/* Brand name */}
        <Text style={styles.brandName}>Welcome To College Mate</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Find your people without the pressure
        </Text>
      </Animated.View>

      {/* Swipe hint */}
      <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
        <Text style={styles.hint}>Swipe up to start</Text>
        <View style={styles.swipeIndicator} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.3,
  },
  particle1: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.accent.primary,
    top: "20%",
    left: "10%",
    shadowColor: theme.colors.accent.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
  },
  particle2: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.accent.secondary,
    bottom: "15%",
    right: "5%",
    shadowColor: theme.colors.accent.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  particle3: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.accent.primary,
    top: "60%",
    right: "20%",
    shadowColor: theme.colors.accent.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.spacing.lg,
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.spacing.xl,
    position: "relative",
  },
  profile: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileSolid: {
    backgroundColor: theme.colors.accent.primary,
    left: 0,
    top: 20,
    zIndex: 2,
  },
  profileEthereal: {
    backgroundColor: theme.colors.accent.secondary,
    right: 0,
    top: 0,
    opacity: 0.6,
    shadowColor: theme.colors.accent.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  brandName: {
    ...createTextStyle("display"),
    fontWeight: "700",
    marginBottom: theme.spacing.spacing.md,
    letterSpacing: 2,
  },
  tagline: {
    ...createTextStyle("body", theme.colors.text.secondary),
    textAlign: "center",
    fontWeight: "300",
    maxWidth: 280,
  },
  hintContainer: {
    position: "absolute",
    bottom: theme.spacing.spacing.xxl,
    alignSelf: "center",
    alignItems: "center",
  },
  hint: {
    ...createTextStyle("caption", theme.colors.text.muted),
    marginBottom: theme.spacing.spacing.sm,
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.text.muted,
  },
});
