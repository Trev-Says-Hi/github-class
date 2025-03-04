import { Meta, StoryObj } from '@storybook/react';

import Combobox from '../components/Combobox/Combobox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Library/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {

  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type here...',
    options: [
      { key: '1', value: 'Hello' },
      { key: '2', value: 'What' },
      { key: '3', value: 'Is Happening' },
      // Add as many options as you like
    ],
  }
};
