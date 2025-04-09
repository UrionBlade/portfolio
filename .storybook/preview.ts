import type { Preview } from '@storybook/react'
import "../src/app/index.scss";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
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