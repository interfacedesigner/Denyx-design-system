# Denyx Design System -- Starter Template

Denyx Design System 을 사용하는 새 프로젝트의 최소 시작점입니다.

## 사용법

### 1. 이 폴더를 복사하세요

```bash
cp -r templates/starter my-new-page
cd my-new-page
```

### 2. DS 연결

`package.json` 의 `@denyx/design-system` 경로를 실제 DS 위치에 맞게 수정하세요.

```jsonc
// package.json
{
  "dependencies": {
    "@denyx/design-system": "link:../../"   // <-- DS repo 상대경로
  }
}
```

`link:` 심링크를 사용하면 DS 소스 수정이 HMR 으로 자동 반영됩니다.

### 3. 의존성 설치

```bash
pnpm install
```

주요 의존성:

| 패키지 | 역할 |
|---|---|
| `@denyx/design-system` | 토큰 + 컴포넌트 (link: 심링크) |
| `react`, `react-dom` | React 19 런타임 |
| `vite`, `@vitejs/plugin-react` | 개발 서버 + 빌드 |
| `typescript` | 타입 체크 |

### 4. 개발 서버 실행

```bash
pnpm dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

## 파일 구성

```
starter/
  App.tsx          -- 메인 페이지 (DashboardLayout + DataTable + AI 위젯)
  package.json     -- 의존성 + 스크립트
  README.md        -- 이 파일
```

## 핵심 규칙

- **인라인 색상 금지** -- `tokens.css` 의 토큰만 사용
- **컴포넌트 재구현 금지** -- DS 에서 import 하여 prop 으로 조합
- **DS 역방향 수정 금지** -- 변경이 필요하면 DS repo 에서 작업
