# Getting Started — Denyx Design System

> 주니어 프론트엔드 엔지니어를 위한 단계별 가이드.
> 모든 코드 블록은 copy-paste 가능합니다.

---

## 1. 설치 (link 심링크 방식)

현재 `@denyx/design-system`은 npm 레지스트리에 배포되지 않습니다.
소비자 프로젝트에서 **로컬 심링크(`link:`)** 로 연결합니다.

### 1-1. DS 레포 클론 및 설치

```bash
git clone git@github.com:interfacedesigner/Denyx-design-system.git
cd Denyx-design-system
pnpm install
```

### 1-2. 소비자 프로젝트에서 link 연결

소비자 프로젝트의 `package.json`에 다음을 추가합니다.

```jsonc
{
  "dependencies": {
    "@denyx/design-system": "link:../Denyx-design-system"
    //                       ↑ 상대 경로를 실제 위치에 맞게 조정
  }
}
```

그 후 소비자 프로젝트에서:

```bash
pnpm install
```

심링크이므로 DS 소스를 수정하면 소비자 프로젝트에 **HMR로 즉시 반영**됩니다.

### 1-3. Storybook 로컬 실행 (선택)

컴포넌트 카탈로그를 브라우저에서 확인하려면:

```bash
cd Denyx-design-system
pnpm storybook
# → http://localhost:5181
```

---

## 2. 기본 사용법

### CSS 임포트

앱 진입점(예: `main.tsx`)에서 **한 줄**만 추가하면 전체 스타일이 적용됩니다.

```tsx
// main.tsx 또는 App.tsx 최상단
import "@denyx/design-system/style.css";
```

> Tailwind, PostCSS 등 외부 CSS 프레임워크는 **불필요**합니다.

### 컴포넌트 임포트 (Chrome / Primitives)

```tsx
import {
  DashboardLayout,
  PageHeader,
  Button,
  DataTable,
  Chip,
  TextField,
} from "@denyx/design-system";
```

### AI 위젯 전용 임포트

AI 위젯 내부에서만 쓰는 컴포넌트는 `/widget` 서브패스로 분리되어 있습니다.

```tsx
import {
  AiCard,
  AiSectionHeading,
  AiBulletList,
  AiToneBadge,
} from "@denyx/design-system/widget";
```

### 토큰만 사용

CSS 변수(컬러, 폰트, spacing 등)만 필요한 경우:

```tsx
import "@denyx/design-system/tokens.css";
```

```css
/* 이후 CSS에서 토큰 변수 참조 */
.my-custom {
  color: var(--color-text-primary);
  background: var(--color-bg);
  border-radius: var(--radius-md);
}
```

---

## 3. 첫 번째 페이지 만들기

`DashboardLayout` + `PageHeader` 조합으로 기본 페이지를 구성합니다.

```tsx
// pages/MyFirstPage.tsx
import "@denyx/design-system/style.css";

import {
  DashboardLayout,
  PageHeader,
  Button,
  DataTable,
  type DataTableColumn,
} from "@denyx/design-system";

const columns: DataTableColumn[] = [
  { key: "no",     header: "No",   width: 52,  align: "center" },
  { key: "name",   header: "이름", flex: 2 },
  { key: "status", header: "상태", width: 96 },
  { key: "count",  header: "건수", width: 80,  numeric: true },
];

const rows = [
  { no: 1, name: "서비스 A", status: "정상", count: 1024 },
  { no: 2, name: "서비스 B", status: "경고", count: 512 },
  { no: 3, name: "서비스 C", status: "정상", count: 2048 },
];

export default function MyFirstPage() {
  return (
    <DashboardLayout
      activeProduct="apm"
      header={
        <PageHeader title="내 첫 번째 페이지" />
      }
      main={
        <div className="flex flex-col gap-16px p-20px">
          <div className="flex gap-8px">
            <Button variant="primary" size="md">
              새로 만들기
            </Button>
            <Button variant="outline" size="md">
              내보내기
            </Button>
          </div>
          <DataTable columns={columns} rows={rows} />
        </div>
      }
    />
  );
}
```

**핵심 포인트:**

- `DashboardLayout`이 사이드바 + 헤더 + 콘텐츠 영역을 자동 구성합니다.
- `activeProduct`로 사이드바에서 활성 제품을 지정합니다.
- `header` prop에 `PageHeader`를, `main` prop에 콘텐츠를 전달합니다.

---

## 4. AI 위젯 연결하기

### 4-1. DenyxAiProvider 설정

앱 루트(또는 페이지 트리 상위)를 `DenyxAiProvider`로 감쌉니다.

```tsx
// App.tsx
import "@denyx/design-system/style.css";
import { DenyxAiProvider } from "@denyx/design-system";
import MyPage from "./pages/MyPage";

export default function App() {
  return (
    <DenyxAiProvider>
      <MyPage />
    </DenyxAiProvider>
  );
}
```

### 4-2. PageHeaderAiInline + DenyxAiWidget 연결

`PageHeaderAiInline`은 페이지 헤더에 AI 프롬프트 입력창을 직접 배치합니다 (2-step이 아닌 1-step 진입).

```tsx
// pages/MyPage.tsx
import {
  DashboardLayout,
  PageHeaderAiInline,
  DenyxAiWidget,
  useDenyxAi,
  type AiPromptSuggestion,
} from "@denyx/design-system";

const AI_SUGGESTIONS: AiPromptSuggestion[] = [
  { label: "사용량 분석",   query: "최근 24시간 사용량 분석해 줘" },
  { label: "이상 탐지",     query: "비정상 패턴이 있는지 확인해 줘" },
];

export default function MyPage() {
  const { aiActive, setAiActive } = useDenyxAi();

  return (
    <DashboardLayout
      activeProduct="apm"
      widgetOpen={aiActive}
      header={
        <PageHeaderAiInline
          title="APM / my-service"
          promptSuggestions={AI_SUGGESTIONS}
          onPromptSubmit={(query) => {
            setAiActive(true);
            console.log("AI 질문:", query);
          }}
        />
      }
      main={<div className="p-20px">페이지 콘텐츠</div>}
    >
      <DenyxAiWidget
        open={aiActive}
        onClose={() => setAiActive(false)}
      />
    </DashboardLayout>
  );
}
```

**흐름 요약:**

1. `useDenyxAi()`로 위젯 열림/닫힘 상태를 관리합니다.
2. `PageHeaderAiInline`의 `onPromptSubmit`에서 위젯을 열고 질문을 처리합니다.
3. `DenyxAiWidget`은 `DashboardLayout`의 children으로 전달합니다.
4. `widgetOpen`을 전달하면 사이드바가 자동으로 축소(240px -> 40px)됩니다.

---

## 5. 컴포넌트 찾기

### Storybook 카탈로그

배포된 Storybook에서 모든 컴포넌트를 인터랙티브하게 확인할 수 있습니다.

| 환경 | URL |
|---|---|
| 배포(Vercel) | `https://denyx-design-system-storybook.vercel.app` |
| 로컬 | `pnpm storybook` -> `http://localhost:5181` |

Storybook 트리 구조:

```
Tokens/          — 색상, 타이포, spacing
Primitives/      — Button, TextField, DataTable ...
Chrome/          — PageHeader, Sidebar, FilterBar ...
Denyx AI/        — AiCard, AiChatExchange, DenyxAiWidget ...
Page/            — 전체 페이지 합성 템플릿
```

### MCP 서버 연결 (AI 에이전트 연동)

AI 에이전트가 컴포넌트를 조회하고 코드를 생성할 수 있습니다.

| 방식 | URL |
|---|---|
| 호스팅 MCP (권장) | `https://denyx-ds-mcp.vercel.app/mcp` |
| 로컬 MCP | `pnpm storybook` -> `http://localhost:5181/mcp` |

### DESIGN.md 컨텍스트 주입

AI 에이전트에게 전체 디자인 시스템 카탈로그를 한 번에 주입하려면:

```bash
curl https://denyx-design-system-storybook.vercel.app/design-system/DESIGN.md > denyx-ds.md
```

이 파일을 AI 에이전트의 컨텍스트에 포함시키면 컴포넌트 선택, prop 사용법, 합성 패턴을 정확하게 안내받을 수 있습니다.

### 텍스트 카탈로그 (docs/ 디렉토리)

| 파일 | 내용 |
|---|---|
| `docs/primitives.md` | Primitives 컴포넌트 카탈로그 |
| `docs/chrome-components.md` | Chrome 컴포넌트 카탈로그 |
| `docs/widget-components.md` | AI 위젯 컴포넌트 카탈로그 |
| `docs/tokens.md` | CSS 토큰 정의 |
| `docs/patterns.md` | 합성 패턴 (페이지 레벨 컴포지션) |

---

## 6. 규칙 요약

### 3계층 구조

```
Primitives ──> Composite ──> Shell
(자립 렌더)     (1단계 조합)    (최종 조립)
```

| 계층 | 규칙 | 예시 |
|---|---|---|
| **Primitives** | 다른 DS 컴포넌트를 import하지 않음 | Button, Chip, DataTable, AiCard |
| **Composite** | Primitives만 조합. Composite끼리 import 금지 | PageHeader, FilterBar, Sidebar |
| **Shell** | 모든 계층 조합 가능. 앱 진입점 | DashboardLayout, DenyxAiWidget |

신규 컴포넌트 추가 시 **반드시 계층을 명시**하세요.

### 인라인 색상 금지 -- 토큰 사용

```tsx
// 금지
<div style={{ background: "#E53935" }}>...</div>

// 올바름
<div className="bg-status-error">...</div>
// 또는
<div style={{ background: "var(--color-status-error)" }}>...</div>
```

모든 색상은 `tokens.css`의 `:root` 변수 또는 `TONE_*` 토큰을 참조합니다.
새 색이 필요하면 **토큰에 먼저 추가** 후 사용합니다.

### DS repo에서만 수정 가능 (불변 정책)

> **이 정책은 불변(immutable)입니다. 예외 없음.**

| 허용 | 금지 |
|---|---|
| prop 조합으로 소비 | 컴포넌트 override / 재정의 |
| DS repo에서 컴포넌트 추가/수정 | 소비자 코드에서 DS CSS 덮어쓰기 |
| Issue 등록하여 변경 요청 | monkey-patch, `!important` 덮어쓰기 |

변경이 필요하면 [DS repo에 Issue를 등록](https://github.com/interfacedesigner/Denyx-design-system/issues)하거나 담당 디자이너에게 문의하세요.

### 기타 주요 규칙

- **AI 영역 분리:** AI 진입점/응답 UI는 `Ai...` 컴포넌트만 사용. 일반 폼/검색은 `TextField`/`Button`.
- **DataTable density:** 기본은 `default`. `compact`는 100+ 행 raw log 한정.
- **SVG 텍스트:** `fontSize`에 반드시 단위 명시 (`"9px"`, `"9pt"`).
- **Tailwind 미사용:** 본 프로젝트는 자체 일반 CSS. Tailwind 재도입 금지.
- **구조는 인라인 금지:** 반복되는 구조는 컴포넌트로 추출. 인라인 허용은 1회성 레이아웃 래퍼에 한함.

---

## 도움이 필요할 때

| 리소스 | 설명 |
|---|---|
| `docs/SKILL.md` | 디자인 시스템 사용 절차 상세 |
| `docs/patterns.md` | 합성 패턴 및 불변식 |
| `stories/0-Introduction.mdx` | Storybook 인트로 페이지 |
| `docs/AI-INTEGRATION.md` | AI/MCP 연동 가이드 |
| [GitHub Issues](https://github.com/interfacedesigner/Denyx-design-system/issues) | 변경 요청 / 버그 리포트 |
