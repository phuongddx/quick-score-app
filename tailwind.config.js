/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4 requires this preset
  presets: [require('nativewind/preset')],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        'bg-primary': '#0D1117',
        'bg-surface': '#161B22',
        'bg-surface-alt': '#1C2128',
        'bg-elevated': '#21262D',
        // Borders
        'border-default': '#30363D',
        // Text
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'text-muted': '#484F58',
        // Accent — live/active
        'accent-live': '#00C853',
        'accent-live-dim': 'rgba(0,200,83,0.12)',
        // Accent — states
        'accent-danger': '#FF3D3D',
        'accent-warning': '#FFB300',
        'accent-blue': '#2196F3',
        'accent-blue-dim': 'rgba(33,150,243,0.12)',
        // Standings zone colors
        'cl-zone': '#00C853',
        'el-zone': '#FF9800',
        'ecl-zone': '#9C27B0',
        'rel-zone': '#FF3D3D',
      },
    },
  },
  plugins: [],
};
