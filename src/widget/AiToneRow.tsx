import type { CSSProperties } from "react";

/**
 * AiToneRow — Part / Widget. tone 배경 + 도트 + 제목/상세 정보 행.
 *
 * ## Purpose
 * tone 별 배경 위에 좌측 컬러 도트 + 제목(bold) + 상세 설명을 세로로 쌓는 한 행.
 *
 * ## When to use
 * - tone 배경 + 도트 + 제목/상세 행 외형이 필요한 표면.
 *
 * ## When NOT to use
 * - 선택 가능한 옵션 버튼 → [[AiOptionButton]].
 * - 단순 글머리 기호 목록 → 일반 `<ul>`/`<li>`.
 *
 * ## Composition rules
 * - tone 색은 부모의 `TONE_BG` / `TONE_DOT` 맵에서 풀어 `background` 로 주입 — 인라인 hex 신규 추가 금지.
 * - 데이터(title/detail)만 받는 표현용 행 — 상태 비보유.
 *
 * @example
 * ```tsx
 * {groups.map((g, i) => (
 *   <AiToneRow
 *     key={i}
 *     title={g.title}
 *     detail={g.detail}
 *     background={TONE_BG[g.tone]}
 *     dotColor={TONE_DOT[g.tone]}
 *   />
 * ))}
 * ```
 */
export default function AiToneRow({
  title,
  detail,
  background,
  dotColor,
}: {
  title: string;
  detail: string;
  /** 행 배경색 (부모 TONE_BG[tone]) */
  background: CSSProperties["background"];
  /** 좌측 도트 색 (부모 TONE_DOT[tone]) */
  dotColor: CSSProperties["background"];
}) {
  return (
    <div
      className="flex items-start gap-8px rounded-6px px-10px py-6px"
      style={{ background }}
    >
      <span
        className="size-8px rounded-full mt-6px shrink-0"
        style={{ background: dotColor }}
      />
      <div className="flex flex-col gap-2px min-w-0">
        <span
          className="text-base font-bold text-primary tracking-default leading-normal"
          style={{ fontFamily: "var(--font-family-korean)" }}
        >
          {title}
        </span>
        <span
          className="text-base text-secondary tracking-default leading-normal"
          style={{ fontFamily: "var(--font-family-korean)", fontWeight: "var(--font-weight-regular)" }}
        >
          {detail}
        </span>
      </div>
    </div>
  );
}
