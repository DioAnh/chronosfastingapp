import React from 'react';
import { Award, Shield, Crown, Star, Trophy, Zap, Gem, Sun, Lock } from 'lucide-react';
import { UserProgress, FastingPhase, Badge } from '../types';
import { BADGES } from '../constants';

interface AchievementsProps {
  progress: UserProgress;
  phases: FastingPhase[];
}

export const Achievements: React.FC<AchievementsProps> = ({ progress, phases }) => {
  
  const getIcon = (iconName: string, className: string) => {
    const props = { className };
    switch (iconName) {
      case 'Award': return <Award {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Star': return <Star {...props} />;
      case 'Gem': return <Gem {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Zap': return <Zap {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="text-yellow-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Achievements & Streaks</h3>
      </div>

      {/* Phase Streaks - Updated to 4 columns for 4 phases */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {phases.map((phase) => (
          <div key={phase.id} className="flex flex-col items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-lg mb-2 relative group"
              style={{ backgroundColor: phase.color }}
            >
              {progress.streaks[phase.id] || 0}
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-slate-700 z-50">
                {phase.name} Streak
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-medium uppercase text-center hidden md:block">{phase.name}</span>
          </div>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {BADGES.map((badge) => {
          // Check if this badge is unlocked by ANY phase streak
          const maxStreak = Math.max(...Object.values(progress.streaks));
          const isUnlocked = maxStreak >= badge.threshold;

          return (
            <div 
              key={badge.id} 
              className={`relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 group
                ${isUnlocked 
                  ? 'bg-slate-700/40 border-slate-600 hover:bg-slate-700/60 hover:scale-105' 
                  : 'bg-slate-900/40 border-slate-800 opacity-50 grayscale'
                }`}
            >
              <div className="mb-2">
                {isUnlocked ? (
                  getIcon(badge.icon, `w-8 h-8 ${badge.color} drop-shadow-md`)
                ) : (
                  <Lock className="w-8 h-8 text-slate-600" />
                )}
              </div>
              <div className="text-[10px] text-center font-bold text-slate-300 leading-tight">
                {badge.threshold}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-xs text-center p-2 rounded border border-slate-700 pointer-events-none z-50">
                <div className={`font-bold mb-0.5 ${isUnlocked ? badge.color : 'text-slate-400'}`}>{badge.name}</div>
                <div className="text-slate-500 text-[10px]">{badge.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};