#!/usr/bin/env node
/**
 * lint-src-tokens — DS 소스 내부 raw 값 유입 차단 가드.
 *
 * ds-override-guard.mjs 가 "소비자 → DS" 방향 가드라면, 본 스크립트는
 * "DS 소스 자체" 에 inline hex·raw px 가 유입되는 것을 막는 내부 가드다.
 * (DS-ENHANCEMENT-PLAN §2.5~2.6)
 *
 * 규칙 (src 하위 *.tsx 대상):
 *   raw-color   — inline hex(#xxx)·rgba() 리터럴 → Semantic/Extended Palette 토큰 유도
 *   raw-font    — inline fontSize px 리터럴     → var(--text-*) 유도
 *   raw-radius  — inline borderRadius px 리터럴  → var(--radius-*) 유도
 *   raw-shadow  — inline boxShadow 리터럴        → var(--shadow-sm|md|lg) 유도
 *   raw-spacing — inline padding/margin/gap px   → var(--spacing-*) 유도
 *
 * ※ 유틸 클래스(gap-6px · rounded-4px 등)는 대상이 아님 — denyx-ds.css 소유.
 *
 * Baseline 정책 (비파괴):
 *   기존 위반은 scripts/lint-src-tokens-baseline.json 에 동결.
 *   현재 위반 수가 baseline 을 초과하는 (file × rule) 만 실패 처리.
 *   위반을 줄였다면 --update 로 baseline 을 낮춰 ratchet.
 *
 * Usage:
 *   node scripts/lint-src-tokens.mjs            # 검사 (baseline 초과 시 exit 1)
 *   node scripts/lint-src-tokens.mjs --update   # baseline 재생성
 *   node scripts/lint-src-tokens.mjs --verbose  # baseline 이내 위반도 전부 표시
 *
 * Allowlist (§3.3): 0 · "0 auto" · % · vh/vw · 1px 헤어라인 · 방향별 조합 라디우스 ·
 * #fff(컬러 배경 위 전경) · transparent/currentColor/inherit/none.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const BASELINE_PATH = join(ROOT, "scripts", "lint-src-tokens-baseline.json");
const update = process.argv.includes("--update");
const verbose = process.argv.includes("--verbose");

/* ── 파일 수집 ─────────────────────────────────────────── */

function collectTsx(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      collectTsx(p, out);
    } else if (name.endsWith(".tsx")) {
      out.push(p);
    }
  }
  return out;
}

/* ── Allowlist ─────────────────────────────────────────── */

const COLOR_ALLOW = new Set(["#fff", "#ffffff"]); // 컬러 배경 위 흰색 전경 (테마 무관, 기존 정책)

function isAllowedLayoutValue(v) {
  const val = v.trim().replace(/^["']|["']$/g, "");
  if (val === "" || val === "0" || val === "0 auto" || val === "auto") return true;
  if (/^(inherit|initial|unset|none|transparent|currentColor)$/.test(val)) return true;
  if (val.includes("var(") || val.includes("calc(")) return true; // 토큰/계산 참조
  if (/%|vh|vw|em\b/.test(val)) return true;            // 상대 단위
  if (/^1px$/.test(val)) return true;                    // 헤어라인
  if (val.split(/\s+/).length > 1) return true;          // 방향별 조합 값 ("20px 20px 0 0")
  if (!/^\d/.test(val)) return true;                     // 리터럴 숫자 시작이 아니면 (식/변수)
  return false;
}

/* ── 검사 ──────────────────────────────────────────────── */

const RULES = {
  "raw-color": "인라인 색 리터럴 — Semantic 토큰(var(--color-*)) 또는 Extended Palette 사용",
  "raw-font": "인라인 fontSize 리터럴 — var(--text-*) 또는 text-* 유틸 사용",
  "raw-radius": "인라인 borderRadius 리터럴 — var(--radius-*) 또는 rounded-* 유틸 사용",
  "raw-shadow": "인라인 boxShadow 리터럴 — var(--shadow-sm|md|lg) 사용",
  "raw-spacing": "인라인 padding/margin/gap 리터럴 — var(--spacing-*) 또는 spacing 유틸 사용",
};

/** file(rel) → rule → [{line, value}] */
const violations = new Map();

function report(file, rule, line, value) {
  if (!violations.has(file)) violations.set(file, new Map());
  const byRule = violations.get(file);
  if (!byRule.has(rule)) byRule.set(rule, []);
  byRule.get(rule).push({ line, value });
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

const files = collectTsx(SRC);

for (const abs of files) {
  const rel = relative(ROOT, abs);
  const text = readFileSync(abs, "utf8");

  // 검사 전처리 — 주석 제거 (docstring 의 예시 값 오탐 방지)
  const code = text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));

  /* raw-shadow — boxShadow: "리터럴" (var() 시작이면 허용) */
  for (const m of code.matchAll(/boxShadow:\s*"([^"]+)"/g)) {
    const v = m[1].trim();
    if (v.startsWith("var(")) continue;
    report(rel, "raw-shadow", lineOf(code, m.index), v);
  }

  /* raw-color — hex·rgba 리터럴. var() fallback 내부·boxShadow 문자열 내부는 제외 */
  const noVarNoShadow = code
    .replace(/var\(--[^)]*\)/g, (m) => " ".repeat(m.length))
    .replace(/boxShadow:\s*"[^"]+"/g, (m) => " ".repeat(m.length));
  for (const m of noVarNoShadow.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)) {
    const v = m[0].toLowerCase();
    if (v.startsWith("#") && COLOR_ALLOW.has(v)) continue;
    report(rel, "raw-color", lineOf(noVarNoShadow, m.index), m[0]);
  }

  /* raw-font — fontSize: 숫자 or "Npx" */
  for (const m of code.matchAll(/fontSize:\s*("?)([^",}\n]+)\1/g)) {
    const v = m[2].trim();
    if (v.includes("var(") || !/^\d/.test(v)) continue;
    report(rel, "raw-font", lineOf(code, m.index), v);
  }

  /* raw-radius — borderRadius 리터럴 */
  for (const m of code.matchAll(/borderRadius:\s*("?)([^",}\n]+)\1/g)) {
    const v = m[2].trim();
    if (isAllowedLayoutValue(v)) continue;
    if (/^\d+$/.test(v) || /^\d+(\.\d+)?px$/.test(v)) {
      report(rel, "raw-radius", lineOf(code, m.index), v);
    }
  }

  /* raw-spacing — inline padding/margin/gap 리터럴 */
  for (const m of code.matchAll(
    /\b(gap|rowGap|columnGap|padding(?:Top|Bottom|Left|Right|Inline|Block)?|margin(?:Top|Bottom|Left|Right|Inline|Block)?):\s*("?)([^",}\n]+)\2/g
  )) {
    const v = m[3].trim();
    if (isAllowedLayoutValue(v)) continue;
    if (/^\d+$/.test(v) || /^\d+(\.\d+)?px$/.test(v)) {
      report(rel, "raw-spacing", lineOf(code, m.index), `${m[1]}: ${v}`);
    }
  }
}

/* ── Baseline 비교 ─────────────────────────────────────── */

/** { "src/Foo.tsx": { "raw-color": 3 } } */
function toCounts() {
  const out = {};
  for (const [file, byRule] of [...violations.entries()].sort()) {
    out[file] = {};
    for (const [rule, items] of [...byRule.entries()].sort()) {
      out[file][rule] = items.length;
    }
  }
  return out;
}

const current = toCounts();

if (update) {
  writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n");
  const total = Object.values(current).reduce(
    (a, r) => a + Object.values(r).reduce((x, y) => x + y, 0), 0);
  console.log(`[lint-src-tokens] baseline 갱신 — ${Object.keys(current).length} files, ${total} violations frozen.`);
  process.exit(0);
}

const baseline = existsSync(BASELINE_PATH)
  ? JSON.parse(readFileSync(BASELINE_PATH, "utf8"))
  : {};

const failures = []; // { file, rule, count, allowed, items }
for (const [file, byRule] of violations.entries()) {
  for (const [rule, items] of byRule.entries()) {
    const allowed = baseline[file]?.[rule] ?? 0;
    if (items.length > allowed) {
      failures.push({ file, rule, count: items.length, allowed, items });
    }
  }
}

/* ── 출력 ──────────────────────────────────────────────── */

const totalViolations = Object.values(current).reduce(
  (a, r) => a + Object.values(r).reduce((x, y) => x + y, 0), 0);

console.log(`\n🛡  lint-src-tokens — DS 소스 raw 값 가드 (${files.length} files)`);
console.log("═".repeat(64));
console.log(`  총 위반: ${totalViolations} (baseline 동결분 포함)`);

if (verbose) {
  for (const [file, byRule] of [...violations.entries()].sort()) {
    for (const [rule, items] of byRule.entries()) {
      for (const { line, value } of items) {
        console.log(`  · ${file}:${line} [${rule}] ${value}`);
      }
    }
  }
}

if (failures.length) {
  console.log(`\n❌ baseline 초과 — 신규 raw 값 유입 (${failures.length} file×rule):\n`);
  for (const { file, rule, count, allowed, items } of failures) {
    console.log(`  ${file} [${rule}] ${count}건 (baseline ${allowed}건)`);
    console.log(`    ↳ ${RULES[rule]}`);
    for (const { line, value } of items.slice(0, 10)) {
      console.log(`      L${line}: ${value}`);
    }
  }
  console.log(`\n  기존 위반을 줄인 경우: node scripts/lint-src-tokens.mjs --update 로 ratchet.`);
  console.log("═".repeat(64));
  console.log("FAIL\n");
  process.exit(1);
}

console.log("PASS — 신규 raw 값 유입 없음\n");
