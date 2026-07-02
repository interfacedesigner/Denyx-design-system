import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopologyStageNode, TopologyEdge } from "@denyx/design-system";

/**
 * Stories for [[TopologyStageNode]] / [[TopologyEdge]] — 토폴로지 Parts (Primitives).
 */
const meta: Meta<typeof TopologyStageNode> = {
  title: "Chrome/TopologyStageNode",
  component: TopologyStageNode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**토폴로지 단계 노드 (Primitive).** 라벨 + 체류 건수 + 실패 건수. " +
          "실패 > 0 이면 critical 서피스/보더 토큰으로 자동 강조. 색은 토큰만 사용.",
      },
    },
  },
  argTypes: {
    label: { description: "단계 라벨.", control: "text" },
    count: { description: "체류 건수.", control: "number" },
    failedCount: { description: "실패 건수 (> 0 → critical 강조).", control: "number" },
    tone: { description: "수치 톤 override.", control: "select", options: ["neutral", "info", "success", "critical"] },
    unit: { description: "단위 라벨. 기본 '건'.", control: "text" },
    onClick: { description: "클릭 콜백 — 지정 시 button 렌더.", action: "click" },
  },
};
export default meta;
type Story = StoryObj<typeof TopologyStageNode>;

/** 기본 — 정상 단계. */
export const Default: Story = {
  args: { label: "KYC 인증", count: 7 },
};

/** 실패 강조 — critical 서피스 자동 적용. */
export const WithFailure: Story = {
  args: { label: "파트너 전송", count: 8, failedCount: 3 },
};

/** 완료 노드 — success 톤. */
export const SuccessTone: Story = {
  args: { label: "완료", count: 23, tone: "success" },
};

/** 엣지와 조합 — [[TopologyEdge]] 는 노드 사이 연결선 primitive. */
export const WithEdge: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", width: 320 }}>
      <TopologyStageNode label="접수" count={5} />
      <TopologyEdge label="12건" />
      <TopologyStageNode label="완료" count={12} tone="success" />
    </div>
  ),
};
