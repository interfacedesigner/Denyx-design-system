import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopologyGraph } from "@denyx/design-system";

/**
 * Stories for [[TopologyGraph]] — 파이프라인 단계 토폴로지 (Composite).
 * 노드([[TopologyStageNode]]) + 엣지([[TopologyEdge]]) 1단계 조합.
 */
const meta: Meta<typeof TopologyGraph> = {
  title: "Chrome/TopologyGraph",
  component: TopologyGraph,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "**선형 파이프라인 토폴로지.** 단계별 체류/실패 건수를 노드로, 단계 간 흐름을 화살표로 표시. " +
          "실패가 있는 노드는 `--color-surface-critical` 서피스로 자동 강조. " +
          "노드 클릭은 `onStageClick(key)` 로 위임 — 페이지가 필터 드릴다운을 결정.",
      },
    },
  },
  argTypes: {
    stages: { description: "좌→우 순서의 단계 목록.", control: "object" },
    onStageClick: { description: "노드 클릭 콜백 (key). 생략 시 정적.", action: "stageClick" },
  },
  decorators: [(Story) => (<div style={{ maxWidth: 760 }}><Story /></div>)],
};
export default meta;
type Story = StoryObj<typeof TopologyGraph>;

/** 기본 — 당발송금 파이프라인. 파트너 단계에 실패 존재. */
export const RemittancePipeline: Story = {
  args: {
    stages: [
      { key: "intake", label: "접수/검토", count: 5, failedCount: 1, edgeLabel: "42건" },
      { key: "kyc", label: "KYC 인증", count: 7, failedCount: 2, edgeLabel: "35건" },
      { key: "fx", label: "환율/잔액", count: 4, edgeLabel: "31건" },
      { key: "partner", label: "파트너 전송", count: 8, failedCount: 3, edgeLabel: "23건" },
      { key: "done", label: "완료", count: 23, tone: "success" },
    ],
  },
};

/** 실패 없음 — 전 단계 정상. */
export const AllHealthy: Story = {
  args: {
    stages: [
      { key: "a", label: "접수", count: 3, edgeLabel: "12건" },
      { key: "b", label: "처리", count: 4, edgeLabel: "9건" },
      { key: "c", label: "완료", count: 9, tone: "success" },
    ],
  },
};

/** 정적 (클릭 없음) — onStageClick 미지정. */
export const Static: Story = {
  args: {
    stages: [
      { key: "a", label: "접수", count: 3 },
      { key: "b", label: "완료", count: 9, tone: "success" },
    ],
    onStageClick: undefined,
  },
};
