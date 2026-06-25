/**
 * Regression safety-net — render tests.
 *
 * Imports the ~15 most important components across all layers and verifies:
 *   1. Each renders without throwing.
 *   2. Each produces non-empty DOM content.
 *
 * Environment: happy-dom (configured in vite.config.ts "unit" project).
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";

// ── Primitives ──
import Button from "../Button";
import Checkbox from "../Checkbox";
import Chip from "../Chip";
import TextField from "../TextField";
import Select from "../Select";
import Tabs from "../Tabs";
import Modal from "../Modal";
import Toast from "../Toast";
import Tooltip from "../Tooltip";
import DataTable from "../DataTable";

// ── Composite ──
import PageHeader from "../PageHeader";
import FilterBar from "../FilterBar";
import Sidebar from "../Sidebar";

// ── Shell ──
import DashboardLayout from "../DashboardLayout";

// ── AI (widget) ──
import { AiCard, AiSectionHeading, AiBulletList } from "../widget/_primitives";

// ---------------------------------------------------------------------------
// Render tests
// ---------------------------------------------------------------------------

describe("Primitives — render without throwing", () => {
  it("Button renders with children", () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Click");
  });

  it("Checkbox renders (checked)", () => {
    const { container } = render(<Checkbox checked={true} />);
    expect(container.innerHTML).not.toBe("");
    expect(container.querySelector("input[type='checkbox']")).toBeTruthy();
  });

  it("Checkbox renders (unchecked)", () => {
    const { container } = render(<Checkbox checked={false} />);
    expect(container.innerHTML).not.toBe("");
  });

  it("Chip renders with children", () => {
    const { container } = render(<Chip>Tag</Chip>);
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Tag");
  });

  it("TextField renders", () => {
    const { container } = render(<TextField placeholder="Type here" />);
    expect(container.innerHTML).not.toBe("");
    expect(container.querySelector("input")).toBeTruthy();
  });

  it("Select renders with options", () => {
    const { container } = render(
      <Select
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ]}
      />,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.querySelector("select")).toBeTruthy();
  });

  it("Tabs renders with items", () => {
    const { container } = render(
      <Tabs
        items={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" },
        ]}
        value="one"
        onChange={() => {}}
      />,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("One");
    expect(container.textContent).toContain("Two");
  });

  it("Modal renders nothing when open=false", () => {
    const { container } = render(
      <Modal open={false} onClose={() => {}}>
        Hidden
      </Modal>,
    );
    expect(container.innerHTML).toBe("");
  });

  it("Modal renders when open=true", () => {
    const { container: _c, baseElement } = render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        Visible content
      </Modal>,
    );
    // Modal uses createPortal to document.body
    expect(baseElement.textContent).toContain("Test Modal");
    expect(baseElement.textContent).toContain("Visible content");
  });

  it("Toast renders nothing when open=false", () => {
    const { container } = render(
      <Toast open={false} message="Saved" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("Toast renders when open=true", () => {
    const { baseElement } = render(
      <Toast open={true} message="Saved" onClose={() => {}} />,
    );
    // Toast uses createPortal to document.body
    expect(baseElement.textContent).toContain("Saved");
  });

  it("Tooltip renders trigger child", () => {
    const { container } = render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Hover me");
  });

  it("DataTable renders with columns and rows", () => {
    const columns = [
      { key: "id", header: "ID", width: 40 },
      { key: "name", header: "Name", flex: 1 },
    ];
    const rows = [
      { id: 1, name: "Alpha" },
      { id: 2, name: "Beta" },
    ];
    const { container } = render(
      <DataTable columns={columns} rows={rows} />,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("ID");
    expect(container.textContent).toContain("Alpha");
  });

  it("DataTable renders empty rows without crashing", () => {
    const { container } = render(
      <DataTable
        columns={[{ key: "x", header: "X" }]}
        rows={[]}
      />,
    );
    expect(container.innerHTML).not.toBe("");
  });
});

describe("Composite — render without throwing", () => {
  it("PageHeader renders with title", () => {
    const { container } = render(<PageHeader title="Dashboard" />);
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Dashboard");
  });

  it("FilterBar renders with no props", () => {
    const { container } = render(<FilterBar />);
    expect(container.innerHTML).not.toBe("");
  });

  it("FilterBar renders with search and dropdowns", () => {
    const { container } = render(
      <FilterBar
        search={<input placeholder="Search" />}
        dropdowns={[
          {
            key: "cat",
            label: "Category",
            options: [{ value: "a", label: "A" }],
            value: [],
            onChange: () => {},
          },
        ]}
      />,
    );
    expect(container.innerHTML).not.toBe("");
  });

  it("Sidebar renders with defaults", () => {
    const { container } = render(<Sidebar />);
    expect(container.innerHTML).not.toBe("");
  });

  it("Sidebar renders collapsed", () => {
    const { container } = render(<Sidebar collapsed />);
    expect(container.innerHTML).not.toBe("");
  });
});

describe("Shell — render without throwing", () => {
  it("DashboardLayout renders with minimal props", () => {
    const { container } = render(
      <DashboardLayout
        header={<div>Header</div>}
        main={<div>Main</div>}
      />,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Header");
    expect(container.textContent).toContain("Main");
  });

  it("DashboardLayout renders with widgetOpen", () => {
    const { container } = render(
      <DashboardLayout
        widgetOpen
        header={<div>H</div>}
        main={<div>M</div>}
      >
        <div>Widget</div>
      </DashboardLayout>,
    );
    expect(container.textContent).toContain("Widget");
  });
});

describe("AI primitives — render without throwing", () => {
  it("AiCard renders with children", () => {
    const { container } = render(
      <AiCard>Card content</AiCard>,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Card content");
  });

  it("AiSectionHeading renders with tone", () => {
    const { container } = render(
      <AiSectionHeading tone="critical">Alert</AiSectionHeading>,
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Alert");
  });

  it("AiSectionHeading renders with emoji", () => {
    const { container } = render(
      <AiSectionHeading emoji="📊">Chart</AiSectionHeading>,
    );
    expect(container.textContent).toContain("📊");
    expect(container.textContent).toContain("Chart");
  });

  it("AiBulletList renders items", () => {
    const items = ["First point", "Second point", "Third point"];
    const { container } = render(<AiBulletList items={items} />);
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("First point");
    expect(container.textContent).toContain("Third point");
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });
});
