import React, { useState, useEffect } from 'react';
import { FastTimer } from './components/FastTimer';
import { OrganStatusCard } from './components/OrganStatusCard';
import { Timeline } from './components/Timeline';
import { Biomarkers } from './components/Biomarkers';
import { GeminiInsight } from './components/GeminiInsight';
import { Achievements } from './components/Achievements';
import { CurrentStateDashboard } from './components/CurrentStateDashboard';
import { Motivation } from './components/Motivation';
import { PHASES, MILESTONES, CHART_DATA } from './constants';
import { FastingPhase, Milestone, UserProgress } from './types';
import { Info, Droplet, AlertTriangle, Utensils } from 'lucide-react';

const App: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  // User Progress State - Now supports 4 phases
  const [userProgress, setUserProgress] = useState<UserProgress>({
    streaks: { 1: 0, 2: 0, 3: 0, 4: 0 },
    badges: [],
    totalFasts: 0
  });

  // Load state from local storage on mount
  useEffect(() => {
    // Timer state
    const savedStart = localStorage.getItem('fastStartTime');
    if (savedStart) {
      const start = parseInt(savedStart, 10);
      setStartTime(start);
      setIsActive(true);
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - start) / 1000));
    }

    // Progress state
    const savedProgress = localStorage.getItem('chronos_user_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Ensure streaks object has all phases if loaded from old data
        const mergedStreaks = { 
          1: 0, 2: 0, 3: 0, 4: 0, 
          ...parsed.streaks 
        };
        setUserProgress({ ...parsed, streaks: mergedStreaks });
      } catch (e) {
        console.error("Failed to parse user progress", e);
      }
    }
  }, []);

  // Timer tick
  useEffect(() => {
    let interval: number;
    if (isActive && startTime) {
      interval = window.setInterval(() => {
        const now = Date.now();
        setElapsedSeconds(Math.floor((now - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const handleToggleFast = () => {
    if (isActive) {
      // Logic for stopping fast and calculating rewards
      const hoursFasted = elapsedSeconds / 3600;
      
      const newStreaks = { ...userProgress.streaks };
      let phasesCompleted = 0;

      // Check which phases were fully completed based on minDuration
      PHASES.forEach(phase => {
        if (hoursFasted >= phase.minDuration) {
          newStreaks[phase.id] = (newStreaks[phase.id] || 0) + 1;
          phasesCompleted++;
        }
      });

      if (phasesCompleted > 0) {
        const newProgress: UserProgress = {
          ...userProgress,
          streaks: newStreaks,
          totalFasts: userProgress.totalFasts + 1
        };
        
        setUserProgress(newProgress);
        localStorage.setItem('chronos_user_progress', JSON.stringify(newProgress));
      }

      // Reset timer
      setIsActive(false);
      setStartTime(null);
      localStorage.removeItem('fastStartTime');
    } else {
      // Start
      const now = Date.now();
      setStartTime(now);
      setIsActive(true);
      localStorage.setItem('fastStartTime', now.toString());
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setStartTime(null);
    setElapsedSeconds(0);
    localStorage.removeItem('fastStartTime');
  };

  // Derived State
  const elapsedHours = elapsedSeconds / 3600;
  
  const currentPhase: FastingPhase | undefined = PHASES.find(p => {
    // Phase 1: 0 - 8 (Insulin Reset)
    if (p.id === 1) return elapsedHours < 8;
    // Phase 2: 8 - 18 (Glycogen Exhaustion)
    if (p.id === 2) return elapsedHours >= 8 && elapsedHours < 18;
    // Phase 3: 18 - 30 (Liver Detox)
    if (p.id === 3) return elapsedHours >= 18 && elapsedHours < 30;
    // Phase 4: 30+ (Deep Repair)
    if (p.id === 4) return elapsedHours >= 30;
    return false;
  }) || PHASES[0];

  const lastMilestone: Milestone | undefined = [...MILESTONES]
    .reverse()
    .find(m => elapsedHours >= m.hour);

  const nextMilestone: Milestone | undefined = MILESTONES.find(m => elapsedHours < m.hour);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pb-20">
      {/* Header / Nav */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white">C</div>
            <h1 className="text-xl font-bold tracking-tight text-white">Chronos</h1>
          </div>
          <div className="text-xs font-mono text-slate-500">
             {isActive ? 'ACTIVE SESSION' : 'IDLE'}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Top Section: Timer & Organ Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Timer Card */}
          <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col">
             <FastTimer 
                elapsedSeconds={elapsedSeconds} 
                isActive={isActive} 
                onToggle={handleToggleFast} 
                onReset={handleReset}
                currentPhase={currentPhase}
             />
             <div className="px-8 pb-8 flex-1">
               <div className="flex justify-between text-sm text-slate-400 mb-2">
                 <span>Current Phase</span>
                 <span className="text-white font-medium">{currentPhase?.name}</span>
               </div>
               <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ width: '100%', backgroundColor: currentPhase?.color }}
                  ></div>
               </div>
               <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                 {currentPhase?.description}
               </p>
             </div>
          </div>

          {/* Right Column: AI, Status Dashboard, Achievements, Internal State */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <GeminiInsight 
              currentHour={elapsedHours}
              currentPhase={currentPhase}
              lastMilestone={lastMilestone}
            />

            {/* NEW: Dedicated Status Dashboard */}
            <CurrentStateDashboard 
              currentHour={elapsedHours} 
              phase={currentPhase} 
              lastMilestone={lastMilestone} 
            />

            {/* NEW: Motivation Component */}
            <Motivation currentHour={elapsedHours} phases={PHASES} />

            <Achievements progress={userProgress} phases={PHASES} />

            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex-1">
              <div className="flex justify-between items-end mb-4">
                 <h2 className="text-2xl font-bold text-white">Internal State</h2>
                 {nextMilestone && (
                   <div className="text-right">
                     <div className="text-xs text-slate-400 uppercase tracking-wide">Next Milestone</div>
                     <div className="text-sm font-semibold text-emerald-400">
                       {nextMilestone.title} in {(nextMilestone.hour - elapsedHours).toFixed(1)}h
                     </div>
                   </div>
                 )}
              </div>
              <p className="text-slate-400 mb-6 max-w-2xl">
                Customized visualization prioritizing your Kidneys, Liver, and Triglyceride levels.
              </p>
              <OrganStatusCard currentHour={elapsedHours} phase={currentPhase} />
            </div>
          </div>

        </section>

        {/* Charts & Timeline */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Biomarkers data={CHART_DATA} currentHour={elapsedHours} />
          <Timeline milestones={MILESTONES} currentHour={elapsedHours} />
        </section>

        {/* CRITICAL MEDICAL PROTOCOLS - MOVED TO BOTTOM */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-950/30 border border-cyan-800/50 p-5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Droplet size={20} />
              <h3>Kidney Protocol</h3>
            </div>
            <ul className="text-sm text-cyan-100/80 space-y-2 list-disc pl-4">
              <li><strong className="text-white">Goal:</strong> 3 Liters fluid/48h.</li>
              <li><strong className="text-white">Action:</strong> Must add <span className="underline">Electrolytes/Salt</span> to water to prevent mineral flush.</li>
              <li>Risk: Sediment buildup.</li>
            </ul>
          </div>

          <div className="bg-rose-950/30 border border-rose-800/50 p-5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle size={20} />
              <h3>Uric Acid Protocol</h3>
            </div>
             <ul className="text-sm text-rose-100/80 space-y-2 list-disc pl-4">
              <li><strong className="text-white">Level:</strong> 7.29 mg/dL (High).</li>
              <li><strong className="text-white">STOP IF:</strong> Any joint/toe pain occurs.</li>
              <li>Risk: Gout attack from rapid weight loss.</li>
            </ul>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/50 p-5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Utensils size={20} />
              <h3>Refeeding (Strict)</h3>
            </div>
             <ul className="text-sm text-emerald-100/80 space-y-2 list-disc pl-4">
              <li><strong className="text-rose-300">BANNED:</strong> Seafood, Red Meat (Purines), Fried Food (Gallbladder).</li>
              <li><strong className="text-white">EAT:</strong> Bone Broth, Tofu, Chicken, Steamed Veggies.</li>
              <li>Portion: 50% normal size.</li>
            </ul>
          </div>
        </section>

        {/* Info Footer */}
        <section className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/10 flex gap-4 items-start">
          <Info className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-100 mb-1">Medical Context Summary</h4>
            <p className="text-sm text-blue-200/70 leading-relaxed">
              This schedule is tailored for: Grade 2 Fatty Liver, Hepatomegaly, Renal Pelvis Sediment, High Triglycerides, Hyperuricemia, and Asthma/Allergies.
              Hydration prompts are critical.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;