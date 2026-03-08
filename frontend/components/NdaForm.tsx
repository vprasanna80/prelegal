'use client';

import { NdaData } from '@/lib/ndaTemplate';

interface Props {
  data: NdaData;
  onChange: (data: NdaData) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">{children}</h2>;
}

function PartyFields({
  label,
  prefix,
  data,
  onChange,
}: {
  label: string;
  prefix: 'party1' | 'party2';
  data: NdaData;
  onChange: (d: NdaData) => void;
}) {
  const set = (key: keyof NdaData, value: string) => onChange({ ...data, [key]: value });
  const k = (field: string) => `${prefix}${field.charAt(0).toUpperCase()}${field.slice(1)}` as keyof NdaData;

  return (
    <section className="space-y-3">
      <SectionHeading>{label}</SectionHeading>
      <input className={inputCls} placeholder="Full Name" value={data[k('name')]} onChange={(e) => set(k('name'), e.target.value)} />
      <input className={inputCls} placeholder="Title" value={data[k('title')]} onChange={(e) => set(k('title'), e.target.value)} />
      <input className={inputCls} placeholder="Company" value={data[k('company')]} onChange={(e) => set(k('company'), e.target.value)} />
      <input className={inputCls} placeholder="Notice Address (email or postal)" value={data[k('address')]} onChange={(e) => set(k('address'), e.target.value)} />
    </section>
  );
}

export default function NdaForm({ data, onChange }: Props) {
  const set = (key: keyof NdaData, value: string) => onChange({ ...data, [key]: value });

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <section className="space-y-4">
        <SectionHeading>Document Details</SectionHeading>
        <Field label="Purpose">
          <textarea
            className={inputCls}
            rows={3}
            value={data.purpose}
            onChange={(e) => set('purpose', e.target.value)}
            placeholder="How Confidential Information may be used"
          />
        </Field>
        <Field label="Effective Date">
          <input
            type="date"
            className={inputCls}
            value={data.effectiveDate}
            onChange={(e) => set('effectiveDate', e.target.value)}
          />
        </Field>
      </section>

      <section className="space-y-2">
        <SectionHeading>MNDA Term</SectionHeading>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="mndaTermType"
            checked={data.mndaTermType === 'fixed'}
            onChange={() => onChange({ ...data, mndaTermType: 'fixed' })}
          />
          Expires after
          <input
            type="number"
            min="1"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm disabled:opacity-40"
            value={data.mndaTermYears}
            onChange={(e) => set('mndaTermYears', e.target.value)}
            disabled={data.mndaTermType !== 'fixed'}
          />
          year(s) from Effective Date
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="mndaTermType"
            checked={data.mndaTermType === 'open'}
            onChange={() => onChange({ ...data, mndaTermType: 'open' })}
          />
          Until terminated
        </label>
      </section>

      <section className="space-y-2">
        <SectionHeading>Term of Confidentiality</SectionHeading>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="confidentialityTermType"
            checked={data.confidentialityTermType === 'fixed'}
            onChange={() => onChange({ ...data, confidentialityTermType: 'fixed' })}
          />
          <input
            type="number"
            min="1"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm disabled:opacity-40"
            value={data.confidentialityTermYears}
            onChange={(e) => set('confidentialityTermYears', e.target.value)}
            disabled={data.confidentialityTermType !== 'fixed'}
          />
          year(s) from Effective Date
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="confidentialityTermType"
            checked={data.confidentialityTermType === 'perpetual'}
            onChange={() => onChange({ ...data, confidentialityTermType: 'perpetual' })}
          />
          In perpetuity
        </label>
      </section>

      <section className="space-y-3">
        <SectionHeading>Governing Law &amp; Jurisdiction</SectionHeading>
        <Field label="Governing Law (State)">
          <input
            className={inputCls}
            placeholder="e.g. Delaware"
            value={data.governingLaw}
            onChange={(e) => set('governingLaw', e.target.value)}
          />
        </Field>
        <Field label="Jurisdiction">
          <input
            className={inputCls}
            placeholder="e.g. courts located in New Castle, DE"
            value={data.jurisdiction}
            onChange={(e) => set('jurisdiction', e.target.value)}
          />
        </Field>
      </section>

      <PartyFields label="Party 1" prefix="party1" data={data} onChange={onChange} />
      <PartyFields label="Party 2" prefix="party2" data={data} onChange={onChange} />
    </form>
  );
}
