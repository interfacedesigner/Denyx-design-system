# Get Started — Denyx Design System

> 이 문서는 Design Language 웹사이트의 Get Started 페이지 콘텐츠 원본입니다.
> 비개발자(디자이너, PM, 기획자)가 읽을 수 있는 수준으로 작성되었습니다.

---

## Denyx Design System이 뭔가요?

**미리 만들어진 UI 부품의 카탈로그**입니다.

버튼, 입력창, 헤더, 사이드바, AI 대화 카드 등 — 화면을 구성하는 모든 부품이 여기에 있습니다. 부품을 골라서 조합하면 일관된 Denyx 제품 화면이 만들어집니다.

### 왜 필요한가요?

- **일관성** — 모든 화면이 같은 색상, 글꼴, 간격을 사용
- **속도** — 매번 처음부터 만들지 않고 기존 부품을 조합
- **품질** — 한 곳을 고치면 모든 화면에 자동 반영

---

## 부품은 어떻게 구성되어 있나요?

3단계로 나뉩니다. 작은 것부터 큰 것 순서:

### 1단계: Primitives (기본 블록)

혼자서 동작하는 가장 작은 단위.

**예시:** 버튼, 체크박스, 입력창, 테이블, 드롭다운

→ 레고로 치면 **개별 브릭** 하나하나입니다.

### 2단계: Composite (조합 블록)

기본 블록 여러 개를 합친 영역.

**예시:** 페이지 헤더 (타이틀 + 검색 + 알림 + 프로필), 사이드바 (로고 + 메뉴 + 스위처)

→ 레고로 치면 **조립된 모듈** (자동차 문짝, 지붕 등).

### 3단계: Shell (전체 골격)

조합 블록들을 최종 배치한 페이지 뼈대.

**예시:** 대시보드 레이아웃 (사이드바 + 헤더 + 콘텐츠 + AI 위젯)

→ 레고로 치면 **완성된 건물 골격**.

---

## 토큰이 뭔가요?

색상, 글꼴, 간격 같은 **설계 규격값**입니다.

예를 들어:
- "이 파란색" → `Brand Blue (#296CF2)`
- "본문 글꼴 크기" → `13px (text-md)`
- "카드 배경" → `White (#FFFFFF)`

토큰을 바꾸면 그 토큰을 사용하는 **모든 부품이 자동으로 바뀝니다**.

→ "회사 브랜드 색을 바꿔야 해요" → 토큰 하나만 수정 → 전체 제품에 반영

---

## 어떻게 시작하나요?

### 디자이너라면

1. **Storybook 카탈로그**를 엽니다
   → https://denyx-design-system-storybook.vercel.app
2. 좌측 트리에서 부품을 찾습니다
3. **Docs** 탭에서 사용법을 확인합니다
4. **Controls** 패널에서 옵션을 바꿔보며 탐색합니다

**필요한 부품이 없으면?** → DS 레포에 요청 (GitHub Issue 또는 담당 디자이너)

### 엔지니어라면

1. Getting Started 문서를 따릅니다
   → https://denyx-design-system-storybook.vercel.app/design-system/GETTING-STARTED.md
2. 스타터 템플릿을 복사해서 시작합니다
   → `templates/starter/` 폴더
3. AI 에이전트를 MCP로 연결하면 코딩 도움을 받을 수 있습니다
   → `https://denyx-design-system-storybook.vercel.app/api/mcp`

### PM / 기획자라면

1. Storybook 카탈로그에서 현재 사용 가능한 부품을 확인합니다
2. **Shell** 카테고리에서 전체 페이지 골격 구성을 파악합니다
3. 화면 기획 시 "어떤 부품을 조합할지"를 부품 이름으로 소통합니다

---

## 핵심 규칙 3가지

1. **색상은 토큰만 사용** — `#FF0000` 같은 색 코드를 직접 쓰지 않습니다. 토큰을 사용합니다.
2. **부품은 조합만** — 기존 부품을 수정하지 않고, prop(옵션)으로 조합합니다.
3. **변경은 DS에서만** — 부품을 고치려면 이 디자인 시스템 저장소에서만 합니다. 제품 코드에서 덮어쓰기 금지.

---

## 유용한 링크

| 이름 | URL | 설명 |
|---|---|---|
| Storybook | https://denyx-design-system-storybook.vercel.app | 부품 카탈로그 (시각 탐색) |
| GitHub | https://github.com/interfacedesigner/Denyx-design-system | 소스 코드 |
| MCP 서버 | https://denyx-design-system-storybook.vercel.app/api/mcp | AI 에이전트 연결 |
| DESIGN.md | https://denyx-design-system-storybook.vercel.app/design-system/DESIGN.md | 전체 카탈로그 합본 |
