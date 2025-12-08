import { FastingPhase, Milestone, ChartDataPoint, Badge } from './types';

export const MEDICAL_PROFILE_CONTEXT = `
USER MEDICAL PROFILE (STRICT ADHERENCE REQUIRED):
1. KIDNEYS: Sediment in renal pelvis. Prescription: >2L water/day. GOAL: 3 Liters/48h.
   - RISK: Dehydration causes stone formation.
   - REQUIREMENT: Must add Electrolytes (Himalayan salt/powder) to prevent mineral flush.
2. URIC ACID: High (7.29 mg/dL).
   - RISK: Gout attack (Joint pain/Big Toe).
   - ACTION: Stop fast immediately if joint pain occurs.
3. LIVER: Grade 2 Fatty Liver, Hepatomegaly.
4. GALLBLADDER: Multiple Polyps.
   - RISK: Rapid contraction on refeeding.
   - REQUIREMENT: Very low fat on break-fast.

REFEEDING RULES (CRITICAL):
- BANNED: Seafood, Red Meat, Organs (High Purine -> Uric Acid Spike). Fried/High Fat (Gallbladder Pain). Sugar.
- APPROVED: Bone/Veg Broth, Tofu, Chicken Breast, Steamed Veggies. Small portions (50%).
`;

export const PHASES: FastingPhase[] = [
  { id: 1, name: "Insulin Reset", range: "0 - 8 Hours", description: "Lower insulin, stop fat storage, hydration focus.", color: "#3b82f6", minDuration: 8 }, // Blue
  { id: 2, name: "Glycogen Exhaustion", range: "8 - 18 Hours", description: "Deplete sugar, attack triglycerides, liver de-fatting.", color: "#8b5cf6", minDuration: 18 }, // Violet
  { id: 3, name: "Liver Detox", range: "18 - 30 Hours", description: "Deep fat mobilization, Uric Acid management.", color: "#d946ef", minDuration: 30 }, // Fuchsia
  { id: 4, name: "Deep Repair", range: "30 - 48 Hours", description: "Immune reset, Gallbladder safety, Peak Autophagy.", color: "#10b981", minDuration: 48 }, // Emerald
];

export const BADGES: Badge[] = [
  { id: 'bronze_7', name: 'Bronze Warrior', description: '7 Streaks achieved', threshold: 7, icon: 'Award', color: 'text-amber-600' },
  { id: 'silver_14', name: 'Silver Guardian', description: '14 Streaks achieved', threshold: 14, icon: 'Shield', color: 'text-slate-300' },
  { id: 'gold_21', name: 'Gold Master', description: '21 Streaks achieved', threshold: 21, icon: 'Crown', color: 'text-yellow-400' },
  { id: 'plat_30', name: 'Platinum Legend', description: '30 Streaks achieved', threshold: 30, icon: 'Star', color: 'text-cyan-400' },
  { id: 'diamond_60', name: 'Diamond Soul', description: '60 Streaks achieved', threshold: 60, icon: 'Gem', color: 'text-blue-400' },
  { id: 'master_90', name: 'Grandmaster', description: '90 Streaks achieved', threshold: 90, icon: 'Trophy', color: 'text-purple-400' },
  { id: 'elite_180', name: 'Elite Sage', description: '180 Streaks achieved', threshold: 180, icon: 'Sun', color: 'text-orange-400' },
  { id: 'immortal_365', name: 'Chronos Immortal', description: '365 Streaks achieved', threshold: 365, icon: 'Zap', color: 'text-emerald-400' },
];

export const MILESTONES: Milestone[] = [
  // Phase 1: Insulin Reset (0 - 8)
  { hour: 0.5, phaseId: 1, title: "Digestion Begins", description: "Body processes intake.", benefit: "Start of metabolic clock." },
  { hour: 2, phaseId: 1, title: "Insulin Peak", description: "Blood sugar peaks. Energy storage active.", benefit: "Fuel for immediate needs." },
  { hour: 3, phaseId: 1, title: "Liver Storage Mode", description: "Liver storing energy. Goal: Exit this state quickly.", benefit: "Identifying the enemy of Hepatomegaly." },
  { hour: 4, phaseId: 1, title: "Insulin Drops", description: "Signal to store fat stops.", benefit: "First victory for Grade 2 Fatty Liver." },
  { hour: 5, phaseId: 1, title: "Hydration Check 1 💧", description: "300ml Water. PREVENT STONE RISK.", benefit: "Flush renal pelvis sediment." },
  { hour: 6, phaseId: 1, title: "Glycogen Access", description: "Unpacking stored liver sugar.", benefit: "Shift from food to stored energy." },
  { hour: 7, phaseId: 1, title: "Uric Acid Prep", description: "Pre-emptive hydration.", benefit: "Filter Uric Acid (7.29mg/dL) before ketones rise." },
  { hour: 8, phaseId: 1, title: "End Phase 1", description: "Insulin baseline reached.", benefit: "Ready for fat attack." },

  // Phase 2: Glycogen Exhaustion & Early Fat Burn (8 - 18)
  { hour: 9, phaseId: 2, title: "HGH Rise", description: "Growth hormone increases.", benefit: "Muscle preservation begins." },
  { hour: 10, phaseId: 2, title: "Triglyceride Attack", description: "Clearing excess lipids.", benefit: "Directly targets high Triglycerides (180 mg/dL)." },
  { hour: 11, phaseId: 2, title: "Fatigue Warning", description: "Possible 'low battery' feeling.", benefit: "Sign of switching to fat burning." },
  { hour: 12, phaseId: 2, title: "Metabolic Switch", description: "Official shift to fat burning.", benefit: "Using stored energy." },
  { hour: 13, phaseId: 2, title: "Hydration Check 2 💧", description: "300ml Water + PINCH OF SALT.", benefit: "Electrolytes crucial to assist kidneys." },
  { hour: 14, phaseId: 2, title: "Ketone Production", description: "Liver converts fatty acids to ketones.", benefit: "Alternative brain fuel source." },
  { hour: 15, phaseId: 2, title: "Early Autophagy", description: "Cellular cleaning begins.", benefit: "Removal of cellular debris." },
  { hour: 16, phaseId: 2, title: "Liver De-Fatting", description: "Burning visceral fat.", benefit: "Reversing Medium Fatty Liver." },
  { hour: 17, phaseId: 2, title: "Anti-Inflammatory", description: "Reduced systemic inflammation.", benefit: "Beneficial for asthma (J45) history." },
  
  // Phase 3: Liver Detox & Risk Management (18 - 30) (Old Phase 2)
  { hour: 18.5, phaseId: 3, title: "Max Fat Oxidation", description: "Burning elevated triglycerides.", benefit: "High rate lipid reduction." },
  { hour: 19, phaseId: 3, title: "Mental Clarity", description: "Ketones reach the brain.", benefit: "Alleviates 'sleepiness' symptoms." },
  { hour: 20, phaseId: 3, title: "Hydration Check 4 💧", description: "500ml Water. CRITICAL FLUSH.", benefit: "Prevent Uric Acid buildup & Gout." },
  { hour: 21, phaseId: 3, title: "Gallbladder Rest", description: "Gallbladder inactive.", benefit: "Reduces irritation around multiple polyps." },
  { hour: 22, phaseId: 3, title: "Autophagy Ramp Up", description: "Recycling damaged cells.", benefit: "Deep cellular maintenance." },
  { hour: 23, phaseId: 3, title: "Uric Acid Watch", description: "Check toes for tingling/pain.", benefit: "STOP if pain occurs." },
  { hour: 24, phaseId: 3, title: "Peak BDNF", description: "Brain fertilizer high.", benefit: "Neural regeneration." },
  { hour: 25, phaseId: 3, title: "Liver De-fatting", description: "Converting stored liver fat.", benefit: "Direct treatment for Grade 2 Fatty Liver." },
  { hour: 26, phaseId: 3, title: "HGH Peak", description: "Max muscle protection.", benefit: "Preserving lean mass." },
  { hour: 27, phaseId: 3, title: "Hydration Check 5 💧", description: "300ml Water + Electrolytes.", benefit: "Continuing sediment flush." },
  { hour: 28, phaseId: 3, title: "Immune Reset", description: "WBC recycling.", benefit: "Helps allergies and urticaria history." },
  { hour: 29, phaseId: 3, title: "Insulin Low", description: "Minimal insulin levels.", benefit: "Maximized insulin sensitivity." },

  // Phase 4: Deep Repair & Safe Landing (30 - 48) (Old Phase 3)
  { hour: 31, phaseId: 4, title: "Gut Repair", description: "Lining regeneration.", benefit: "Digestive system restoration." },
  { hour: 32, phaseId: 4, title: "Deep Anti-Inflam", description: "Systemic marker reduction.", benefit: "Global reduction in inflammation." },
  { hour: 33, phaseId: 4, title: "Hydration Check 6 💧", description: "300ml Water.", benefit: "Kidney maintenance." },
  { hour: 34, phaseId: 4, title: "Gallbladder Safety", description: "Bile concentrated. CAUTION.", benefit: "Prep for low-fat refeed to avoid polyp irritation." },
  { hour: 35, phaseId: 4, title: "Triglyceride Burn", description: "Targeting 'High' levels.", benefit: "Sustained lipid control." },
  { hour: 37, phaseId: 4, title: "Mental Focus", description: "High energy state.", benefit: "Contrast to usual tiredness." },
  { hour: 38, phaseId: 4, title: "Hydration Check 7 💧", description: "300ml Water.", benefit: "Steady filtration." },
  { hour: 40, phaseId: 4, title: "Peak Autophagy", description: "Max cellular recycling.", benefit: "Potential anti-aging/anti-cancer." },
  { hour: 41, phaseId: 4, title: "Liver Size Min", description: "Glycogen/water loss peak.", benefit: "Reduced hepatomegaly pressure." },
  { hour: 43, phaseId: 4, title: "Cortisol Rise", description: "Adrenaline boost.", benefit: "Energy for food seeking." },
  { hour: 44, phaseId: 4, title: "Hydration Check 8 💧", description: "Final heavy intake.", benefit: "Pre-refeed flush." },
  { hour: 46, phaseId: 4, title: "Refeeding Plan", description: "NO Seafood/Red Meat. NO Fried.", benefit: "Broth, Chicken, Tofu, Veggies ONLY." },
  { hour: 48, phaseId: 4, title: "Completion", description: "Max cellular recycling achieved.", benefit: "Metabolic reset complete." },
];

// Simulated data adapted for the 48h structure
export const CHART_DATA: ChartDataPoint[] = [];
for (let i = 0; i <= 48; i++) {
  let glucose = 100;
  let insulin = 50;
  let ketones = 0.1;
  let autophagy = 0;
  let hgh = 10;

  if (i <= 4) {
    glucose = 120 - (i * 5); 
    insulin = 80 - (i * 15); 
  } else {
    glucose = 70 + Math.sin(i/10) * 5; 
    insulin = 5 + Math.random() * 2; 
  }

  if (i > 12) {
    ketones = 0.1 + ((i - 12) * 0.2); 
    if (ketones > 6) ketones = 6;
  }

  if (i > 15) {
    autophagy = (i - 15) * 3; 
    if (autophagy > 100) autophagy = 100;
  }

  if (i > 9) {
    hgh = 10 + ((i - 9) * 6); 
    if (i > 30) hgh = hgh * 0.95; 
  }

  CHART_DATA.push({
    hour: i,
    glucose: Math.max(60, glucose),
    insulin: Math.max(2, insulin),
    ketones: parseFloat(ketones.toFixed(2)),
    autophagy: Math.min(100, Math.max(0, autophagy)),
    hgh: Math.min(300, parseFloat(hgh.toFixed(0)))
  });
}