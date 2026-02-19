module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // NativeWind v4: use jsxImportSource, not nativewind/babel plugin
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
