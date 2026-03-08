export interface PartyInfo {
  companyName: string;
  signatoryName: string;
  signatoryTitle: string;
  noticeAddress: string;
  date: string;
}

export interface NDAFormData {
  party1: PartyInfo;
  party2: PartyInfo;
  effectiveDate: string;
  purpose: string;
  term: string;
  confidentialityPeriod: string;
  governingLaw: string;
  chosenCourts: string;
}

export const defaultFormData: NDAFormData = {
  party1: {
    companyName: "",
    signatoryName: "",
    signatoryTitle: "",
    noticeAddress: "",
    date: "",
  },
  party2: {
    companyName: "",
    signatoryName: "",
    signatoryTitle: "",
    noticeAddress: "",
    date: "",
  },
  effectiveDate: "",
  purpose: "Evaluating a potential business relationship between the parties",
  term: "1 year from the Effective Date",
  confidentialityPeriod: "1 year from the Effective Date",
  governingLaw: "",
  chosenCourts: "",
};
