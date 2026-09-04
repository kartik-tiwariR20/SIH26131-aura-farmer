import { Farm, Field, DiagnosisResult, Hotspot, AlertItem, WeatherData } from "@/types";

export const DEMO_USER_FARMER = {
  id: "u-farmer-01",
  name: "Rajesh Kumar",
  email: "farmer@example.com",
  role: "FARMER" as const,
  language: "en"
};

export const DEMO_USER_EXPERT = {
  id: "u-expert-01",
  name: "Dr. V. Sharma",
  email: "expert@example.com",
  role: "EXPERT" as const,
  language: "en"
};

export const DEMO_USER_OFFICIAL = {
  id: "u-official-01",
  name: "Sanjay Patil",
  email: "official@example.com",
  role: "AGRICULTURE_OFFICIAL" as const,
  language: "en"
};

export const DEMO_FARMS: Farm[] = [
  {
    id: "farm-1",
    owner_id: "u-farmer-01",
    name: "Green Valley Farm",
    location: "Niphad, Nashik",
    district: "Nashik",
    state: "Maharashtra",
    area: 5.5,
    created_at: "2026-01-15T00:00:00Z"
  }
];

export const DEMO_FIELDS: Field[] = [
  {
    id: "field-1",
    farm_id: "farm-1",
    crop: "Tomato",
    variety: "Abhinav Hybrid",
    area: 2.0,
    soil_type: "Black Clay Loam",
    growth_stage: "Flowering & Early Fruiting",
    risk_score: 82.4,
    risk_level: "HIGH",
    recent_diagnosis_count: 2,
    created_at: "2026-01-15T00:00:00Z"
  },
  {
    id: "field-2",
    farm_id: "farm-1",
    crop: "Cotton",
    variety: "Bt Cotton RCH-2",
    area: 3.5,
    soil_type: "Deep Black Soil",
    growth_stage: "Vegetative",
    risk_score: 24.0,
    risk_level: "LOW",
    recent_diagnosis_count: 0,
    created_at: "2026-01-15T00:00:00Z"
  }
];

export const DEMO_WEATHER: WeatherData = {
  location: "Niphad, Nashik District",
  temperature: 27.5,
  humidity: 84.0,
  rainfall: 18.2,
  wind_speed: 12.4,
  disease_conducive: true,
  risk_change_percent: 17.5,
  explanation: "High humidity (84%) combined with warm temperature (27.5°C) creates ideal microclimate for fungal spore propagation."
};

export const DEMO_DIAGNOSIS_RESULT: DiagnosisResult = {
  diagnosis_id: "diag-1042",
  predicted_disease: "Tomato Early Blight",
  confidence: 0.94,
  severity: "HIGH",
  risk_score: 82.4,
  status: "CONFIRMED",
  image_url: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=800&q=80",
  weather_context: DEMO_WEATHER,
  risk_factors: {
    weather_risk_percent: 85,
    crop_stage_vulnerability: 75,
    nearby_outbreak_density: 80,
    pest_vector_activity: 60
  },
  reasons: [
    "Recent relative humidity is high (84%)",
    "Temperature range (27.5°C) favors Alternaria solani incubation",
    "4 similar cases reported within 10 km in Niphad block",
    "Crop is in vulnerable flowering stage",
    "Visible target-shaped leaf spots detected with chlorotic halo"
  ],
  advisory: {
    disease: "Tomato Early Blight",
    crop: "Tomato",
    severity: "HIGH",
    actions: "1. Remove heavily infected lower leaves and destroy them safely.\n2. Ensure proper field drainage and airflow between plant rows.\n3. Avoid overhead irrigation; apply drip/root watering.\n4. Inspect field every 24-48 hours.",
    safe_input_guidance: "Chemical intervention: Use only a locally approved product (e.g. Copper Oxychloride 50% WP @ 2.5g/L). Strictly follow registered label, crop-specific dose, safety gloves/mask, and 7-day Pre-Harvest Interval (PHI). Do not invent pesticide dosages.",
    preventive_actions: "• Practice 3-year crop rotation with non-solanaceous crops.\n• Apply Trichoderma viride bio-fungicide as preventive soil treatment.\n• Maintain 60 cm x 45 cm spacing for canopy ventilation.",
    biological_control: "Spray Neem Oil 1% EC (10,000 ppm) @ 3ml/L of water during initial symptom phase.",
    monitoring_guidance: "Inspect field every 24-48 hours. Focus on shaded lower leaves.",
    when_to_contact_expert: "Contact your local extension officer if symptoms spread to more than 15% of your crop within 3 days."
  },
  disclaimer: "AI-assisted preliminary assessment. Expert verification recommended for low confidence cases."
};

export const DEMO_HOTSPOTS: Hotspot[] = [
  {
    id: "hs-1",
    latitude: 20.0059,
    longitude: 73.7898,
    district: "Nashik",
    block: "Block A (Niphad)",
    area_name: "Niphad Grape & Tomato Belt",
    crop: "Tomato",
    disease: "Tomato Early Blight",
    pest_type: "Aphids",
    risk_level: "CRITICAL",
    risk_score: 88.5,
    case_count: 24,
    confirmed_cases: 18,
    recent_trend: "+22% over last 7 days",
    weather_summary: "86% Humidity, 27.5°C Temp",
    extension_worker: "Sanjay Patil"
  },
  {
    id: "hs-2",
    latitude: 19.9975,
    longitude: 73.7810,
    district: "Nashik",
    block: "Block B (Sinnar)",
    area_name: "Sinnar Cotton Valley",
    crop: "Cotton",
    disease: "Cotton Bacterial Blight",
    pest_type: "Whitefly",
    risk_level: "HIGH",
    risk_score: 72.0,
    case_count: 14,
    confirmed_cases: 11,
    recent_trend: "+12% over last 7 days",
    weather_summary: "82% Humidity, 28°C Temp",
    extension_worker: "Anil Deshmukh"
  },
  {
    id: "hs-3",
    latitude: 19.8762,
    longitude: 73.8421,
    district: "Nashik",
    block: "Block C (Igatpuri)",
    area_name: "Igatpuri Rice Terraces",
    crop: "Rice",
    disease: "Rice Bacterial Leaf Blight",
    pest_type: "Stem Borer",
    risk_level: "MODERATE",
    risk_score: 52.4,
    case_count: 8,
    confirmed_cases: 6,
    recent_trend: "Stable (-2%)",
    weather_summary: "76% Humidity, 25°C Temp",
    extension_worker: "Ramesh Pawar"
  }
];

export const DEMO_ALERTS: AlertItem[] = [
  {
    id: "alt-1",
    type: "DISEASE_RISK",
    title: "High Early Blight Weather Risk",
    message: "Relative humidity reached 84% in Niphad block. Take preventive measures for Tomato crops.",
    severity: "HIGH",
    read: false,
    created_at: "2 hours ago"
  },
  {
    id: "alt-2",
    type: "PEST_OUTBREAK",
    title: "Aphid Trap Threshold Exceeded",
    message: "Yellow sticky traps in Field #2 recorded >20 insects. Consider Neem Oil biological treatment.",
    severity: "WARNING",
    read: false,
    created_at: "5 hours ago"
  },
  {
    id: "alt-3",
    type: "EXPERT_REVIEW",
    title: "Diagnosis Confirmed by Expert",
    message: "Dr. V. Sharma confirmed Tomato Early Blight for your North Field submission.",
    severity: "INFO",
    read: true,
    created_at: "1 day ago"
  }
];
