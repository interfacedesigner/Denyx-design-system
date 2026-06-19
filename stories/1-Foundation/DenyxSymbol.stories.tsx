import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Foundation/Denyx Symbol
 *
 * DNYX 브랜드 심볼 (4 바) + Horizon (심볼 + 워드마크) 가로형 조합.
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
          "**DNYX 브랜드 심볼 + Horizon 워드마크.** 4 바 구조의 단일 다크그레이(`#333`) 심볼. " +
          "다크 배경에서는 `#FFFFFF` 전환. " +
          "AI 기능 식별용 마크는 [Denyx AI/Symbol](?path=/story/denyx-ai-symbol--default) — 별개의 보라 그라데이션 pinwheel.",
      },
    },
  },
};
export default meta;

/* ─── Symbol — DNYX 텍스트 마크 ─────────────────── */

function DenyxSymbol({ size = 24, color = "#333333" }: { size?: number; color?: string }) {
  const fontSize = Math.round(size * 0.46);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DNYX Symbol"
    >
      <text x="12" y="16.5" textAnchor="middle" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize={fontSize} fontWeight={800} letterSpacing="-0.3" fill={color}>DNYX</text>
    </svg>
  );
}

/* ─── Horizon — DNYX 워드마크 가로형 (60x24 base) ─── */

function DenyxHorizon({ height = 24, color = "#333333" }: { height?: number; color?: string }) {
  const width = Math.round(height * (60 / 24));
  const fontSize = Math.round(height * 0.75);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DNYX"
    >
      <text x="30" y="17" textAnchor="middle" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontSize={fontSize} fontWeight={800} letterSpacing="1" fill={color}>DNYX</text>
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
