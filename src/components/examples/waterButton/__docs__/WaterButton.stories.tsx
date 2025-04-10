import type { Meta, StoryObj } from '@storybook/react';
import Example from './Example';

const meta: Meta<typeof Example> = {
  title: 'WaterButton',
  component: Example,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    doc: {
      toc: true,
    },
    controls: {
      exclude: ['onClick'],
    },
    viewport: { defaultViewport: 'Instagram' },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const WaterButton: Story = {
  args: {
    children: 'Hover me, please!',
  },
  parameters: {
    viewport: { defaultViewport: 'Instagram' },
  },
};
