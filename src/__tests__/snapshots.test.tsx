/**
 * Snapshot tests — catches unintended markup changes.
 *
 * Each component's rendered HTML is snapshotted via vitest's built-in
 * snapshot feature. When markup intentionally changes, update snapshots
 * with `vitest run --update`.
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
import Tooltip from "../Tooltip";
import DataTable from "../DataTable";

// ── Composite ──
import PageHeader from "../PageHeader";
import FilterBar from "../FilterBar";

// ── AI (widget) ──
import { AiCard, AiSectionHeading, AiBulletList, AiCaption, AiToneBadge } from "../widget/_primitives";

// ---------------------------------------------------------------------------
// Snapshot tests
// ---------------------------------------------------------------------------

describe("Primitives — snapshots", () => {
  it("Button — contained primary md", () => {
    const { container } = render(<Button>Apply</Button>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Button — outline critical lg", () => {
    const { container } = render(
      <Button variant="outline" tone="critical" size="lg">
        Delete
      </Button>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Button — loading state", () => {
    const { container } = render(<Button loading>Saving</Button>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Checkbox — checked", () => {
    const { container } = render(<Checkbox checked={true}>Enable</Checkbox>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Checkbox — unchecked", () => {
    const { container } = render(<Checkbox checked={false}>Disable</Checkbox>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Chip — soft neutral", () => {
    const { container } = render(<Chip>Tag</Chip>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Chip — solid critical closable", () => {
    const { container } = render(
      <Chip variant="solid" tone="critical" closable>
        Error
      </Chip>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("TextField — with label and placeholder", () => {
    const { container } = render(
      <TextField label="Name" placeholder="Enter name" />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("TextField — invalid with helper", () => {
    const { container } = render(
      <TextField label="Email" invalid helperText="Invalid email" />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Select — with options", () => {
    const { container } = render(
      <Select
        label="Metric"
        options={[
          { value: "cpu", label: "CPU" },
          { value: "mem", label: "Memory" },
        ]}
        placeholder="Choose..."
      />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Tabs — large variant", () => {
    const { container } = render(
      <Tabs
        variant="large"
        items={[
          { value: "a", label: "Tab A" },
          { value: "b", label: "Tab B" },
          { value: "c", label: "Tab C", disabled: true },
        ]}
        value="a"
        onChange={() => {}}
      />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Tabs — segmented variant", () => {
    const { container } = render(
      <Tabs
        variant="segmented"
        size="sm"
        items={[
          { value: "1h", label: "1H" },
          { value: "6h", label: "6H" },
        ]}
        value="1h"
        onChange={() => {}}
      />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("Tooltip — with trigger", () => {
    const { container } = render(
      <Tooltip content="Helpful tip">
        <button>?</button>
      </Tooltip>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("DataTable — with data", () => {
    const { container } = render(
      <DataTable
        columns={[
          { key: "no", header: "No", width: 40 },
          { key: "name", header: "Name", flex: 2 },
          { key: "value", header: "Value", width: 80, numeric: true },
        ]}
        rows={[
          { no: 1, name: "Alpha", value: 42 },
          { no: 2, name: "Beta", value: 99 },
        ]}
      />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});

describe("Composite — snapshots", () => {
  it("PageHeader", () => {
    const { container } = render(<PageHeader title="Test Page" />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("FilterBar — empty", () => {
    const { container } = render(<FilterBar />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});

describe("AI primitives — snapshots", () => {
  it("AiCard", () => {
    const { container } = render(
      <AiCard>Simple card content</AiCard>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("AiCaption", () => {
    const { container } = render(<AiCaption>REASONING</AiCaption>);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("AiSectionHeading — with tone", () => {
    const { container } = render(
      <AiSectionHeading tone="critical">Alert</AiSectionHeading>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("AiSectionHeading — with emoji", () => {
    const { container } = render(
      <AiSectionHeading emoji="📊">Data</AiSectionHeading>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("AiToneBadge", () => {
    const { container } = render(<AiToneBadge tone="critical" />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("AiBulletList", () => {
    const { container } = render(
      <AiBulletList items={["Point one", "Point two"]} />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
