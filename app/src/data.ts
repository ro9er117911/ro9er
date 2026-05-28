export const thesisHook =
  "面對不完整、混亂、但後果很重的資訊時，基層人員、審查者與中間主管如何共同定義問題。";

export const assets = {
  heroVideo: new URL("../../video/matsim_iter.mp4", import.meta.url).href,
  hackathonVideo: new URL("../../video/shuangbei_hackathon.mp4", import.meta.url).href,
  matsimImage: new URL("../../photo/matsim/截圖 2026-05-12 上午11.49.59.png", import.meta.url).href,
  matsimPoster: new URL("../../photo/matsim/截圖 2026-05-12 上午11.49.47.png", import.meta.url).href,
  civicImage: new URL("../../video/截圖 2026-05-12 下午3.12.23.png", import.meta.url).href,
  antifraudImage: new URL("../../photo/anti_fraude/anti-fraud-dashboard.webp", import.meta.url).href
};

export const navLinks = [
  { href: "#work", label: "Proof" },
  { href: "#graph", label: "Wave" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Connect" }
];

export const milestones = [
  {
    number: "01",
    date: "July 2026",
    title: "NJIT AI + Entrepreneurship Bootcamp",
    copy: "Public-funded New Jersey AI and entrepreneurship experience.",
    tag: "Current opportunity"
  },
  {
    number: "02",
    date: "September 2026",
    title: "Tokyo Disaster Prevention Visit",
    copy: "Public-funded field visit for disaster-prevention evidence and PlanB framing.",
    tag: "Field evidence"
  },
  {
    number: "03",
    date: "Research in progress",
    title: "Thesis: Responsibility Chain Framing",
    copy: thesisHook,
    tag: "Core question"
  }
];

export const proofCards = [
  {
    number: "01",
    title: "MATSim / PlanB",
    role: "Simulation core builder",
    copy: "Disaster evacuation assumptions turned into replayable simulation evidence.",
    detail: "Proof before the next fieldwork: model, replay, compare, and explain.",
    media: assets.matsimImage,
    videoSrc: assets.heroVideo
  },
  {
    number: "02",
    title: "Thesis / AI Governance",
    role: "Researcher + systems designer",
    copy: "A responsibility-chain view for messy information, review work, and middle-management framing.",
    detail: thesisHook,
    media: assets.matsimPoster,
    preview: "wave" as const
  },
  {
    number: "03",
    title: "雙北黑客松 / Civic AI Guide",
    role: "Hackathon prototype / PM framing",
    copy: "Open-data questions shaped into UI actions, logs, and evidence cards.",
    detail: "The interface makes unclear public questions easier to inspect and route.",
    media: assets.civicImage,
    videoSrc: assets.hackathonVideo
  },
  {
    number: "04",
    title: "Anti-Fraud MVP",
    role: "Finance-domain visualizer",
    copy: "Anti-fraud signals and bank transformation ideas reframed into executive-ready visuals.",
    detail: "A public-safe view of how risk, product, and explanation meet.",
    media: assets.antifraudImage
  }
];

export type ProofCard = (typeof proofCards)[number];

export type ChainStage = {
  index: number;
  stage: string;
  h: number;
  l: number;
  gap: number;
  formalRisk: "高" | "中" | "低";
  responseLabel: string;
  actor: string;
  note: string;
  rgr: number;
};

const rawChainStages = [
  {
    stage: "基層現場訊號出現",
    h: 0.16,
    l: 0.34,
    gap: 0.88,
    formalRisk: "高" as const,
    responseLabel: "資訊不完整，但後果已經很重",
    actor: "基層人員",
    note: "一線人員先看到異常、缺件或無法判斷的責任區，問題尚未被組織正式命名。"
  },
  {
    stage: "審查者初步框定",
    h: 0.31,
    l: 0.46,
    gap: 0.74,
    formalRisk: "高" as const,
    responseLabel: "把混亂訊號轉成可審查欄位",
    actor: "審查者",
    note: "審查者開始分類資料、找證據缺口，但仍不確定哪些單位應承擔後續責任。"
  },
  {
    stage: "中間主管協調責任",
    h: 0.48,
    l: 0.58,
    gap: 0.55,
    formalRisk: "中" as const,
    responseLabel: "跨單位責任被重新切分",
    actor: "中間主管",
    note: "中間主管把審查語言、部門資源與可執行承諾接起來，讓問題開始能被處理。"
  },
  {
    stage: "補件與證據鏈修正",
    h: 0.65,
    l: 0.70,
    gap: 0.34,
    formalRisk: "中" as const,
    responseLabel: "文件版本與責任證據逐步收斂",
    actor: "共同協作",
    note: "基層補資料、審查者修正判斷、中間主管確認承諾，責任鏈開始可追溯。"
  },
  {
    stage: "共同定義問題",
    h: 0.80,
    l: 0.78,
    gap: 0.22,
    formalRisk: "中" as const,
    responseLabel: "組織終於知道自己在解什麼",
    actor: "三層共同框定",
    note: "問題不再只是文件缺漏，而是被定義成風險、責任、行動與追蹤的共同版本。"
  },
  {
    stage: "行動版本進入追蹤",
    h: 0.93,
    l: 0.88,
    gap: 0.12,
    formalRisk: "低" as const,
    responseLabel: "可追蹤、可回看、可重新啟動",
    actor: "治理流程",
    note: "當資訊或外部環境改變，責任鏈可以退回前一階段重新定義，而不是只留下結案紀錄。"
  }
];

export const chainStages: ChainStage[] = rawChainStages.map((stage, index) => ({
  ...stage,
  index,
  rgr: stage.h * stage.l * stage.gap
}));

export const workflowStages = ["訊號輸入", "審查框定", "主管協調", "責任追蹤"];
export const pathStageIndex = [0, 0, 1, 2, 2, 3];
export const riskLevels = ["高", "中", "低"] as const;
