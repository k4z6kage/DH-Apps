import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

/**
 * AppButton
 * Tombol reusable dengan gaya modern: rounded corner 10-12px,
 * shadow ringan, dan efek tekan (opacity) sederhana.
 *
 * Props:
 * - label: string        -> teks tombol
 * - onPress: function     -> handler saat ditekan
 * - variant: 'primary' | 'outline' (default 'primary')
 * - style: object          -> style tambahan (opsional)
 * - disabled: boolean
 */
export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, isOutline ? styles.labelOutline : styles.labelPrimary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    minWidth: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // Shadow ringan (iOS)
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow ringan (Android)
    elevation: 3,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelPrimary: {
    color: COLORS.primaryText,
  },
  labelOutline: {
    color: COLORS.text,
  },
});
