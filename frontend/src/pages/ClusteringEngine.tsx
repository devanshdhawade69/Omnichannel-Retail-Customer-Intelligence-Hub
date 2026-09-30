import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { ClusteringResponse } from '../types/api';

const ClusteringEngine = () => {
  const [data, setData] = useState<ClusteringResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/segment-customers')
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
  if (!data) return <div className="p-8 text-red-400">Failed to load data.</div>;

  const clusterColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Customer Segments (K-Means)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {data.summary.map((cluster, i) => (
          <div key={i} className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-2xl transition-transform hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: clusterColors[i % clusterColors.length] }}></span>
              Cluster {i + 1}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-slate-400">Recency</span> <span className="font-bold">{cluster.recency.toFixed(1)} days</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Frequency</span> <span className="font-bold">{cluster.frequency.toFixed(1)} orders</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Monetary</span> <span className="font-bold">${cluster.monetary.toFixed(2)}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-2xl h-[500px]">
        <h3 className="text-xl font-semibold mb-6 text-slate-200">Cluster Distribution (Recency vs Monetary)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis type="number" dataKey="recency" name="Recency (Days)" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <YAxis type="number" dataKey="monetary" name="Monetary ($)" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <ZAxis type="number" dataKey="frequency" range={[50, 400]} name="Frequency" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
            {data.summary.map((cluster, i) => (
              <Scatter key={i} name={`Cluster ${i+1}`} data={[cluster]} fill={clusterColors[i % clusterColors.length]} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClusteringEngine;
