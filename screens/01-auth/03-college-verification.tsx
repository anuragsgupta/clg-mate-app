import { createBoxShadow, createTextStyle, theme } from "@/design-system/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VerificationStep = "college" | "username" | "success";

const colleges = [
  "LNCT Group of Colleges, Bhopal",
  "LNCT University, Bhopal",
  "LNCT Science Bhopal",
  "BITS Pilani",
  "Other",
];

export default function CollegeVerification({
  onComplete,
}: {
  onComplete?: (userData: any) => void;
}) {
  const [step, setStep] = useState<VerificationStep>("college");
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [showWhyVerify, setShowWhyVerify] = useState(false);

  // College verification fields
  const [selectedCollege, setSelectedCollege] = useState("");
  const [erpLogin, setErpLogin] = useState("");
  const [erpPassword, setErpPassword] = useState("");

  // Username and password fields
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleVerifyCollege = async () => {
    if (!selectedCollege || !erpLogin || !erpPassword) {
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Generate random username
      const randomUsername = `vibe_${Math.random().toString(36).substring(2, 9)}`;
      setGeneratedUsername(randomUsername);
      setStep("username");
    }, 1500);
  };

  const handleCompleteSetup = async () => {
    if (!password || password !== confirmPassword) {
      return;
    }

    // Send verification email
    setVerificationSent(true);
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onComplete?.({
          username: generatedUsername,
          college: selectedCollege,
        });
      }, 2000);
    }, 1000);
  };

  const renderCollegeVerification = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.illustrationContainer}>
          {/* Graduation cap with lock illustration */}
          <View style={styles.capBase}>
            <View style={styles.capTop} />
            <View style={styles.lockIcon}>
              <Text style={styles.lockEmoji}>🔒</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Verify your college</Text>
        <Text style={styles.subtitle}>
          We verify students to keep Vibe safe and authentic
        </Text>
      </View>

      {/* College Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select your college</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCollegeDropdown(true)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.dropdownText,
              !selectedCollege && styles.placeholder,
            ]}
          >
            {selectedCollege || "Choose from list"}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* ERP Login */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ERP Login / Student ID</Text>
        <TextInput
          style={styles.input}
          value={erpLogin}
          onChangeText={setErpLogin}
          placeholder="Enter your ERP login"
          placeholderTextColor={theme.colors.text.muted}
          autoCapitalize="none"
        />
      </View>

      {/* ERP Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ERP Password</Text>
        <TextInput
          style={styles.input}
          value={erpPassword}
          onChangeText={setErpPassword}
          placeholder="Enter your ERP password"
          placeholderTextColor={theme.colors.text.muted}
          secureTextEntry
        />
      </View>

      {/* Why we verify */}
      <TouchableOpacity
        style={styles.expandableSection}
        onPress={() => setShowWhyVerify(!showWhyVerify)}
        activeOpacity={0.8}
      >
        <View style={styles.expandableHeader}>
          <Text style={styles.privacyIcon}>🛡️</Text>
          <Text style={styles.expandableTitle}>Why we verify?</Text>
          <Text style={styles.expandIcon}>{showWhyVerify ? "−" : "+"}</Text>
        </View>
        {showWhyVerify && (
          <Text style={styles.expandableContent}>
            We verify college credentials to ensure a safe, authentic community.
            Your login details are only used once for verification and never
            stored. We never access your college account or share your
            information.
          </Text>
        )}
      </TouchableOpacity>

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.primaryButton,
          (!selectedCollege || !erpLogin || !erpPassword) &&
            styles.primaryButtonDisabled,
        ]}
        onPress={handleVerifyCollege}
        disabled={!selectedCollege || !erpLogin || !erpPassword}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            selectedCollege && erpLogin && erpPassword
              ? [theme.colors.accent.primary, "#00b894"]
              : [theme.colors.border.subtle, theme.colors.border.subtle]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.primaryButtonText}>Send Verification</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Secondary link */}
      <TouchableOpacity style={styles.secondaryLink} activeOpacity={0.7}>
        <Text style={styles.secondaryLinkText}>My college isn't listed</Text>
      </TouchableOpacity>

      {/* Security badges */}
      <View style={styles.securityBadges}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>🔐</Text>
          <Text style={styles.badgeText}>End-to-end encrypted</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>👤</Text>
          <Text style={styles.badgeText}>Anonymous until you choose</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderUsernameSetup = () => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>✓</Text>
        </View>
        <Text style={styles.title}>College verified!</Text>
        <Text style={styles.subtitle}>
          Now let's set up your anonymous profile
        </Text>
      </View>

      {/* Generated Username */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your anonymous username</Text>
        <View style={styles.usernameDisplay}>
          <Text style={styles.usernameText}>{generatedUsername}</Text>
          <View style={styles.randomBadge}>
            <Text style={styles.randomBadgeText}>RANDOM</Text>
          </View>
        </View>
        <Text style={styles.helperText}>
          This random username keeps you anonymous. You can change it later.
        </Text>
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Create password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Min. 8 characters"
          placeholderTextColor={theme.colors.text.muted}
          secureTextEntry
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter password"
          placeholderTextColor={theme.colors.text.muted}
          secureTextEntry
        />
        {confirmPassword && password !== confirmPassword && (
          <Text style={styles.errorText}>Passwords don't match</Text>
        )}
      </View>

      {verificationSent && (
        <View style={styles.emailNotice}>
          <Text style={styles.emailIcon}>📧</Text>
          <Text style={styles.emailText}>
            Verification email sent! Check your college email to activate your
            account.
          </Text>
        </View>
      )}

      {/* Complete Button */}
      <TouchableOpacity
        style={[
          styles.primaryButton,
          (!password || password !== confirmPassword || password.length < 8) &&
            styles.primaryButtonDisabled,
        ]}
        onPress={handleCompleteSetup}
        disabled={
          !password || password !== confirmPassword || password.length < 8
        }
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            password && password === confirmPassword && password.length >= 8
              ? [theme.colors.accent.primary, theme.colors.accent.secondary]
              : [theme.colors.border.subtle, theme.colors.border.subtle]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.primaryButtonText}>Complete Setup</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <View style={styles.successAnimation}>
        <Text style={styles.successLargeEmoji}>🎉</Text>
      </View>
      <Text style={styles.successTitle}>Welcome to Vibe!</Text>
      <Text style={styles.successSubtitle}>
        Your account is being activated. You'll be redirected shortly...
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <LinearGradient
        colors={[
          theme.colors.background.primary,
          theme.colors.background.secondary,
        ]}
        style={styles.gradient}
      />

      {step === "college" && renderCollegeVerification()}
      {step === "username" && renderUsernameSetup()}
      {step === "success" && renderSuccess()}

      {/* College Dropdown Modal */}
      <Modal
        visible={showCollegeDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCollegeDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCollegeDropdown(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select your college</Text>
              <TouchableOpacity onPress={() => setShowCollegeDropdown(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.collegeList}>
              {colleges.map((college) => (
                <TouchableOpacity
                  key={college}
                  style={styles.collegeOption}
                  onPress={() => {
                    setSelectedCollege(college);
                    setShowCollegeDropdown(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.collegeOptionText,
                      selectedCollege === college &&
                        styles.collegeOptionSelected,
                    ]}
                  >
                    {college}
                  </Text>
                  {selectedCollege === college && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    padding: theme.spacing.spacing.md,
    paddingTop: theme.spacing.spacing.xxl,
    paddingBottom: theme.spacing.spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.spacing.xl,
  },
  illustrationContainer: {
    marginBottom: theme.spacing.spacing.lg,
  },
  capBase: {
    position: "relative",
    alignItems: "center",
  },
  capTop: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.accent.secondary,
    borderRadius: 8,
    transform: [{ rotate: "45deg" }],
  },
  lockIcon: {
    position: "absolute",
    top: 30,
    backgroundColor: theme.colors.background.tertiary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...createBoxShadow("glow"),
  },
  lockEmoji: {
    fontSize: 24,
  },
  title: {
    ...createTextStyle("heading"),
    marginBottom: theme.spacing.spacing.sm,
  },
  subtitle: {
    ...createTextStyle("body", theme.colors.text.secondary),
    textAlign: "center",
    maxWidth: 300,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing.lg,
  },
  label: {
    ...createTextStyle("body", theme.colors.text.primary),
    marginBottom: theme.spacing.spacing.sm,
    fontWeight: "600",
  },
  dropdown: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    padding: theme.spacing.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    ...createTextStyle("body"),
  },
  placeholder: {
    color: theme.colors.text.muted,
  },
  dropdownIcon: {
    ...createTextStyle("caption", theme.colors.text.muted),
  },
  input: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    padding: theme.spacing.spacing.md,
    ...createTextStyle("body"),
  },
  expandableSection: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.spacing.borderRadius.md,
    padding: theme.spacing.spacing.md,
    marginBottom: theme.spacing.spacing.lg,
  },
  expandableHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.spacing.sm,
  },
  privacyIcon: {
    fontSize: 20,
  },
  expandableTitle: {
    ...createTextStyle("body", theme.colors.text.primary),
    flex: 1,
    fontWeight: "600",
  },
  expandIcon: {
    ...createTextStyle("body", theme.colors.text.muted),
    fontSize: 20,
  },
  expandableContent: {
    ...createTextStyle("caption", theme.colors.text.secondary),
    marginTop: theme.spacing.spacing.sm,
    lineHeight: 18,
  },
  primaryButton: {
    borderRadius: theme.spacing.borderRadius.md,
    overflow: "hidden",
    marginBottom: theme.spacing.spacing.md,
    ...createBoxShadow("md"),
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: theme.spacing.spacing.md,
    alignItems: "center",
  },
  primaryButtonText: {
    ...createTextStyle("body"),
    fontWeight: "600",
    color: "#ffffff",
  },
  secondaryLink: {
    alignItems: "center",
    padding: theme.spacing.spacing.sm,
    marginBottom: theme.spacing.spacing.xl,
  },
  secondaryLinkText: {
    ...createTextStyle("body", theme.colors.accent.primary),
    textDecorationLine: "underline",
  },
  securityBadges: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: theme.spacing.spacing.md,
  },
  badge: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.spacing.borderRadius.sm,
    padding: theme.spacing.spacing.sm,
    alignItems: "center",
    gap: theme.spacing.spacing.xs,
  },
  badgeIcon: {
    fontSize: 20,
  },
  badgeText: {
    ...createTextStyle("caption", theme.colors.text.secondary),
    textAlign: "center",
  },
  usernameDisplay: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.accent.primary,
    padding: theme.spacing.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameText: {
    ...createTextStyle("body", theme.colors.accent.primary),
    fontWeight: "600",
  },
  randomBadge: {
    backgroundColor: theme.colors.accent.primary,
    paddingHorizontal: theme.spacing.spacing.sm,
    paddingVertical: theme.spacing.spacing.xs,
    borderRadius: theme.spacing.borderRadius.sm,
  },
  randomBadgeText: {
    ...createTextStyle("tiny", "#ffffff"),
    fontWeight: "700",
  },
  helperText: {
    ...createTextStyle("caption", theme.colors.text.muted),
    marginTop: theme.spacing.spacing.xs,
  },
  errorText: {
    ...createTextStyle("caption", theme.colors.accent.warning),
    marginTop: theme.spacing.spacing.xs,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.accent.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.spacing.lg,
    ...createBoxShadow("glow"),
  },
  successEmoji: {
    fontSize: 40,
    color: "#ffffff",
  },
  emailNotice: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.spacing.borderRadius.md,
    padding: theme.spacing.spacing.md,
    flexDirection: "row",
    gap: theme.spacing.spacing.sm,
    marginBottom: theme.spacing.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent.primary,
  },
  emailIcon: {
    fontSize: 24,
  },
  emailText: {
    ...createTextStyle("body", theme.colors.text.secondary),
    flex: 1,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.spacing.xl,
  },
  successAnimation: {
    marginBottom: theme.spacing.spacing.xl,
  },
  successLargeEmoji: {
    fontSize: 80,
  },
  successTitle: {
    ...createTextStyle("display"),
    marginBottom: theme.spacing.spacing.md,
    textAlign: "center",
  },
  successSubtitle: {
    ...createTextStyle("body", theme.colors.text.secondary),
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.colors.background.secondary,
    borderTopLeftRadius: theme.spacing.borderRadius.xl,
    borderTopRightRadius: theme.spacing.borderRadius.xl,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
  },
  modalTitle: {
    ...createTextStyle("heading"),
  },
  modalClose: {
    ...createTextStyle("heading", theme.colors.text.muted),
  },
  collegeList: {
    padding: theme.spacing.spacing.md,
  },
  collegeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.spacing.md,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.sm,
    marginBottom: theme.spacing.spacing.sm,
  },
  collegeOptionText: {
    ...createTextStyle("body"),
    flex: 1,
  },
  collegeOptionSelected: {
    color: theme.colors.accent.primary,
    fontWeight: "600",
  },
  checkmark: {
    color: theme.colors.accent.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
});
