/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--nova-colors-bg)',
        elevated: 'var(--nova-colors-bgElevated)',
        panel: 'var(--nova-colors-panel)',
        border: 'var(--nova-colors-border)',
        text: 'var(--nova-colors-text)',
        muted: 'var(--nova-colors-textMuted)',
        accent: 'var(--nova-colors-accentTeal)',
        accentBlue: 'var(--nova-colors-accentBlue)',
        danger: 'var(--nova-colors-danger)',
        success: 'var(--nova-colors-success)',
      },
      borderRadius: {
        'nova-sm': 'var(--nova-radius-sm)',
        'nova-md': 'var(--nova-radius-md)',
        'nova-lg': 'var(--nova-radius-lg)',
        'nova-xl': 'var(--nova-radius-xl)',
      },
      boxShadow: {
        'nova-sm': 'var(--nova-shadow-sm)',
        'nova-md': 'var(--nova-shadow-md)',
        'nova-lg': 'var(--nova-shadow-lg)',
      },
      backdropBlur: {
        'nova-panel': 'var(--nova-blur-panelBlur)',
      },
      transitionDuration: {
        'nova-fast': 'var(--nova-motion-fast)',
        'nova-normal': 'var(--nova-motion-normal)',
        'nova-slow': 'var(--nova-motion-slow)',
      },
      transitionTimingFunction: {
        'nova-ease': 'var(--nova-motion-ease)',
      },
    },
  },
  plugins: [],
};
