import colors from "./tokens/colors.json";
import shadows from "./tokens/shadows.json";
import spacing from "./tokens/spacing.json";
import typography from "./tokens/typography.json";

// Type definitions
export type ColorToken = (typeof colors)["midnight-garden"];
export type TypographyScale = typeof typography.scale;
export type SpacingToken = typeof spacing;
export type ShadowToken = typeof shadows;

// Export the Midnight Garden theme
export const theme = {
  colors: colors["midnight-garden"],
  typography: typography,
  spacing: spacing,
  shadows: shadows.shadows,
} as const;

// Helper functions for React Native styling
export const createTextStyle = (
  scale: keyof TypographyScale,
  color?: string,
  additionalStyles?: object,
) => {
  const typo = typography.scale[scale];
  return {
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: typo.fontWeight as any,
    color: color || theme.colors.text.primary,
    ...additionalStyles,
  };
};

export const createBoxShadow = (shadowType: "sm" | "md" | "lg" | "glow") => {
  return shadows.shadows[shadowType];
};

// Export individual tokens for convenience
export const { colors: themeColors } = theme;
export const { typography: themeTypography } = theme;
export const { spacing: themeSpacing } = theme;
export const { shadows: themeShadows } = theme;

export default theme;
