# @denyx/design-system

Denyx SaaS 의 단일 컴포넌트·토큰 출처. **Primitives · Chrome · AI Widget 카드 + 토큰(`tokens.css` 의 `:root`)** 을 Storybook 카탈로그로 제공하며, 프론트엔드 엔지니어가 **자기 AI 작업 환경에서 인터페이스 작업에 그대로 사용**하도록 설계됨.

- 라이브 Storybook: https://denyx-design-system-storybook.vercel.app
- 정책 전문: [`CLAUDE.md`](./CLAUDE.md) · 카탈로그: [`docs/`](./docs)

## 설치 / 실행

```bash
pnpm install
pnpm storybook          # http://localhost:5181 (dev) — MCP 엔드포인트 포함
pnpm build-storybook    # 정적 빌드 (DESIGN.md 합본 자동 생성)

pnpm check              # 통합 검증 (typecheck + lint:src + test)
pnpm audit:tokens       # 토큰 적용률/빈도 실측 감사 (--json 지원)
pnpm lint:src           # DS 소스 raw 값 가드 (baseline ratchet — 신규 유입만 실패)
```

## 소비 (다른 앱/프로토타입에서 사용)

```jsonc
// package.json
"@denyx/design-system": "file:<상대경로>/Denyx-design-system"
```
```tsx
import { DashboardLayout, PageHeaderAiInline, DataTable } from "@denyx/design-system";
import "@denyx/design-system/tokens.css";   // import 만으로 전 토큰 :root 보장
```

단일 출처 원칙: 인라인 색 리터럴 금지(토큰 사용), 컴포넌트 inline 재구현 금지(prop 조합). 자세한 정책은 `CLAUDE.md`.

## 토큰

- **2계층** — Global(팔레트·스케일: `--color-gray-50`, `--spacing-md`) / Semantic(의미: `--color-text-primary`). 컴포넌트는 Semantic만 참조.
- **Layout Scale** (2026-07 신설) — Spacing 9단계(2~32px) · Radius 7단계(2~24px/full) · Shadow 3단계. `pnpm audit:tokens` 실측 빈도 기반.
- **거버넌스** — 3곳 이상 반복 값만 토큰화 · 변경은 영향 분석 + 시각 회귀 · 삭제는 2주 deprecation. 상세: [`docs/tokens.md`](./docs/tokens.md).
- **파이프라인** — `tokens.css`(유일 출처) → `scripts/generate-tokens.mjs` → `_tokens.ts` 자동 생성. drift는 `pnpm check:tokens` 감지.

## 🤖 AI 연동 — 본인 AI에 디자인 시스템 연결

엔지니어가 Cursor · Claude Code · VS Code · Windsurf 등에서 이 DS 기준으로 작업하도록 두 채널 제공:

1. **호스팅 MCP** (권장, dev 서버 불필요) — 공개 URL로 바로 연결, DS 컴포넌트·토큰·코드·프리뷰 도구
   - 엔드포인트: `https://denyx-ds-mcp.vercel.app/mcp`
   - Claude Code: `claude mcp add --transport http denyx-ds https://denyx-ds-mcp.vercel.app/mcp`
   - Cursor `.cursor/mcp.json`: `{ "mcpServers": { "denyx-ds": { "url": "https://denyx-ds-mcp.vercel.app/mcp" } } }`
   - 라이브 preview·story 작성·테스트가 필요하면 로컬 `pnpm storybook` 의 `http://localhost:5181/mcp` (addon-mcp)
2. **카탈로그 주입** — AI 컨텍스트에 지식 한 번에 주입
   - `curl https://denyx-design-system-storybook.vercel.app/design-system/DESIGN.md > denyx-ds.md`

**전체 절차·설명: [`docs/AI-INTEGRATION.md`](./docs/AI-INTEGRATION.md)** (라이브: `/design-system/AI-INTEGRATION.md`, 진입 인덱스: `/llms.txt` · `/mcp.txt`)

## 기술 스택

React 19 · Vite 6 · Storybook 10 · TypeScript 5 (strict) · `react-docgen-typescript` autodocs. (스타일은 자체 일반 CSS `denyx-ds.css` — Tailwind 의존·흔적 없음.)
