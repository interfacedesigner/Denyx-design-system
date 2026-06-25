/**
 * Starter template -- Denyx Design System 을 사용하는 최소 페이지.
 *
 * DashboardLayout(Shell) + PageHeaderAiInline(Composite) + DataTable(Primitive)
 * + DenyxAiWidget(Shell) 조합.
 */
import "@denyx/design-system/style.css";
import {
  DashboardLayout,
  PageHeaderAiInline,
  DenyxAiWidget,
  DataTable,
  Button,
} from "@denyx/design-system";
import type {
  DataTableColumn,
} from "@denyx/design-system";
import { useState } from "react";

// ── AI 프롬프트 추천 ─────────────────────────────────────────────
const AI_SUGGESTIONS = [
  { label: "오늘 이슈 요약", query: "오늘 발생한 주요 이슈를 요약해 주세요" },
  { label: "트래픽 추이 분석", query: "최근 24시간 트래픽 추이를 분석해 주세요" },
];

// ── DataTable 컬럼 정의 ──────────────────────────────────────────
interface Row {
  id: number;
  name: string;
  status: string;
  value: number;
}

const columns: DataTableColumn<Row>[] = [
  { key: "id", header: "No", width: 52, align: "center" },
  { key: "name", header: "이름", flex: 2 },
  { key: "status", header: "상태", width: 96 },
  { key: "value", header: "수치", width: 120, numeric: true },
];

const sampleData: Row[] = [
  { id: 1, name: "서버 A", status: "정상", value: 1024 },
  { id: 2, name: "서버 B", status: "경고", value: 870 },
  { id: 3, name: "서버 C", status: "정상", value: 1200 },
  { id: 4, name: "DB Primary", status: "정상", value: 3400 },
  { id: 5, name: "DB Replica", status: "주의", value: 2100 },
];

// ── 메인 콘텐츠 ──────────────────────────────────────────────────
function MainContent() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="solid" tone="primary" size="md">
          새로고침
        </Button>
        <Button variant="outline" tone="neutral" size="md">
          내보내기
        </Button>
      </div>

      <DataTable columns={columns} data={sampleData} density="default" />
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────
export default function App() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <DashboardLayout
      activeProduct="apm"
      widgetOpen={aiOpen}
      header={
        <PageHeaderAiInline
          title="My Page"
          promptSuggestions={AI_SUGGESTIONS}
          onPromptSubmit={(query) => {
            console.log("AI prompt:", query);
            setAiOpen(true);
          }}
        />
      }
      main={<MainContent />}
    >
      <DenyxAiWidget open={aiOpen} onClose={() => setAiOpen(false)} />
    </DashboardLayout>
  );
}
