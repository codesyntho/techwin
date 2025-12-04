// src/components/products/ProductGraphsAndTableSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Papa from "papaparse";

type TableData = {
  headers: string[];
  rows: string[][];
  title?: string;
  caption?: string;
};

type Props = {
  graphImageURL?: string;       // main centered graph image URL
  graphAlt?: string;
  heading?: string;             // section heading
  subheading?: string;          // optional small subtitle under heading
  tableData?: TableData | null; // structured table (preferred)
  tableCsvUrl?: string;         // optional: fetch CSV from this URL if tableData not provided
  tableImageUrl?: string;       // fallback if structured table not available
  imageMaxWidth?: string;       // e.g. "720px" (defaults to 720)
  className?: string;
};

function safe(src?: string) {
  return src ? encodeURI(src) : undefined;
}

/** Heuristic normalizer for messy Google Sheet CSV exports.
 *  Finds header row by looking for 'technical parameter' / 'parameter' keywords,
 *  supports two-row header that includes a 'Technical Indicator' with subcolumns
 *  like Minimum / Typical / Maximum.
 */
function normalizeParsedCsv(parsed: Papa.ParseResult<string[]>): TableData | null {
  const rawRows: string[][] = (parsed?.data || []).map((r) =>
    Array.isArray(r) ? r.map((c) => (c ?? "").toString().trim()) : []
  );

  // find first non-empty row index
  const firstNonEmpty = rawRows.findIndex((r) => r.some((c) => c && c.trim() !== ""));
  if (firstNonEmpty === -1) return null;

  // Try to find header row index by keyword
  const headerIdx = rawRows.findIndex((r) =>
    r.some((cell) => /technical parameter|parameter|central wavelength|center wavelength|technical indicator/i.test(cell))
  );

  const useIdx = headerIdx !== -1 ? headerIdx : firstNonEmpty;

  const topHeader = rawRows[useIdx].map((c) => c || "");
  const nextRow = rawRows[useIdx + 1] ? rawRows[useIdx + 1].map((c) => c || "") : [];

  const looksLikeTwoRowHeader =
    topHeader.some((h) => /technical indicator/i.test(h)) &&
    nextRow.some((h) => /minimum|typical|maximum|minimum value|typical value|maxim/i.test(h));

  if (looksLikeTwoRowHeader) {
    const finalHeaders: string[] = [];
    const maxCols = Math.max(topHeader.length, nextRow.length);

    for (let col = 0; col < maxCols; col++) {
      const top = (topHeader[col] || "").trim();
      const sub = (nextRow[col] || "").trim();

      if (/technical parameter|parameter|central wavelength|center wavelength/i.test(top)) finalHeaders.push("Parameter");
      else if (/unit/i.test(top)) finalHeaders.push("Unit");
      else if (/technical indicator/i.test(top) || top === "") {
        if (/minimum/i.test(sub)) finalHeaders.push("Min");
        else if (/typical/i.test(sub)) finalHeaders.push("Typical");
        else if (/maximum|maxim/i.test(sub)) finalHeaders.push("Max");
        else finalHeaders.push(sub || `Col${col}`);
      } else {
        finalHeaders.push(top || sub || `Col${col}`);
      }
    }

    // data rows are after the two header rows
    const dataRows = rawRows.slice(useIdx + 2).filter((r) => r.some((c) => c && c.trim() !== ""));
    const trimmedRows = dataRows.map((r) => r.slice(0, finalHeaders.length).map((c) => c || ""));
    return { headers: finalHeaders, rows: trimmedRows, title: "Technical Specifications" };
  } else {
    // Single-row header
    const headerRow = topHeader.map((c) => (c && c.trim() !== "" ? c : "Col"));
    const dataRows = rawRows.slice(useIdx + 1).filter((r) => r.some((c) => c && c.trim() !== ""));
    const trimmedRows = dataRows.map((r) => r.slice(0, headerRow.length).map((c) => c || ""));
    return { headers: headerRow, rows: trimmedRows, title: "Technical Specifications" };
  }
}

export default function ProductGraphsAndTableSection({
  graphImageURL,
  graphAlt = "Performance graph",
  heading = "Product Information",
  subheading,
  tableData,
  tableCsvUrl,
  tableImageUrl,
  imageMaxWidth = "720px",
  className = "",
}: Props) {
  // internal state for fetched table (if tableData prop not provided)
  const [fetchedTableData, setFetchedTableData] = React.useState<TableData | null | undefined>(tableData ?? undefined);
  const [loading, setLoading] = React.useState(false);

  // If parent supplies tableData prop later, sync it
  React.useEffect(() => {
    if (tableData) setFetchedTableData(tableData);
  }, [tableData]);

  // Fetch CSV from tableCsvUrl if no tableData provided
  React.useEffect(() => {
    if (fetchedTableData !== undefined) return; // already have data or explicitly null
    if (!tableCsvUrl) {
      setFetchedTableData(null);
      return;
    }

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(tableCsvUrl);
        if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
        const txt = await res.text();
        const parsed = Papa.parse<string[]>(txt.trim(), { skipEmptyLines: false });
        const normalized = normalizeParsedCsv(parsed as any);
        if (mounted) setFetchedTableData(normalized ?? null);
      } catch (err) {
        console.error("Failed to fetch/parse CSV", err);
        // In development provide a small fallback so the table rendering can be tested
        if (mounted) {
          if (process.env.NODE_ENV !== "production") {
            setFetchedTableData({
              headers: ["Parameter", "Unit", "Typical"],
              rows: [
                ["Optical Power", "mW", "100"],
                ["Center Wavelength", "nm", "1064"],
                ["Linewidth", "kHz", "<100"],
              ],
              title: "Sample Technical Specifications (fallback)",
            });
          } else {
            setFetchedTableData(null);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [tableCsvUrl, fetchedTableData]);

  // CSV builder for table download/copy - uses fetchedTableData if present else tableData
  const activeTable = fetchedTableData ?? null;

  const buildCSV = React.useCallback((headers: string[], rows: string[][]) => {
    const esc = (s: string) => {
      const str = String(s ?? "");
      if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
      return `"${str}"`;
    };
    const head = headers.map(esc).join(",");
    const body = rows.map((r) => r.map((c) => esc(c ?? "")).join(",")).join("\n");
    return `${head}\n${body}`;
  }, []);

  const downloadCSV = React.useCallback(() => {
    if (!activeTable) return;
    const csv = buildCSV(activeTable.headers, activeTable.rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(activeTable.title || "specs").replace(/\s+/g, "-").toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [activeTable, buildCSV]);

  const copyCSV = React.useCallback(async () => {
    if (!activeTable) return;
    const csv = buildCSV(activeTable.headers, activeTable.rows);
    try {
      await navigator.clipboard.writeText(csv);
      const msg = document.createElement("div");
      msg.textContent = "Table CSV copied to clipboard";
      Object.assign(msg.style, {
        position: "fixed",
        right: "18px",
        bottom: "18px",
        background: "#0f172a",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "8px",
        zIndex: "9999",
      });
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 1400);
    } catch {
      alert("Copy failed — clipboard permission denied.");
    }
  }, [activeTable, buildCSV]);

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{heading}</h3>
          {subheading && <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">{subheading}</p>}
          <div className="mt-4 flex justify-center">
            <span className="inline-block h-1.5 w-20 rounded-full bg-linear-to-r from-[#2aa7d6] to-[#216a9b]" />
          </div>
        </div>

        {/* Graph Card */}
        {graphImageURL && (
          <div className="flex justify-center mb-6 px-4">
            <div
              className="w-full bg-white rounded-xl shadow-md overflow-visible"
              style={{ maxWidth: imageMaxWidth ?? "820px" }}
              role="figure"
              aria-label="Performance graphs"
            >
              <div className="px-3 py-2 border-b border-gray-100 bg-white">
                <div className="text-xs text-gray-500">Performance overview</div>
              </div>

              <div className="w-full bg-white flex items-center justify-center px-4 py-4">
                <Image
                  src={safe(graphImageURL)!}
                  alt={graphAlt}
                  width={1600}
                  height={1200}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>

              <div className="px-3 py-2 border-t border-gray-100 bg-white text-center">
                <p className="text-sm text-gray-600">Graphs: linewidth, stability, spectrum, phase noise (representative)</p>
              </div>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {loading ? (
              <div className="text-center py-6">Loading specifications...</div>
            ) : activeTable ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{activeTable.title ?? "Technical Specifications"}</div>
                    {activeTable.caption && <div className="text-xs text-gray-500">{activeTable.caption}</div>}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={downloadCSV}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#3B9ACB] text-white text-sm shadow-sm hover:brightness-95 transition"
                    >
                      <ArrowDown size={14} />
                      Download CSV
                    </button>
                    <button
                      onClick={copyCSV}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-gray-50 transition"
                    >
                      Copy CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {activeTable.headers.map((h, i) => (
                          <th
                            key={i}
                            className="px-4 py-3 text-left font-medium text-xs text-gray-500 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                      {activeTable.rows.length === 0 ? (
                        <tr>
                          <td className="px-4 py-6 text-center text-gray-500" colSpan={activeTable.headers.length}>
                            No data available
                          </td>
                        </tr>
                      ) : (
                        activeTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {activeTable.headers.map((_, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 align-top text-gray-800">
                                {row[cIdx] ?? ""}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 text-xs text-gray-500 border-t border-gray-100">
                  Values are representative. Contact sales for model-specific datasheets and tolerances.
                </div>
              </div>
            ) : tableImageUrl ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative w-full" style={{ maxWidth: imageMaxWidth }}>
                  <Image
                    src={safe(tableImageUrl)!}
                    alt="Specification table"
                    width={1200}
                    height={800}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-6">No table data provided</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
