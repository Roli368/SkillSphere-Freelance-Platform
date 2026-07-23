import React, { useState } from 'react';
import './Search.css';

const AdvancedSearch = () => {
  const [activeTab, setActiveTab] = useState('gigs');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [minRating, setMinRating] = useState('');
  
  const handleSearch = () => {
    setLoading(true);
    // Simulate API fetch to /api/search/gigs or /api/search/freelancers with filters
    setTimeout(() => {
      if (activeTab === 'gigs') {
        setResults([
          { _id: '1', title: 'React Expert for MVP', category: 'Web Development', budget: 2000, client: { fullName: 'Startup Hub' } },
          { _id: '2', title: 'Need 3D Logo', category: 'Design', budget: 500, client: { fullName: 'Creative Agency' } }
        ]);
      } else {
        setResults([
          { _id: '1', user: { fullName: 'Jane Doe', isVerified: true }, rating: 4.9, hourlyRate: 45, skills: [{name: 'React'}, {name: 'Node'}] },
          { _id: '2', user: { fullName: 'Mark Smith', isVerified: false }, rating: 4.5, hourlyRate: 30, skills: [{name: 'Python'}, {name: 'Django'}] }
        ]);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="advanced-search-container">
      <header className="search-header">
        <h1>Advanced Search Engine</h1>
        <p>Find the perfect talent or the perfect gig.</p>
      </header>

      <div className="search-layout">
        <aside className="search-sidebar">
          <h3>Filters</h3>
          <div className="tab-switcher">
            <button className={`tab-btn ${activeTab === 'gigs' ? 'active' : ''}`} onClick={() => setActiveTab('gigs')}>Gigs</button>
            <button className={`tab-btn ${activeTab === 'freelancers' ? 'active' : ''}`} onClick={() => setActiveTab('freelancers')}>Freelancers</button>
          </div>

          <div className="filter-group">
            <label>Keyword / Skill</label>
            <input type="text" placeholder="e.g. React, Design..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>

          {activeTab === 'gigs' && (
            <div className="filter-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
          )}

          <div className="filter-group">
            <label>{activeTab === 'gigs' ? 'Budget Range ($)' : 'Hourly Rate ($)'}</label>
            <div className="range-inputs">
              <input type="number" placeholder="Min" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} />
              <span>-</span>
              <input type="number" placeholder="Max" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
            </div>
          </div>

          {activeTab === 'freelancers' && (
            <div className="filter-group">
              <label>Minimum Rating</label>
              <input type="number" min="1" max="5" step="0.5" placeholder="e.g. 4.5" value={minRating} onChange={(e) => setMinRating(e.target.value)} />
            </div>
          )}

          <button className="btn-search-apply" onClick={handleSearch}>Apply Filters</button>
        </aside>

        <main className="search-results">
          {loading ? (
            <div className="loading-state">Searching database...</div>
          ) : results.length > 0 ? (
            <div className="results-grid">
              {activeTab === 'gigs' ? (
                results.map(gig => (
                  <div key={gig._id} className="result-card gig-card">
                    <h4>{gig.title}</h4>
                    <p className="meta">{gig.category} • Client: {gig.client.fullName}</p>
                    <p className="price">Budget: ${gig.budget}</p>
                  </div>
                ))
              ) : (
                results.map(f => (
                  <div key={f._id} className="result-card freelancer-card">
                    <div className="flex-header">
                      <h4>{f.user.fullName}</h4>
                      {f.user.isVerified && <span className="verified-badge">✓ Verified</span>}
                    </div>
                    <p className="meta">⭐ {f.rating} • ${f.hourlyRate}/hr</p>
                    <div className="skills-tags">
                      {f.skills.map((s, i) => <span key={i} className="skill-tag">{s.name}</span>)}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="empty-state">No results found. Try adjusting your filters.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdvancedSearch;
