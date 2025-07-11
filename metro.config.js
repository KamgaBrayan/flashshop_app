const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-url-polyfill/auto': require.resolve('react-native-url-polyfill/auto'),
};

module.exports = config;