#!/usr/bin/env node
/**
 * audit-tokens — DS 소스(src 하위 *.tsx) 토큰 적용률 감사 도구.
 *
 * 카테고리별(color / font / spacing / radius / shadow)로
 *   - 토큰 참조 (var(--*), 토큰 바인딩 유틸 클래스)
 *   - raw 값 (inline hex·rgba·px 리터럴, px 리터럴 유틸 클래스)
 * 을 집계하여 적용률 테이블 + raw 값 빈도표를 출력한다.
 *
 * 용도:
 *   1. 스케일 실측 — spacing/radius/shadow 토큰 정의의 빈도 근거 (DS-ENHANCEMENT-PLAN §2.1~2.3)
 *   2. 회귀 감시 — 적용률 하락(raw 값 유입) 추적 지표
 *
 * Usage:
 *   node scripts/audit-tokens.mjs            # 사람용 테이블
 *   node scripts/audit-tokens.mjs --json     # 기계용 JSON (CI/추이 기록)
 *
 * 주의: 본 도구는 "측정"만 한다. 차단(gate)은 lint-src-tokens.mjs 담당.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const asJson = process.argv.includes("--json");

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

const files = collectTsx(SRC);

/* ── 집계 유틸 ─────────────────────────────────────────── */

function tally(map, key, n = 1) {
  map.set(key, (map.get(key) || 0) + n);
}

function countMatches(text, re) {
  return (text.match(re) || []).length;
}

/* ── 카테고리 정의 ─────────────────────────────────────── */
// 각 카테고리: token(토큰 바인딩으로 인정) / raw(리터럴 값) 패턴.

const SPACING_UTIL = /\b(?:gap|gap-x|gap-y|space-x|space-y|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(\d+(?:_\d+)?px)\b/g;
const SPACING_INLINE = /\b(?:gap|padding|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingInline|paddingBlock|margin|marginTop|marginBottom|marginLeft|marginRight):\s*"([^"]+)"/g;
const RADIUS_UTIL_RAW = /\brounded(?:-(?:t|b|l|r|tl|tr|bl|br|s|e|ss|se|es|ee))?-(\d+(?:_\d+)?px)\b/g;
const RADIUS_UTIL_TOKEN = /\brounded-(?:sm|md|lg|xl|full)\b/g;
const RADIUS_INLINE = /\bborderRadius:\s*"?([^",}]+)"?/g;
const SHADOW_INLINE = /\bboxShadow:\s*"([^"]+)"/g;
const SHADOW_UTIL_RAW = /\bshadow-0_[a-z0-9_-]+/g;
const FONT_SIZE_INLINE = /\bfontSize:\s*"?([^",}]+)"?/g;
const FONT_UTIL_TOKEN = /\btext-(?:chart|xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl)\b/g;
const FONT_UTIL_RAW = /\btext-(\d+px)\b/g;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RGBA = /\brgba?\(/g;

const cats = {
  color: { token: 0, raw: 0, rawValues: new Map() },
  font: { token: 0, raw: 0, rawValues: new Map() },
  spacing: { token: 0, raw: 0, rawValues: new Map() },
  radius: { token: 0, raw: 0, rawValues: new Map() },
  shadow: { token: 0, raw: 0, rawValues: new Map() },
};

const perFileRaw = new Map(); // file → raw 총계 (핫스팟 표시용)

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  let fileRaw = 0;

  /* color — 토큰: var(--color-*) · 텍스트 위계 유틸. raw: hex, rgba() (var() fallback 내부 제외) */
  cats.color.token += countMatches(text, /var\(--color-[a-z0-9-]+/g);
  cats.color.token += countMatches(text, /\b(?:text|bg|border-color|stroke|fill|hover-bg|hover-border)-(?:primary|secondary|tertiary|disabled|brand-blue|bg|card|surface-\d+|status-[a-z]+)\b/g);
  // var(...) fallback 안의 리터럴은 토큰 바인딩으로 간주 → var( 구간 제거 후 raw 탐지
  const noVar = text.replace(/var\(--[^)]*\)/g, "");
  for (const m of noVar.matchAll(HEX)) {
    tally(cats.color.rawValues, m[0].toLowerCase());
    cats.color.raw++; fileRaw++;
  }
  const rgbaCount = countMatches(noVar, RGBA);
  if (rgbaCount) {
    tally(cats.color.rawValues, "rgba(...)", rgbaCount);
    cats.color.raw += rgbaCount; fileRaw += rgbaCount;
  }

  /* font — 토큰: text-* 스케일 유틸 · var(--text-*). raw: text-NNpx · inline fontSize px */
  cats.font.token += countMatches(text, FONT_UTIL_TOKEN);
  cats.font.token += countMatches(text, /var\(--text-[a-z0-9-]+\)/g);
  for (const m of text.matchAll(FONT_UTIL_RAW)) {
    tally(cats.font.rawValues, m[1]);
    cats.font.raw++; fileRaw++;
  }
  for (const m of text.matchAll(FONT_SIZE_INLINE)) {
    const v = m[1].trim();
    if (v.includes("var(")) { cats.font.token++; continue; }
    tally(cats.font.rawValues, v);
    cats.font.raw++; fileRaw++;
  }

  /* spacing — 토큰: var(--spacing-*). raw: 유틸 px 값 · inline padding/margin/gap */
  cats.spacing.token += countMatches(text, /var\(--spacing-[a-z0-9-]+\)/g);
  for (const m of text.matchAll(SPACING_UTIL)) {
    tally(cats.spacing.rawValues, m[1].replace("_", "."));
    cats.spacing.raw++; fileRaw++;
  }
  for (const m of text.matchAll(SPACING_INLINE)) {
    const v = m[1].trim();
    if (v.includes("var(")) { cats.spacing.token++; continue; }
    tally(cats.spacing.rawValues, v);
    cats.spacing.raw++; fileRaw++;
  }

  /* radius — 토큰: rounded-{sm,md,lg,xl,full} · var(--radius-*). raw: rounded-Npx · inline borderRadius */
  cats.radius.token += countMatches(text, RADIUS_UTIL_TOKEN);
  cats.radius.token += countMatches(text, /var\(--radius-[a-z0-9-]+\)/g);
  for (const m of text.matchAll(RADIUS_UTIL_RAW)) {
    tally(cats.radius.rawValues, m[1].replace("_", "."));
    cats.radius.raw++; fileRaw++;
  }
  for (const m of text.matchAll(RADIUS_INLINE)) {
    const v = m[1].trim();
    if (v.includes("var(")) { cats.radius.token++; continue; }
    tally(cats.radius.rawValues, v);
    cats.radius.raw++; fileRaw++;
  }

  /* shadow — 토큰: shadow-sm 유틸 · var(--shadow-*). raw: 리터럴 boxShadow · shadow-0_* 유틸 */
  cats.shadow.token += countMatches(text, /\bshadow-(?:sm|md|lg)\b/g);
  cats.shadow.token += countMatches(text, /var\(--shadow-[a-z0-9-]+/g);
  for (const m of text.matchAll(SHADOW_INLINE)) {
    const v = m[1].trim();
    if (v.includes("var(")) continue; // 위에서 token 으로 집계됨
    tally(cats.shadow.rawValues, v);
    cats.shadow.raw++; fileRaw++;
  }
  for (const m of text.matchAll(SHADOW_UTIL_RAW)) {
    tally(cats.shadow.rawValues, m[0]);
    cats.shadow.raw++; fileRaw++;
  }

  if (fileRaw > 0) perFileRaw.set(rel, fileRaw);
}

/* ── 출력 ──────────────────────────────────────────────── */

function pct(token, raw) {
  const total = token + raw;
  return total === 0 ? 100 : Math.round((token / total) * 1000) / 10;
}

if (asJson) {
  const out = {
    date: new Date().toISOString().slice(0, 10),
    files: files.length,
    categories: Object.fromEntries(
      Object.entries(cats).map(([k, v]) => [
        k,
        {
          token: v.token,
          raw: v.raw,
          adoption: pct(v.token, v.raw),
          rawValues: Object.fromEntries(
            [...v.rawValues.entries()].sort((a, b) => b[1] - a[1])
          ),
        },
      ])
    ),
  };
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
}

console.log(`\n📊 Token Adoption Audit — src/**/*.tsx (${files.length} files)`);
console.log("═".repeat(64));
console.log(
  "  category   token refs   raw values   adoption"
);
console.log("─".repeat(64));
for (const [name, v] of Object.entries(cats)) {
  console.log(
    `  ${name.padEnd(10)} ${String(v.token).padStart(10)} ${String(v.raw).padStart(12)} ${String(pct(v.token, v.raw) + "%").padStart(10)}`
  );
}
console.log("═".repeat(64));

for (const [name, v] of Object.entries(cats)) {
  if (v.rawValues.size === 0) continue;
  console.log(`\n▸ ${name} — raw 값 빈도 (상위 15)`);
  const sorted = [...v.rawValues.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
  for (const [val, n] of sorted) {
    console.log(`    ${String(n).padStart(4)} × ${val}`);
  }
}

const hotspots = [...perFileRaw.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
if (hotspots.length) {
  console.log(`\n▸ raw 값 핫스팟 (상위 10 파일)`);
  for (const [f, n] of hotspots) {
    console.log(`    ${String(n).padStart(4)} × ${f}`);
  }
}
console.log();
