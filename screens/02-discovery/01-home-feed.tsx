import { createBoxShadow, createTextStyle, theme } from "@/design-system/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView
} from "react-native-safe-area-context";

type MatchProfile = {
  id: string;
  anonymousAvatar: string;
  vibeMatch: number;
  department: string;
  college: string;
  publicInterests: string[];
  sharedInterests: number;
};

const mockProfiles: MatchProfile[] = [
  {
    id: "1",
    anonymousAvatar: "🎨",
    vibeMatch: 85,
    department: "CSE",
    college: "LNCT",
    publicInterests: ["Coding", "Table Tennis", "Music"],
    sharedInterests: 3,
  },
  {
    id: "2",
    anonymousAvatar: "🎭",
    vibeMatch: 92,
    department: "ECE",
    college: "LNCT",
    publicInterests: ["Photography", "Gaming", "Coffee"],
    sharedInterests: 4,
  },
  {
    id: "3",
    anonymousAvatar: "🎪",
    vibeMatch: 78,
    department: "ME",
    college: "LNCT",
    publicInterests: ["Sports", "Travel", "Food"],
    sharedInterests: 2,
  },
];

export default function HomeFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatSlotsRemaining, setChatSlotsRemaining] = useState(3);
  const [cardAnimation] = useState(new Animated.Value(0));

  const currentProfile = mockProfiles[currentIndex];

  const handlePass = () => {
    animateCard(() => {
      if (currentIndex < mockProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    });
  };

  const handleChatRequest = () => {
    if (chatSlotsRemaining > 0) {
      setChatSlotsRemaining(chatSlotsRemaining - 1);
      animateCard(() => {
        if (currentIndex < mockProfiles.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      });
    }
  };

  const animateCard = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const generateAvatarPattern = (seed: string) => {
    // Generate a simple geometric pattern based on the avatar seed
    const colors = [
      theme.colors.accent.primary,
      theme.colors.accent.secondary,
      theme.colors.accent.warning,
      "#ec4899",
      "#3b82f6",
    ];
    return colors[seed.length % colors.length];
  };

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <LinearGradient
          colors={[
            theme.colors.background.primary,
            theme.colors.background.secondary,
          ]}
          style={styles.gradient}
        />
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyTitle}>That's everyone for now!</Text>
          <Text style={styles.emptySubtitle}>
            Check back later for new vibes
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <LinearGradient
        colors={[
          theme.colors.background.primary,
          theme.colors.background.secondary,
        ]}
        style={styles.gradient}
      />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusContent}>
          <Text style={styles.statusIcon}>💬</Text>
          <Text
            style={[
              styles.statusText,
              chatSlotsRemaining <= 3 && { color: theme.colors.accent.warning },
            ]}
          >
            {chatSlotsRemaining} chat slots remaining
          </Text>
        </View>
      </View>

      {/* Main Card */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: cardAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.card}>
          {/* Vibe Match Badge */}
          <View style={styles.vibeMatchBadge}>
            <LinearGradient
              colors={[
                theme.colors.accent.primary,
                theme.colors.accent.secondary,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.badgeGradient}
            >
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>
                Vibe Match: {currentProfile.vibeMatch}%
              </Text>
            </LinearGradient>
          </View>

          {/* Anonymous Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[
                generateAvatarPattern(currentProfile.anonymousAvatar),
                theme.colors.background.tertiary,
              ]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarEmoji}>
                {currentProfile.anonymousAvatar}
              </Text>
              <View style={styles.avatarPattern}>
                <View
                  style={[
                    styles.patternBlock,
                    { backgroundColor: "rgba(255,255,255,0.1)" },
                  ]}
                />
                <View
                  style={[
                    styles.patternBlock,
                    { backgroundColor: "rgba(255,255,255,0.15)" },
                  ]}
                />
                <View
                  style={[
                    styles.patternBlock,
                    { backgroundColor: "rgba(255,255,255,0.05)" },
                  ]}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {currentProfile.department} • {currentProfile.college}
              </Text>
            </View>

            {/* Public Interests */}
            <View style={styles.interestsContainer}>
              {currentProfile.publicInterests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>

            {/* Hidden Interests Indicator */}
            <View style={styles.hiddenInterests}>
              <View style={styles.lockIconContainer}>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
              <Text style={styles.hiddenInterestsText}>
                {currentProfile.sharedInterests} shared interests
              </Text>
            </View>

            <Text style={styles.revealHint}>
              Start chatting to reveal hidden interests and identity
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.passButton}
          onPress={handlePass}
          activeOpacity={0.8}
        >
          <View style={styles.passButtonInner}>
            <Text style={styles.passIcon}>✕</Text>
            <Text style={styles.passText}>Pass</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chatButton,
            chatSlotsRemaining === 0 && styles.chatButtonDisabled,
          ]}
          onPress={handleChatRequest}
          disabled={chatSlotsRemaining === 0}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              chatSlotsRemaining > 0
                ? [theme.colors.accent.primary, theme.colors.accent.secondary]
                : [theme.colors.border.subtle, theme.colors.border.subtle]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.chatButtonGradient}
          >
            <Text style={styles.chatIcon}>💬</Text>
            <Text style={styles.chatText}>Chat Request</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🚪</Text>
          <Text style={styles.navLabel}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
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
  statusBar: {
    paddingHorizontal: theme.spacing.spacing.md,
    paddingVertical: theme.spacing.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.spacing.sm,
    justifyContent: "center",
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    ...createTextStyle("caption", theme.colors.text.secondary),
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.spacing.md,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.spacing.borderRadius.xl,
    overflow: "hidden",
    ...createBoxShadow("lg"),
  },
  vibeMatchBadge: {
    position: "absolute",
    top: theme.spacing.spacing.md,
    right: theme.spacing.spacing.md,
    zIndex: 10,
    borderRadius: theme.spacing.borderRadius.round,
    overflow: "hidden",
  },
  badgeGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.spacing.xs,
    paddingHorizontal: theme.spacing.spacing.md,
    paddingVertical: theme.spacing.spacing.sm,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  badgeText: {
    ...createTextStyle("caption", "#ffffff"),
    fontWeight: "700",
  },
  avatarContainer: {
    width: "100%",
    aspectRatio: 1,
  },
  avatarGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarEmoji: {
    fontSize: 80,
    zIndex: 2,
  },
  avatarPattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.3,
  },
  patternBlock: {
    width: "33.33%",
    height: "33.33%",
  },
  profileInfo: {
    padding: theme.spacing.spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.spacing.md,
  },
  infoText: {
    ...createTextStyle("body", theme.colors.text.primary),
    fontWeight: "600",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.spacing.sm,
    marginBottom: theme.spacing.spacing.md,
  },
  interestTag: {
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.spacing.md,
    paddingVertical: theme.spacing.spacing.sm,
    borderRadius: theme.spacing.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  interestText: {
    ...createTextStyle("caption", theme.colors.text.secondary),
  },
  hiddenInterests: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.spacing.md,
    borderRadius: theme.spacing.borderRadius.md,
    marginBottom: theme.spacing.spacing.sm,
  },
  lockIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    fontSize: 16,
  },
  hiddenInterestsText: {
    ...createTextStyle("body", theme.colors.text.primary),
    fontWeight: "600",
  },
  revealHint: {
    ...createTextStyle("caption", theme.colors.text.muted),
    textAlign: "center",
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    gap: theme.spacing.spacing.md,
    paddingHorizontal: theme.spacing.spacing.md,
    paddingBottom: theme.spacing.spacing.lg,
  },
  passButton: {
    flex: 1,
    borderRadius: theme.spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.subtle,
    backgroundColor: theme.colors.background.tertiary,
  },
  passButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.spacing.sm,
    paddingVertical: theme.spacing.spacing.md,
  },
  passIcon: {
    fontSize: 20,
    color: theme.colors.text.muted,
  },
  passText: {
    ...createTextStyle("body", theme.colors.text.muted),
    fontWeight: "600",
  },
  chatButton: {
    flex: 2,
    borderRadius: theme.spacing.borderRadius.md,
    overflow: "hidden",
    ...createBoxShadow("glow"),
  },
  chatButtonDisabled: {
    opacity: 0.5,
  },
  chatButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.spacing.sm,
    paddingVertical: theme.spacing.spacing.md,
  },
  chatIcon: {
    fontSize: 20,
  },
  chatText: {
    ...createTextStyle("body", "#ffffff"),
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: theme.colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.subtle,
    paddingBottom: theme.spacing.spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.spacing.sm,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.accent.primary,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.spacing.xs,
  },
  navLabel: {
    ...createTextStyle("tiny", theme.colors.text.muted),
  },
  navLabelActive: {
    color: theme.colors.accent.primary,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.spacing.lg,
  },
  emptyTitle: {
    ...createTextStyle("heading"),
    marginBottom: theme.spacing.spacing.sm,
  },
  emptySubtitle: {
    ...createTextStyle("body", theme.colors.text.secondary),
  },
});
