import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'grid-cols-xs', // Force Tailwind to include this class
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1920px",
    },

    extend: {

      cursor: {
        default: 'url(/cursors/pointer.png), default',
        pointer: 'url(/cursors/link.png), pointer',
        text: 'url(/cursors/text.png), text',
        'nwse-resize': 'url(/cursors/resize.png), nwse-resize',
        'ns-resize': 'url(/cursors/resize.png), ns-resize',
        'not-allowed': 'url(/cursors/unavailable.png), not-allowed',
      },

      fontFamily: {
        'camera-obscura': ['CameraObscura'],
      },

      gridTemplateColumns: {
        xs: "repeat(4, minmax(0px, 1fr))",
        sm: "repeat(4, minmax(0px, 1fr))",
        md: "repeat(8, minmax(0px, 1fr))",
        lg: "repeat(8, minmax(0px, 1fr))",
        xl: "repeat(12, minmax(0px, 1fr))",
        "2xl": "repeat(12, minmax(0px, 1fr))",
        "3xl": "repeat(12, minmax(0px, 1fr))",
        "4xl": "repeat(12, minmax(0px, 1fr))",
      },

      keyframes: {
        bouncer: {
          '0%, 100%': {
            transform: 'translateY(-17%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },

      animation: {
        bouncer: 'bouncer 2s ease-in-out infinite',
      },

      colors:{
        red: {
          '50': '#fff1f1',
          '100': '#ffe1e1',
          '200': '#ffc7c7',
          '300': '#ffa0a0',
          '400': '#ff6666',
          '500': '#f83b3b',
          '600': '#e51d1d',
          '700': '#c11414',
          '800': '#a01414',
          '900': '#841818',
          '950': '#480707',
        },
        yellow: {
          '50': '#fefaec',
          '100': '#faf1cb',
          '200': '#f5e192',
          '300': '#efcc5a',
          '400': '#edbd42',
          '500': '#e49a1c',
          '600': '#ca7615',
          '700': '#a85515',
          '800': '#894217',
          '900': '#703717',
          '950': '#401b08',
        },
        green: {
          '50': '#eefbf2',
          '100': '#d7f4de',
          '200': '#b1e9c1',
          '300': '#7fd69e',
          '400': '#44bb72',
          '500': '#27a25a',
          '600': '#198247',
          '700': '#14683b',
          '800': '#125331',
          '900': '#104429',
          '950': '#082618',
        },
        blue: {
          '50': '#f0fdfc',
          '100': '#cef9f6',
          '200': '#9cf3ee',
          '300': '#63e5e3',
          '400': '#3fcfd1',
          '500': '#1aaeb2',
          '600': '#12898f',
          '700': '#136c72',
          '800': '#14555b',
          '900': '#15484c',
          '950': '#06282d',
        },
        
        gray: {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#212121',
        },
      }
    },
  },
  plugins: [],
};
export default config;
