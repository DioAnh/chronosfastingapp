import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { FastingPhase, Milestone } from '../types';
import { MEDICAL_PROFILE_CONTEXT } from '../constants';

interface GeminiInsightProps {
  currentHour: number;
  currentPhase: FastingPhase | undefined;
  lastMilestone: Milestone | undefined;
}

export const GeminiInsight: React.FC<GeminiInsightProps> = ({ currentHour, currentPhase, lastMilestone }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (!process.env.API_KEY) {
      setInsight("API Key not found in environment variables. Please configure the app correctly.");
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Strict medical prompt injection
      const prompt = `
        ACT AS A SPECIALIZED MEDICAL FASTING COACH.
        
        ${MEDICAL_PROFILE_CONTEXT}

        CURRENT STATUS:
        - Elapsed Time: ${currentHour.toFixed(1)} hours.
        - Phase: ${currentPhase?.name}.
        - Last Milestone: ${lastMilestone?.title} (${lastMilestone?.benefit}).

        TASK:
        Give a concise, scientifically accurate, and medically safe insight for this user right now.
        1. Mention specific internal organ states (Liver/Kidneys).
        2. IF hydration is relevant now, remind them to add ELECTROLYTES.
        3. IF refeeding is near (>40h), remind them of the BANNED foods (Seafood/Red Meat).
        
        Keep it under 3 sentences. Be motivating but strictly safe.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setInsight(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      setInsight("Unable to connect to your AI coach right now. Remember: Drink 3L water + Electrolytes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-amber-300 w-5 h-5" />
          AI Medical Coach
        </h3>
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border border-white/10"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Get Insight'}
        </button>
      </div>

      <div className="relative z-10 min-h-[80px] flex items-center">
        {insight ? (
          <p className="text-slate-100 leading-relaxed animate-in fade-in duration-500 font-medium">
            "{insight}"
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-slate-300 text-sm italic">
              Click 'Get Insight' for real-time advice tailored to your Renal Sediment, Uric Acid, and Fatty Liver profile.
            </p>
          </div>
        )}
      </div>
      
      {/* Permanent Medical Safety Note in AI Card */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2">
         <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
         <span className="text-[10px] text-amber-200/80 leading-tight">
           Remember: Stop immediately if you feel joint pain (Gout risk). Keep hydration more 3L total.
         </span>
      </div>
    </div>
  );
};