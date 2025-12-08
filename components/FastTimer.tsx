import React from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { FastingPhase } from '../types';

interface FastTimerProps {
  elapsedSeconds: number;
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  currentPhase: FastingPhase | undefined;
}

export const FastTimer: React.FC<FastTimerProps> = ({ 
  elapsedSeconds, 
  isActive, 
  onToggle, 
  onReset,
  currentPhase
}) => {
  const totalSecondsTarget = 48 * 3600;
  const percentage = Math.min(100, (elapsedSeconds / totalSecondsTarget) * 100);
  
  // Circular Progress Calculation
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center p-8 relative w-full">
      {/* Styles for the running animation */}
      <style>{`
        @keyframes progress-stripes {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
        .running-stripes {
          background-image: linear-gradient(
            45deg, 
            rgba(255, 255, 255, 0.15) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0.15) 75%, 
            transparent 75%, 
            transparent
          );
          background-size: 20px 20px;
          animation: progress-stripes 1s linear infinite;
        }
      `}</style>

      {/* Main Circular Timer */}
      <div className="relative group mb-8">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: currentPhase?.color || '#3b82f6' }}
        ></div>
        
        <svg className="transform -rotate-90 w-72 h-72">
          {/* Track */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke={currentPhase?.color || '#3b82f6'}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold font-mono tracking-wider text-white">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div className="text-sm text-slate-400 mt-2 font-medium">
            {currentPhase?.name || 'Ready to Fast'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 ${
            isActive 
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
          }`}
        >
          {isActive ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          {isActive ? 'Stop Fasting' : 'Start Fasting'}
        </button>

        {!isActive && elapsedSeconds > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        )}
      </div>

      {/* 48-Hour Linear Progress "Loading" Bar */}
      <div className="w-full bg-slate-900/50 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">48H Goal Progress</span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Target: <span className="text-slate-300">48 Hours</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-white font-mono">{percentage.toFixed(1)}%</span>
            <div className="text-[10px] text-slate-500">
              {formatTime(hours)}h {formatTime(minutes)}m / 48h 00m
            </div>
          </div>
        </div>

        <div className="relative h-5 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
          {/* Fill Gradient */}
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-300 ease-linear flex items-center"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${currentPhase?.color || '#3b82f6'}, #a855f7)` 
            }}
          >
             {/* The "Running" Stripes Animation - Only visible when active */}
             {isActive && (
               <div className="absolute inset-0 w-full h-full running-stripes opacity-30"></div>
             )}
             
             {/* Leading Edge Glow */}
             <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]"></div>
          </div>
        </div>

        {/* Phase Markers on the bar */}
        <div className="relative h-2 mt-1 w-full flex text-[9px] text-slate-600 font-mono pt-1 justify-between">
          <span>0h</span>
          <span>12h</span>
          <span>24h</span>
          <span>36h</span>
          <span>48h</span>
        </div>
      </div>
    </div>
  );
};