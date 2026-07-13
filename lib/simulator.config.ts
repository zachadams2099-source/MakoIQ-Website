export type ScenarioId = "rfp" | "ddq" | "memo";

export type SourceFile = {
  filename: string;
  type: "pdf" | "docx" | "xlsx" | "pptx" | "zip";
  pages: number;
};

export type ReviewStatus = "supported" | "needs-review" | "missing-information" | "conflicting-information";

export type ReviewItem = {
  id: string;
  label: string;
  status: ReviewStatus;
  note: string;
};

export type SourcePreviewEntry = {
  filename: string;
  location: string;
  excerpt: string;
};

export type TableSpec = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type Scenario = {
  id: ScenarioId;
  tabLabel: string;
  startDocument: {
    filename: string;
    blankQuestions: { number: string; text: string }[];
  };
  pastExampleDocument: {
    filename: string;
    sections: string[];
  };
  sources: SourceFile[];
  outputSections: string[];
  sampleQuestion: {
    number: string;
    text: string;
    answerLines: string[];
    sourceChip: string;
  };
  table?: TableSpec;
  illustrativeNote?: string;
  reviewItems: ReviewItem[];
  sourcePreview: SourcePreviewEntry[];
  summary: {
    outputFilename: string;
    sourcePagesReviewed: number;
    questionsProcessed: number | null;
    supported: number | null;
    flagged: number;
    missing: number;
    sourceReferences: number;
    finishedPages: number;
    estimatedHoursSaved: number;
  };
  processingDetails: string[];
};

export const scenarios: Record<ScenarioId, Scenario> = {
  rfp: {
    id: "rfp",
    tabLabel: "Institutional RFP",
    startDocument: {
      filename: "Institutional_RFP_Request.docx",
      blankQuestions: [
        { number: "1.1", text: "Provide an overview of the firm's history and ownership structure." },
        { number: "2.3", text: "Describe the investment team's relevant experience." },
        { number: "3.4", text: "Describe the firm's investment decision-making process." },
        { number: "5.2", text: "Summarize the firm's fee schedule for this mandate." },
      ],
    },
    pastExampleDocument: {
      filename: "Prior_RFP_Response.docx",
      sections: ["Firm Overview", "Investment Philosophy", "Team", "Performance", "Fees"],
    },
    sources: [
      { filename: "Firm_Overview.pdf", type: "pdf", pages: 12 },
      { filename: "Investment_Strategy_Deck.pptx", type: "pptx", pages: 34 },
      { filename: "Performance_Composite.xlsx", type: "xlsx", pages: 8 },
      { filename: "Form_ADV_Part_2.pdf", type: "pdf", pages: 61 },
      { filename: "Investment_Team_Bios.docx", type: "docx", pages: 14 },
      { filename: "Compliance_Manual.pdf", type: "pdf", pages: 48 },
      { filename: "Fee_Schedule.xlsx", type: "xlsx", pages: 3 },
      { filename: "Prior_RFP_Response.docx", type: "docx", pages: 40 },
    ],
    outputSections: [
      "Firm Overview",
      "Investment Philosophy",
      "Investment Process",
      "Risk Management",
      "Performance",
      "Team",
      "Fees",
      "Compliance",
    ],
    sampleQuestion: {
      number: "3.4",
      text: "Describe the firm's investment decision-making process.",
      answerLines: [
        "Investment decisions are made by the Investment Committee, which meets weekly to review",
        "new opportunities and portfolio positioning. Each proposal requires two analyst sign-offs",
        "and a formal risk review before capital is committed.",
      ],
      sourceChip: "Investment_Strategy_Deck.pptx · slide 14",
    },
    table: {
      caption: "Performance Composite",
      headers: ["Period", "Gross Return", "Net Return", "Benchmark"],
      rows: [
        ["1 Year", "14.2%", "12.6%", "10.8%"],
        ["3 Year (Ann.)", "11.8%", "10.1%", "9.4%"],
        ["5 Year (Ann.)", "13.0%", "11.3%", "9.9%"],
        ["Since Inception", "12.4%", "10.7%", "9.2%"],
      ],
    },
    reviewItems: [
      { id: "rfp-1", label: "3.4 Investment decision-making process", status: "supported", note: "Matched to Investment_Strategy_Deck.pptx, slide 14." },
      { id: "rfp-2", label: "5.2 Fee schedule for this mandate", status: "supported", note: "Matched to Fee_Schedule.xlsx." },
      { id: "rfp-3", label: "6.1 Business continuity plan summary", status: "needs-review", note: "Two source documents describe different recovery time objectives." },
      { id: "rfp-4", label: "7.3 ESG integration policy", status: "missing-information", note: "No source document addresses this question directly." },
    ],
    sourcePreview: [
      {
        filename: "Investment_Strategy_Deck.pptx",
        location: "slide 14",
        excerpt: "\"...the Investment Committee convenes weekly, requiring two analyst sign-offs and a formal risk review prior to any capital commitment...\"",
      },
      {
        filename: "Fee_Schedule.xlsx",
        location: "row 4",
        excerpt: "Mandate tier: $25M-$100M · Management fee: 0.85% · Performance fee: 10% above hurdle",
      },
      {
        filename: "Form_ADV_Part_2.pdf",
        location: "p. 22",
        excerpt: "\"...the firm does not currently maintain a documented business continuity recovery time objective for this strategy...\"",
      },
    ],
    summary: {
      outputFilename: "Institutional_RFP_Final.docx",
      sourcePagesReviewed: 980,
      questionsProcessed: 142,
      supported: 136,
      flagged: 4,
      missing: 2,
      sourceReferences: 318,
      finishedPages: 34,
      estimatedHoursSaved: 22,
    },
    processingDetails: [
      "8 files loaded",
      "980 sample pages",
      "142 questions identified",
      "Performance table detected",
      "Source references added",
    ],
  },

  ddq: {
    id: "ddq",
    tabLabel: "Investment DDQ",
    startDocument: {
      filename: "Investment_DDQ_Questionnaire.docx",
      blankQuestions: [
        { number: "1.2", text: "Describe the fund's ownership and organizational structure." },
        { number: "3.1", text: "Describe the fund's structure and key terms." },
        { number: "4.2", text: "Describe the firm's valuation process for Level 3 investments." },
        { number: "6.4", text: "Describe the firm's cybersecurity policies and incident history." },
      ],
    },
    pastExampleDocument: {
      filename: "Prior_DDQ_Response.docx",
      sections: ["Firm and Ownership", "Fund Structure", "Valuation", "Compliance"],
    },
    sources: [
      { filename: "Fund_II_LPA.pdf", type: "pdf", pages: 88 },
      { filename: "Private_Placement_Memorandum.pdf", type: "pdf", pages: 64 },
      { filename: "Audited_Financials_FY24.pdf", type: "pdf", pages: 42 },
      { filename: "Valuation_Policy.pdf", type: "pdf", pages: 18 },
      { filename: "Compliance_Manual.pdf", type: "pdf", pages: 48 },
      { filename: "Cybersecurity_Policy.pdf", type: "pdf", pages: 22 },
      { filename: "Organization_Chart.pdf", type: "pdf", pages: 2 },
      { filename: "Prior_DDQ_Response.docx", type: "docx", pages: 63 },
    ],
    outputSections: [
      "Firm and Ownership",
      "Fund Structure",
      "Investment Process",
      "Valuation",
      "Risk Management",
      "Compliance",
      "Operations",
      "Cybersecurity",
    ],
    sampleQuestion: {
      number: "4.2",
      text: "Describe the firm's valuation process for Level 3 investments.",
      answerLines: [
        "Level 3 investments are valued quarterly by the Valuation Committee using a combination of",
        "discounted cash flow and comparable transaction methodologies, with an independent",
        "third-party valuation firm engaged annually to review a sample of positions.",
      ],
      sourceChip: "Valuation_Policy.pdf · p.12",
    },
    reviewItems: [
      { id: "ddq-1", label: "4.2 Valuation process for Level 3 investments", status: "supported", note: "Matched to Valuation_Policy.pdf, p.12." },
      { id: "ddq-2", label: "6.4 Cybersecurity incident history", status: "supported", note: "Matched to Cybersecurity_Policy.pdf." },
      { id: "ddq-3", label: "2.5 Key person provisions", status: "needs-review", note: "LPA language differs slightly from the prior response on record." },
      { id: "ddq-4", label: "8.1 Business continuity and disaster recovery", status: "missing-information", note: "No source document addresses this question directly." },
    ],
    sourcePreview: [
      {
        filename: "Valuation_Policy.pdf",
        location: "p. 12",
        excerpt: "\"...Level 3 positions are revalued each quarter by the Valuation Committee, combining discounted cash flow analysis with comparable transaction benchmarks...\"",
      },
      {
        filename: "Cybersecurity_Policy.pdf",
        location: "p. 6",
        excerpt: "\"...the firm has not experienced a reportable cybersecurity incident in the preceding five years...\"",
      },
      {
        filename: "Fund_II_LPA.pdf",
        location: "p. 41",
        excerpt: "\"...key person provisions are triggered upon the departure of two of the three named principals...\"",
      },
    ],
    summary: {
      outputFilename: "Investment_DDQ_Final.docx",
      sourcePagesReviewed: 347,
      questionsProcessed: 126,
      supported: 119,
      flagged: 5,
      missing: 2,
      sourceReferences: 347,
      finishedPages: 28,
      estimatedHoursSaved: 18,
    },
    processingDetails: [
      "8 files loaded",
      "347 sample pages",
      "126 questions identified",
      "Valuation policy detected",
      "Source references added",
    ],
  },

  memo: {
    id: "memo",
    tabLabel: "Underwriting Memo",
    startDocument: {
      filename: "Investment_Committee_Memo.docx",
      blankQuestions: [
        { number: "1", text: "Executive Summary" },
        { number: "2", text: "Investment Thesis" },
        { number: "5", text: "Historical Financials" },
        { number: "7", text: "Key Risks" },
      ],
    },
    pastExampleDocument: {
      filename: "Prior_Investment_Memo.docx",
      sections: ["Executive Summary", "Market Opportunity", "Valuation", "Recommendation"],
    },
    sources: [
      { filename: "CIM_Project_Harbor.pdf", type: "pdf", pages: 210 },
      { filename: "Financial_Model.xlsx", type: "xlsx", pages: 26 },
      { filename: "Quality_of_Earnings.pdf", type: "pdf", pages: 84 },
      { filename: "Management_Presentation.pdf", type: "pdf", pages: 52 },
      { filename: "Customer_Concentration.xlsx", type: "xlsx", pages: 6 },
      { filename: "Market_Study.pdf", type: "pdf", pages: 38 },
      { filename: "Purchase_Agreement.pdf", type: "pdf", pages: 118 },
      { filename: "Prior_Investment_Memo.docx", type: "docx", pages: 22 },
    ],
    outputSections: [
      "Executive Summary",
      "Company Overview",
      "Investment Thesis",
      "Market Opportunity",
      "Historical Financials",
      "Valuation",
      "Key Risks",
      "Mitigating Factors",
      "Recommendation",
    ],
    sampleQuestion: {
      number: "1",
      text: "Executive Summary",
      answerLines: [
        "Project Harbor represents an opportunity to acquire a market-leading regional provider",
        "with durable customer relationships and a consistent history of margin expansion.",
        "We recommend proceeding to exclusivity at the terms outlined below.",
      ],
      sourceChip: "CIM_Project_Harbor.pdf · p.4",
    },
    table: {
      caption: "Financial Summary (Illustrative sample data)",
      headers: ["Metric", "FY23", "FY24"],
      rows: [
        ["Purchase Price", "$184.0M", "-"],
        ["NOI", "$14.1M", "$15.6M"],
        ["Cap Rate", "7.8%", "8.5%"],
        ["IRR (5yr)", "-", "17.2%"],
      ],
    },
    illustrativeNote: "Illustrative sample data",
    reviewItems: [
      { id: "memo-1", label: "5. Historical Financials", status: "supported", note: "Matched to Financial_Model.xlsx and Quality_of_Earnings.pdf." },
      { id: "memo-2", label: "6. Valuation", status: "supported", note: "Matched to Financial_Model.xlsx." },
      { id: "memo-3", label: "7. Key Risks: customer concentration", status: "needs-review", note: "Concentration figures differ between the CIM and Customer_Concentration.xlsx." },
      { id: "memo-4", label: "4. Market Opportunity: TAM sizing", status: "missing-information", note: "No source document provides a bottoms-up market sizing estimate." },
    ],
    sourcePreview: [
      {
        filename: "CIM_Project_Harbor.pdf",
        location: "p. 4",
        excerpt: "\"...the Company has established itself as the leading regional provider, supported by long-tenured customer relationships and consistent margin expansion...\"",
      },
      {
        filename: "Financial_Model.xlsx",
        location: "tab: Summary",
        excerpt: "FY24 NOI: $15.6M · Implied Cap Rate: 8.5% · 5-year unlevered IRR: 17.2%",
      },
      {
        filename: "Customer_Concentration.xlsx",
        location: "row 8",
        excerpt: "Top customer represents 18% of revenue, versus 22% cited in the CIM narrative section.",
      },
    ],
    summary: {
      outputFilename: "Investment_Committee_Memo_Final.docx",
      sourcePagesReviewed: 1450,
      questionsProcessed: null,
      supported: null,
      flagged: 4,
      missing: 1,
      sourceReferences: 31,
      finishedPages: 19,
      estimatedHoursSaved: 16,
    },
    processingDetails: [
      "8 files loaded",
      "1,450 sample pages",
      "Financial model detected",
      "Valuation range calculated",
      "Source references added",
    ],
  },
};

export const scenarioOrder: ScenarioId[] = ["rfp", "ddq", "memo"];

export const processingStatuses = [
  "Reading source files",
  "Mapping the document structure",
  "Matching questions to source material",
  "Drafting sections",
  "Building tables",
  "Checking answers against sources",
  "Formatting the finished document",
];

export const reviewFilters: { status: ReviewStatus; label: string }[] = [
  { status: "supported", label: "Supported" },
  { status: "needs-review", label: "Needs review" },
  { status: "missing-information", label: "Missing information" },
  { status: "conflicting-information", label: "Conflicting information" },
];
