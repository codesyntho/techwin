import fs from "fs";
import path from "path";
import { runInNewContext } from "vm";

/**
 * NOTE: This file is tuned for dev friendliness:
 * - cache results in-memory to avoid repeated slow FS scans during dev
 * - recognize index.(ts|tsx|js) inside product folders
 * - fallback to first JS/TS file inside folder
 * - avoid executing files when possible (prefer JSON/meta)
 */

let _cachedProducts: any = null;
let _cachedPaths: { category: string; product: string }[] | null = null;

function findProductsDir(): string | null {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const cand1 = path.join(dir, "src", "data", "products");
    const cand2 = path.join(dir, "Frontend", "src", "data", "products");
    if (fs.existsSync(cand1)) return cand1;
    if (fs.existsSync(cand2)) return cand2;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  const fallbackA = path.join(process.cwd(), "src", "data", "products");
  const fallbackB = path.join(process.cwd(), "data", "products");
  if (fs.existsSync(fallbackA)) return fallbackA;
  if (fs.existsSync(fallbackB)) return fallbackB;
  return null;
}

function normalizeSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Read and return product structure.
 * Caches result in-memory to speed up repeated dev calls.
 */
export function getAllProducts(): { categorySlug: string; categoryTitle?: string; products: { slug: string; title: string }[] }[] {
  if (_cachedProducts) return _cachedProducts;

  const productsDir = findProductsDir();
  if (!productsDir) return [];

  const categories = fs.readdirSync(productsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((dir) => {
      const dirName = dir.name;
      const categorySlug = normalizeSlug(dirName);
      const categoryPath = path.join(productsDir, dirName);

      const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

      // products are either directories or files with product extensions
      const productEntries = entries
        .filter((f) => f.isDirectory() || /\.(json|md|ts|tsx|js)$/i.test(f.name))
        .map((f) => {
          const rawName = f.isDirectory() ? f.name : f.name.replace(/\.(json|md|ts|tsx|js)$/i, "");
          const slug = normalizeSlug(rawName);

          // try to load metadata (meta.json inside folder or product.json)
          let title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          try {
            const folderMeta = f.isDirectory() ? path.join(categoryPath, rawName, "meta.json") : null;
            const fileMeta = path.join(categoryPath, rawName + ".json");
            if (folderMeta && fs.existsSync(folderMeta)) {
              const meta = JSON.parse(fs.readFileSync(folderMeta, "utf8"));
              if (meta?.title) title = meta.title;
            } else if (fs.existsSync(fileMeta)) {
              const meta = JSON.parse(fs.readFileSync(fileMeta, "utf8"));
              if (meta?.title) title = meta.title;
            }
          } catch (err) {
            // ignore errors reading meta files
          }
          return { slug, title };
        });

      return {
        categorySlug,
        categoryTitle: categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        products: productEntries,
      };
    });

  _cachedProducts = categories;
  return categories;
}

export function getAllCategories(): string[] {
  const products = getAllProducts();
  return products.map((p) => p.categorySlug);
}

export function getAllProductPaths(): { category: string; product: string }[] {
  if (_cachedPaths) return _cachedPaths;
  const categories = getAllProducts();
  const out: { category: string; product: string }[] = [];
  for (const c of categories) {
    for (const p of c.products) {
      out.push({ category: c.categorySlug, product: p.slug });
    }
  }
  if (process.env.NODE_ENV !== "production") {
    try {
      console.debug("[getAllProductPaths] generated", out.length, "paths. sample:", out.slice(0, 10));
    } catch (e) {}
  }
  _cachedPaths = out;
  return out;
}

export async function getProductData(category: string, productSlug: string) {
  let productsRoot = findProductsDir() || path.join(process.cwd(), "src", "data", "products");
  if (!fs.existsSync(productsRoot)) productsRoot = path.join(process.cwd(), "data", "products");

  // find actual category directory case-insensitively
  let base = path.join(productsRoot, category);
  if (!fs.existsSync(base)) {
    try {
      const entries = fs.readdirSync(productsRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
      const match = entries.find((d) => normalizeSlug(d.name) === category);
      if (match) base = path.join(productsRoot, match.name);
    } catch (e) {
      // ignore
    }
  }

  if (!fs.existsSync(base)) {
    if (process.env.NODE_ENV !== "production") {
      try { console.debug("[getProductData] category folder not found:", base); } catch (e) {}
    }
    return null;
  }

  // helper: find any inner TS/JS file inside a folder (fallback)
  const folderFallbackFiles = (folder: string) => {
    try {
      if (!fs.existsSync(folder)) return [];
      const inner = fs.readdirSync(folder);
      return inner.filter((fn) => /\.(ts|tsx|js)$/i.test(fn)).map((fn) => path.join(folder, fn));
    } catch (e) {
      return [];
    }
  };

  // Helper: try to extract a top-level object literal from source without full TS transpile.
  // Returns the object text (including surrounding braces) or null.
  function extractTopLevelObject(src: string): string | null {
    const exportDefaultIdx = src.indexOf("export default");
    let startIdx = -1;
    if (exportDefaultIdx !== -1) {
      const after = src.slice(exportDefaultIdx + "export default".length);
      const bracePos = after.indexOf("{");
      if (bracePos !== -1) startIdx = exportDefaultIdx + "export default".length + bracePos;
    }
    if (startIdx === -1) {
      const m = src.match(/export\s+(const|let|var)\s+[A-Za-z0-9_]+(?:\s*:\s*[^{=]+)?\s*=\s*\{/);
      if (m && m.index !== undefined) {
        const matchStr = m[0];
        const idx = m.index + matchStr.lastIndexOf("{");
        startIdx = idx;
      }
    }
    if (startIdx === -1) return null;

    // Walk the source from startIdx to find matching closing brace, handling strings/comments.
    let i = startIdx;
    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    let inTemplate = false;
    let inSingleComment = false;
    let inMultiComment = false;
    let escaped = false;
    for (; i < src.length; i++) {
      const ch = src[i];
      const next = src[i + 1];
      if (inSingleComment) {
        if (ch === "\n") inSingleComment = false;
        continue;
      }
      if (inMultiComment) {
        if (ch === "*" && next === "/") { inMultiComment = false; i++; }
        continue;
      }
      if (!inSingle && !inDouble && !inTemplate) {
        if (ch === "/" && next === "/") { inSingleComment = true; i++; continue; }
        if (ch === "/" && next === "*") { inMultiComment = true; i++; continue; }
      }
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if (inSingle) {
        if (ch === "'") inSingle = false;
        continue;
      }
      if (inDouble) {
        if (ch === '"') inDouble = false;
        continue;
      }
      if (inTemplate) {
        if (ch === "`") { inTemplate = false; }
        continue;
      }
      if (ch === "'") { inSingle = true; continue; }
      if (ch === '"') { inDouble = true; continue; }
      if (ch === "`") { inTemplate = true; continue; }
      if (ch === "{") {
        depth++;
        continue;
      }
      if (ch === "}") {
        depth--;
        if (depth === 0) {
          return src.slice(startIdx, i + 1);
        }
      }
    }
    return null;
  }

  // Generate useful slug variants to match files like `1.5um.ts`
  function generateSlugVariants(slug: string): string[] {
    const variants = new Set<string>();
    variants.add(slug);

    // e.g. "1-5um" -> "1.5um", "2-0um" -> "2.0um"
    const dotUmVariant = slug.replace(/(\d)-(\d)um/g, (_m, a, b) => `${a}.${b}um`);
    variants.add(dotUmVariant);

    // also try replacing sequences of -digit to .digit (best-effort)
    const dotDigits = slug.replace(/-(\d)(?=[^-]*$)/g, (_m, a) => `.${a}`);
    variants.add(dotDigits);

    // try swapping dots back to hyphens (if original file contains dots)
    variants.forEach((v) => variants.add(v.replace(/\./g, "-")));

    return Array.from(variants).filter(Boolean);
  }

  const slugVariants = generateSlugVariants(productSlug);

  // candidate patterns to check for each variant
  const patterns = [
    (name: string) => path.join(base, name, "product.json"),
    (name: string) => path.join(base, name, "meta.json"),
    (name: string) => path.join(base, name, "index.json"),
    (name: string) => path.join(base, name + ".json"),
    (name: string) => path.join(base, name, "index.ts"),
    (name: string) => path.join(base, name, "index.tsx"),
    (name: string) => path.join(base, name, "index.js"),
    (name: string) => path.join(base, name + ".ts"),
    (name: string) => path.join(base, name + ".tsx"),
    (name: string) => path.join(base, name + ".js"),
  ];

  // build deduplicated candidate list
  const candidates = Array.from(new Set(slugVariants.flatMap(v => patterns.map(fn => fn(v)))));

  // iterate candidates
  for (const c of candidates) {
    try {
      if (!fs.existsSync(c)) continue;

      if (process.env.NODE_ENV !== "production") {
        try { console.debug("[getProductData] found candidate:", c); } catch (e) {}
      }

      const ext = path.extname(c).toLowerCase();
      let raw: any = null;

      if (ext === ".json") {
        raw = JSON.parse(fs.readFileSync(c, "utf8"));
      } else if (ext === ".ts" || ext === ".tsx" || ext === ".js") {
        // Best-effort handling for TS/TSX/JS files:
        // 1) Try TypeScript transpile (dev dependency).
        // 2) If VM exec fails, try extracting a top-level object literal and evaluate only that.
        // 3) Fallback to regex-based stripping as last resort.
        const fileContent = fs.readFileSync(c, "utf8");
        try {
          let transformedCode: string | null = null;
          let lastErr: any = null;

          // Attempt 1: transpile TypeScript -> CommonJS (if TS available) or use original JS
          if (ext === ".ts" || ext === ".tsx") {
            try {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const ts = require("typescript");
              const transpiled = ts.transpileModule(fileContent, {
                compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
                fileName: c,
              });
              transformedCode = transpiled.outputText;
            } catch (e) {
              transformedCode = null;
              lastErr = e;
            }
          } else {
            transformedCode = fileContent;
          }

          const tryRun = (code: string) => {
            const context: any = { exports: {}, module: { exports: {} }, require: require, console: console, global: global };
            runInNewContext(code, context);
            return context.exports.default || context.module.exports || context.exports;
          };

          // If we have transpiled code, try to run it first
          if (transformedCode) {
            try {
              raw = tryRun(transformedCode);
            } catch (err) {
              lastErr = err;
              raw = null;
            }
          }

          // If running transpiled code failed (or TS wasn't available), try extracting top-level object literal
          if (!raw) {
            try {
              const obj = extractTopLevelObject(fileContent);
              if (obj) {
                const wrapper = `module.exports = ${obj}`;
                try {
                  raw = tryRun(wrapper);
                } catch (err) {
                  lastErr = err;
                  raw = null;
                }
              }
            } catch (e) {
              lastErr = e;
              raw = null;
            }
          }

          // Final fallback: regex-based stripping to remove TS-specific bits and try again
          if (!raw) {
            try {
              const fallbackCode = fileContent
                .replace(/export\s+default\s+/g, "exports.default = ")
                .replace(/export\s+(const|let|var|function|class)\s+/g, "$1 ")
                .replace(/import\s+[^'\"]+['\"][^'\"]+['\"]\s*;?/g, "")
                .replace(/:\s*[A-Za-z0-9_\[\]\<\>\|]+\s*(=|\)|;|\n)/g, "$1");
              try {
                raw = tryRun(fallbackCode);
              } catch (err) {
                lastErr = err;
                raw = null;
              }
            } catch (e) {
              lastErr = e;
            }
          }

          if (!raw && process.env.NODE_ENV !== "production") {
            try { console.debug("[getProductData] vm exec failed for", c, lastErr); } catch (e) {}
          }
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            try { console.debug("[getProductData] error handling TS/JS candidate", c, err); } catch (e) {}
          }
          raw = null;
        }
      }

      if (!raw) {
        if (process.env.NODE_ENV !== "production") {
          try { console.debug("[getProductData] parsed raw was null for", c); } catch (e) {}
        }
        continue;
      }

      // Normalize product object shape
      const rawSections = Array.isArray(raw.sections) ? raw.sections : [];
      const normalizedSections = rawSections.map((s: any) => {
        if (!s || typeof s !== "object") return s;
        if (s.type === "specs") {
          const blocks = Array.isArray(s.blocks) ? s.blocks : (Array.isArray(s.groups) ? s.groups : (Array.isArray(s.specGroups) ? s.specGroups : []));
          const flattenedRows: any[] = Array.isArray(s.rows) ? [...s.rows] : [];
          for (const b of blocks) {
            if (b && Array.isArray(b.rows)) flattenedRows.push(...b.rows);
          }
          return { ...s, blocks: blocks.length ? blocks : undefined, groups: s.groups && s.groups.length ? s.groups : undefined, specGroups: s.specGroups && s.specGroups.length ? s.specGroups : undefined, rows: flattenedRows.length ? flattenedRows : undefined };
        }
        return s;
      });

      const resolvePreviewImage = () => {
        if (!raw) return "";
        if (raw.previewImageSrc) return raw.previewImageSrc;
        if (raw.previewImage) return raw.previewImage;
        if (raw.preview && typeof raw.preview === "string") return raw.preview;
        const firstGallery = Array.isArray(raw.galleryImages) ? raw.galleryImages[0] : undefined;
        if (firstGallery) {
          if (typeof firstGallery === "string") return firstGallery;
          if (firstGallery.src) return firstGallery.src;
        }
        const firstImg = Array.isArray(raw.images) ? raw.images[0] : undefined;
        if (firstImg) {
          if (typeof firstImg === "string") return firstImg;
          if (firstImg.src) return firstImg.src;
          if (firstImg.url) return firstImg.url;
        }
        return "";
      };

      const product: any = {
        slug: raw.slug || productSlug,
        category: category,
        published: raw.published ?? true,
        featured: raw.featured ?? false,
        meta: raw.meta || { title: raw.metaTitle || raw.title || raw.slug, description: raw.metaDescription || raw.shortDescription || "" },
        title: raw.title || raw.metaTitle || productSlug,
        shortDescription: raw.shortDescription || raw.description || "",
        heroImage: raw.heroImage || (raw.images && raw.images[0]) || { src: raw.hero || (raw.images && raw.images[0] && (raw.images[0].src || raw.images[0].url)) || "", alt: raw.title || "" },
        previewImageSrc: resolvePreviewImage(),
        galleryImages: raw.galleryImages ? raw.galleryImages.map((i: any) => (typeof i === "string" ? { src: i, alt: raw.title || "" } : i)) : ((raw.images || []).map((i: any) => (typeof i === "string" ? { src: i, alt: raw.title || "" } : (i.src || i.url ? { src: i.src || i.url, alt: i.alt || raw.title || "" } : { src: "", alt: "" })))),
        datasheetUrl: raw.datasheetUrl || (Array.isArray(raw.datasheets) && raw.datasheets[0] && raw.datasheets[0].url) || "",
        datasheetImageSrc: raw.datasheetImageSrc || raw.datasheetUrl || (Array.isArray(raw.datasheets) && raw.datasheets[0] && (raw.datasheets[0].image || raw.datasheets[0].url)) || "",
        sections: normalizedSections,
        relatedProducts: raw.relatedProducts || [],
        // Pass-through fields useful for the UI that may appear in product files
        tableCsvUrl: raw.tableCsvUrl || raw.tableCSVUrl || raw.tableCsv || undefined,
        tableData: raw.tableData || undefined,
        tableImageUrl: raw.tableImageUrl || undefined,
        graphImageURL: raw.graphImageURL || raw.graphImageUrl || raw.graphImage || undefined,
      };

      if (process.env.NODE_ENV !== "production") {
        try { console.debug("[getProductData] parsed product", productSlug, "from", c); } catch (e) {}
      }
      return product;
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        try { console.debug("[getProductData] error checking candidate", c, err); } catch (e) {}
      }
    }
  }

  // Folder fallback: if folder exists, attempt first .ts/.tsx/.js inside it
  try {
    const folder = path.join(base, productSlug);
    const fallback = folderFallbackFiles(folder);
    if (fallback.length) {
      for (const fx of fallback) {
        try {
          const fileContent = fs.readFileSync(fx, "utf8");
          let raw: any = null;

          const tryRun = (code: string) => {
            const context: any = { exports: {}, module: { exports: {} }, require: require, console: console, global: global };
            runInNewContext(code, context);
            return context.exports.default || context.module.exports || context.exports;
          };

          // Try TS transpile if file is .ts/.tsx
          const ext = path.extname(fx).toLowerCase();
          if (ext === ".ts" || ext === ".tsx") {
            try {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const ts = require("typescript");
              const transpiled = ts.transpileModule(fileContent, {
                compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
                fileName: fx,
              });
              try {
                raw = tryRun(transpiled.outputText);
              } catch (e) {
                raw = null;
              }
            } catch (e) {
              // ignore
            }
          }

          // If not found yet, try extracting top-level object literal
          if (!raw) {
            try {
              const obj = extractTopLevelObject(fileContent);
              if (obj) {
                try {
                  raw = tryRun(`module.exports = ${obj}`);
                } catch (e) {
                  raw = null;
                }
              }
            } catch (e) {
              // ignore
            }
          }

          // Final fallback: regex-based lightweight strip
          if (!raw) {
            try {
              const transformedCode = fileContent
                .replace(/export\s+default\s+/g, "exports.default = ")
                .replace(/export\s+(const|let|var|function|class)\s+/g, "$1 ")
                .replace(/import\s+[^'\"]+['\"][^'\"]+['\"]\s*;?/g, "")
                .replace(/:\s*[A-Za-z0-9_\[\]\<\>\|]+\s*(=|\)|;|\n)/g, "$1");
              try {
                raw = tryRun(transformedCode);
              } catch (e) {
                raw = null;
              }
            } catch (e) {
              // ignore
            }
          }

          if (raw) {
            const product = {
              slug: raw.slug || productSlug,
              category,
              title: raw.title || productSlug,
              shortDescription: raw.shortDescription || raw.description || "",
              sections: Array.isArray(raw.sections) ? raw.sections : [],
              heroImage: raw.heroImage || (raw.images && raw.images[0]) || { src: "", alt: "" },
              datasheetUrl: raw.datasheetUrl || "",
              // lightweight passthroughs from simpler fallback product files
              tableCsvUrl: raw.tableCsvUrl || raw.tableCSVUrl || raw.tableCsv || undefined,
              tableData: raw.tableData || undefined,
              tableImageUrl: raw.tableImageUrl || undefined,
              graphImageURL: raw.graphImageURL || raw.graphImageUrl || raw.graphImage || undefined,
            };
            return product;
          }
        } catch (e) {
          // try next fallback file
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

