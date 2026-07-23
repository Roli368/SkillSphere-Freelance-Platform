import React, { useState, useEffect } from 'react';
import './Admin.css'; // Reusing some base styles

const AIGigRecommendations = ({ gigSkills }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from Python AI service /api/match
    setTimeout(() => {
      setRecommendations([
        { id: 'f1', name: 'Alex Johnson', role: 'Senior React Developer', similarityScore: 0.95, rating: 4.9, avatar: '👨‍💻' },
        { id: 'f2', name: 'Sarah Miller', role: 'Full Stack Engineer', similarityScore: 0.88, rating: 4.7, avatar: '👩‍💻' },
        { id: 'f3', name: 'David Chen', role: 'UI/UX Designer & Dev', similarityScore: 0.76, rating: 4.5, avatar: '🧑‍🎨' }
      ]);
      setLoading(false);
    }, 1200);
  }, [gigSkills]);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 mt-6 text-center">
        <p className="text-indigo-600 font-medium animate-pulse">🤖 AI is analyzing skills and matching top freelancers...</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 mt-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✨</span>
        <h3 className="text-xl font-bold text-slate-900">AI Powered Matches</h3>
      </div>
      <p className="text-slate-600 text-sm mb-6">
        Based on your gig requirements, our HuggingFace AI model recommends these top freelancers based on skill semantic similarity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((freelancer, idx) => (
          <div key={freelancer.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
            {idx === 0 && <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg">Top Match</div>}
            
            <div className="text-4xl mb-3">{freelancer.avatar}</div>
            <h4 className="font-bold text-slate-900 text-lg">{freelancer.name}</h4>
            <p className="text-indigo-600 font-medium text-sm mb-2">{freelancer.role}</p>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase font-semibold">Match Score</span>
                <span className="text-emerald-500 font-bold">{(freelancer.similarityScore * 100).toFixed(0)}%</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-slate-500 uppercase font-semibold">Rating</span>
                <span className="text-slate-800 font-bold">⭐ {freelancer.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGigRecommendations;
