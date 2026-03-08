"use client";

import { NDAFormData } from "../types";

interface Props {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

function PartyFields({
  label,
  value,
  onChange,
}: {
  label: string;
  value: NDAFormData["party1"];
  onChange: (v: NDAFormData["party1"]) => void;
}) {
  const field = (
    name: keyof NDAFormData["party1"],
    displayLabel: string,
    type = "text"
  ) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {displayLabel}
      </label>
      <input
        type={type}
        value={value[name]}
        onChange={(e) => onChange({ ...value, [name]: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800">{label}</h3>
      {field("companyName", "Company Name")}
      {field("signatoryName", "Signatory Name")}
      {field("signatoryTitle", "Signatory Title")}
      {field("noticeAddress", "Notice Address")}
      {field("date", "Signature Date", "date")}
    </div>
  );
}

export default function NDAForm({ data, onChange }: Props) {
  const updateParty = (
    party: "party1" | "party2",
    value: NDAFormData["party1"]
  ) => onChange({ ...data, [party]: value });

  const updateField = (field: keyof NDAFormData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      <PartyFields
        label="Party 1"
        value={data.party1}
        onChange={(v) => updateParty("party1", v)}
      />

      <hr className="border-gray-200" />

      <PartyFields
        label="Party 2"
        value={data.party2}
        onChange={(v) => updateParty("party2", v)}
      />

      <hr className="border-gray-200" />

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Key Terms</h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Effective Date
          </label>
          <input
            type="date"
            value={data.effectiveDate}
            onChange={(e) => updateField("effectiveDate", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Purpose
          </label>
          <input
            type="text"
            value={data.purpose}
            onChange={(e) => updateField("purpose", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Term
          </label>
          <input
            type="text"
            value={data.term}
            onChange={(e) => updateField("term", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Confidentiality Period
          </label>
          <input
            type="text"
            value={data.confidentialityPeriod}
            onChange={(e) => updateField("confidentialityPeriod", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Governing Law
          </label>
          <input
            type="text"
            value={data.governingLaw}
            onChange={(e) => updateField("governingLaw", e.target.value)}
            placeholder="e.g. State of Delaware"
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Chosen Courts
          </label>
          <input
            type="text"
            value={data.chosenCourts}
            onChange={(e) => updateField("chosenCourts", e.target.value)}
            placeholder="e.g. Courts of the State of Delaware"
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
