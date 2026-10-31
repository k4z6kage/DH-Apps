import { useState, useCallback } from 'react';
import { convertToJawi } from '../utils/jawiConverter';

/**
 * useJawiConverter
 * Hook kecil untuk mengelola state input/hasil konversi Jawi,
 * supaya komponen Screen tetap bersih (hanya urusan tampilan).
 *
 * @returns {{
 *  inputText: string,
 *  setInputText: Function,
 *  jawiResult: string,
 *  convert: Function,
 *  reset: Function
 * }}
 */
export default function useJawiConverter() {
  const [inputText, setInputText] = useState('');
  const [jawiResult, setJawiResult] = useState('');

  const convert = useCallback(() => {
    setJawiResult(convertToJawi(inputText.trim()));
  }, [inputText]);

  const reset = useCallback(() => {
    setInputText('');
    setJawiResult('');
  }, []);

  return { inputText, setInputText, jawiResult, convert, reset };
}
