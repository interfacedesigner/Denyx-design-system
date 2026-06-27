# Contributing — Denyx Design System

## 이 저장소는 직접 수정할 수 없습니다

Denyx Design System은 **단일 출처(Single Source of Truth)** 저장소입니다.
`main` 브랜치는 보호되어 있어 **직접 push가 불가능**합니다.

```
$ git push origin main
→ ❌ 거부됨 (branch protection)
```

### 왜 막혀있나요?

디자인 시스템의 토큰·컴포넌트·위젯은 모든 Denyx 제품에서 공유됩니다.
무단 수정이 들어가면 **모든 제품의 UI가 깨질 수 있기** 때문입니다.

---

## 변경이 필요하다면

### 방법 1: Issue 등록 (권장)

변경 요청만 하고 싶다면:

1. [GitHub Issues](https://github.com/interfacedesigner/Denyx-design-system/issues)에 등록
2. 무엇을 바꾸고 싶은지, 왜 필요한지 설명
3. DS 관리자가 검토 후 반영

### 방법 2: Fork → PR (직접 기여)

코드를 직접 수정해서 제안하고 싶다면:

1. **이 저장소를 Fork** — 우측 상단 "Fork" 버튼
2. **본인 저장소에서 수정** — Fork된 본인 레포에서 자유롭게 작업
3. **PR(Pull Request) 생성** — 원본 저장소로 PR 제출
4. **리뷰 통과** — 최소 1명의 승인 + CI 검증 통과 필요
5. **Merge** — 관리자가 승인하면 반영

```bash
# 1. Fork한 본인 저장소 clone
git clone https://github.com/{your-username}/Denyx-design-system.git

# 2. 브랜치 생성
git checkout -b fix/my-change

# 3. 수정 후 commit & push (본인 저장소로)
git add .
git commit -m "fix: 변경 설명"
git push origin fix/my-change

# 4. GitHub에서 PR 생성 → interfacedesigner/Denyx-design-system으로
```

---

## 소비자(엔지니어)가 지켜야 할 규칙

1. **DS 컴포넌트를 prop 조합으로만 사용** — override·재정의 금지
2. **CSS 덮어쓰기 금지** — `!important`, 토큰 값 변경, DS 클래스 직접 스타일링 금지
3. **새 컴포넌트가 필요하면 DS repo에 요청** — 제품 코드에서 자체 구현 금지

위반 시 `<DsReadOnlyNotice>` 경고 모달이 표시되거나,
`ds-override-guard.mjs` 빌드 검사에서 경고가 발생합니다.

---

## 보호 규칙 요약

| 규칙 | 설정 |
|---|---|
| main 직접 push | **금지** |
| PR 필수 | **필수** |
| 리뷰 승인 | **최소 1명** |
| 오래된 리뷰 자동 해제 | **활성** |
| Force push | **금지** |
| 브랜치 삭제 | **금지** |
| 관리자 예외 | **없음** (관리자도 동일 규칙 적용) |

---

## 문의

- **GitHub Issues**: https://github.com/interfacedesigner/Denyx-design-system/issues
- **Storybook 카탈로그**: https://denyx-design-system-storybook.vercel.app
- **MCP 서버**: https://denyx-design-system-storybook.vercel.app/api/mcp
