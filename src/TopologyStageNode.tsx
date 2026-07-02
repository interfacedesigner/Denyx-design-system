/**
 * TopologyStageNode — Primitives / Parts (Chrome). [[TopologyGraph]] 의 단계 노드 한 개.
 *
 * ## Purpose
 * 파이프라인 토폴로지에서 한 단계(stage)를 나타내는 노드 카드.
 * 단계 라벨 + 현재 체류 건수 + (있으면) 실패 건수를 세로로 쌓아 보여준다.
 * 실패가 있으면 critical 서피스로 강조되어 장애 지점을 즉시 식별.
 *
 * ## When to use
 * - [[TopologyGraph]] 가 stages 를 `map` 으로 노드마다 렌더 (기본 용법). 보통 단독 사용하지 않음.
 * - 동일 외형의 단계 노드가 필요한 다른 흐름도 표면.
 *
 * ## When NOT to use
 * - 시계열 수치 카드 → [[MiniLineChart]].
 * - 순차 진행 스텝 표시 (타임라인) → [[TimelineStepItem]] / [[DashboardBuildingProgress]].
 *
 * ## Composition rules
 * - 자립 렌더 — DS 컴포넌트 import 없음. HTML + 토큰만.
 * - 색은 토큰만: 기본 `--color-card`/`--color-border-default`,
 *   실패 시 `--color-surface-critical`/`--color-status-error`,
 *   success tone 은 `--color-status-success`. 인라인 hex 금지.
 * - 클릭 동작은 `onClick` 으로 위임 — 어디로 이동할지는 부모(페이지)가 결정.
 *   `onClick` 이 있으면 `<button>`, 없으면 정적 `<div>` 로 렌더.
 *
 * @example
 * ```tsx
 * <TopologyStageNode label="파트너 전송" count={8} failedCount={2} onClick={goToStage} />
 * ```
 */
import type { CSSProperties } from "react";

export type TopologyStageTone = "neutral" | "info" | "success" | "critical";

export type TopologyStageNodeProps = {
  /** 단계 라벨 (예: "KYC 인증"). */
  label: string;
  /** 현재 이 단계에 체류 중인 건수. */
  count: number;
  /** 이 단계에서 실패/거부된 건수. > 0 이면 critical 강조. */
  failedCount?: number;
  /** 수치 톤. 기본 neutral. failedCount > 0 이면 자동 critical. */
  tone?: TopologyStageTone;
  /** 건수 단위 라벨. 기본 "건". */
  unit?: string;
  /** 클릭 콜백 — 지정 시 button 으로 렌더. */
  onClick?: () => void;
};

const COUNT_COLOR: Record<TopologyStageTone, string> = {
  neutral: "var(--color-text-primary)",
  info: "var(--color-brand-blue)",
  success: "var(--color-status-success)",
  critical: "var(--color-status-error)",
};

export default function TopologyStageNode({
  label,
  count,
  failedCount = 0,
  tone,
  unit = "건",
  onClick,
}: TopologyStageNodeProps) {
  const resolvedTone: TopologyStageTone = tone ?? (failedCount > 0 ? "critical" : "neutral");
  const hasFailure = failedCount > 0;

  const boxStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    minWidth: 104,
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${hasFailure ? "var(--color-status-error)" : "var(--color-border-default)"}`,
    background: hasFailure ? "var(--color-surface-critical)" : "var(--color-card)",
    cursor: onClick ? "pointer" : "default",
    textAlign: "center",
    font: "inherit",
  };

  const content = (
    <>
      <span className="text-sm text-tertiary font-medium leading-tight">{label}</span>
      <span
        className="text-2xl font-bold font-numeric tabular-nums leading-tight"
        style={{ color: COUNT_COLOR[resolvedTone] }}
      >
        {count}
        <span className="text-sm font-medium" style={{ color: "var(--color-text-tertiary)", marginLeft: 2 }}>
          {unit}
        </span>
      </span>
      <span
        className="text-xs leading-tight"
        style={{
          color: hasFailure ? "var(--color-status-error)" : "var(--color-text-disabled)",
          fontWeight: hasFailure ? "var(--font-weight-medium)" as CSSProperties["fontWeight"] : undefined,
          visibility: hasFailure ? "visible" : "hidden",
        }}
      >
        ⚠ 실패 {failedCount}{unit}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={boxStyle}>
        {content}
      </button>
    );
  }
  return <div style={boxStyle}>{content}</div>;
}
