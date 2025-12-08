import React from 'react';
import { Activity, Brain, Shield, Droplet, Flame } from 'lucide-react';
import { FastingPhase } from '../types';

interface OrganStatusProps {
  currentHour: number;
  phase: FastingPhase;
}

export const OrganStatusCard: React.FC<OrganStatusProps> = ({ currentHour, phase }) => {
  
  // Customized Organ Logic for specific health report
  const getOrganState = (type: 'liver' | 'brain' | 'kidneys' | 'muscle' | 'immune') => {
    // Liver: Focus on Fatty Liver & Hepatomegaly
    if (type === 'liver') {
      if (currentHour < 3) return { status: "Insulin Peak", detail: "Energy storage active." };
      if (currentHour < 4) return { status: "Storage Mode", detail: "Goal: Exit this state for Hepatomegaly." };
      if (currentHour < 8) return { status: "Glycogen Tap", detail: "Unpacking stored liver sugar." };
      if (currentHour < 18) return { status: "Visceral Burn", detail: "Mobilizing liver fat specifically (De-fatting)." };
      if (currentHour < 30) return { status: "Max Oxidation", detail: "Burning Triglycerides (180 mg/dL target)." };
      return { status: "Deep Detox", detail: "Clearing excess lipids. Prep for low-fat refeed." };
    }
    // Kidneys: Focus on Sediment & Uric Acid
    if (type === 'kidneys') {
      if (currentHour < 5) return { status: "Prep", detail: "Prepare to flush." };
      if (currentHour < 8) return { status: "Uric Prep", detail: "Hydrate before Ketones rise (7.29mg/dL risk)." };
      if (currentHour < 13) return { status: "Sediment Flush", detail: "300ml Water + Salt recommended." };
      if (currentHour < 30) return { status: "Acid Watch", detail: "Flushing acid. Watch for toe pain." };
      return { status: "Max Flush", detail: "High water intake. Prevent Gout." };
    }
    // Brain: Focus on Sleepiness vs Clarity
    if (type === 'brain') {
      if (currentHour < 11) return { status: "Transition", detail: "Fed state to early fasting." };
      if (currentHour < 12) return { status: "Low Battery", detail: "Fatigue warning (Switching fuels)." };
      if (currentHour < 19) return { status: "Adapting", detail: "Ketones rising. Fog clearing." };
      return { status: "High Clarity", detail: "Ketones active. No brain fog." };
    }
    // Immune (Cells): Focus on Allergies/Asthma/Autophagy
    if (type === 'immune') {
      if (currentHour < 15) return { status: "Baseline", detail: "Standard defense." };
      if (currentHour < 17) return { status: "Anti-Inflam", detail: "Helpful for Asthma (J45)." };
      if (currentHour < 24) return { status: "Autophagy", detail: "Recycling damaged proteins." };
      return { status: "Peak Repair", detail: "Max cellular renewal." };
    }
    // Muscle: Focus on HGH
    if (type === 'muscle') {
      if (currentHour < 9) return { status: "Fed", detail: "Using stored glycogen." };
      if (currentHour < 12) return { status: "HGH Rise", detail: "Preserving mass." };
      if (currentHour < 26) return { status: "Conserving", detail: "HGH elevated." };
      return { status: "HGH Peak", detail: "Max protection & repair." };
    }
    return { status: "Normal", detail: " functioning" };
  };

  const organs = [
    { id: 'liver', name: 'Liver', icon: Activity, ...getOrganState('liver'), color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'kidneys', name: 'Kidneys', icon: Droplet, ...getOrganState('kidneys'), color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'brain', name: 'Brain', icon: Brain, ...getOrganState('brain'), color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'immune', name: 'Immune', icon: Shield, ...getOrganState('immune'), color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'muscle', name: 'Muscle', icon: Flame, ...getOrganState('muscle'), color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
      {organs.map((organ) => (
        <div key={organ.id} className={`${organ.bg} backdrop-blur-sm border border-white/5 p-4 rounded-xl flex flex-col gap-2 transition-all hover:bg-white/5`}>
          <div className="flex items-center gap-3 mb-1">
            <organ.icon className={`w-5 h-5 ${organ.color}`} />
            <span className="font-semibold text-slate-200">{organ.name}</span>
          </div>
          <div className={`text-sm font-bold ${organ.color}`}>{organ.status}</div>
          <div className="text-xs text-slate-400 leading-relaxed">{organ.detail}</div>
        </div>
      ))}
    </div>
  );
};