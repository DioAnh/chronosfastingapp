import React, { useRef, useEffect, useMemo } from 'react';
import { Milestone } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface TimelineProps {
  milestones: Milestone[];
  currentHour: number;
}

export const Timeline: React.FC<TimelineProps> = ({ milestones, currentHour }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate active index. 
  // We use useMemo or just rely on the fact that this integer changes infrequently.
  const activeIndex = milestones.findIndex((m, idx) => {
    return currentHour >= m.hour && (idx === milestones.length - 1 || currentHour < milestones[idx + 1].hour);
  });

  // Auto-scroll to active item ONLY when activeIndex changes, not every second.
  useEffect(() => {
    if (scrollRef.current && activeIndex !== -1) {
      // Find the specific DOM element for this milestone
      const activeElement = scrollRef.current.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
      
      if (activeElement) {
        const container = scrollRef.current;
        
        // Calculate position to center the element within the container
        // offsetTop is relative to the positioned parent (the container)
        const topPos = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const containerHeight = container.clientHeight;
        
        // Use container.scrollTo instead of element.scrollIntoView to avoid scrolling the main window
        container.scrollTo({
          top: topPos - (containerHeight / 2) + (elementHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]); // Critical: Dependency is index, not currentHour

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 h-[500px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
        Fasting Journey
      </h3>
      
      <div ref={scrollRef} className="overflow-y-auto space-y-0 pr-2 relative flex-1 custom-scrollbar">
        {/* Continuous line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-700 -z-10"></div>

        {milestones.map((m, idx) => {
          const isPassed = currentHour >= m.hour;
          const isCurrent = idx === activeIndex;
          
          return (
            <div 
              key={idx} 
              data-index={idx}
              className={`flex gap-4 pb-8 relative group transition-opacity duration-300 ${isCurrent ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              <div className="mt-1 flex-shrink-0 bg-slate-800 rounded-full">
                {isPassed ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 bg-slate-900 rounded-full shadow-lg shadow-emerald-900/20" />
                ) : (
                  <Circle className="w-10 h-10 text-slate-600 bg-slate-900 rounded-full" />
                )}
              </div>
              
              <div className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                isCurrent 
                  ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10 transform scale-[1.02]' 
                  : isPassed 
                    ? 'bg-slate-700/30 border-slate-700' 
                    : 'bg-transparent border-transparent opacity-50'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold ${isCurrent ? 'text-indigo-300' : 'text-slate-200'}`}>
                    {m.title}
                  </h4>
                  <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">
                    {m.hour}h
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{m.description}</p>
                <div className="text-xs text-emerald-400 flex gap-1 items-start">
                  <span className="font-semibold uppercase tracking-wider text-[10px] mt-0.5">Benefit:</span>
                  {m.benefit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};