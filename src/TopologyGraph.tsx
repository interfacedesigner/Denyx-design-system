/**
 * TopologyGraph — Composite (Chrome). 파이프라인 단계 토폴로지 (노드 → 엣지 → 노드).
 *
 * ## Purpose
 * 처리 파이프라인(예: 접수 → KYC → 환율/잔액 → 파트너 → 완료)을 수평 흐름도로 렌더.
 * 각 단계의 체류 건수·실패 건수를 노드로, 단계 간 이동을 화살표 엣지로 표시해
 * 거래가 어느 단계에서 쌓이거나 실패하는지 한눈에 보여준다.
 *
 * ## When to use
 * - 운영 대시보드에서 파이프라인 단계별 현황/장애 지점 조망.
 * - 노드 클릭 → 해당 단계 필터 목록으로 드릴다운하는 진입점.
 *
 * ## When NOT to use
 * - 단건의 진행 이력 (세로 타임라인) → [[TimelineStepItem]].
 * - 수치 추이 → [[MiniLineChart]].
 * - 임의 그래프(비선형 네트워크) — 본 컴포넌트는 선형 좌→우 흐름 전용.
 *
 * ## Composition rules
 * - Primitives 만 1단계 조합: [[TopologyStageNode]] + [[TopologyEdge]]. Composite import 금지.
 * - 데이터(`stages`)만 주입 — 노드 외형/엣지 선은 primitive 가 책임.
 * - 클릭 라우팅은 `onStageClick(key)` 로 위임 — 페이지가 필터/이동 결정.
 * - 실패 강조·색은 노드 primitive 의 토큰 로직 그대로 (여기서 색 지정 금지).
 *
 * @example
 * ```tsx
 * <TopologyGraph
 *   stages={[
 *     { key: "intake", label: "접수/검토", count: 5, failedCount: 1 },
 *     { key: "kyc", label: "KYC 인증", count: 3, edgeLabel: "12건" },
 *     { key: "done", label: "완료", count: 34, tone: "success" },
 *   ]}
 *   onStageClick={(key) => router.push(`/transactions?stage=${key}`)}
 * />
 * ```
 */
import { Fragment } from "react";
import TopologyStageNode, { type TopologyStageTone } from "./TopologyStageNode";
import TopologyEdge from "./TopologyEdge";

export type TopologyGraphStage = {
  /** 단계 식별자 — `onStageClick` 인자로 전달. */
  key: string;
  /** 단계 라벨. */
  label: string;
  /** 현재 체류 건수. */
  count: number;
  /** 실패/거부 건수. > 0 이면 노드 critical 강조. */
  failedCount?: number;
  /** 수치 톤 override (기본: 실패 유무로 자동). */
  tone?: TopologyStageTone;
  /** 다음 노드로 가는 엣지 위 라벨 (마지막 stage 에선 무시). */
  edgeLabel?: string;
};

export type TopologyGraphProps = {
  /** 좌→우 순서의 단계 목록. */
  stages: TopologyGraphStage[];
  /** 노드 클릭 콜백 — 생략 시 노드는 정적. */
  onStageClick?: (key: string) => void;
};

export default function TopologyGraph({ stages, onStageClick }: TopologyGraphProps) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", width: "100%", overflowX: "auto" }}>
      {stages.map((s, i) => (
        <Fragment key={s.key}>
          <TopologyStageNode
            label={s.label}
            count={s.count}
            failedCount={s.failedCount}
            tone={s.tone}
            onClick={onStageClick ? () => onStageClick(s.key) : undefined}
          />
          {i < stages.length - 1 && <TopologyEdge label={s.edgeLabel} />}
        </Fragment>
      ))}
    </div>
  );
}
