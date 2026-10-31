import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../translations/i18n';
import COLORS from '../../constants/colors';

const LANGUAGES = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
];

/**
 * LanguageSwitcher
 * Menampilkan dua pilihan bahasa (ID/EN) yang bisa ditekan langsung.
 * Perubahan bahasa berlaku instan (live) di seluruh aplikasi berkat
 * react-i18next, tanpa perlu restart.
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'id';

  return (
    <View style={styles.container}>
      {LANGUAGES.map(lang => {
        const active = currentLang === lang.code;
        return (
          <Pressable
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>
              {lang.label}
            </Text>
          </Pressable>
        );
      })}
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
