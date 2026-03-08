"use client";

import { useState } from "react";
import NDAForm from "./components/NDAForm";
import NDAPreview from "./components/NDAPreview";
import { defaultFormData, NDAFormData } from "./types";
import { downloadDocument } from "./utils/generateDocument";

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Mutual NDA Creator
            </h1>
            <p className="text-xs text-gray-500">
              Based on Common Paper Mutual NDA v1.0 (CC BY 4.0)
            </p>
          </div>
          <button
            onClick={() => downloadDocument(formData)}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download Document
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* Form panel */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit lg:sticky lg:top-6">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
              Agreement Details
            </h2>
            <NDAForm data={formData} onChange={setFormData} />
          </div>

          {/* Preview panel */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Preview
              </h2>
              <button
                onClick={() => downloadDocument(formData)}
                className="text-xs text-blue-600 hover:underline"
              >
                Download
              </button>
            </div>
            <NDAPreview data={formData} />
          </div>
        </div>
      </main>
    </div>
  );
}
