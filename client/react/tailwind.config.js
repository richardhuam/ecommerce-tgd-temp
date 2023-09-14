const { UIConfig } = require('./src/config/ui.config');
const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    zIndex: {
      base: UIConfig().zIndex.base,
      footer: UIConfig().zIndex.footer,
      sidebar: UIConfig().zIndex.sidebar,
      navbar: UIConfig().zIndex.navbar,
      menu: UIConfig().zIndex.menu,
      modal: UIConfig().zIndex.modal,
      dropdown: UIConfig().zIndex.dropdown,
      indicator: UIConfig().zIndex.indicator,
    },

    extend: {
      colors: {
        icon: '#626876',
        primary: {
          DEFAULT: UIConfig().colors.primary,
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: UIConfig().colors.secondary,
          foreground: '#ffffff',
        },
        'main-carousel': UIConfig().colors.mainCarousel,
      },
      screens: {
        xs: '380px',
      },
      fontFamily: {
        'dm-sans': "'DM Sans', sans-serif",
      },
      boxShadow: {
        sidebar: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
        navbar: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
        card: 'rgba(90, 114, 123, 0.11) 0px 7px 30px 0px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: UIConfig().colors.primary,
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: UIConfig().colors.secondary,
              foreground: '#ffffff',
            },
            danger: {
              DEFAULT: UIConfig().colors.danger,
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: UIConfig().colors.success,
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: UIConfig().colors.primary,
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: UIConfig().colors.secondary,
              foreground: '#ffffff',
            },
            danger: {
              DEFAULT: UIConfig().colors.danger,
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: UIConfig().colors.success,
              foreground: '#ffffff',
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};
