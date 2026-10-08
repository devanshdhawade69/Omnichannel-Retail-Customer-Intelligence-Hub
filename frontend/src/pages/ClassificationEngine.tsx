import { useState, useEffect } from 'react';
import axios from 'axios';
import type { ClassificationResponse } from '../types/api';

const ClassificationEngine = () => {
  const [data, setData] = useState<ClassificationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/predict-loyalty')
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

  const MetricCard = ({ label, value }: { label: string, value: number }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center">
      <div className="text-slate-400 text-sm mb-1">{label}</div>
      <div className="text-2xl font-bold text-white">{(value * 100).toFixed(1)}%</div>
    </div>
  );

  const ModelSection = ({ title, results }: { title: string, results: any }) => (
    <div className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-2xl flex-1">
      <h3 className="text-xl font-bold mb-6 text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard label="Accuracy" value={results.accuracy} />
        <MetricCard label="Precision" value={results.precision} />
        <MetricCard label="Recall" value={results.recall} />
        <MetricCard label="F1 Score" value={results.f1_score} />
      </div>
      <div>
        <h4 className="text-sm text-slate-400 mb-2">Confusion Matrix</h4>
        <div className="grid grid-cols-2 gap-2 bg-slate-900 p-4 rounded-xl">
          <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
            <div className="text-xs text-slate-500">True Negative</div>
            <div className="text-xl font-bold text-slate-300">{results.confusion_matrix[0][0]}</div>
          </div>
          <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
            <div className="text-xs text-slate-500">False Positive</div>
            <div className="text-xl font-bold text-red-400">{results.confusion_matrix[0][1]}</div>
          </div>
          <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
            <div className="text-xs text-slate-500">False Negative</div>
            <div className="text-xl font-bold text-red-400">{results.confusion_matrix[1][0]}</div>
          </div>
          <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
            <div className="text-xs text-slate-500">True Positive</div>
            <div className="text-xl font-bold text-emerald-400">{results.confusion_matrix[1][1]}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Loyalty Classifier</h2>
      <p className="text-slate-400 mb-8 max-w-3xl">Comparing two distinct classification models to predict whether a customer will return for subsequent purchases based on their spending habits and item volume.</p>
      
      <div className="flex flex-col xl:flex-row gap-8">
        <ModelSection title="Decision Tree Classifier" results={data.decision_tree} />
        <ModelSection title="Naïve Bayes Classifier" results={data.naive_bayes} />
      </div>
    </div>
  );
};

export default ClassificationEngine;
