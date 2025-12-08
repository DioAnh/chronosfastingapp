import React from 'react';
import { Zap, Activity, ArrowRight, Flame, Battery, ShieldCheck } from 'lucide-react';
import { FastingPhase, Milestone } from '../types';

interface CurrentStateDashboardProps {
  currentHour: number;
  phase: FastingPhase | undefined;
  lastMilestone: Milestone | undefined;
}

export const CurrentStateDashboard: React.FC<CurrentStateDashboardProps> = ({ 
  currentHour, 
  phase, 
  lastMilestone 
}) => {
  
  // Calculate Physiological Mode based on Hour
  const getMode = (hour: number) => {
    if (hour < 4) return { 
      mode: "Anabolic / Storage", 
      icon: Battery, 
      color: "text-blue-400",
      desc: "Body is digesting and storing energy."
    };
    if (hour < 12) return { 
      mode: "Catabolic / Switching", 
      icon: Activity, 
      color: "text-violet-400",
      desc: "Switching from food to stored liver glycogen."
    };
    if (hour < 18) return { 
      mode: "Fat Adaptation", 
      icon: Flame, 
      color: "text-orange-400",
      desc: "Burning visceral fat & triglycerides."
    };
    if (hour < 30) return { 
      mode: "Deep Ketosis", 
      icon: Zap, 
      color: "text-fuchsia-400",
      desc: "Brain running on ketones. Max fat oxidation."
    };
    return { 
      mode: "Deep Repair / Autophagy", 
      icon: ShieldCheck, 
      color: "text-emerald-400",
      desc: "Cellular recycling and immune system reset."
    };
  };

  const currentMode = getMode(currentHour);

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl relative overflow-hidden group">
      {/* Background Pulse Animation */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${currentMode.color.split('-')[1]}-500/10 rounded-full blur-3xl group-hover:bg-${currentMode.color.split('-')[1]}-500/20 transition-all duration-1000`}></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Current Status</h2>
            <div className="flex items-center gap-3">
              <currentMode.icon className={`w-8 h-8 ${currentMode.color}`} />
              <div>
                <h3 className={`text-2xl font-bold text-white leading-none`}>
                  {currentMode.mode}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {currentMode.desc}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Phase</div>
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold border inline-block"
              style={{ 
                borderColor: phase?.color, 
                backgroundColor: `${phase?.color}20`,
                color: phase?.color 
              }}
            >
              {phase?.name}
            </div>
          </div>
        </div>

        {/* Active Benefit Section */}
        <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 flex items-start gap-4">
          <div className="bg-emerald-500/10 p-2 rounded-lg shrink-0">
            <ArrowRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-300 mb-1">
              Active Benefit
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              {lastMilestone ? lastMilestone.benefit : "Preparing for metabolic shift..."}
            </p>
            {lastMilestone && (
              <div className="text-[10px] text-slate-500 mt-2 font-mono">
                Triggered at {lastMilestone.hour}h: {lastMilestone.title}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};