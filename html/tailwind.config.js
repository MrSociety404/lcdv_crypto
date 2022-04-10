module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '100vh': '100vh',
      },
      colors: {
        screen: 'var(--bg-screen)',
        bgSecondary: 'var(--bg-secondary)',
        primary: 'var(--primary)',
        primaryLight: 'var(--primary-light)',
        secondary: 'var(--secondary)',
        alert: 'var(--alert)',
      },
    },
  },
  plugins: [],
};
