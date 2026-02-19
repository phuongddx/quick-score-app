const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// NativeWind v4: withNativeWind wraps config for CSS processing
module.exports = withNativeWind(config, { input: './global.css' });
