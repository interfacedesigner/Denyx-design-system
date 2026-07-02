/**
 * TopologyEdge — Primitives / Parts (Chrome). [[TopologyGraph]] 의 노드 사이 연결선.
 *
 * ## Purpose
 * 토폴로지에서 두 단계 노드 사이의 방향 연결(→)을 그린다.
 * 수평선 + 우측 화살촉, 선 위에 선택적 라벨(통과 건수 등) 한 줄.
 *
 * ## When to use
 * - [[TopologyGraph]] 가 노드 사이마다 렌더 (기본 용법). 보통 단독 사용하지 않음.
 *
 * ## When NOT to use
 * - 수직 타임라인 연결 → [[TimelineStepItem]].
 * - 데이터 시각화 축선 → [[MiniLineChart]].
 *
 * ## Composition rules
 * - 자립 렌더 — DS 컴포넌트 import 없음. HTML/SVG + 토큰만.
 * - 선/화살촉 색은 `--color-border-divider`, 라벨은 `--color-text-tertiary` 토큰. 인라인 hex 금지.
 * - flex 컨테이너 안에서 `flex: 1` 로 남는 폭을 채운다 (최소 24px).
 *
 * @example
 * ```tsx
 * <TopologyEdge label="34건" />
 * ```
 */
export type TopologyEdgeProps = {
  /** 선 위 라벨 (예: 통과 건수). 생략 시 선만. */
  label?: string;
};

export default function TopologyEdge({ label }: TopologyEdgeProps) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--spacing-2xs)",
        alignSelf: "center",
      }}
      aria-hidden="true"
    >
      <span
        className="text-xs text-tertiary leading-none whitespace-nowrap"
        style={{ visibility: label ? "visible" : "hidden" }}
      >
        {label ?? "\u00A0"}
      </span>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flex: 1, height: 1.5, background: "var(--color-border-divider)" }} />
        <svg width="7" height="8" viewBox="0 0 7 8" style={{ flexShrink: 0 }}>
          <path d="M0 0l7 4-7 4V0z" fill="var(--color-border-divider)" />
        </svg>
      </div>
    </div>
  );
}
