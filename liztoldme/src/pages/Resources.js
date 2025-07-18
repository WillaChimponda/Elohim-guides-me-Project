import React, { useState } from 'react';
import '../styles/App.css';
import '../styles/Home.css'; 

const categories = [
  'Mentorship',
  'Spiritual Growth',
  'Career Development',
  'Mental Health',
  'Relationships',
  'Personal Development',
];

const resources = [
  {
    id: 1,
    title: 'Women of Faith Mentorship Network',
    description: 'Connect with experienced Christian women leaders for guidance in faith and career.',
    category: 'Mentorship',
    type: 'Mentorship',
    url: '',
    featured: true,
    icon: '👩‍🏫',
  },
  {
    id: 2,
    title: 'Joyce Meyer Ministries',
    description: 'Practical teachings for everyday life from a woman\'s perspective.',
    category: 'Spiritual Growth',
    type: 'Website',
    url: 'https://joycemeyer.org',
    featured: true,
    icon: '🌐',
  },
  {
    id: 3,
    title: 'Lean In',
    description: 'Supporting women achieving their ambitions through community and education.',
    category: 'Career Development',
    type: 'Website',
    url: 'https://leanin.org',
    featured: true,
    icon: '🌐',
  },
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources =
    selectedCategory === 'All'
      ? resources
      : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="resources-container" style={{ background: '#f7f7f9', minHeight: '100vh', paddingBottom: 40 }}>
      <h1 style={{textAlign: 'center', marginTop: 32, fontWeight: 700, fontSize: '2.5rem', color: '#7d6a6a'}}>
        Helpful <span style={{color: '#2d2d2d'}}>Resources & Tools</span>
      </h1>
      <p style={{textAlign: 'center', color: '#555', marginBottom: 40}}>
        Discover curated resources, mentorship programs, and communities to support your growth journey.
      </p>
      <div className="resource-categories">
        <button
          className={selectedCategory === 'All' ? 'active' : ''}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <h2 style={{margin: '40px 0 24px 0', fontWeight: 700, fontSize: '1.5rem', color: '#222'}}>
        <span style={{background: '#dbeafe', color: '#222', borderRadius: 4, padding: '0 8px'}}>Featured</span> Resources
      </h2>
      <div className="resource-list">
        {filteredResources.map(resource => (
          <div className="resource-card" key={resource.id}>
            <div className="resource-card-header">
              <span className="resource-icon">{resource.icon}</span>
              <span className="resource-type-badge">{resource.type}</span>
              <span className="resource-category-badge">{resource.category}</span>
              {resource.featured && <span className="resource-featured">★</span>}
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a className="resource-link" href={resource.url} target="_blank" rel="noopener noreferrer">
              Visit Resource <span style={{fontSize: '1.1em'}}>&#8599;</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources; 