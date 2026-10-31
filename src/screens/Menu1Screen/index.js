import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/AppButton';
import useJawiConverter from '../../hooks/useJawiConverter';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';

/**
 * Menu1Screen (Konversi Jawi)
 * Alur tampilan sesuai spesifikasi:
 *   Input Text -> Tombol "Konversi" -> Hasil Konversi Arab Jawi
 */
export default function Menu1Screen() {
  const { t } = useTranslation();
  const { inputText, setInputText, jawiResult, convert } = useJawiConverter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{t('menu1.title')}</Text>

          {/* Input teks Latin */}
          <Text style={styles.label}>{t('menu1.inputLabel')}</Text>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder={t('menu1.inputPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            style={styles.input}
            multiline
          />

          {/* Tombol konversi */}
          <AppButton
            label={t('menu1.convertButton')}
            onPress={convert}
            disabled={inputText.trim().length === 0}
            style={styles.convertButton}
          />

          {/* Hasil konversi Jawi */}
          <Text style={styles.label}>{t('menu1.resultLabel')}</Text>
          <View style={styles.resultBox}>
            {jawiResult ? (
              // fontFamily arabicRegular otomatis dipakai untuk teks Jawi
              <Text style={styles.resultText}>{jawiResult}</Text>
            ) : (
              <Text style={styles.resultPlaceholder}>{t('menu1.emptyResult')}</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 90,
    textAlignVertical: 'top',
    backgroundColor: COLORS.surface,
  },
  convertButton: {
    alignSelf: 'center',
    marginTop: 18,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    minHeight: 90,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
  },
  resultText: {
    fontFamily: FONTS.arabicRegular, // Font Arab (Amiri) untuk tulisan Jawi
    fontSize: 26,
    color: COLORS.text,
    textAlign: 'right', // Arab Jawi ditulis dari kanan ke kiri
    lineHeight: 40,
  },
  resultPlaceholder: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
