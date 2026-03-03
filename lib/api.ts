const API = process.env.NEXT_PUBLIC_API_URL;

export const getRankings = async () => {
  const res = await fetch(`${API}/api/rankings`);
  return res.json();
};

export const getMetrics = async () => {
  const res = await fetch(`${API}/api/metrics`);
  return res.json();
};

export const getNetwork = async () => {
  const res = await fetch(`${API}/api/network`);
  return res.json();
};

export const explainGene = async (gene: string) => {
  const res = await fetch(`${API}/api/explain/${gene}`);
  return res.json();
};