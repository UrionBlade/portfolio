import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "WaterButton",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const WaterButton: Story = {
  args: {
    children: "Hello guys!",
    full: false,
  },
  parameters: {
    viewport: { defaultViewport: "Instagram" },
  },
};
