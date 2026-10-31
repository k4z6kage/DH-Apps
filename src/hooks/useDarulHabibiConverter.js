import { useState, useCallback } from 'react';
import { convertToDarulHabibi } from '../utils/darulHabibiConverter';

/**
 * useDarulHabibiConverter
 * Hook kecil untuk mengelola state input/hasil konversi Jawi,
 * supaya komponen Screen tetap bersih (hanya urusan tampilan).
 *
 * @returns {{
 *  inputText: string,
 *  setInputText: Function,
 *  darulHabibiResult: string,
 *  convert: Function,
 *  reset: Function
 * }}
 */
export default function useDarulHabibiConverter() {
  const [inputText, setInputText] = useState('');
  const [darulHabibiResult, setDarulHabibiResult] = useState('');

  const convert = useCallback(() => {
    setDarulHabibiResult(convertToDarulHabibi(inputText.trim()));
  }, [inputText]);

  const reset = useCallback(() => {
    setInputText('');
    setDarulHabibiResult('');
  }, []);

  return { inputText, setInputText, darulHabibiResult, convert, reset };
}
