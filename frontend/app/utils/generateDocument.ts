import { NDAFormData } from "../types";

function blank(value: string, placeholder = "________________"): string {
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

export function generateMarkdown(data: NDAFormData): string {
  const { party1, party2 } = data;

  return `# Mutual Non-Disclosure Agreement — Cover Page

*Source: [Common Paper Mutual NDA v1.0](https://commonpaper.com/standards/mutual-nda/1.0/) — CC BY 4.0*

*This Cover Page, together with the Mutual NDA Standard Terms, forms the complete Agreement. Modifications made here take precedence over the Standard Terms in the event of conflict.*

---

## Parties

| | Party 1 | Party 2 |
|---|---|---|
| **Company Name** | ${blank(party1.companyName)} | ${blank(party2.companyName)} |
| **Signatory Name** | ${blank(party1.signatoryName)} | ${blank(party2.signatoryName)} |
| **Signatory Title** | ${blank(party1.signatoryTitle)} | ${blank(party2.signatoryTitle)} |
| **Notice Address** | ${blank(party1.noticeAddress)} | ${blank(party2.noticeAddress)} |
| **Date** | ${formatDate(party1.date)} | ${formatDate(party2.date)} |

---

## Key Terms

| Term | Value |
|---|---|
| **Effective Date** | ${formatDate(data.effectiveDate)} |
| **Purpose** | ${blank(data.purpose)} |
| **Term** | ${blank(data.term)} |
| **Confidentiality Period** | ${blank(data.confidentialityPeriod)} |
| **Governing Law** | ${blank(data.governingLaw)} |
| **Chosen Courts** | ${blank(data.chosenCourts)} |

---

## Signatures

**Party 1**

Signature: ____________________________

Printed Name: ${blank(party1.signatoryName)}

Title: ${blank(party1.signatoryTitle)}

Date: ${formatDate(party1.date)}

---

**Party 2**

Signature: ____________________________

Printed Name: ${blank(party2.signatoryName)}

Title: ${blank(party2.signatoryTitle)}

Date: ${formatDate(party2.date)}

---

# Mutual Non-Disclosure Agreement — Standard Terms

*Source: [Common Paper Mutual NDA v1.0](https://commonpaper.com/standards/mutual-nda/1.0/) — CC BY 4.0*

---

This Mutual Non-Disclosure Agreement (the **"Agreement"**) is entered into as of the Effective Date between the parties identified on the Cover Page.

## 1. Confidential Information

**1.1 Definition.** "Confidential Information" means any non-public information disclosed by one party (the "Discloser") to the other party (the "Recipient") in connection with the Purpose, that is identified as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.

**1.2 Exclusions.** Confidential Information does not include information that:
- (a) is or becomes publicly known and generally available through no fault of the Recipient;
- (b) was known to the Recipient before disclosure by the Discloser without any obligation of confidentiality;
- (c) is received from a third party who is free to disclose it without restriction; or
- (d) was independently developed by the Recipient without reference to the Discloser's Confidential Information.

## 2. Obligations

**2.1 Non-Use and Non-Disclosure.** Each Recipient will: (a) use the Discloser's Confidential Information only for the Purpose; and (b) protect the Discloser's Confidential Information using at least the same protections the Recipient uses for its own similar information, but no less than a reasonable standard of care.

**2.2 Permitted Disclosures.** Each Recipient may disclose Confidential Information to its employees, advisors, and contractors who have a need to know and are bound by equivalent confidentiality obligations.

**2.3 Required Disclosures.** If required by law or court order, a Recipient may disclose Confidential Information provided it gives the Discloser advance notice where possible and cooperates with any efforts to obtain confidential treatment.

## 3. Term

This Agreement starts on the Effective Date and continues for the Term specified on the Cover Page. Confidentiality obligations survive for the Confidentiality Period after termination, except that obligations with respect to trade secrets continue until the information is no longer a trade secret.

## 4. Return or Destruction

Upon request or expiration, each Recipient will promptly stop using and either return or destroy the Discloser's Confidential Information, though backup copies may be retained subject to the confidentiality obligations in this Agreement.

## 5. Remedies

Each party acknowledges that a breach of this Agreement may cause irreparable harm, entitling the Discloser to seek injunctive relief in addition to other available remedies.

## 6. General

This Agreement is governed by the Governing Law specified on the Cover Page and will be binding on each party's successors and permitted assigns. Neither party may assign this Agreement without the prior written consent of the other.

---

*This template is free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source: https://github.com/CommonPaper/Mutual-NDA*
`;
}

export function downloadDocument(data: NDAFormData): void {
  const content = generateMarkdown(data);
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mutual-nda.md";
  a.click();
  URL.revokeObjectURL(url);
}
