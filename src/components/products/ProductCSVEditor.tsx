// src/components/products/ProductCSVEditor.tsx
"use client";

import React, { useState, useMemo } from "react";
import Papa from "papaparse";
import Image from "next/image";

type ColType = "text" | "number" | "image" | "json" | "boolean";

type ColumnMeta = { header: string; type: ColType };

export default function ProductCSVEditor({
  initialCsvUrl,
  onGenerateProducts,
}: {
  initialCsvUrl?: string; // optional google sheet export CSV url or public csv
  onGenerateProducts?: (products: any[]) => void; // receive generated product objects
}) {
  const [csvUrl, setCsvUrl] = useState<string | undefined>(initialCsvUrl);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [colMeta, setColMeta] = useState<ColumnMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load CSV from URL
  const loadFromUrl = async (url?: string) => {
    if (!url) return;
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const text = await res.text();
      parseCsvText(text);
    } catch (err: any) {
      setError(`Could not fetch CSV: ${err.message || String(err)}`);
    }
  };

  // parse raw csv text
  const parseCsvText = (text: string) => {
    const parsed = Papa.parse<string[]>(text.trim(), { skipEmptyLines: true });
    if (parsed.errors && parsed.errors.length) {
      console.warn("csv parse errors", parsed.errors);
    }
    const data = parsed.data as string[][];
    if (!data || data.length === 0) {
      setError("CSV empty or invalid");
      return;
    }
    const [h, ...rest] = data;
    setHeaders(h.map((hh) => hh ?? ""));
    setRows(rest.map((r) => r.map((c) => c ?? "")));
    // default meta: all text
    setColMeta(h.map((hh) => ({ header: hh ?? "", type: "text" as ColType })));
  };

  // handle local file input
  const onFileSelected = (f?: File) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result ?? "");
      parseCsvText(txt);
    };
    reader.readAsText(f, "utf-8");
  };

  // cell edit
  const updateCell = (rIdx: number, cIdx: number, value: string) => {
    setRows((prev) => {
      const copy = prev.map((r) => r.slice());
      copy[rIdx][cIdx] = value;
      return copy;
    });
  };

  // change column header
  const updateHeader = (cIdx: number, value: string) => {
    setHeaders((prev) => {
      const copy = prev.slice();
      copy[cIdx] = value;
      return copy;
    });
    setColMeta((prev) => {
      const copy = prev.slice();
      copy[cIdx] = { ...(copy[cIdx] || { header: value, type: "text" }), header: value };
      return copy;
    });
  };

  const setColumnType = (cIdx: number, type: ColType) => {
    setColMeta((prev) => {
      const copy = prev.slice();
      copy[cIdx] = { ...(copy[cIdx] || { header: headers[cIdx] || `col${cIdx}`, type }), type };
      return copy;
    });
  };

  // download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse([headers, ...rows]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-edited.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // export JSON
  const exportJSON = () => {
    const arr = rows.map((r) => {
      const obj: Record<string, any> = {};
      headers.forEach((h, i) => {
        const meta = colMeta[i]?.type ?? "text";
        const val = r[i] ?? "";
        if (meta === "number") obj[h] = val === "" ? null : Number(val);
        else if (meta === "boolean") obj[h] = String(val).toLowerCase() === "true";
        else if (meta === "json") {
          try { obj[h] = JSON.parse(val || "null"); } catch { obj[h] = val; }
        } else obj[h] = val;
      });
      return obj;
    });

    const blob = new Blob([JSON.stringify(arr, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate product objects based on a mapping strategy:
  // This is a simple heuristic: expects columns named slug,title,shortDescription,graphImageURL,tableCSV,category,heroImage,previewImage,datasheetUrl
  const generateProducts = () => {
    const products = rows.map((r) => {
      const rowObj: Record<string, any> = {};
      headers.forEach((h, i) => (rowObj[h] = r[i] ?? ""));
      const p: any = {
        slug: (rowObj.slug || rowObj.Slug || "").toString().trim() || undefined,
        category: (rowObj.category || rowObj.Category || "").toString().trim() || undefined,
        title: rowObj.title || rowObj.Title || "",
        shortDescription: rowObj.shortDescription || rowObj.ShortDescription || rowObj.description || "",
        heroImage: rowObj.heroImage || rowObj.HeroImage || rowObj.previewImage || undefined,
        graphImageURL: rowObj.graphImageURL || rowObj.GraphImageURL || undefined,
        datasheetUrl: rowObj.datasheetUrl || rowObj.DatasheetUrl || undefined,
        previewImageSrc: rowObj.previewImage || rowObj.PreviewImage || undefined,
        // optionally read a JSON column named "tableData" or construct simple table if columns with "spec_" prefix found
        sections: [],
      };

      // parse a "tableData" JSON column if present
      if (rowObj.tableData) {
        try { p.sections.push({ type: "table", table: JSON.parse(rowObj.tableData) }); } catch { /* ignore */ }
      }

      // quick auto-spec extraction: any column name starting with spec_ becomes table row
      const specHeaders = headers.filter((h) => h.toLowerCase().startsWith("spec_"));
      if (specHeaders.length) {
        const specRows: string[][] = specHeaders.map((h) => [h.replace(/^spec_/i, ""), rowObj[h] ?? ""]);
        p.sections.push({ type: "table", table: { headers: ["Parameter", "Value"], rows: specRows, title: "Specs (auto)" } });
      }

      return p;
    });

    // callback
    if (onGenerateProducts) onGenerateProducts(products);
    // also prompt download of JSON
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-generated.json`;
    a.click();
    URL.revokeObjectURL(url);

    return products;
  };

  // bootstrap load if initial url provided
  React.useEffect(() => { if (initialCsvUrl) { loadFromUrl(initialCsvUrl); setCsvUrl(initialCsvUrl); } }, [initialCsvUrl]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex gap-3 mb-4">
        <input value={csvUrl ?? ""} onChange={(e) => setCsvUrl(e.target.value)} placeholder="Enter public CSV URL (Google Sheets export URL allowed)" className="flex-1 px-3 py-2 border rounded" />
        <button onClick={() => loadFromUrl(csvUrl)} className="px-3 py-2 bg-sky-600 text-white rounded">Load URL</button>

        <label className="px-3 py-2 bg-gray-100 rounded cursor-pointer">
          Upload CSV
          <input type="file" accept=".csv" className="hidden" onChange={(e) => onFileSelected(e.target.files?.[0])} />
        </label>

        <button onClick={downloadCSV} className="px-3 py-2 bg-gray-200 rounded">Save CSV</button>
        <button onClick={exportJSON} className="px-3 py-2 bg-gray-200 rounded">Export JSON</button>
        <button onClick={generateProducts} className="px-3 py-2 bg-emerald-600 text-white rounded">Generate Products</button>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      {/* table editor */}
      {headers.length > 0 ? (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((h, cIdx) => (
                  <th key={cIdx} className="px-3 py-2 text-left text-xs text-gray-600">
                    <input value={headers[cIdx]} onChange={(e) => updateHeader(cIdx, e.target.value)} className="w-full text-sm p-1 border rounded" />
                    <select value={colMeta[cIdx]?.type ?? "text"} onChange={(e) => setColumnType(cIdx, e.target.value as ColType)} className="mt-1 w-full text-xs">
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="image">Image URL</option>
                      <option value="json">JSON</option>
                      <option value="boolean">Boolean</option>
                    </select>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {headers.map((_, cIdx) => {
                    const meta = colMeta[cIdx]?.type ?? "text";
                    const value = row[cIdx] ?? "";
                    return (
                      <td key={cIdx} className="px-3 py-2 align-top">
                        {meta === "image" ? (
                          <div className="flex items-center gap-2">
                            <div style={{ width: 64, height: 44, position: "relative", flexShrink: 0 }}>
                              {value ? <Image src={value} alt="img" fill style={{ objectFit: "cover" }} /> : <div className="bg-gray-100 w-full h-full" />}
                            </div>
                            <input className="flex-1 p-1 border rounded text-sm" value={value} onChange={(e) => updateCell(rIdx, cIdx, e.target.value)} />
                          </div>
                        ) : meta === "json" ? (
                          <textarea className="w-full p-1 border rounded text-xs" rows={3} value={value} onChange={(e) => updateCell(rIdx, cIdx, e.target.value)} />
                        ) : (
                          <input className="w-full p-1 border rounded text-sm" value={value} onChange={(e) => updateCell(rIdx, cIdx, e.target.value)} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No CSV loaded yet — paste a public CSV URL or upload a file.</div>
      )}
    </div>
  );
}
