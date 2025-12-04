#!/usr/bin/env node
/*
  Simple script to generate a static products index JSON from
  the `src/data/products` folder. This mirrors the minimal
  behavior used by the header to build the categories list.

  Run this before `next build` (we'll wire it into package.json).
*/
const fs = require('fs');
const path = require('path');

function normalizeSlug(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function findProductsDir() {
  const root = process.cwd();
  const cand = path.join(root, 'src', 'data', 'products');
  if (fs.existsSync(cand)) return cand;
  return null;
}

function getCategoryImageFromDataFile(categoryDirName) {
  // Map category directory names to their data file and image paths
  const imageMap = {
    'Broadband-ASE-Sources': '/category/Broadband-ASE-Sources.jpg',
    'Fiber-Amplifiers': '/category/Fiber-Amplifier.jpg',
    'High-Power-Fiber-Lasers': '/category/High-Power-Single-Frequency-Fiber-Lasers.jpg',
    'point-light-sources': '/category/Point-Light-Source-Solutions.jpg',
    'Seed-Lasers': '/category/High-Precision-Seed-Fiber-Lasers.jpg',
    'Single-Frequency-Fiber-Lasers': '/category/Single-Frequency-Fiber-Lasers.jpg',
    'Testing-Systems': '/category/Laser-Testing-and-Measurement-Systems.jpg',
    'Wavelength-Conversion-Lasers': '/category/Wavelength-Conversion-Laser-Solutions-High-Precision-Performance.jpg',
  };
  return imageMap[categoryDirName] || '';
}

function readCategories() {
  const productsDir = findProductsDir();
  if (!productsDir) return [];

  const categories = fs.readdirSync(productsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(dir => {
      const dirPath = path.join(productsDir, dir.name);
      const categorySlug = normalizeSlug(dir.name);
      const items = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(f => f.isDirectory() || /\.(json|md|ts|tsx|js)$/i.test(f.name))
        .map(f => {
          const rawName = f.isDirectory() ? f.name : f.name.replace(/\.(json|md|ts|tsx|js)$/i, '');
          const slug = normalizeSlug(rawName);
          const title = rawName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          return { slug, title };
        });

      return {
        categorySlug,
        categoryTitle: dir.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        categoryImage: getCategoryImageFromDataFile(dir.name),
        products: items,
      };
    });

  return categories;
}

function writeToPublic(data) {
  const outDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'products.json');
  fs.writeFileSync(outFile, JSON.stringify({ products: data }, null, 2), 'utf8');
  console.log('Wrote', outFile);
}

try {
  const cats = readCategories();
  writeToPublic(cats);
} catch (err) {
  console.error('Failed to generate products.json', err);
  process.exit(1);
}
