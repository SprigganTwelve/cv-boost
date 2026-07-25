export function getScoreColor(score: number): string {
     if (score >= 80) return "#16a34a";
     if (score >= 65) return "#2563eb";
     if (score >= 45) return "#ea580c";
     return "#dc2626";
}

export function getScoreBadgeVariant(score: number): "green" | "blue" | "orange" | "red" {
     if (score >= 80) return "green";
     if (score >= 65) return "blue";
     if (score >= 45) return "orange";
     return "red";
}

export function getScoreLabel(score: number): string {
     if (score >= 80) return "Excellent";
     if (score >= 65) return "Bien";
     if (score >= 45) return "Moyen";
     return "Faible";
}
