import type { Preview } from '@storybook/react'
import "../src/app/index.scss";


const customViewports = {
  instagram: {
    name: "Instagram",
    styles: {
      width: "1080px",
      height: "1350px",
    },
  },
};


const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    viewport: {
      viewports: {
        ...customViewports,
      },

      defaultViewport: "Instagram",
    },

    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000",
        },
      ],
    },
  },  
};

export default preview;