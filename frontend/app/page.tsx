'use client';

import { useState } from 'react';
import NdaForm from '@/components/NdaForm';
import NdaPreview from '@/components/NdaPreview';
import { defaultNdaData, NdaData } from '@/lib/ndaTemplate';

export default function Home() {
  const [data, setData] = useState<NdaData>(defaultNdaData);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900">Mutual NDA Creator</h1>
        <p className="text-sm text-gray-500">Fill in the details to generate your Mutual Non-Disclosure Agreement</p>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-96 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto p-6">
          <NdaForm data={data} onChange={setData} />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <NdaPreview data={data} />
        </main>
      </div>
    </div>
  );
}
