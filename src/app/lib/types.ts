interface Analysis {
     id: string;
     company: string;
     role: string;
     date: string;
     score: number;
}

export type { Analysis, Report };

interface Report {
     id: string;
     company: string;
     role: string;
     date: string;
     globalScore: number;
     estimatedAfter: number;
     summary: string;
     detailedScores: { name: string; score: number; comment: string }[];
     strengths: string[];
     weaknesses: string[];
     recommendations: Recommendation[];
     keywords: { present: string[]; missing: string[]; optional: string[] };
     skills: { detected: string[]; toHighlight: string[] };
     criteria: Criterion[];
}

interface Recommendation {
     priority: "haute" | "moyenne" | "faible";
     title: string;
     impact: string;
     why: string;
     how: string;
     before: string;
     after: string;
}

interface Criterion {
     name: string;
     score: number;
     summary: string;
     strengths: string[];
     weaknesses: string[];
     tips: string[];
     example: null | { before: string; after: string };
}
