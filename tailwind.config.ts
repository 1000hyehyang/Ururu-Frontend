import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1280px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '24px',
          tablet: '36px',
          desktop: '48px',
        },
        screens: {
          mobile: '375px',
          tablet: '768px',
          desktop: '1280px',
        },
      },
      colors: {
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'text-100': 'var(--text-100)',
        'text-200': 'var(--text-200)',
        'text-300': 'var(--text-300)',
        'text-400': 'var(--text-400)',
        'text-on': 'var(--text-on)',
        'bg-100': 'var(--bg-100)',
        'bg-200': 'var(--bg-200)',
        'bg-300': 'var(--bg-300)',
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
