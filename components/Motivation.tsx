import React from 'react';
import { Target, ArrowRight, Lock, Star, TrendingUp } from 'lucide-react';
import { FastingPhase } from '../types';

interface MotivationProps {
  currentHour: number;
  phases: FastingPhase[];
}

export const Motivation: React.FC<MotivationProps> = ({ currentHour, phases }) => {
  // Find the phase we are currently working towards (the first phase where minDuration > currentHour)
  const nextTargetPhase = phases.find(p => p.minDuration > currentHour);
  
  // Find the previous phase (completed) to calculate progress within the current interval
  const currentPhaseIndex = phases.findIndex(p => p.id === nextTargetPhase?.id);
  const prevPhaseDuration = currentPhaseIndex > 0 ? phases[currentPhaseIndex - 1].minDuration : 0;

  if (!nextTargetPhase) {
    return (
      <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 backdrop-blur-md rounded-2xl border border-yellow-500/30 p-6 flex items-center gap-4">
        <div className="bg-yellow-500 rounded-full p-3 shadow-lg shadow-yellow-500/20 animate-pulse">
          <Star className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Maximum Potential Achieved!</h3>
          <p className="text-slate-300 text-sm">You have completed the 48-hour protocol. Every extra hour now is pure bonus autophagy.</p>
        </div>
      </div>
    );
  }

  const hoursRemaining = nextTargetPhase.minDuration - currentHour;
  const totalPhaseLength = nextTargetPhase.minDuration - prevPhaseDuration;
  const progressInPhase = currentHour - prevPhaseDuration;
  const progressPercent = Math.min(100, Math.max(0, (progressInPhase / totalPhaseLength) * 100));

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-4">
        <Target className="text-indigo-400 w-5 h-5" />
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">Next Objective</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        
        {/* Progress Circle / Stat */}
        <div className="flex-1 w-full">
           <div className="flex justify-between items-end mb-2">
             <div className="flex flex-col">
               <span className="text-3xl font-bold text-white font-mono leading-none">
                 {hoursRemaining.toFixed(1)}<span className="text-sm text-slate-500 ml-1">hrs</span>
               </span>
               <span className="text-xs text-indigo-300 font-medium mt-1">
                 REMAINING
               </span>
             </div>
             <div className="text-right">
                <span className="text-xs text-slate-400 uppercase">Target</span>
                <div className="text-sm font-bold text-white">{nextTargetPhase.name}</div>
             </div>
           </div>

           {/* Progress Bar */}
           <div className="h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
             <div 
               className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 relative"
               style={{ width: `${progressPercent}%` }}
             >
               <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50 blur-[1px]"></div>
             </div>
           </div>
           <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono">
             <span>{prevPhaseDuration}h</span>
             <span>{nextTargetPhase.minDuration}h</span>
           </div>
        </div>

        {/* The "Unlock" Tease */}
        <div className="bg-slate-900/40 rounded-xl p-4 border border-white/5 md:w-1/2 w-full relative group">
           <div className="absolute -top-3 -right-3 bg-slate-800 p-1.5 rounded-full border border-slate-700 shadow-sm z-10">
             <Lock className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
           </div>
           
           <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
             <TrendingUp className="w-3 h-3" />
             Upcoming Benefit
           </h4>
           <p className="text-sm text-indigo-100 font-medium leading-relaxed">
             "{nextTargetPhase.description}"
           </p>
           <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 group-hover:text-white transition-colors cursor-default">
             <span>Keep pushing</span>
             <ArrowRight className="w-3 h-3" />
           </div>
        </div>

      </div>
    </div>
  );
};