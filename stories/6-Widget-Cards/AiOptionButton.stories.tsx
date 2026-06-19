import type { Meta, StoryObj } from "@storybook/react-vite";
import AiOptionButton from "../../src/widget/AiOptionButton";

const meta: Meta<typeof AiOptionButton> = {
  title: "Primitives/AiOptionButton",
  component: AiOptionButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: { default: "surface-muted" },
    docs: {
      description: {
        component:
          "**선택 옵션 버튼 (part)** — selected(filled blue) / dimmed / pending(자동 클릭 손) / locked 상태.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-6px" style={{ width: 440 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AiOptionButton>;

export const Default: Story = {
  args: {
    label: "기본",
    selected: false,
    dimmed: false,
    pending: false,
    locked: false,
  },
};

export const Selected: Story = {
  args: {
    label: "엄격",
    selected: true,
    dimmed: false,
    pending: false,
    locked: true,
  },
};
