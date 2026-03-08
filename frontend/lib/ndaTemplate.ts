export interface NdaData {
  purpose: string;
  effectiveDate: string;
  mndaTermType: 'fixed' | 'open';
  mndaTermYears: string;
  confidentialityTermType: 'fixed' | 'perpetual';
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  party1Name: string;
  party1Title: string;
  party1Company: string;
  party1Address: string;
  party2Name: string;
  party2Title: string;
  party2Company: string;
  party2Address: string;
}

export const defaultNdaData: NdaData = {
  purpose: 'Evaluating whether to enter into a business relationship with the other party.',
  effectiveDate: '',
  mndaTermType: 'fixed',
  mndaTermYears: '1',
  confidentialityTermType: 'fixed',
  confidentialityTermYears: '1',
  governingLaw: '',
  jurisdiction: '',
  party1Name: '',
  party1Title: '',
  party1Company: '',
  party1Address: '',
  party2Name: '',
  party2Title: '',
  party2Company: '',
  party2Address: '',
};

export function formatDate(dateStr: string): string {
  if (!dateStr) return '[Effective Date]';
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getMndaTerm(data: NdaData): string {
  if (data.mndaTermType === 'open') return 'Continues until terminated';
  return `Expires ${data.mndaTermYears || '1'} year(s) from Effective Date`;
}

export function getConfidentialityTerm(data: NdaData): string {
  if (data.confidentialityTermType === 'perpetual') return 'In perpetuity';
  return `${data.confidentialityTermYears || '1'} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws`;
}

function f(value: string, fallback: string): string {
  return value.trim() || fallback;
}

export function generateDownloadHtml(data: NdaData): string {
  const gl = f(data.governingLaw, '[Governing Law]');
  const j = f(data.jurisdiction, '[Jurisdiction]');
  const ed = formatDate(data.effectiveDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mutual Non-Disclosure Agreement</title>
  <style>
    body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 40px; color: #111; }
    h1 { text-align: center; font-size: 18pt; margin-bottom: 4px; }
    .subtitle { text-align: center; font-size: 9pt; color: #666; margin-bottom: 32px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    td, th { border: 1px solid #ccc; padding: 8px 12px; font-size: 11pt; }
    th { background: #f5f5f5; font-weight: bold; }
    .cover-table td:first-child { font-weight: bold; width: 200px; vertical-align: top; }
    .sig-row td { height: 48px; }
    hr { margin: 32px 0; border: none; border-top: 1px solid #ccc; }
    h2 { font-size: 14pt; margin-top: 32px; }
    p { margin: 12px 0; font-size: 11pt; }
    .footer { text-align: center; font-size: 9pt; color: #888; margin-top: 32px; }
  </style>
</head>
<body>
<h1>Mutual Non-Disclosure Agreement</h1>
<p class="subtitle">Common Paper Mutual NDA Standard Terms Version 1.0</p>

<table class="cover-table">
  <tr><td>Purpose</td><td>${f(data.purpose, '[Purpose]')}</td></tr>
  <tr><td>Effective Date</td><td>${ed}</td></tr>
  <tr><td>MNDA Term</td><td>${getMndaTerm(data)}</td></tr>
  <tr><td>Term of Confidentiality</td><td>${getConfidentialityTerm(data)}</td></tr>
  <tr><td>Governing Law</td><td>${gl}</td></tr>
  <tr><td>Jurisdiction</td><td>${j}</td></tr>
</table>

<table>
  <thead><tr><th style="width:160px"></th><th>Party 1</th><th>Party 2</th></tr></thead>
  <tbody>
    <tr class="sig-row"><td>Signature</td><td></td><td></td></tr>
    <tr><td>Print Name</td><td>${f(data.party1Name, '')}</td><td>${f(data.party2Name, '')}</td></tr>
    <tr><td>Title</td><td>${f(data.party1Title, '')}</td><td>${f(data.party2Title, '')}</td></tr>
    <tr><td>Company</td><td>${f(data.party1Company, '')}</td><td>${f(data.party2Company, '')}</td></tr>
    <tr><td>Notice Address</td><td>${f(data.party1Address, '')}</td><td>${f(data.party2Address, '')}</td></tr>
    <tr><td>Date</td><td></td><td></td></tr>
  </tbody>
</table>

<hr>
<h2>Standard Terms</h2>

<p><strong>1. Introduction.</strong> This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) (&ldquo;MNDA&rdquo;) allows each party (&ldquo;Disclosing Party&rdquo;) to disclose or make available information in connection with the Purpose which (1) the Disclosing Party identifies to the receiving party (&ldquo;Receiving Party&rdquo;) as &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;, or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (&ldquo;Confidential Information&rdquo;). Each party&rsquo;s Confidential Information also includes the existence and status of the parties&rsquo; discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how.</p>

<p><strong>2. Use and Protection of Confidential Information.</strong> The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party&rsquo;s prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.</p>

<p><strong>3. Exceptions.</strong> The Receiving Party&rsquo;s obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.</p>

<p><strong>4. Disclosures Required by Law.</strong> The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party&rsquo;s expense, with the Disclosing Party&rsquo;s efforts to obtain confidential treatment for the Confidential Information.</p>

<p><strong>5. Term and Termination.</strong> This MNDA commences on the Effective Date (${ed}) and expires at the end of the MNDA Term (${getMndaTerm(data)}). Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party&rsquo;s obligations relating to Confidential Information will survive for the Term of Confidentiality (${getConfidentialityTerm(data)}), despite any expiration or termination of this MNDA.</p>

<p><strong>6. Return or Destruction of Confidential Information.</strong> Upon expiration or termination of this MNDA or upon the Disclosing Party&rsquo;s earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party&rsquo;s written request, destroy all Confidential Information in the Receiving Party&rsquo;s possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing.</p>

<p><strong>7. Proprietary Rights.</strong> The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.</p>

<p><strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.</p>

<p><strong>9. Governing Law and Jurisdiction.</strong> This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${gl}, without regard to the conflict of laws provisions of such ${gl}. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${j}. Each party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.</p>

<p><strong>10. Equitable Relief.</strong> A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.</p>

<p><strong>11. General.</strong> Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties.</p>

<p class="footer">Common Paper Mutual Non-Disclosure Agreement Version 1.0 &mdash; free to use under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
</body>
</html>`;
}
