#!/usr/bin/env node
/**
 * ds-override-guard — DS 불변 정책 위반 감지 스크립트.
 *
 * 소비자 repo에서 실행하여 디자인 시스템 토큰·컴포넌트에 대한
 * CSS override 시도를 빌드 시점에 경고한다.
 *
 * 설치 (소비자 repo):
 *   cp node_modules/@denyx/design-system/scripts/ds-override-guard.mjs scripts/
 *   // package.json scripts: "lint:ds": "node scripts/ds-override-guard.mjs src/"
 *
 * 감지 패턴:
 *   1. DS 토큰 재정의 (--color-*, --text-*, --spacing, --radius-* 등)
 *   2. !important 로 DS 스타일 덮어쓰기
 *   3. DS 컴포넌트 클래스명 직접 스타일링
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const DS_TOKEN_PATTERN = /--(?:color|text|spacing|radius|font|shadow|border)-[\w-]+\s*:/g;
const IMPORTANT_OVERRIDE = /!important/g;
const DS_CLASS_OVERRIDE = /\.(wds-|ds-|ai-|denyx-|sidebar-|page-header-)[\w-]+\s*\{/g;

const CSS_EXTS = new Set([".css", ".scss", ".less"]);
const STYLE_EXTS = new Set([".tsx", ".jsx", ".ts", ".js"]);

const warnings = [];

function scanFile(filePath) {
  const ext = extname(filePath);
  const isCSS = CSS_EXTS.has(ext);
  const isStyle = STYLE_EXTS.has(ext);
  if (!isCSS && !isStyle) return;

  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, i) => {
    const lineNum = i + 1;

    // 1. DS 토큰 재정의
    if (isCSS) {
      const tokenMatches = line.match(DS_TOKEN_PATTERN);
      if (tokenMatches) {
        tokenMatches.forEach((m) => {
          warnings.push({
            file: filePath,
            line: lineNum,
            rule: "ds-token-override",
            message: `DS 토큰 재정의 금지: ${m.trim()}`,
          });
        });
      }

      // 2. DS 클래스명 직접 스타일링
      const classMatches = line.match(DS_CLASS_OVERRIDE);
      if (classMatches) {
        classMatches.forEach((m) => {
          warnings.push({
            file: filePath,
            line: lineNum,
            rule: "ds-class-override",
            message: `DS 컴포넌트 클래스명 직접 스타일링 금지: ${m.trim()}`,
          });
        });
      }
    }

    // 3. !important (CSS + inline style)
    if (IMPORTANT_OVERRIDE.test(line)) {
      IMPORTANT_OVERRIDE.lastIndex = 0;
      warnings.push({
        file: filePath,
        line: lineNum,
        rule: "ds-important-override",
        message: `!important 로 DS 스타일 덮어쓰기 금지`,
      });
    }
  });
}

function scanDir(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) scanDir(full);
    else scanFile(full);
  }
}

// ── main ──
const targetDir = process.argv[2] || "src";

try {
  statSync(targetDir);
} catch {
  console.error(`❌ 디렉토리를 찾을 수 없습니다: ${targetDir}`);
  process.exit(1);
}

scanDir(targetDir);

if (warnings.length === 0) {
  console.log("✅ DS 불변 정책 위반 없음");
  process.exit(0);
}

console.log(`\n⚠️  DS 불변 정책 위반 ${warnings.length}건 감지\n`);
console.log("┌──────────────────────────────────────────────────────────");
console.log("│ 🔒 디자인 시스템은 DS repo에서만 수정 가능합니다.");
console.log("│    소비 레이어에서의 override · 재정의 · 토큰 변경은 금지.");
console.log("│    변경 요청: https://github.com/interfacedesigner/Denyx-design-system/issues");
console.log("└──────────────────────────────────────────────────────────\n");

for (const w of warnings) {
  console.log(`  ${w.file}:${w.line}`);
  console.log(`    [${w.rule}] ${w.message}\n`);
}

process.exit(1);
