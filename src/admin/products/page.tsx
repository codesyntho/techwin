"use client";

import ProductCSVEditor from "@/components/products/ProductCSVEditor";

export default function AdminProductsPage() {
  // Google Sheet CSV export URL
  const googleCsv =
    "saifbagful@gmail.comhttps://docs.google.com/spreadsheets/d/1dray0_tpQpYOvnh-88lwq-Ejo1bUlKtECY9qyasZS4o/edit?usp=sharing";

  const handleGenerated = (products: any[]) => {
    console.log("Generated product objects:", products);

    // Optional:
    // 1. copy to clipboard
    // 2. save file on server/backend
    // 3. auto-generate .ts product files
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product CSV Editor</h1>

      <ProductCSVEditor
        initialCsvUrl={googleCsv}
        onGenerateProducts={handleGenerated}
      />
    </div>
  );
}
