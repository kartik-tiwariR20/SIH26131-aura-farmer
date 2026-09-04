export type UserRole = "FARMER" | "EXTENSION_WORKER" | "EXPERT" | "AGRICULTURE_OFFICIAL" | "ADMIN";

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type DiagnosisStatus = "AI_PREDICTED" | "UNDER_REVIEW" | "CONFIRMED" | "REJECTED" | "LAB_REQUIRED" | "RESOLVED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  language: string;
}

export interface Farm {
  id: string;
  owner_id: string;
  name: string;
  location?: string;
  district?: string;
  state?: string;
  area?: number;
  created_at: string;
}

export interface Field {
  id: string;
  farm_id: string;
  crop: string;
  variety?: string;
  area?: number;
  soil_type?: string;
  growth_stage?: string;
  risk_score?: number;
  risk_level?: RiskLevel;
  recent_diagnosis_count?: number;
  created_at: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  disease_conducive: boolean;
  risk_change_percent?: number;
  explanation?: string;
}

export interface RiskFactors {
  weather_risk_percent: number;
  crop_stage_vulnerability: number;
  nearby_outbreak_density: number;
  pest_vector_activity: number;
}

export interface Advisory {
  disease: string;
  crop: string;
  severity: RiskLevel;
  actions: string;
  safe_input_guidance: string;
  preventive_actions: string;
  biological_control?: string;
  monitoring_guidance?: string;
  when_to_contact_expert?: string;
}

export interface DiagnosisResult {
  diagnosis_id: string;
  predicted_disease: string;
  confidence: number;
  severity: RiskLevel;
  risk_score: number;
  status: DiagnosisStatus;
  image_url?: string;
  weather_context?: WeatherData;
  risk_factors?: RiskFactors;
  reasons?: string[];
  advisory?: Advisory;
  expert_diagnosis?: string;
  disclaimer?: string;
}

export interface Hotspot {
  id: string;
  latitude: number;
  longitude: number;
  district: string;
  block: string;
  area_name: string;
  crop: string;
  disease: string;
  pest_type: string;
  risk_level: RiskLevel;
  risk_score: number;
  case_count: number;
  confirmed_cases: number;
  recent_trend: string;
  weather_summary: string;
  extension_worker?: string;
}

export interface AlertItem {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: "INFO" | "WARNING" | "HIGH" | "CRITICAL";
  read: boolean;
  created_at: string;
}
