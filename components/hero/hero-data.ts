export type SourceDoc = {
  id: string;
  name: string;
  x: number;
  y: number;
  rotate: number;
};

// Positions are percentages of the stage, used as scatter targets by the GSAP timeline
// and as the resting static layout when motion is reduced.
export const sourceDocs: SourceDoc[] = [
  { id: "doc-1", name: "FY24_Financials.pdf", x: 6, y: 10, rotate: -8 },
  { id: "doc-2", name: "Purchase_Agreement.pdf", x: 68, y: 6, rotate: 6 },
  { id: "doc-3", name: "Rent_Roll.xlsx", x: 4, y: 52, rotate: 5 },
  { id: "doc-4", name: "Mgmt_Presentation.pdf", x: 72, y: 60, rotate: -5 },
  { id: "doc-5", name: "Lease_Abstract.docx", x: 22, y: 4, rotate: 9 },
  { id: "doc-6", name: "Cap_Table.xlsx", x: 80, y: 28, rotate: -10 },
  { id: "doc-7", name: "Environmental_Report.pdf", x: 10, y: 74, rotate: -6 },
  { id: "doc-8", name: "Insurance_Cert.pdf", x: 58, y: 82, rotate: 7 },
  { id: "doc-9", name: "Appraisal_Summary.pdf", x: 40, y: 2, rotate: -4 },
  { id: "doc-10", name: "Loan_Agreement.pdf", x: 86, y: 78, rotate: 4 },
  { id: "doc-11", name: "Title_Report.pdf", x: 30, y: 86, rotate: -7 },
  { id: "doc-12", name: "Vendor_Contracts.zip", x: 54, y: 12, rotate: 8 },
];

export const receiptRows = [
  { label: "Source pages analyzed", value: "980" },
  { label: "Finished document", value: "34 pages" },
];
