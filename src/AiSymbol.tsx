/**
 * AiSymbol — Denyx AI 텍스트 심볼 (blue→purple 그라데이션).
 *
 * ## Purpose
 * Denyx AI 의 브랜드 심볼을 그리는 순수 SVG 아이콘. blue→purple 그라데이션의
 * "AI" 텍스트 마크로, AI 진입점·로딩·헤더 등에서 AI 정체성을 표시한다.
 *
 * ## When to use
 * - AI 위젯/버튼/헤더 옆 브랜드 마크 (AI 기능임을 나타내는 시각 표식)
 * - AI 로딩·환영 화면의 장식 심볼
 *
 * ## When NOT to use
 * - 톱니바퀴·설정 등 일반 기능 아이콘 → [[SettingsIcon]] 등 icons/
 * - AI 입력/대화 UI 전체 → [[DenyxAiWidget]] / [[AiWidget]]
 *
 * ## Composition rules
 * - 정사각형(`size` = px 너비/높이).
 * - 그라데이션 id 는 `size` 로 유니크하게 생성 — 한 페이지에 여러 size 공존 OK.
 * - 데코레이션이므로 `aria-hidden`. 의미 전달이 필요하면 부모에 라벨 부여.
 *
 * @example
 * ```tsx
 * <AiSymbol size={20} className="mr-1" />
 * ```
 */
export default function AiSymbol({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const id = `aiSymGrad-${size}`;
  const fontSize = Math.round(size * 0.65);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004BE0" />
          <stop offset="1" stopColor="#8B52FF" />
        </linearGradient>
      </defs>
      <text x="12" y="17" textAnchor="middle" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize={fontSize} fontWeight={800} fill={`url(#${id})`}>AI</text>
    </svg>
  );
}
