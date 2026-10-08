import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AssociationResponse } from '../types/api';

const AssociationEngine = () => {
  const [data, setData] = useState<AssociationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/market-basket')
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

  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Market Basket Analysis (Apriori)</h2>
      <p className="text-slate-400 mb-8 max-w-3xl">Discovering item affinities. Shows which products are frequently bought together based on transaction history (filtering by Support, Confidence, and Lift).</p>
      
      <div className="bg-surface/50 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">If customer buys... (Antecedent)</th>
                <th className="px-6 py-4">They also buy... (Consequent)</th>
                <th className="px-6 py-4 text-center">Support</th>
                <th className="px-6 py-4 text-center">Confidence</th>
                <th className="px-6 py-4 text-center">Lift</th>
              </tr>
            </thead>
            <tbody>
              {data.rules.length > 0 ? data.rules.map((rule, idx) => (
                <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div className="flex flex-wrap gap-1">
                      {rule.antecedents.map((item, i) => (
                        <span key={i} className="bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded text-xs">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex flex-wrap gap-1">
                      {rule.consequents.map((item, i) => (
                        <span key={i} className="bg-accent/20 text-accent border border-accent/30 px-2 py-1 rounded text-xs">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{(rule.support * 100).toFixed(2)}%</td>
                  <td className="px-6 py-4 text-center">{(rule.confidence * 100).toFixed(2)}%</td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-400">{rule.lift.toFixed(2)}x</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No strong association rules found with current thresholds.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssociationEngine;
