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
      <g transform="translate(8, 52)" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M68,40 A46,46 0 1,0 68,132" />
        <path d="M68,52 A34,34 0 1,0 68,120" />
        <path d="M68,64 A22,22 0 1,0 68,108" />
        <path d="M52,40 C52,16 72,6 92,6 C102,6 108,12 108,22" />
        <path d="M56,52 C56,30 74,18 90,18 C98,18 102,22 102,30" />
        <path d="M60,64 C62,46 76,34 88,34 C94,34 96,38 96,42" />
        <path d="M68,132 L68,46 C68,12 96,4 120,4 C144,4 172,12 172,46 L172,132" />
        <path d="M78,120 L78,52 C78,24 100,16 120,16 C140,16 162,24 162,52 L162,132" />
        <path d="M88,108 L88,60 C88,36 104,28 120,28 C136,28 152,36 152,60 L152,132" />
        <path d="M152,40 L210,120 Q218,132 210,140" />
        <path d="M162,40 L210,108 Q216,118 210,128" />
        <path d="M172,40 L210,96 Q214,104 210,112" />
        <path d="M210,40 L152,120 Q144,132 152,140" />
        <path d="M210,52 L162,120 Q156,128 162,136" />
        <path d="M210,64 L172,108 Q168,114 172,120" />
      </g>
    </svg>
  );
}

/* ─── Horizon — dnx 심볼 + DENYX 워드마크 가로형 ─── */

function DenyxHorizon({ height = 24, color = "#333333" }: { height?: number; color?: string }) {
  const width = Math.round(height * (320 / 96));
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DNYX"
    >
      <g transform="translate(8, 6)" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M52,30 A36,36 0 1,0 52,102" />
        <path d="M52,40 A26,26 0 1,0 52,92" />
        <path d="M52,50 A16,16 0 1,0 52,82" />
        <path d="M40,30 C40,12 56,4 72,4 C80,4 84,8 84,16" />
        <path d="M44,40 C44,24 58,16 70,16 C76,16 78,20 78,26" />
        <path d="M48,50 C50,38 60,30 68,30 C72,30 74,34 74,38" />
        <path d="M52,102 L52,36 C52,10 76,2 94,2 C112,2 136,10 136,36 L136,102" />
        <path d="M60,92 L60,42 C60,20 78,14 94,14 C110,14 128,20 128,42 L128,102" />
        <path d="M68,82 L68,48 C68,30 82,24 94,24 C106,24 120,30 120,48 L120,102" />
        <path d="M120,30 L170,92 Q176,102 170,108" />
        <path d="M128,30 L170,82 Q174,90 170,96" />
        <path d="M136,30 L170,72 Q172,78 170,82" />
        <path d="M170,30 L120,92 Q114,102 120,108" />
        <path d="M170,40 L128,92 Q124,98 128,104" />
        <path d="M170,50 L136,82 Q134,86 136,90" />
      </g>
      <text x="200" y="72" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize="28" fontWeight={700} letterSpacing="2" fill={color}>DENYX</text>
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
