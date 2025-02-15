/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '25px',
        },
        screens: ['1200px'],
      },
      backdropBlur: {
        custom: '7px',
      },
      colors: {
        primary: {
          DEFAULT: '#33B34A',
        },
        blue: {
          DEFAULT: '#001C3C',
        },
        dark: {
          DEFAULT: '#18181B',
          100: '#002734',
          200: '#10161C',
          300: '#1C1F20',
          400: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#FFFFFF29',
          200: '#D6E3D8',
          300: '#F8F9FA',
        },
        warning: {
          DEFAULT: '#FFB900',
          100: '#CAA244',
          200: '#caa24462',
        },
        green: {
          DEFAULT: '#0BB43B',
          100: '#1b4b2b77',
        },
        gray: {
          DEFAULT: '#FAFAFA',
          100: '#E4E4E7',
          200: '#F9F5E9',
          300: '#8F8F8E',
          400: '#ffffff89',
          500: '#ffffff2f',
          600: '#707377',
          700: '#FFFFFF33',
          800: '#FFFFFF1A',
        },
        red: {
          DEFAULT: '#E04A36',
        },
      },
      boxShadow: {
        card: '0px 4px 4px 0px #00000040',
      },
      backgroundImage: {
        gradient: 'linear-gradient(180deg, #33B34A 0%, #10161C 100%)',
      },
      borderRadius: {
        8: '8px',
        10: '10px',
        16: '16px',
        14: '14px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        32: '32px',
        44: '44px',
      },
      lineHeight: {
        120: '120%',
        125: '125%',
        130: '130%',
        140: '140%',
      },
    },
  },
  plugins: [],
}
