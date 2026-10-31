import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

/**
 * FloatingTabButton
 * Satu item tab di dalam bottom bar melayang (bukan bar terpisah).
 * Animasi mengecil saat ditekan (press-in) lalu kembali membesar (spring).
 *
 * Props:
 * - label: string          -> teks tombol
 * - active: boolean        -> gaya aktif (terisi hitam)
 * - onPress: function      -> handler saat ditekan
 */
export default function FloatingTabButton({ label, active = false, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = value => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.94)}
        onPressOut={() => animateTo(1)}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        style={[styles.item, active && styles.itemActive]}
      >
        <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    minWidth: 118,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  itemActive: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelActive: {
    color: COLORS.primaryText,
  },
  labelInactive: {
    color: COLORS.textMuted,
  },
});
