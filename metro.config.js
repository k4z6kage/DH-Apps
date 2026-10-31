const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * File ini WAJIB ada di root project, kalau tidak Metro akan gagal
 * start dengan error "No Metro config found".
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
