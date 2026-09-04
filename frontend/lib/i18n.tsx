"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "mr";

export const translations = {
  en: {
    app_title: "CropGuard",
    app_tagline: "Detect early. Act wisely. Protect every crop.",
    hero_headline: "Protect Your Crop Before the Problem Spreads.",
    hero_subtext: "AI-assisted crop health monitoring, risk forecasting, and expert guidance for smarter farming.",
    check_crop_health: "Check Crop Health",
    explore_platform: "Explore Platform",
    report_pest: "Report Pest",
    my_farms: "My Farms",
    dashboard: "Dashboard",
    surveillance: "Surveillance",
    hotspot_map: "Hotspot Map",
    disease_analytics: "Disease Analytics",
    expert_reviews: "Expert Reviews",
    alerts: "Alerts",
    settings: "Settings",
    login: "Sign In",
    register: "Register",
    logout: "Log Out",
    crop: "Crop",
    variety: "Variety",
    growth_stage: "Growth Stage",
    soil_condition: "Soil Condition",
    upload_crop_image: "Upload Crop Image",
    analyzing_crop: "Analyzing crop image...",
    preliminary_assessment: "AI-Assisted Preliminary Assessment",
    confidence: "Confidence",
    severity: "Severity",
    risk_level: "Risk Level",
    risk_factors: "Risk Factors",
    recommended_action: "Recommended Action",
    safe_input_guidance: "Safe Input Guidance",
    request_expert_review: "Request Expert Review",
    expert_verification_recommended: "Expert verification recommended for uncertain cases.",
    good_evening: "Good Evening",
    farm_health_overview: "Your farm health overview",
    fields_healthy: "fields healthy",
    field_needs_attention: "field needs attention",
    recent_diagnosis: "Recent Diagnosis",
    weather_risk: "Weather Risk",
    low: "Low",
    moderate: "Moderate",
    high: "High",
    critical: "Critical",
    confirm_diagnosis: "Confirm Diagnosis",
    reject_diagnosis: "Reject Diagnosis",
    refer_to_lab: "Refer to Laboratory",
    language: "Language"
  },
  hi: {
    app_title: "क्रॉपगार्ड",
    app_tagline: "शीघ्र पता लगाएं। समझदारी से कार्य करें। हर फसल की रक्षा करें।",
    hero_headline: "समस्या फैलने से पहले अपनी फसल की रक्षा करें।",
    hero_subtext: "स्मार्ट खेती के लिए AI-संचालित फसल स्वास्थ्य निगरानी, जोखिम का पूर्वानुमान और विशेषज्ञ सलाह।",
    check_crop_health: "फसल स्वास्थ्य की जांच करें",
    explore_platform: "प्लेटफ़ॉर्म देखें",
    report_pest: "कीट की रिपोर्ट करें",
    my_farms: "मेरे खेत",
    dashboard: "डैशबोर्ड",
    surveillance: "निगरानी",
    hotspot_map: "हॉटस्पॉट मानचित्र",
    disease_analytics: "रोग विश्लेषण",
    expert_reviews: "विशेषज्ञ समीक्षाएं",
    alerts: "अलर्ट",
    settings: "सेटिंग्स",
    login: "साइन इन करें",
    register: "पंजीकरण करें",
    logout: "लॉग आउट",
    crop: "फसल",
    variety: "किस्म",
    growth_stage: "विकास चरण",
    soil_condition: "मिट्टी की स्थिति",
    upload_crop_image: "फसल की छवि अपलोड करें",
    analyzing_crop: "फसल की छवि का विश्लेषण किया जा रहा है...",
    preliminary_assessment: "AI-सहायता प्राप्त प्रारंभिक मूल्यांकन",
    confidence: "विश्वास स्तर",
    severity: "गंभीरता",
    risk_level: "जोखिम स्तर",
    risk_factors: "जोखिम कारक",
    recommended_action: "अनुशंसित कार्रवाई",
    safe_input_guidance: "सुरक्षित इनपुट मार्गदर्शन",
    request_expert_review: "विशेषज्ञ समीक्षा का अनुरोध करें",
    expert_verification_recommended: "अनिश्चित मामलों के लिए विशेषज्ञ सत्यापन की सिफारिश की जाती है।",
    good_evening: "शुभ संध्या",
    farm_health_overview: "आपके खेत का स्वास्थ्य अवलोकन",
    fields_healthy: "खेत स्वस्थ हैं",
    field_needs_attention: "खेत को ध्यान देने की आवश्यकता है",
    recent_diagnosis: "हाल का निदान",
    weather_risk: "मौसम का जोखिम",
    low: "कम",
    moderate: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    confirm_diagnosis: "निदान की पुष्टि करें",
    reject_diagnosis: "निदान अस्वीकार करें",
    refer_to_lab: "प्रयोगशाला को संदर्भित करें",
    language: "भाषा"
  },
  mr: {
    app_title: "क्रॉपगार्ड",
    app_tagline: "लवकर शोधा. हुशारीने काम करा. प्रत्येक पिकाचे रक्षण करा.",
    hero_headline: "समस्या पसरण्यापूर्वी तुमच्या पिकाचे रक्षण करा.",
    hero_subtext: "स्मार्ट शेतीसाठी AI-आधारित पीक आरोग्य निरीक्षण, धोक्याचा अंदाज आणि तज्ज्ञांचे मार्गदर्शन.",
    check_crop_health: "पिकाचे आरोग्य तपासा",
    explore_platform: "प्लॅटफॉर्म पहा",
    report_pest: "कीडीची नोंद करा",
    my_farms: "माझी शेती",
    dashboard: "डॅशबोर्ड",
    surveillance: "सर्वेक्षण",
    hotspot_map: "हॉटस्पॉट नकाशा",
    disease_analytics: "रोग विश्लेषण",
    expert_reviews: "तज्ज्ञ पुनरावलोकन",
    alerts: "अलर्ट",
    settings: "सेटिंग्ज",
    login: "साइन इन करा",
    register: "नोंदणी करा",
    logout: "लॉग आऊट",
    crop: "पीक",
    variety: "वाण",
    growth_stage: "वाढीचा टप्पा",
    soil_condition: "मातीची स्थिती",
    upload_crop_image: "पिकाचे छायाचित्र अपलोड करा",
    analyzing_crop: "पिकाच्या प्रतिमेचे विश्लेषण सुरू आहे...",
    preliminary_assessment: "AI-साहाय्यित प्राथमिक मूल्यमापन",
    confidence: "विश्वासार्हता",
    severity: "तीव्रता",
    risk_level: "धोक्याची पातळी",
    risk_factors: "धोक्याचे घटक",
    recommended_action: "शिफारस केलेली कृती",
    safe_input_guidance: "सुरक्षित इनपुट मार्गदर्शन",
    request_expert_review: "तज्ज्ञ पुनरावलोकनाची विनंती करा",
    expert_verification_recommended: "अनिश्चित प्रकरणांसाठी तज्ज्ञ पडताळणीची शिफारस केली जाते.",
    good_evening: "शुभ संध्याकाळ",
    farm_health_overview: "तुमच्या शेताचे आरोग्य निरीक्षण",
    fields_healthy: "शेते निरोगी आहेत",
    field_needs_attention: "शेताकडे लक्ष देणे गरजेचे आहे",
    recent_diagnosis: "नुकतेच केलेले निदान",
    weather_risk: "हवामानाचा धोका",
    low: "कमी",
    moderate: "मध्यम",
    high: "जास्त",
    critical: "गंभीर",
    confirm_diagnosis: "निदानाची पुष्टी करा",
    reject_diagnosis: "निदान नाकारा",
    refer_to_lab: "प्रयोगशाळेकडे पाठवा",
    language: "भाषा"
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: keyof typeof translations.en): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
