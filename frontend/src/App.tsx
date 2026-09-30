import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RegressionEngine from './pages/RegressionEngine';
import ClusteringEngine from './pages/ClusteringEngine';
import ClassificationEngine from './pages/ClassificationEngine';
import AssociationEngine from './pages/AssociationEngine';

const Overview = () => (
  <div className="p-8 flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in-95 duration-500">
    <h2 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Omnichannel Retail & Customer Intelligence Hub</h2>
    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
      Welcome to your central data mining dashboard. Select an engine from the sidebar to analyze regression, segmentation, classification, and association rules based on your e-commerce dataset.
    </p>
  </div>
);

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-slate-100 font-sans selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none"></div>
        
        <div className="relative z-10 min-h-full">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/regression" element={<RegressionEngine />} />
            <Route path="/clustering" element={<ClusteringEngine />} />
            <Route path="/classification" element={<ClassificationEngine />} />
            <Route path="/association" element={<AssociationEngine />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
