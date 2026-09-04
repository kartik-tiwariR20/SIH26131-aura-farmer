from typing import Dict, Any, List

class AdvisoryService:
    @staticmethod
    def generate_advisory(disease: str, crop: str = "Tomato", severity: str = "MODERATE", language: str = "en") -> Dict[str, Any]:
        """
        Generates Integrated Pest & Disease Management (IPDM) advisory prioritize cultural, biological & mechanical controls.
        """
        d_lower = disease.lower()

        if "blight" in d_lower:
            actions = [
                "Remove and burn heavily infected leaves and stems immediately.",
                "Ensure proper field drainage to prevent waterlogging.",
                "Improve plant canopy ventilation by judicious pruning.",
                "Avoid overhead sprinkler irrigation; apply water at root base."
            ]
            preventive = [
                "Practice 3-year crop rotation with non-solanaceous crops.",
                "Apply Trichoderma viride bio-fungicide seed treatment before planting.",
                "Maintain optimum row spacing of 60 cm x 45 cm for adequate airflow."
            ]
            biological = "Apply Neem oil (10,000 ppm) @ 3 ml/liter of water at initial symptom appearance."
            chemical = (
                "If disease severity exceeds 20% leaf area, apply copper oxychloride 50% WP @ 2.5g/liter. "
                "Use only locally registered inputs. Strictly adhere to registered label, recommended dose, "
                "safety mask/gloves, and observe 7-day pre-harvest interval (PHI)."
            )
            monitoring = "Inspect field every 24-48 hours. Focus on lower leaves and shaded canopy areas."
            contact_expert = "Contact local extension officer if more than 15% plants show stem lesions or rapid wilting."
        
        elif "rust" in d_lower:
            actions = [
                "Destroy alternate weed hosts around field margins.",
                "Remove early infected leaves displaying yellow-orange pustules.",
                "Avoid excessive nitrogenous fertilizer applications which promote lush growth."
            ]
            preventive = [
                "Sow resistant/tolerant varieties approved for your district.",
                "Maintain balanced N-P-K fertilization based on soil test card."
            ]
            biological = "Spray Pseudomonas fluorescens @ 5g/liter during early morning or late evening."
            chemical = (
                "Apply Mancozeb 75% WP @ 2g/liter if pustules spread rapidly. "
                "Always consult certified agronomist for local approvals and wear protective gear."
            )
            monitoring = "Monitor leaf undersides weekly during cloudy, humid weather."
            contact_expert = "Inform district agricultural officer if rust pustules appear across >10% of field area."

        elif "aphid" in d_lower or "pest" in d_lower or "miner" in d_lower:
            actions = [
                "Install yellow sticky traps @ 10-12 traps per acre at crop height.",
                "Wash aphid colonies with high-pressure water spray on small patches.",
                "Preserve natural predators like ladybird beetles and lacewings."
            ]
            preventive = [
                "Grow border crops like maize or sorghum as physical barriers.",
                "Keep bunds free of weed hosts."
            ]
            biological = "Spray Beauveria bassiana @ 5ml/liter during evening hours."
            chemical = (
                "If trap catch exceeds economic threshold (20 insects/trap/day), apply Azadirachtin 1% EC @ 2ml/liter. "
                "Follow label instructions carefully."
            )
            monitoring = "Check yellow sticky traps every 2 days and record counts."
            contact_expert = "Contact extension worker if trap catches double within 48 hours."

        else:
            actions = [
                "Isolate affected plants and inspect surrounding crop perimeter.",
                "Ensure balanced soil moisture without water stagnation.",
                "Remove fallen crop debris from field."
            ]
            preventive = [
                "Use certified disease-free seeds and seedlings.",
                "Maintain proper weed management."
            ]
            biological = "Apply Neem seed kernel extract (NSKE 5%) as preventive foliage spray."
            chemical = "Consult local agricultural university or extension worker before applying chemical sprays."
            monitoring = "Monitor crop health daily."
            contact_expert = "Request expert review if symptoms worsen over 3 days."

        return {
            "disease": disease,
            "crop": crop,
            "severity": severity,
            "actions": "\n".join([f"{i+1}. {act}" for i, act in enumerate(actions)]),
            "preventive_actions": "\n".join([f"• {prev}" for prev in preventive]),
            "biological_control": biological,
            "monitoring_guidance": monitoring,
            "when_to_contact_expert": contact_expert,
            "safe_input_guidance": chemical
        }
