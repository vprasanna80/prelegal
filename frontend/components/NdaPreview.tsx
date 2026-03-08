'use client';

import { NdaData, formatDate, getMndaTerm, getConfidentialityTerm, generateDownloadHtml } from '@/lib/ndaTemplate';

interface Props {
  data: NdaData;
}

function CoverRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 pr-4 font-semibold text-gray-700 align-top w-48">{label}</td>
      <td className="py-2 text-gray-800">{value || <span className="text-gray-400 italic">—</span>}</td>
    </tr>
  );
}

const STANDARD_TERMS = [
  {
    n: 1,
    title: 'Introduction',
    text: 'This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page) ("MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the Purpose which (1) the Disclosing Party identifies to the receiving party ("Receiving Party") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("Confidential Information"). Each party\'s Confidential Information also includes the existence and status of the parties\' discussions and information on the Cover Page.',
  },
  {
    n: 2,
    title: 'Use and Protection of Confidential Information',
    text: 'The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party\'s prior written approval, except to employees, agents, and representatives having a reasonable need to know; and (c) protect Confidential Information using at least the same protections it uses for its own similar information but no less than a reasonable standard of care.',
  },
  {
    n: 3,
    title: 'Exceptions',
    text: "The Receiving Party's obligations do not apply to information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew prior to receipt without confidentiality restrictions; (c) it rightfully obtained from a third party without restrictions; or (d) it independently developed without using the Confidential Information.",
  },
  {
    n: 4,
    title: 'Disclosures Required by Law',
    text: 'The Receiving Party may disclose Confidential Information to the extent required by law, subpoena or court order, provided it gives the Disclosing Party reasonable advance notice and cooperates with efforts to obtain confidential treatment.',
  },
  {
    n: 5,
    title: 'Term and Termination',
    text: 'This MNDA commences on the Effective Date and expires at the end of the MNDA Term. Either party may terminate for any reason upon written notice. Confidentiality obligations survive for the Term of Confidentiality.',
  },
  {
    n: 6,
    title: 'Return or Destruction of Confidential Information',
    text: 'Upon termination or request, the Receiving Party will cease using, destroy or return Confidential Information, and confirm compliance in writing if requested.',
  },
  {
    n: 7,
    title: 'Proprietary Rights',
    text: 'The Disclosing Party retains all intellectual property and other rights in its Confidential Information. Disclosure grants no license under such rights.',
  },
  {
    n: 8,
    title: 'Disclaimer',
    text: 'ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.',
  },
  {
    n: 9,
    title: 'Governing Law and Jurisdiction',
    text: null, // rendered dynamically
  },
  {
    n: 10,
    title: 'Equitable Relief',
    text: 'A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. The Disclosing Party is entitled to seek equitable relief, including an injunction, in addition to its other remedies.',
  },
  {
    n: 11,
    title: 'General',
    text: 'Neither party has an obligation to disclose Confidential Information or proceed with any transaction. Neither party may assign this MNDA without prior written consent, except in connection with a merger or acquisition. This MNDA may only be amended by a written agreement signed by both parties.',
  },
];

export default function NdaPreview({ data }: Props) {
  const gl = data.governingLaw || '[Governing Law]';
  const j = data.jurisdiction || '[Jurisdiction]';

  const handleDownload = () => {
    const html = generateDownloadHtml(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mutual-nda.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Document Preview</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Download HTML
        </button>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-8 overflow-auto font-serif text-sm leading-relaxed shadow-sm">
        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-1">Mutual Non-Disclosure Agreement</h1>
        <p className="text-xs text-center text-gray-500 mb-6">
          Common Paper Mutual NDA Standard Terms Version 1.0
        </p>

        {/* Cover page table */}
        <table className="w-full mb-6 text-sm">
          <tbody>
            <CoverRow label="Purpose" value={data.purpose} />
            <CoverRow label="Effective Date" value={formatDate(data.effectiveDate)} />
            <CoverRow label="MNDA Term" value={getMndaTerm(data)} />
            <CoverRow label="Term of Confidentiality" value={getConfidentialityTerm(data)} />
            <CoverRow label="Governing Law" value={data.governingLaw || '[State]'} />
            <CoverRow label="Jurisdiction" value={data.jurisdiction || '[City, State]'} />
          </tbody>
        </table>

        {/* Signature block */}
        <table className="w-full border-collapse mb-8 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-50 w-36 text-left"></th>
              <th className="border border-gray-300 p-2 bg-gray-50 text-center font-semibold">Party 1</th>
              <th className="border border-gray-300 p-2 bg-gray-50 text-center font-semibold">Party 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Signature</td>
              <td className="border border-gray-300 p-2 h-10"></td>
              <td className="border border-gray-300 p-2 h-10"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Print Name</td>
              <td className="border border-gray-300 p-2">{data.party1Name || <span className="text-gray-400">—</span>}</td>
              <td className="border border-gray-300 p-2">{data.party2Name || <span className="text-gray-400">—</span>}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Title</td>
              <td className="border border-gray-300 p-2">{data.party1Title || <span className="text-gray-400">—</span>}</td>
              <td className="border border-gray-300 p-2">{data.party2Title || <span className="text-gray-400">—</span>}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Company</td>
              <td className="border border-gray-300 p-2">{data.party1Company || <span className="text-gray-400">—</span>}</td>
              <td className="border border-gray-300 p-2">{data.party2Company || <span className="text-gray-400">—</span>}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Notice Address</td>
              <td className="border border-gray-300 p-2">{data.party1Address || <span className="text-gray-400">—</span>}</td>
              <td className="border border-gray-300 p-2">{data.party2Address || <span className="text-gray-400">—</span>}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-medium">Date</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
          </tbody>
        </table>

        <hr className="my-6 border-gray-300" />

        {/* Standard terms */}
        <h2 className="text-base font-bold mb-4">Standard Terms</h2>
        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          {STANDARD_TERMS.map((section) => (
            <p key={section.n}>
              <strong>{section.n}. {section.title}.</strong>{' '}
              {section.n === 9
                ? `This MNDA is governed by the laws of the State of ${gl}. Any legal proceedings must be instituted in the federal or state courts located in ${j}. Each party irrevocably submits to the exclusive jurisdiction of such courts.`
                : section.text}
            </p>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Common Paper Mutual Non-Disclosure Agreement Version 1.0 &mdash; free to use under CC BY 4.0.
        </p>
      </div>
    </div>
  );
}
