import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RegressionResponse } from '../types/api';

const RegressionEngine = () => {
  const [data, setData] = useState<RegressionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/predict-revenue')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 flex justify-center h-full items-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div></div>;
  if (!data) return <div className="p-8 text-red-400">Failed to load data or dataset is empty. Ensure backend is running and DB is populated.</div>;

  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Revenue Predictor (Regression)</h2>
      
      <div className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-2xl mb-8 flex items-center justify-between transition-transform hover:scale-[1.01]">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-300">Multiple Linear Regression Model Performance</h3>
          <p className="text-slate-400 text-sm">Explains the variance in historical total revenue based on time and item quantity.</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-accent drop-shadow-md">{(data.r2_score * 100).toFixed(2)}%</div>
          <div className="text-slate-400 uppercase tracking-widest text-xs font-bold mt-1">R² Score</div>
        </div>
      </div>

      <div className="bg-surface/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-2xl h-[500px]">
        <h3 className="text-xl font-semibold mb-6 text-slate-200">Actual vs Predicted Revenue (Test Set)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.predictions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 8 }} name="Actual Revenue" />
            <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} dot={false} strokeDasharray="5 5" name="Predicted Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegressionEngine;
