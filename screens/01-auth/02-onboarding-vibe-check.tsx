import { createBoxShadow, createTextStyle, theme } from "@/design-system/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VibeOption = {
  id: string;
  label: string;
  icon: string;
  accentColor: string;
  description: string;
};

const vibeOptions: VibeOption[] = [
  {
    id: "project-partner",
    label: "Project Partner",
    icon: "💡",
    accentColor: "#f59e0b",
    description: "Collaborate on projects",
  },
  {
    id: "roommate",
    label: "Roommate",
    icon: "🏠",
    accentColor: "#3b82f6",
    description: "Find your living buddy",
  },
  {
    id: "friend",
    label: "Friend",
    icon: "☕",
    accentColor: "#10b981",
    description: "Make new friends",
  },
  {
    id: "something-more",
    label: "Something More",
    icon: "✨",
    accentColor: "#ec4899",
    description: "Seeking connection",
  },
];

export default function OnboardingVibeCheck({
  onNext,
}: {
  onNext?: (selected: string[]) => void;
}) {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [currentStep] = useState(1);
  const totalSteps = 3;

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId)
        ? prev.filter((id) => id !== vibeId)
        : [...prev, vibeId],
    );
  };

  const handleContinue = () => {
    if (selectedVibes.length > 0) {
      onNext?.(selectedVibes);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Background gradient */}
      <LinearGradient
        colors={[
          theme.colors.background.primary,
          theme.colors.background.secondary,
        ]}
        style={styles.gradient}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index + 1 === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What brings you here?</Text>
          <Text style={styles.subtitle}>
            Select all that match your vibe. You can change this anytime.
          </Text>
        </View>

        {/* Vibe cards grid */}
        <View style={styles.cardsContainer}>
          {vibeOptions.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.id);
            return (
              <TouchableOpacity
                key={vibe.id}
                activeOpacity={0.8}
                onPress={() => toggleVibe(vibe.id)}
                style={styles.cardWrapper}
              >
                <View
                  style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                    {
                      borderColor: isSelected
                        ? vibe.accentColor
                        : theme.colors.border.subtle,
                      ...createBoxShadow(isSelected ? "glow" : "md"),
                      shadowColor: isSelected ? vibe.accentColor : "#000",
                    },
                  ]}
                >
                  {/* Glassmorphism overlay */}
                  <View
                    style={[
                      styles.glassOverlay,
                      isSelected && {
                        backgroundColor: `${vibe.accentColor}15`,
                      },
                    ]}
                  />

                  {/* Icon */}
                  <Text style={styles.icon}>{vibe.icon}</Text>

                  {/* Label */}
                  <Text style={styles.cardLabel}>{vibe.label}</Text>

                  {/* Description */}
                  <Text style={styles.cardDescription}>{vibe.description}</Text>

                  {/* Selection indicator */}
                  {isSelected && (
                    <View
                      style={[
                        styles.selectionCheck,
                        { backgroundColor: vibe.accentColor },
                      ]}
                    >
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer note */}
        <Text style={styles.footerNote}>You can change this anytime</Text>
      </ScrollView>

      {/* Continue button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedVibes.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedVibes.length === 0}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              selectedVibes.length > 0
                ? [theme.colors.accent.primary, theme.colors.accent.secondary]
                : [theme.colors.border.subtle, theme.colors.border.subtle]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text
              style={[
                styles.buttonText,
                selectedVibes.length === 0 && styles.buttonTextDisabled,
              ]}
            >
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing.md,
    paddingTop: theme.spacing.spacing.xxl,
    paddingBottom: 100,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.spacing.sm,
    marginBottom: theme.spacing.spacing.xl,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border.subtle,
  },
  progressDotActive: {
    backgroundColor: theme.colors.accent.primary,
    width: 24,
  },
  header: {
    marginBottom: theme.spacing.spacing.xl,
  },
  title: {
    ...createTextStyle("heading"),
    marginBottom: theme.spacing.spacing.sm,
  },
  subtitle: {
    ...createTextStyle("body", theme.colors.text.secondary),
    lineHeight: 24,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.spacing.md,
    marginBottom: theme.spacing.spacing.lg,
  },
  cardWrapper: {
    width: "47%",
  },
  card: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.lg,
    borderWidth: 2,
    padding: theme.spacing.spacing.lg,
    minHeight: 160,
    position: "relative",
    overflow: "hidden",
  },
  cardSelected: {
    borderWidth: 2,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay.glass,
  },
  icon: {
    fontSize: 40,
    marginBottom: theme.spacing.spacing.md,
  },
  cardLabel: {
    ...createTextStyle("body"),
    fontWeight: "600",
    marginBottom: theme.spacing.spacing.xs,
  },
  cardDescription: {
    ...createTextStyle("caption", theme.colors.text.muted),
    lineHeight: 16,
  },
  selectionCheck: {
    position: "absolute",
    top: theme.spacing.spacing.sm,
    right: theme.spacing.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerNote: {
    ...createTextStyle("caption", theme.colors.text.muted),
    textAlign: "center",
    marginTop: theme.spacing.spacing.lg,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.subtle,
  },
  continueButton: {
    borderRadius: theme.spacing.borderRadius.md,
    overflow: "hidden",
    ...createBoxShadow("md"),
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: theme.spacing.spacing.md,
    alignItems: "center",
  },
  buttonText: {
    ...createTextStyle("body"),
    fontWeight: "600",
    color: "#ffffff",
  },
  buttonTextDisabled: {
    color: theme.colors.text.muted,
  },
});
