import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { changeLanguage } from '../../translations/i18n';
import COLORS from '../../constants/colors';


/**
 * LanguageSwitcher
 * Menampilkan dua pilihan bahasa (ID/EN) yang bisa ditekan langsung.
 * Perubahan bahasa berlaku instan (live) di seluruh aplikasi berkat
 * react-i18next, tanpa perlu restart.
 */
export default function Donate() {

  return (
    <View style={styles.container}>
      <Text>Donate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  pillTextActive: {
    color: COLORS.primaryText,
  },
});
