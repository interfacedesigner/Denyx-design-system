import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Denyx Design System — MCP Server (Streamable HTTP transport)
 *
 * Vercel Serverless Function at /api/mcp.
 * Implements MCP JSON-RPC over HTTP: initialize, tools/list, tools/call.
 *
 * Reads markdown catalogs from the co-deployed static Storybook output
 * at /design-system/*.md (same origin).
 */

const SERVER_INFO = {
  name: "denyx-design-system",
  version: "0.1.0",
};

const PROTOCOL_VERSION = "2025-03-26";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve the base URL for fetching static assets from the same deployment. */
function getBaseUrl(req: VercelRequest): string {
  // Use the incoming Host header — this is the production alias or custom domain
  // the client actually hit. VERCEL_URL points to a unique deployment URL that
  // may require authentication, so we avoid it.
  const host = req.headers.host ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  return `${proto}://${host}`;
}

async function fetchDoc(base: string, filename: string): Promise<string> {
  const url = `${base}/design-system/${filename}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

// ---------------------------------------------------------------------------
// Component index (extracted from catalogs)
// ---------------------------------------------------------------------------

interface ComponentInfo {
  name: string;
  layer: "Foundation" | "Composite" | "Shell";
  category: "Primitives" | "Chrome" | "Denyx AI";
  description: string;
}

const COMPONENT_INDEX: ComponentInfo[] = [
  // -- Primitives (Foundation) --
  { name: "Checkbox", layer: "Foundation", category: "Primitives", description: "3-state checkbox (checked/unchecked/indeterminate)" },
  { name: "Tooltip", layer: "Foundation", category: "Primitives", description: "Hover/focus short description overlay" },
  { name: "Chip", layer: "Foundation", category: "Primitives", description: "Static label/tag/metadata colored chip" },
  { name: "FilterChip", layer: "Foundation", category: "Primitives", description: "Interactive filter chip with toggle, count, close" },
  { name: "TextField", layer: "Foundation", category: "Primitives", description: "Label + input + helper text form field" },
  { name: "Select", layer: "Foundation", category: "Primitives", description: "Native select dropdown with unified styling" },
  { name: "Tabs", layer: "Foundation", category: "Primitives", description: "Tab group (large page tabs / segmented toggle)" },
  { name: "Modal", layer: "Foundation", category: "Primitives", description: "Dialog with backdrop, panel, footer, 3-channel close" },
  { name: "FilterDropdown", layer: "Foundation", category: "Primitives", description: "Trigger + expandable panel (checkbox list or free children)" },

  // -- Chrome (mixed layers) --
  { name: "DashboardLayout", layer: "Shell", category: "Chrome", description: "240px Sidebar + right content 2-column layout" },
  { name: "Sidebar", layer: "Composite", category: "Chrome", description: "240px (collapsed 40px) sidebar with logo, switcher, menu tree, product rail" },
  { name: "PageHeader", layer: "Composite", category: "Chrome", description: "48px page header with AI widget toggle entry point" },
  { name: "PageHeaderAiInline", layer: "Composite", category: "Chrome", description: "48px header with inline AiPrompt instead of toggle button" },
  { name: "SubHeaderBar", layer: "Foundation", category: "Chrome", description: "40px secondary nav row below page header" },
  { name: "OptionbarInstanceSelector", layer: "Foundation", category: "Chrome", description: "180px instance selector dropdown with status dot" },
  { name: "LiveTimerCompact", layer: "Foundation", category: "Chrome", description: "32px LIVE timer with polling progress" },
  { name: "TimeRangeSelector", layer: "Foundation", category: "Chrome", description: "Dual datetime range input with live toggle" },
  { name: "PresetSelect", layer: "Foundation", category: "Chrome", description: "230px preset dropdown with manage button" },
  { name: "DataTable", layer: "Foundation", category: "Chrome", description: "Generic CSS-grid data table with density options" },
  { name: "FilterBar", layer: "Composite", category: "Chrome", description: "Search + filter + action bar for data pages" },
  { name: "MiniLineChart", layer: "Foundation", category: "Chrome", description: "96px compact line chart for monitoring cards" },
  { name: "WeekHourMatrix", layer: "Foundation", category: "Chrome", description: "7x24 day-hour notification matrix" },
  { name: "Button", layer: "Foundation", category: "Chrome", description: "Standard click trigger (3 variant x 4 size x 3 tone)" },
  { name: "Toast", layer: "Foundation", category: "Chrome", description: "Top-center fixed notification with auto-dismiss" },
  { name: "Stage", layer: "Foundation", category: "Chrome", description: "16:9 prototype stage (marketing/demo only)" },
  { name: "AiSymbol", layer: "Foundation", category: "Chrome", description: "Denyx AI pinwheel gradient symbol" },
  { name: "DashboardBuildingProgress", layer: "Foundation", category: "Chrome", description: "Dashboard building progress loader with step checks" },
  { name: "DenyxAiContext", layer: "Foundation", category: "Chrome", description: "React Context provider for AI widget state" },

  // -- Denyx AI (widget) --
  { name: "AiCard", layer: "Foundation", category: "Denyx AI", description: "White card wrapper with border, padding, entry animation" },
  { name: "AiCaption", layer: "Foundation", category: "Denyx AI", description: "11px bold uppercase section label (REASONING, COST ANALYSIS)" },
  { name: "AiSectionHeading", layer: "Foundation", category: "Denyx AI", description: "Color dot + bold heading pattern inside cards" },
  { name: "AiToneBadge", layer: "Foundation", category: "Denyx AI", description: "Small colored classification chip with dot + label" },
  { name: "AiBulletList", layer: "Foundation", category: "Denyx AI", description: "Unified ul/li list for widget body text" },
  { name: "DenyxAiWidget", layer: "Shell", category: "Denyx AI", description: "480px right AI widget panel (header + landing + messages + input)" },
  { name: "AiChatExchange", layer: "Composite", category: "Denyx AI", description: "User Q&A pair with attachments" },
  { name: "AiReasoning", layer: "Foundation", category: "Denyx AI", description: "Reasoning progress steps with spinner/check" },
  { name: "AiStepsTimeline", layer: "Foundation", category: "Denyx AI", description: "Collapsible progress timeline" },
  { name: "AiToolCallStep", layer: "Foundation", category: "Denyx AI", description: "Agent tool invocation block" },
  { name: "AiLoadingMessage", layer: "Foundation", category: "Denyx AI", description: "Data collection loading message" },
  { name: "AiInsightSection", layer: "Foundation", category: "Denyx AI", description: "General analysis paragraph (title + body)" },
  { name: "AiUsageChart", layer: "Foundation", category: "Denyx AI", description: "24-hour GPU utilization bar chart" },
  { name: "AiChoiceButtons", layer: "Foundation", category: "Denyx AI", description: "2-choice CTA (primary gradient + secondary outline)" },
  { name: "AiProposalCard", layer: "Composite", category: "Denyx AI", description: "Configuration proposal card with sections" },
  { name: "AiKeyValuePreview", layer: "Foundation", category: "Denyx AI", description: "KV table preview with notes" },
  { name: "AiToneRow", layer: "Foundation", category: "Denyx AI", description: "Tone dot + title + detail row" },
  { name: "AiOptionButton", layer: "Foundation", category: "Denyx AI", description: "Selectable option button with states" },
  { name: "AiSeverityRow", layer: "Foundation", category: "Denyx AI", description: "Severity + timestamp + message list row" },
  { name: "AiExecutionResult", layer: "Foundation", category: "Denyx AI", description: "Execution result message (success/failure/unknown)" },
  { name: "AiMessageActions", layer: "Foundation", category: "Denyx AI", description: "Response feedback actions (like/dislike/copy)" },
  { name: "AiClickCursor", layer: "Foundation", category: "Denyx AI", description: "Auto-click cursor for demos (non-production)" },
];

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "list-components",
    description:
      "Returns the full Denyx Design System component list organized by hierarchy (Foundation/Composite/Shell) and category (Primitives/Chrome/Denyx AI).",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          enum: ["Primitives", "Chrome", "Denyx AI"],
          description: "Optional filter by category. Omit to list all.",
        },
      },
    },
  },
  {
    name: "get-component",
    description:
      "Returns detailed information for a specific component including docstring, props table, and usage examples. Fetches from the live markdown catalog.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description:
            'Component name (e.g. "Button", "AiCard", "DataTable", "DenyxAiWidget"). Case-insensitive.',
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get-tokens",
    description:
      "Returns the Denyx Design System token definitions: Tone (5 levels), Typography (11 size scale, 3 weights, 6 line-heights, 4 tracking), Text Color hierarchy, and named typography patterns.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get-patterns",
    description:
      "Returns the Denyx Design System composition patterns and Do/Don't rules: Page Header invariant, Sidebar collapse, SVG text units, DataTable policies, Chart peak alignment, AiCard delegation, Token-only colors, Stagger delay, Typography hierarchy, AI category separation, and more.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
];

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

function handleListComponents(params: Record<string, unknown>): string {
  const categoryFilter = params?.category as string | undefined;

  let items = COMPONENT_INDEX;
  if (categoryFilter) {
    items = items.filter(
      (c) => c.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // Group by layer
  const byLayer: Record<string, ComponentInfo[]> = {};
  for (const c of items) {
    (byLayer[c.layer] ??= []).push(c);
  }

  const lines: string[] = [
    `# Denyx Design System Components (${items.length})`,
    "",
  ];

  for (const layer of ["Foundation", "Composite", "Shell"] as const) {
    const group = byLayer[layer];
    if (!group?.length) continue;
    lines.push(`## ${layer} (${group.length})`);
    lines.push("");
    for (const c of group) {
      lines.push(`- **${c.name}** [${c.category}] -- ${c.description}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

async function handleGetComponent(
  params: Record<string, unknown>,
  base: string
): Promise<string> {
  const nameParam = (params?.name as string) ?? "";
  const key = nameParam.toLowerCase().trim();

  if (!key) {
    return "Error: `name` parameter is required. Use `list-components` to see available components.";
  }

  // Find the component in the index
  const info = COMPONENT_INDEX.find((c) => c.name.toLowerCase() === key);
  if (!info) {
    const suggestions = COMPONENT_INDEX.filter((c) =>
      c.name.toLowerCase().includes(key)
    )
      .map((c) => c.name)
      .slice(0, 5);
    return `Component '${nameParam}' not found.${
      suggestions.length
        ? ` Did you mean: ${suggestions.join(", ")}?`
        : " Use list-components to see all available components."
    }`;
  }

  // Determine which doc file to fetch
  let docFile: string;
  if (info.category === "Primitives") {
    docFile = "primitives.md";
  } else if (info.category === "Chrome") {
    docFile = "chrome-components.md";
  } else {
    docFile = "widget-components.md";
  }

  try {
    const content = await fetchDoc(base, docFile);

    // Extract the section for this component
    const section = extractComponentSection(content, info.name);

    const lines: string[] = [
      `# ${info.name}`,
      "",
      `- **Category:** ${info.category}`,
      `- **Layer:** ${info.layer}`,
      `- **Description:** ${info.description}`,
      "",
    ];

    if (section) {
      lines.push("## Details", "", section);
    } else {
      lines.push(
        `_(Detailed documentation is in ${docFile} but the section could not be extracted. Use get-tokens or get-patterns for related information.)_`
      );
    }

    return lines.join("\n");
  } catch (err) {
    return `# ${info.name}\n\n- **Category:** ${info.category}\n- **Layer:** ${info.layer}\n- **Description:** ${info.description}\n\n_(Could not fetch detailed docs: ${err})_`;
  }
}

/** Extract a component section from a markdown doc by heading. */
function extractComponentSection(
  markdown: string,
  componentName: string
): string | null {
  const lines = markdown.split("\n");
  let capturing = false;
  let depth = 0;
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{2,3})\s+(.+)/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();

      if (capturing) {
        // Stop if we hit another heading at same or higher level
        if (level <= depth) break;
      }

      // Match component name (exact or close match)
      if (
        title === componentName ||
        title.startsWith(componentName + " ") ||
        title === `~~${componentName}~~` // deprecated
      ) {
        capturing = true;
        depth = level;
        continue; // skip the heading line itself
      }
    }

    if (capturing) {
      result.push(line);
    }
  }

  const text = result.join("\n").trim();
  return text || null;
}

// ---------------------------------------------------------------------------
// JSON-RPC handling
// ---------------------------------------------------------------------------

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number | string | null;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

function jsonRpcError(
  id: number | string | null,
  code: number,
  message: string
): JsonRpcResponse {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function jsonRpcResult(
  id: number | string | null,
  result: unknown
): JsonRpcResponse {
  return { jsonrpc: "2.0", id, result };
}

function textContent(text: string) {
  return { content: [{ type: "text", text }] };
}

async function handleRpcRequest(
  req: VercelRequest,
  body: JsonRpcRequest
): Promise<JsonRpcResponse> {
  const { id, method, params } = body;
  const base = getBaseUrl(req);

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });

    case "notifications/initialized":
      // Client acknowledgement -- no response needed for notifications,
      // but since this came as a request with an id, respond with empty result.
      return jsonRpcResult(id, {});

    case "tools/list":
      return jsonRpcResult(id, { tools: TOOLS });

    case "tools/call": {
      const toolName = (params as Record<string, unknown>)
        ?.name as string;
      const toolArgs =
        ((params as Record<string, unknown>)?.arguments as Record<
          string,
          unknown
        >) ?? {};

      switch (toolName) {
        case "list-components":
          return jsonRpcResult(
            id,
            textContent(handleListComponents(toolArgs))
          );

        case "get-component":
          return jsonRpcResult(
            id,
            textContent(await handleGetComponent(toolArgs, base))
          );

        case "get-tokens":
          try {
            const tokens = await fetchDoc(base, "tokens.md");
            return jsonRpcResult(id, textContent(tokens));
          } catch (err) {
            return jsonRpcResult(
              id,
              textContent(`Error fetching tokens: ${err}`)
            );
          }

        case "get-patterns":
          try {
            const patterns = await fetchDoc(base, "patterns.md");
            return jsonRpcResult(id, textContent(patterns));
          } catch (err) {
            return jsonRpcResult(
              id,
              textContent(`Error fetching patterns: ${err}`)
            );
          }

        default:
          return jsonRpcError(
            id,
            -32602,
            `Unknown tool: ${toolName}. Available: ${TOOLS.map((t) => t.name).join(", ")}`
          );
      }
    }

    default:
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}

// ---------------------------------------------------------------------------
// Vercel handler
// ---------------------------------------------------------------------------

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers for cross-origin MCP clients
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // GET -- return server info / discovery
  if (req.method === "GET") {
    return res.status(200).json({
      name: SERVER_INFO.name,
      version: SERVER_INFO.version,
      protocolVersion: PROTOCOL_VERSION,
      description:
        "Denyx Design System MCP Server. Send JSON-RPC POST requests to this endpoint.",
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    });
  }

  // Only POST for JSON-RPC
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const body = req.body as JsonRpcRequest;

  if (!body || body.jsonrpc !== "2.0" || !body.method) {
    return res
      .status(400)
      .json(
        jsonRpcError(
          body?.id ?? null,
          -32600,
          "Invalid JSON-RPC request. Must include jsonrpc: '2.0' and method."
        )
      );
  }

  try {
    const response = await handleRpcRequest(req, body);
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json(
        jsonRpcError(
          body.id,
          -32603,
          `Internal error: ${err instanceof Error ? err.message : String(err)}`
        )
      );
  }
}
