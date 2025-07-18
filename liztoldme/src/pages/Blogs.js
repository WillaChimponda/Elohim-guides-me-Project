import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

const categories = [
  'Faith',
  'Success',
  'Healing',
  'Hope',
  'Friendships',
  'Love',
  'Relationships',
  'Miracles',
];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    image: '',
    quote: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  // User state for login detection
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    // Fetch blogs from backend
    fetch('http://localhost:5001/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const filteredPosts = Array.isArray(blogs)
    ? (selectedCategory === 'All'
        ? blogs
        : blogs.filter(post => post.category === selectedCategory))
    : [];

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form, user })
      });
      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
        setForm({ title: '', category: categories[0], image: '', quote: '', content: '' });
      } else {
        alert('Failed to add blog post');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="blogs-container">
      <h1 style={{textAlign: 'center', marginTop: 32, fontWeight: 700, fontSize: '2.5rem', color: '#7d6a6a'}}>
        Inspiring <span style={{color: '#2d2d2d'}}>Stories & Wisdom</span>
      </h1>
      <p style={{textAlign: 'center', color: '#555', marginBottom: 40}}>
        Explore articles that speak to your heart and soul, covering every aspect of a woman's journey.
      </p>
      {!user && (
        <div style={{ color: '#a86c6c', marginBottom: 16 }}>
          Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to post or interact.
        </div>
      )}
      {user && user.is_admin && (
        <form className="add-blog-form" onSubmit={handleAddBlog} style={{ marginBottom: 32 }}>
          <h3>Add New Blog Post</h3>
          <div className="input-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleInputChange} required>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Quote</label>
            <input name="quote" value={form.quote} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Content</label>
            <textarea name="content" value={form.content} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="login-button" disabled={loading}>{loading ? 'Adding...' : 'Add Blog'}</button>
        </form>
      )}
      <div className="blog-categories">
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
      <div className="blog-list">
        {Array.isArray(filteredPosts) && filteredPosts.length === 0 ? (
          <p>No posts in this category yet.</p>
        ) : (
          Array.isArray(filteredPosts) && filteredPosts.map(post => (
            <div className="blog-card" key={post.id}>
              <span className="category-badge">{post.category}</span>
              {post.image && <img src={post.image} alt={post.title} className="blog-image" />}
              <h3>{post.title}</h3>
              <blockquote className="blog-quote">{post.quote}</blockquote>
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs; 