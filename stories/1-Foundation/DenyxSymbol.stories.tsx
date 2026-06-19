import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Foundation/Denyx Symbol
 *
 * DNYX 브랜드 심볼 (dnx 라운디드 레터폼 · 3중 평행 스트로크) + Horizon (심볼 + 워드마크).
 * 단일 다크그레이(`#333333`) 톤. 다크 배경에서는 `#FFFFFF` 전환.
 *
 * 주의: 이 심볼은 `<AiSymbol>` (보라 그라데이션 pinwheel, AI 응답 전용 마크) 과는
 * 별개입니다. Denyx 회사·제품 브랜드를 식별할 때는 본 심볼, AI 기능 식별일 때는 `<AiSymbol>` 사용.
 */
const meta: Meta = {
  title: "Foundation/Denyx Symbol",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "**DNYX 브랜드 심볼 + Horizon 워드마크.** dnx 라운디드 레터폼 · 3중 평행 스트로크의 단일 다크그레이(`#333`) 심볼. " +
          "다크 배경에서는 `#FFFFFF` 전환. " +
          "AI 기능 식별용 마크는 [Denyx AI/Symbol](?path=/story/denyx-ai-symbol--default) — 별개의 보라 그라데이션 pinwheel.",
      },
    },
  },
};
export default meta;

/* ─── Symbol — dnx 라운디드 레터폼 (3중 평행 스트로크) ─────── */

function DenyxSymbol({ size = 24, color = "#333333" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DNYX Symbol"
    >
      <g transform="translate(6, 62)" stroke={color} strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* d: arcs */}
        <path d="M72,30 A44,44 0 1,0 72,118" />
        <path d="M72,42 A32,32 0 1,0 72,106" />
        <path d="M72,54 A20,20 0 1,0 72,94" />
        {/* d: stem */}
        <line x1="72" y1="30" x2="72" y2="118" />
        <line x1="72" y1="42" x2="72" y2="106" />
        <line x1="72" y1="54" x2="72" y2="94" />
        {/* d: tail */}
        <path d="M48,30 C48,10 68,0 86,0 C96,0 102,6 102,14" />
        <path d="M52,42 C52,24 68,14 84,14 C92,14 96,18 96,24" />
        <path d="M56,54 C58,40 70,32 82,32 C88,32 90,36 90,40" />
        {/* n: arches */}
        <path d="M72,118 L72,34 C72,6 98,0 118,0 C138,0 164,6 164,34 L164,118" />
        <path d="M82,106 L82,42 C82,18 100,12 118,12 C136,12 154,18 154,42 L154,118" />
        <path d="M92,94 L92,50 C92,30 104,24 118,24 C132,24 144,30 144,50 L144,118" />
        {/* x: top-left → bottom-right */}
        <path d="M144,30 L194,98 C200,108 196,118 188,118" />
        <path d="M154,30 L196,88 C200,96 198,106 192,106" />
        <path d="M164,30 L198,78 C200,84 200,92 196,94" />
        {/* x: top-right → bottom-left */}
        <path d="M216,30 L166,98 C160,108 164,118 172,118" />
        <path d="M206,30 L164,88 C160,96 162,106 168,106" />
        <path d="M196,30 L162,78 C160,84 160,92 164,94" />
        {/* x: baseline */}
        <line x1="144" y1="118" x2="172" y2="118" />
        <line x1="154" y1="106" x2="168" y2="106" />
      </g>
    </svg>
  );
}

/* ─── Horizon — dnx 심볼 + DENYX 워드마크 가로형 ─── */

function DenyxHorizon({ height = 24, color = "#333333" }: { height?: number; color?: string }) {
  const width = Math.round(height * (340 / 96));
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DNYX"
    >
      <g transform="translate(4, 4)" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* d: arcs */}
        <path d="M54,22 A33,33 0 1,0 54,88" />
        <path d="M54,31 A24,24 0 1,0 54,79" />
        <path d="M54,40 A15,15 0 1,0 54,70" />
        {/* d: stem */}
        <line x1="54" y1="22" x2="54" y2="88" />
        <line x1="54" y1="31" x2="54" y2="79" />
        <line x1="54" y1="40" x2="54" y2="70" />
        {/* d: tail */}
        <path d="M36,22 C36,7 51,0 65,0 C72,0 77,4 77,10" />
        <path d="M39,31 C39,18 51,10 63,10 C69,10 72,14 72,18" />
        <path d="M42,40 C44,30 53,24 62,24 C66,24 68,27 68,30" />
        {/* n: arches */}
        <path d="M54,88 L54,26 C54,4 74,0 89,0 C104,0 124,4 124,26 L124,88" />
        <path d="M62,79 L62,32 C62,14 76,9 89,9 C102,9 116,14 116,32 L116,88" />
        <path d="M70,70 L70,38 C70,23 79,18 89,18 C99,18 108,23 108,38 L108,88" />
        {/* x: top-left → bottom-right */}
        <path d="M108,22 L147,74 C151,80 149,88 143,88" />
        <path d="M116,22 L149,66 C151,72 150,79 146,79" />
        <path d="M124,22 L151,58 C152,63 151,70 149,70" />
        {/* x: top-right → bottom-left */}
        <path d="M164,22 L125,74 C121,80 123,88 129,88" />
        <path d="M156,22 L123,66 C121,72 122,79 126,79" />
        <path d="M148,22 L121,58 C120,63 121,70 123,70" />
        {/* x: baseline */}
        <line x1="108" y1="88" x2="129" y2="88" />
        <line x1="116" y1="79" x2="126" y2="79" />
      </g>
      <text x="195" y="68" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize="26" fontWeight={700} letterSpacing="2.5" fill={color}>DENYX</text>
    </svg>
  );
}

/* ─── 공통 sub-section 헬퍼 ─────────────────────────────── */

const sectionStyle: React.CSSProperties = { marginBottom: 40 };
const titleStyle: React.CSSProperties = { fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#222" };
const descStyle: React.CSSProperties = { fontSize: 14, color: "#757575", marginBottom: 20 };
const gridStyle: React.CSSProperties = { display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 0 };
const itemStyle: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 };
const boxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed #eaeaea",
  borderRadius: 4,
  padding: 12,
};
const labelStyle: React.CSSProperties = { fontSize: 11, color: "#757575", fontFamily: "monospace" };
const darkStyle: React.CSSProperties = { background: "#222", padding: 24, borderRadius: 8 };

/* ─── Story (소스의 단일 `Symbol` named export 그대로) ─────── */

/**
 * 단일 종합 story — 소스(`foundation-denyx-symbol--symbol`)와 동일 구조:
 * Symbol 7 sizes / Horizon 5 heights / Dark background / Color spec.
 */
export const Symbol: StoryObj = {
  render: () => (
    <div style={{ padding: 32, fontFamily: "'Noto Sans', 'Noto Sans KR', sans-serif" }}>
      {/* ───── Symbol 크기 비교 ───── */}
      <div style={sectionStyle}>
        <div style={titleStyle}>DNYX Symbol</div>
        <div style={descStyle}>
          DNYX 텍스트 마크 · 단일 다크그레이(#333333). 다크 배경에서는 #FFFFFF 전환.
        </div>
        <div style={gridStyle}>
          {[12, 16, 20, 24, 32, 48, 64].map((s) => (
            <div key={s} style={itemStyle}>
              <div style={boxStyle}><DenyxSymbol size={s} /></div>
              <span style={labelStyle}>{s}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* ───── Horizon (심볼 + 워드마크) ───── */}
      <div style={sectionStyle}>
        <div style={titleStyle}>DNYX Horizon</div>
        <div style={descStyle}>심볼 + DNYX 워드마크 가로형 조합.</div>
        <div style={gridStyle}>
          {[
            { h: 16, label: "h=16px" },
            { h: 20, label: "h=20px" },
            { h: 24, label: "h=24px (원본)" },
            { h: 32, label: "h=32px" },
            { h: 48, label: "h=48px" },
          ].map((v) => (
            <div key={v.label} style={itemStyle}>
              <div style={boxStyle}><DenyxHorizon height={v.h} /></div>
              <span style={labelStyle}>{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ───── 어두운 배경 위 ───── */}
      <div style={sectionStyle}>
        <div style={titleStyle}>On Dark Background</div>
        <div style={descStyle}>어두운 배경에서의 사용. 워드마크 텍스트를 white 로 전환.</div>
        <div style={darkStyle}>
          <div style={{ ...gridStyle, marginBottom: 0 }}>
            <div style={itemStyle}>
              <div style={{ ...boxStyle, borderColor: "rgba(255,255,255,0.12)" }}><DenyxSymbol size={24} color="#FFFFFF" /></div>
              <span style={{ ...labelStyle, color: "#888" }}>24px</span>
            </div>
            <div style={itemStyle}>
              <div style={{ ...boxStyle, borderColor: "rgba(255,255,255,0.12)" }}><DenyxSymbol size={32} color="#FFFFFF" /></div>
              <span style={{ ...labelStyle, color: "#888" }}>32px</span>
            </div>
            <div style={itemStyle}>
              <div style={{ ...boxStyle, borderColor: "rgba(255,255,255,0.12)" }}><DenyxHorizon height={24} color="#FFFFFF" /></div>
              <span style={{ ...labelStyle, color: "#888" }}>Horizon 24</span>
            </div>
            <div style={itemStyle}>
              <div style={{ ...boxStyle, borderColor: "rgba(255,255,255,0.12)" }}><DenyxHorizon height={32} color="#FFFFFF" /></div>
              <span style={{ ...labelStyle, color: "#888" }}>Horizon 32</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───── 색 spec ───── */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Color Specification</div>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
          <div style={itemStyle}>
            <div style={{ width: 48, height: 48, background: "#333333", borderRadius: 4 }} />
            <span style={labelStyle}>Light: #333333</span>
          </div>
          <div style={itemStyle}>
            <div style={{ width: 48, height: 48, background: "#222", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, background: "#FFFFFF", borderRadius: 2 }} />
            </div>
            <span style={labelStyle}>Dark: #FFFFFF</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
