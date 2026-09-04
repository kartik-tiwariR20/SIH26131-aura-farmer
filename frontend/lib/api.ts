import { DEMO_FARMS, DEMO_FIELDS, DEMO_DIAGNOSIS_RESULT, DEMO_HOTSPOTS, DEMO_ALERTS, DEMO_USER_FARMER } from "./demo-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchWithFallback<T>(url: string, options: RequestInit = {}, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data ?? json;
  } catch (error) {
    console.warn(`API call to ${url} failed or offline. Using demo fallback:`, error);
    return fallbackData;
  }
}

export const api = {
  getFarms: () => fetchWithFallback("/farms", {}, DEMO_FARMS),
  getFields: () => fetchWithFallback("/fields", {}, DEMO_FIELDS),
  getHotspots: (params?: string) => fetchWithFallback(`/maps/hotspots${params ? `?${params}` : ""}`, {}, DEMO_HOTSPOTS),
  getAlerts: () => fetchWithFallback("/alerts", {}, DEMO_ALERTS),
  getAnalytics: () => fetchWithFallback("/analytics/overview", {}, {
    stats: {
      total_fields_monitored: 1420,
      active_alerts: 38,
      high_risk_fields: 112,
      confirmed_cases: 284,
      pending_expert_reviews: 17,
      total_diagnoses: 640
    },
    disease_trend: [
      { date: "Mon", "Early Blight": 12, "Bacterial Blight": 8, "Stripe Rust": 4 },
      { date: "Tue", "Early Blight": 18, "Bacterial Blight": 10, "Stripe Rust": 6 },
      { date: "Wed", "Early Blight": 24, "Bacterial Blight": 14, "Stripe Rust": 9 },
      { date: "Thu", "Early Blight": 31, "Bacterial Blight": 19, "Stripe Rust": 11 },
      { date: "Fri", "Early Blight": 28, "Bacterial Blight": 16, "Stripe Rust": 8 },
      { date: "Sat", "Early Blight": 36, "Bacterial Blight": 22, "Stripe Rust": 14 },
      { date: "Sun", "Early Blight": 42, "Bacterial Blight": 25, "Stripe Rust": 17 },
    ],
    crop_distribution: [
      { crop: "Tomato", count: 480, percentage: 33.8 },
      { crop: "Cotton", count: 360, percentage: 25.3 },
      { crop: "Rice", count: 290, percentage: 20.4 },
      { crop: "Sugarcane", count: 170, percentage: 12.0 },
      { crop: "Wheat", count: 120, percentage: 8.5 },
    ],
    risk_distribution: [
      { risk_level: "LOW", name: "Low Risk", count: 820, percentage: 57.7, color: "#22C55E" },
      { risk_level: "MODERATE", name: "Moderate", count: 488, percentage: 34.4, color: "#EAB308" },
      { risk_level: "HIGH", name: "High Risk", count: 88, percentage: 6.2, color: "#F97316" },
      { risk_level: "CRITICAL", name: "Critical", count: 24, percentage: 1.7, color: "#EF4444" },
    ],
    weekly_cases: [
      { week: "Week 1", cases: 84, confirmed: 68 },
      { week: "Week 2", cases: 112, confirmed: 95 },
      { week: "Week 3", cases: 156, confirmed: 130 },
      { week: "Week 4", cases: 198, confirmed: 172 },
    ],
    top_diseases: [
      { disease: "Tomato Early Blight", count: 142 },
      { disease: "Cotton Bacterial Blight", count: 98 },
      { disease: "Rice Bacterial Leaf Blight", count: 76 },
      { disease: "Sugarcane Red Rot", count: 54 },
      { disease: "Wheat Stripe Rust", count: 38 },
    ]
  }),
  submitDiagnosis: async (formData: FormData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/diagnoses`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Backend submission failed");
      const json = await res.json();
      return json.data;
    } catch {
      return DEMO_DIAGNOSIS_RESULT;
    }
  }
};
