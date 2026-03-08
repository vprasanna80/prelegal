"use client";

import { NDAFormData } from "../types";

function blank(value: string, placeholder = "________________") {
  return value.trim() || placeholder;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "________________";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  data: NDAFormData;
}

export default function NDAPreview({ data }: Props) {
  const { party1, party2 } = data;

  return (
    <div className="font-serif text-sm leading-relaxed text-gray-900 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold">Mutual Non-Disclosure Agreement</h1>
        <p className="text-xs text-gray-500 italic">
          Source: Common Paper Mutual NDA v1.0 — CC BY 4.0
        </p>
      </div>

      <p className="italic text-xs text-gray-600 border-l-4 border-gray-300 pl-3">
        This Cover Page, together with the Mutual NDA Standard Terms, forms the
        complete Agreement. Modifications made here take precedence over the
        Standard Terms in the event of conflict.
      </p>

      {/* Parties */}
      <section>
        <h2 className="text-base font-bold mb-2">Parties</h2>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-1 text-left w-1/3"></th>
              <th className="border border-gray-300 px-2 py-1 text-left">Party 1</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Party 2</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["Company Name", "companyName"],
                ["Signatory Name", "signatoryName"],
                ["Signatory Title", "signatoryTitle"],
                ["Notice Address", "noticeAddress"],
                ["Date", "date"],
              ] as const
            ).map(([label, key]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-2 py-1 font-semibold bg-gray-50">
                  {label}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {key === "date"
                    ? formatDate(party1[key])
                    : blank(party1[key])}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {key === "date"
                    ? formatDate(party2[key])
                    : blank(party2[key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Key Terms */}
      <section>
        <h2 className="text-base font-bold mb-2">Key Terms</h2>
        <table className="w-full border-collapse text-xs">
          <tbody>
            {(
              [
                ["Effective Date", formatDate(data.effectiveDate)],
                ["Purpose", blank(data.purpose)],
                ["Term", blank(data.term)],
                ["Confidentiality Period", blank(data.confidentialityPeriod)],
                ["Governing Law", blank(data.governingLaw)],
                ["Chosen Courts", blank(data.chosenCourts)],
              ] as const
            ).map(([label, value]) => (
              <tr key={label}>
                <td className="border border-gray-300 px-2 py-1 font-semibold bg-gray-50 w-1/3">
                  {label}
                </td>
                <td className="border border-gray-300 px-2 py-1">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr className="border-gray-300" />

      {/* Standard Terms */}
      <section className="space-y-4">
        <h2 className="text-base font-bold">Mutual Non-Disclosure Agreement — Standard Terms</h2>

        <p>
          This Mutual Non-Disclosure Agreement (the{" "}
          <strong>&quot;Agreement&quot;</strong>) is entered into as of the
          Effective Date between the parties identified on the Cover Page.
        </p>

        <div>
          <h3 className="font-bold">1. Confidential Information</h3>
          <p className="mt-1">
            <strong>1.1 Definition.</strong> &quot;Confidential Information&quot; means
            any non-public information disclosed by one party (the
            &quot;Discloser&quot;) to the other party (the &quot;Recipient&quot;) in
            connection with the Purpose, that is identified as confidential or
            that reasonably should be understood to be confidential given the
            nature of the information and circumstances of disclosure.
          </p>
          <p className="mt-1">
            <strong>1.2 Exclusions.</strong> Confidential Information does not
            include information that:
          </p>
          <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
            <li>
              (a) is or becomes publicly known and generally available through
              no fault of the Recipient;
            </li>
            <li>
              (b) was known to the Recipient before disclosure by the Discloser
              without any obligation of confidentiality;
            </li>
            <li>
              (c) is received from a third party who is free to disclose it
              without restriction; or
            </li>
            <li>
              (d) was independently developed by the Recipient without
              reference to the Discloser&apos;s Confidential Information.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">2. Obligations</h3>
          <p className="mt-1">
            <strong>2.1 Non-Use and Non-Disclosure.</strong> Each Recipient
            will: (a) use the Discloser&apos;s Confidential Information only for the
            Purpose; and (b) protect the Discloser&apos;s Confidential Information
            using at least the same protections the Recipient uses for its own
            similar information, but no less than a reasonable standard of
            care.
          </p>
          <p className="mt-1">
            <strong>2.2 Permitted Disclosures.</strong> Each Recipient may
            disclose Confidential Information to its employees, advisors, and
            contractors who have a need to know and are bound by equivalent
            confidentiality obligations.
          </p>
          <p className="mt-1">
            <strong>2.3 Required Disclosures.</strong> If required by law or
            court order, a Recipient may disclose Confidential Information
            provided it gives the Discloser advance notice where possible and
            cooperates with any efforts to obtain confidential treatment.
          </p>
        </div>

        <div>
          <h3 className="font-bold">3. Term</h3>
          <p className="mt-1">
            This Agreement starts on the Effective Date and continues for the
            Term specified on the Cover Page. Confidentiality obligations
            survive for the Confidentiality Period after termination, except
            that obligations with respect to trade secrets continue until the
            information is no longer a trade secret.
          </p>
        </div>

        <div>
          <h3 className="font-bold">4. Return or Destruction</h3>
          <p className="mt-1">
            Upon request or expiration, each Recipient will promptly stop
            using and either return or destroy the Discloser&apos;s Confidential
            Information, though backup copies may be retained subject to the
            confidentiality obligations in this Agreement.
          </p>
        </div>

        <div>
          <h3 className="font-bold">5. Remedies</h3>
          <p className="mt-1">
            Each party acknowledges that a breach of this Agreement may cause
            irreparable harm, entitling the Discloser to seek injunctive relief
            in addition to other available remedies.
          </p>
        </div>

        <div>
          <h3 className="font-bold">6. General</h3>
          <p className="mt-1">
            This Agreement is governed by the Governing Law specified on the
            Cover Page and will be binding on each party&apos;s successors and
            permitted assigns. Neither party may assign this Agreement without
            the prior written consent of the other.
          </p>
        </div>
      </section>

      <hr className="border-gray-300" />

      {/* Signatures */}
      <section className="space-y-6">
        <h2 className="text-base font-bold">Signatures</h2>

        <div className="grid grid-cols-2 gap-8">
          {(["party1", "party2"] as const).map((party, i) => {
            const p = data[party];
            return (
              <div key={party} className="space-y-3 text-xs">
                <p className="font-bold">Party {i + 1}</p>
                <div>
                  <p className="text-gray-500">Company</p>
                  <p className="font-medium">{blank(p.companyName)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Signature</p>
                  <div className="border-b border-gray-400 h-8" />
                </div>
                <div>
                  <p className="text-gray-500">Printed Name</p>
                  <p className="font-medium">{blank(p.signatoryName)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Title</p>
                  <p className="font-medium">{blank(p.signatoryTitle)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(p.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-gray-400 italic text-center">
        This template is free to use under CC BY 4.0. Source:
        https://github.com/CommonPaper/Mutual-NDA
      </p>
    </div>
  );
}
