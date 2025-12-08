import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface BiomarkersProps {
  data: ChartDataPoint[];
  currentHour: number;
}

export const Biomarkers: React.FC<BiomarkersProps> = ({ data, currentHour }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-pink-500 rounded-full"></span>
        Metabolic Markers
      </h3>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorKetones" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInsulin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAutophagy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="hour" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickFormatter={(val) => `${val}h`}
            />
            <YAxis stroke="#94a3b8" fontSize={12} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend iconType="circle" />
            
            <Area 
              type="monotone" 
              dataKey="insulin" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorInsulin)" 
              name="Insulin"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="ketones" 
              stroke="#d946ef" 
              fillOpacity={1} 
              fill="url(#colorKetones)" 
              name="Ketones"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="autophagy" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorAutophagy)" 
              name="Autophagy"
              strokeWidth={2}
            />
            {/* Current Position Line */}
            {currentHour > 0 && (
                 <rect x={(currentHour / 48) * 100 + "%"} width="2" height="100%" fill="white" fillOpacity="0.5" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
