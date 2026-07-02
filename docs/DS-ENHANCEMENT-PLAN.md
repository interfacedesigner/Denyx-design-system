# DS 고도화 기획서 — 외부 토큰 감사 레포트 기반

> **작성일:** 2026-07-02
> **입력 자료:** Cross-border Remittance Lookup 프로젝트 토큰 적용 감사 레포트 (2026-06-30, theme.js 기반 자체 토큰 시스템 감사)
> **목적:** 타 프로젝트 감사에서 드러난 문제·제안 중 **본 DS(`tokens.css` 단일 출처 체계)에 보편적으로 유효한 요소**를 추려 고도화 계획으로 정리.

---

## 0. 불변 전제 — 기존 핵심 가드레일 정책은 변경하지 않는다

본 기획의 모든 항목은 **추가(additive)만 허용**. 아래 기존 정책은 수정·완화·대체 대상이 아니다:

- 🔒 **불변 정책** — 토큰·컴포넌트·위젯 변경은 DS repo에서만, 소비 측 override 전면 금지 (`ds-override-guard.mjs` + `<DsReadOnlyNotice>` 2중 감지 유지)
- **토큰 단일 출처 파이프라인** — `tokens.css` → `generate-tokens.mjs` → `_tokens.ts`, `pnpm check:tokens` drift 감지
- **Tailwind 재도입 금지** — `denyx-ds.css` 자체 소유 일반 CSS, `detailwind` 파이프라인 및 가드
- **계층 규칙** — Primitives → Composite → Shell, import 제약, 구조 인라인 금지
- **Semantic 토큰만 참조** (Global 직접 참조 금지)
- **회귀 안전망 4중** (render/snapshot/typecheck/Chromatic) 및 안정화 체크리스트

신규 가드레일(§P2)·거버넌스(§3)는 기존 정책의 **자동화·보강 레이어**로만 추가되며, 충돌 시 기존 정책이 우선한다.

---

## 1. 레포트 분석 — 항목별 적용성 판정

레포트는 JS `theme.js` 토큰 체계(inline style 기반)를 전제로 하므로, 본 DS(CSS 변수 + 일반 CSS 유틸 + codemod 파이프라인)와 1:1 이식은 불가. 항목별로 3분류:

| 레포트 제안 | 판정 | 근거 |
|---|---|---|
| 타입 스케일 갭 (15px, 18px) | ✅ **채택 검토** | 본 DS도 14→16, 16→20 구간 동일 갭. 단 "3곳 이상 사용" 근거 필요 |
| 라인하이트 갭 (1.7, 1.8, 2.0) | ✅ **채택 검토** | 본 DS는 1.6(`loose`)이 최대. 긴 본문/목록(문서·마케팅 Stage)에서 필요 가능 |
| 스페이싱 스케일 토큰 | ✅ **채택** | 본 DS `tokens.css`에 **spacing 토큰 자체가 부재** — 유틸 클래스(px 리터럴)에만 존재. 스케일 정의가 필요 |
| 라디우스 스케일 토큰 | ✅ **채택** | `--radius-full` 하나만 존재. 유틸(`rounded-*`)의 값이 토큰으로 승격 안 됨 |
| ESLint/pre-commit raw 값 가드레일 | ✅ **채택 (번역)** | 본 DS는 소비자 방향 가드(`ds-override-guard.mjs`)만 존재. **DS 소스 내부** raw 값 유입 가드 부재 |
| 토큰 거버넌스 (변경 프로세스·allowlist·≥3회 규칙) | ✅ **채택** | 본 DS에 명문화된 토큰 추가/삭제 기준 없음 |
| 토큰 적용률 감사 (Before/After 정량화) | ✅ **채택 (도구화)** | 레포트의 감사 방법론 자체가 가치 — 반복 가능한 스크립트로 도구화 |
| Figma ↔ 코드 토큰 동기화 | ✅ **채택 (장기)** | 보편적 가치. 본 DS 파이프라인(`tokens.css` → `_tokens.ts`)의 상류에 Figma Variables 연결 |
| 반응형 타입 프리셋 (`clamp()`) | ❌ **부적합** | 본 DS는 고정 px 데스크톱 대시보드 체계. Dense/Display 하이브리드 스케일과 충돌 |
| 컴파운드 스페이싱 유틸 `sp()` | ❌ **부적합** | 본 DS는 inline style이 아닌 className 유틸 체계 (`px-[8px]` 등 이미 해결) |
| CSS Custom Properties 전환 | ✅ **이미 충족** | 본 DS는 처음부터 CSS 변수 기반 (`.dark` 토큰 재매핑 포함) |
| CSS 템플릿 리터럴 토큰 인터폴레이션 | ✅ **이미 충족** | `tokens.css`/`denyx-ds.css`가 CSS 레벨에서 토큰 소유 |

---

## 2. 고도화 항목 (채택분)

### P1 — 토큰 스케일 완결성

본 DS 토큰의 최대 갭: **타이포그래피는 완비, 레이아웃 토큰(간격·라디우스·그림자)은 미정의.** 유틸 클래스에 px 리터럴로만 존재해 스케일 일관성을 강제할 수단이 없다.

#### 2.1 Spacing 토큰 신설 (`--spacing-*`)

현행: `gap-4px`·`px-[8px]` 등 유틸 클래스명에 값이 박제. 어떤 간격이 "표준"인지 정의가 없음.

1. `src/` 전체 spacing 실측 (gap/padding/margin 값 빈도 grep) — 레포트의 감사 방법론 적용
2. 빈도 기반 스케일 확정 후 `tokens.css`에 정의 (예시안, 실측 후 조정):

```css
--spacing-2xs: 2px;  --spacing-xs: 4px;   --spacing-sm: 6px;
--spacing-md: 8px;   --spacing-lg: 12px;  --spacing-xl: 16px;
--spacing-2xl: 20px; --spacing-3xl: 24px; --spacing-4xl: 32px;
```

3. `denyx-ds.css` 유틸은 값 유지 (비파괴) — 신규 컴포넌트부터 토큰 참조. 기존 유틸 리라이트는 별도 판단.

#### 2.2 Radius 토큰 신설 (`--radius-*`)

현행 `--radius-full`(9999px)만 존재. 실측 후 `--radius-sm/md/lg/full` 정도의 최소 스케일 정의. 레포트의 `borderRadius:3` 사례처럼 스케일 사이 미세값은 **토큰화하지 않고 allowlist** (§3.3).

#### 2.3 Shadow/Elevation 토큰 확장

현행 `--shadow-sm` 1종. 드롭다운·모달·토스트가 각자 inline shadow 사용 중이면 `--shadow-md`(overlay) / `--shadow-lg`(modal) 승격. 실측 선행.

#### 2.4 타입 스케일·라인하이트 갭 — 조건부

- `15px`·`18px`: 현행 Hybrid 스케일(Dense 1px / Display 2배수 인접)의 **의도된 갭**. 실사용 3곳 미만이면 추가하지 않음. 필요 사례 누적 시 `--text-lg-plus`/`--text-xl-plus` 대신 **기존 스케일로 흡수 우선**.
- `--leading-loose-2: 1.8` / `--leading-double: 2`: 긴 본문(docs Stage·마케팅) 수요 확인 시에만 추가.

> 모든 토큰 추가는 파이프라인 준수: `tokens.css` 수정 → `denyx-ds.css` `:root` 동기 → `node scripts/generate-tokens.mjs` → `pnpm check:tokens`.

### P2 — 가드레일: DS 소스 내부 raw 값 유입 차단

현행 가드는 소비자 방향(`ds-override-guard.mjs`)뿐. **DS 소스 자체**에 inline hex·raw px가 유입돼도 감지 수단이 없다 (레포트의 "정의는 완성, 적용은 0%" 사태의 원인).

- **2.5 `design-lint.js` 확장** — `src/**/*.tsx` 대상:
  - inline 색 리터럴 (`#hex`, `rgba(`) 감지 → Extended Palette/Semantic 토큰 유도
  - `style={{ fontSize: "NNpx" }}` 등 raw 타이포 값 감지 → `var(--text-*)` 유도
  - Widget 영역 inline card 스타일 감지 (기존 CLAUDE.md 금지 조항의 자동화)
- **2.6 CI 통합** — `pnpm check`에 lint 단계 포함. 기존 위반은 baseline 파일로 동결, **신규 유입만 실패** 처리 (비파괴).

### P3 — 토큰 적용률 감사 도구화

레포트의 Before/After 정량 감사를 1회성 수작업이 아닌 반복 가능 명령으로:

- **2.7 `pnpm audit:tokens`** — 카테고리별(color/font/spacing/radius) 토큰 참조 vs raw 값 개수 집계 → 적용률 테이블 출력. P1 실측(2.1~2.3)의 기초 도구이자, 이후 회귀 감시 지표.

### P4 — Figma Variables 동기화 (장기)

```
Figma Variables ──(MCP/REST)──→ tokens.json ──→ tokens.css ──(기존 파이프라인)──→ _tokens.ts / denyx-ds.css
```

- 단방향(Figma → 코드)만. 코드 → Figma 역류 금지 (단일 출처 정책과 정합).
- `.dark` 재매핑 구조는 Figma modes(light/dark)와 1:1 대응 가능.
- 착수 조건: 안정화 체크리스트 통과 후 (토큰 변동기에 동기화 파이프라인은 유지비만 증가).

---

## 3. 토큰 거버넌스 정책 (신설 — CLAUDE.md 반영 대상)

### 3.1 토큰 변경 프로세스

| 작업 | 절차 |
|---|---|
| **추가** | 실사용 **3곳 이상** 근거 (grep 결과 첨부) + 계층(Global/Semantic) 명시 + `tokens.md` 동기 |
| **수정** | 영향 범위 분석 (`grep` 전체 참조처) 첨부 + 시각 회귀(Chromatic) 확인 |
| **삭제** | 최소 2주 deprecation — 주석 `/* @deprecated → 대체토큰 */` 유지 후 제거 |

### 3.2 토큰화 기준

- **3곳 이상** 반복되는 값만 토큰화. 1~2회 값은 raw 허용 (스케일 오염 방지).
- 신규 토큰은 Semantic 우선 — Global 스케일 확장은 스케일 갭이 실측으로 증명될 때만.

### 3.3 허용 Raw 값 (Allowlist) — lint 예외

| 패턴 | 사유 |
|---|---|
| `0`, `"0 auto"`, `%`, `100vh/vw` | 제로·레이아웃 값 |
| `1px` 헤어라인 | 마이크로 조정 |
| 방향별 개별 라디우스 (`"20px 20px 0 0"`) | 조합 값 |
| 차트 palette (`--color-palette-*` 참조) | 시리즈 전용 Global (기존 정책) |
| 컬러 배경 위 `#fff` 전경 | 테마 무관 (기존 정책) |
| 라이브 번들 추출 CSS (`.ai-assistant-btn` 등) | 픽셀 일치 정책 (기존 정책) |

---

## 4. 로드맵

| Phase | 항목 | 선행 조건 |
|---|---|---|
| **1** | 2.7 감사 도구 → 2.1~2.3 실측 및 spacing/radius/shadow 토큰 정의 | 없음 |
| **2** | 2.5~2.6 design-lint 확장 + CI baseline | Phase 1 (스케일이 있어야 유도 가능) |
| **3** | §3 거버넌스 CLAUDE.md·tokens.md 명문화 | Phase 1과 병행 가능 |
| **4** | 2.4 갭 토큰 (수요 발생 시) · P4 Figma 동기화 | 안정화 체크리스트 통과 |

---

## 5. 비채택 항목 기록 (재논의 방지)

- **`clamp()` 반응형 프리셋** — 고정 px 데스크톱 대시보드 체계와 충돌. 모바일 대응 요구가 생기면 그 시점에 별도 기획.
- **`sp()` 컴파운드 유틸** — className 유틸 체계에서 불필요.
- **CSS Custom Properties 전환 / CSS 템플릿 인터폴레이션** — 이미 본 DS의 기본 구조.
