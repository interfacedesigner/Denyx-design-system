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
      <g fill={color}>
        <path d="M64.4,62.9 L74.6,68.0 L82.2,74.8 L89.0,85.0 L91.1,90.9 L92.0,96.4 L87.3,93.9 L80.5,92.2 L79.2,88.8 L74.6,82.0 L69.5,77.3 L63.9,73.9 L64.4,62.9 Z" />
        <path d="M64.4,82.8 L67.8,85.4 L71.2,89.6 L73.7,94.7 L74.6,98.6 L74.1,142.3 L73.3,145.3 L69.9,151.2 L63.1,157.2 L55.9,159.7 L47.4,159.7 L42.7,158.4 L38.0,155.9 L31.7,149.1 L28.7,141.0 L28.3,135.9 L29.1,130.0 L30.8,125.7 L34.2,121.1 L40.6,116.0 L46.1,113.8 L56.3,113.8 L56.7,124.9 L53.7,124.0 L49.1,124.0 L45.7,125.3 L40.6,130.0 L38.9,134.2 L38.9,138.1 L39.3,140.2 L42.3,145.3 L45.3,147.8 L48.2,149.1 L54.6,149.1 L57.1,148.2 L61.8,144.0 L63.9,139.3 L64.4,134.7 L64.4,82.8 Z" />
        <path d="M149.7,99.0 L159.5,99.4 L159.9,107.9 L163.3,116.4 L169.3,123.6 L184.1,138.1 L166.3,155.9 L163.7,159.3 L160.3,166.9 L159.1,177.1 L149.3,177.1 L149.3,170.3 L151.0,162.3 L154.4,154.6 L157.8,149.9 L169.7,137.6 L156.9,125.3 L153.6,120.2 L149.7,109.6 L149.7,99.0 Z" />
        <path d="M166.7,99.0 L176.5,99.0 L176.9,103.6 L178.6,107.5 L180.3,110.0 L189.7,118.9 L199.4,107.9 L201.1,104.1 L201.5,99.4 L211.7,99.4 L211.7,104.9 L210.5,109.2 L206.6,115.5 L189.2,133.0 L170.5,114.3 L167.1,107.0 L166.7,99.0 Z" />
        <path d="M228.7,99.0 L229.2,102.8 L228.3,110.0 L224.5,120.6 L220.2,126.6 L208.3,138.1 L221.1,150.8 L224.1,155.0 L227.5,163.1 L228.7,169.1 L228.7,177.1 L219.4,177.1 L218.1,167.8 L213.9,158.4 L194.7,138.9 L194.3,137.6 L210.9,121.5 L215.1,116.0 L218.5,106.6 L219.0,99.4 L228.7,99.0 Z" />
        <path d="M123.0,106.6 L115.3,107.0 L108.5,109.6 L103.0,113.4 L96.6,121.5 L94.1,117.7 L88.6,112.1 L83.1,109.2 L83.1,98.1 L90.3,101.1 L96.6,105.8 L106.0,99.8 L115.8,96.9 L126.8,96.4 L137.4,99.0 L143.4,101.9 L144.2,103.6 L145.1,112.6 L148.0,120.6 L141.2,113.0 L137.0,110.0 L129.3,107.0 L123.0,106.6 Z" />
        <path d="M83.1,117.2 L85.2,118.5 L89.0,122.8 L92.8,131.3 L92.8,177.1 L83.1,176.7 L83.1,117.2 Z" />
        <path d="M148.5,121.5 L153.6,129.6 L162.0,138.1 L152.3,148.7 L152.3,133.4 L151.4,128.3 L148.5,121.5 Z" />
        <path d="M124.7,124.0 L120.8,123.6 L117.0,124.9 L112.8,128.7 L111.1,131.7 L110.2,140.6 L110.7,176.7 L100.5,177.1 L100.5,131.7 L102.2,126.6 L106.8,120.2 L111.1,116.8 L119.2,113.8 L126.4,113.8 L133.6,116.4 L140.4,122.3 L143.4,127.4 L145.1,135.5 L145.1,163.5 L143.8,177.1 L134.9,176.7 L134.9,133.8 L133.6,130.4 L131.0,127.0 L127.2,124.5 L124.7,124.0 Z" />
        <path d="M10.8,141.0 L10.8,131.7 L13.0,122.3 L18.1,113.0 L25.3,105.3 L31.2,101.1 L41.4,96.9 L46.1,96.0 L56.3,96.0 L56.7,106.6 L46.1,106.6 L39.3,108.7 L31.7,113.8 L25.7,120.6 L22.7,126.6 L21.5,131.7 L21.5,141.4 L22.3,145.3 L25.3,152.1 L30.8,158.9 L39.7,164.8 L47.4,166.9 L55.4,166.9 L62.2,165.2 L70.3,160.6 L78.0,152.5 L78.0,167.8 L72.4,172.0 L66.5,175.0 L61.0,176.7 L48.6,177.5 L37.6,175.4 L27.4,169.9 L18.5,161.0 L13.4,152.1 L10.8,141.0 Z" />
        <path d="M190.9,159.3 L188.8,158.0 L179.9,166.9 L177.3,172.0 L176.5,177.1 L166.7,176.7 L166.7,171.2 L170.1,162.7 L188.8,143.6 L189.7,143.6 L207.5,161.8 L211.3,169.9 L211.7,176.7 L202.0,177.1 L199.8,169.1 L190.9,159.3 Z" />
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
      <g fill={color}>
        <path d="M45.3,4.6 L53.0,8.5 L58.8,13.7 L64.0,21.4 L65.6,25.9 L66.2,30.1 L62.7,28.2 L57.5,26.9 L56.5,24.3 L53.0,19.2 L49.1,15.6 L44.9,13.0 L45.3,4.6 Z" />
        <path d="M45.3,19.8 L47.8,21.7 L50.4,25.0 L52.4,28.8 L53.0,31.7 L52.7,64.9 L52.0,67.2 L49.5,71.7 L44.3,76.2 L38.8,78.1 L32.4,78.1 L28.8,77.2 L25.3,75.2 L20.4,70.1 L18.2,64.0 L17.9,60.1 L18.5,55.6 L19.8,52.4 L22.4,48.8 L27.2,44.9 L31.4,43.3 L39.1,43.3 L39.5,51.7 L37.2,51.1 L33.7,51.1 L31.1,52.0 L27.2,55.6 L25.9,58.8 L25.9,61.7 L26.2,63.3 L28.5,67.2 L30.8,69.1 L33.0,70.1 L37.8,70.1 L39.8,69.4 L43.3,66.2 L44.9,62.7 L45.3,59.1 L45.3,19.8 Z" />
        <path d="M110.1,32.0 L117.5,32.4 L117.8,38.8 L120.4,45.3 L124.9,50.7 L136.2,61.7 L122.6,75.2 L120.7,77.8 L118.1,83.6 L117.1,91.4 L109.7,91.4 L109.7,86.2 L111.0,80.1 L113.6,74.3 L116.2,70.7 L125.2,61.4 L115.5,52.0 L113.0,48.2 L110.1,40.1 L110.1,32.0 Z" />
        <path d="M122.9,32.0 L130.4,32.0 L130.7,35.6 L132.0,38.5 L133.3,40.4 L140.4,47.2 L147.8,38.8 L149.1,35.9 L149.4,32.4 L157.1,32.4 L157.1,36.6 L156.1,39.8 L153.2,44.6 L140.0,57.8 L125.8,43.6 L123.3,38.2 L122.9,32.0 Z" />
        <path d="M170.0,32.0 L170.3,34.9 L169.7,40.4 L166.8,48.5 L163.6,53.0 L154.5,61.7 L164.2,71.4 L166.5,74.6 L169.0,80.7 L170.0,85.2 L170.0,91.4 L162.9,91.4 L161.9,84.3 L158.7,77.2 L144.2,62.3 L143.9,61.4 L156.5,49.1 L159.7,44.9 L162.3,37.8 L162.6,32.4 L170.0,32.0 Z" />
        <path d="M89.7,37.8 L83.9,38.2 L78.8,40.1 L74.6,43.0 L69.8,49.1 L67.8,46.2 L63.6,42.0 L59.4,39.8 L59.4,31.4 L64.9,33.7 L69.8,37.2 L76.8,32.7 L84.3,30.4 L92.6,30.1 L100.7,32.0 L105.2,34.3 L105.9,35.6 L106.5,42.4 L108.8,48.5 L103.6,42.7 L100.4,40.4 L94.6,38.2 L89.7,37.8 Z" />
        <path d="M59.4,45.9 L61.1,46.9 L64.0,50.1 L66.9,56.5 L66.9,91.4 L59.4,91.0 L59.4,45.9 Z" />
        <path d="M109.1,49.1 L113.0,55.3 L119.4,61.7 L112.0,69.8 L112.0,58.2 L111.3,54.3 L109.1,49.1 Z" />
        <path d="M91.0,51.1 L88.1,50.7 L85.2,51.7 L82.0,54.6 L80.7,56.9 L80.1,63.6 L80.4,91.0 L72.7,91.4 L72.7,56.9 L73.9,53.0 L77.5,48.2 L80.7,45.6 L86.8,43.3 L92.3,43.3 L97.8,45.3 L103.0,49.8 L105.2,53.6 L106.5,59.8 L106.5,81.0 L105.5,91.4 L98.8,91.0 L98.8,58.5 L97.8,55.9 L95.9,53.3 L93.0,51.4 L91.0,51.1 Z" />
        <path d="M4.6,64.0 L4.6,56.9 L6.3,49.8 L10.1,42.7 L15.6,36.9 L20.1,33.7 L27.9,30.4 L31.4,29.8 L39.1,29.8 L39.5,37.8 L31.4,37.8 L26.2,39.5 L20.4,43.3 L15.9,48.5 L13.7,53.0 L12.7,56.9 L12.7,64.3 L13.3,67.2 L15.6,72.3 L19.8,77.5 L26.6,82.0 L32.4,83.6 L38.5,83.6 L43.6,82.3 L49.8,78.8 L55.6,72.7 L55.6,84.3 L51.4,87.5 L46.9,89.7 L42.7,91.0 L33.3,91.7 L25.0,90.1 L17.2,85.9 L10.4,79.1 L6.6,72.3 L4.6,64.0 Z" />
        <path d="M141.3,77.8 L139.7,76.8 L132.9,83.6 L131.0,87.5 L130.4,91.4 L122.9,91.0 L122.9,86.8 L125.5,80.4 L139.7,65.9 L140.4,65.9 L153.9,79.8 L156.8,85.9 L157.1,91.0 L149.7,91.4 L148.1,85.2 L141.3,77.8 Z" />
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
