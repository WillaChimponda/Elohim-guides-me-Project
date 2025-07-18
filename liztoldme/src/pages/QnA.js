import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Edit2, Trash2, Save } from 'react-feather';
import '../styles/QnA.css';
import { useNavigate, Link } from 'react-router-dom';

const QnA = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [editingQIdx, setEditingQIdx] = useState(null);
  const [editingQText, setEditingQText] = useState('');
  const [editingCIdx, setEditingCIdx] = useState({}); // {questionIdx: commentIdx}
  const [editingCText, setEditingCText] = useState({});
  const navigate = useNavigate();

  // User state for login detection
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(!!parsedUser.is_admin);
    }
  }, []);

  const sarahPost = {
    id: 'sarah-default',
    user: 'Sarah',
    question: 'How do I deal with anxiety during important presentations?',
    created_at: '2024-03-15',
    response: `Start by acknowledging that presentation anxiety is completely normal. Practice deep breathing exercises before your presentation, and remember that being prepared is your best defense against anxiety. Visualize success and focus on connecting with your audience rather than perfect delivery.`,
    likes: 0,
    liked: false,
    comments: []
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/qna')
      .then(res => res.json())
      .then(data => {
        const hasSarah = data.some(q => q.user === 'Sarah' && q.question.includes('anxiety'));
        // Ensure every question has comments: []
        const safeData = (hasSarah ? data : [sarahPost, ...data]).map(q => ({
          ...q,
          comments: Array.isArray(q.comments) ? q.comments : []
        }));
        setQuestions(safeData);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (question.trim() === '') return;

    await fetch('http://localhost:5001/api/qna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user.name || user.email, question })
    });

    // Re-fetch questions
    fetch('http://localhost:5001/api/qna')
      .then(res => res.json())
      .then(data => {
        // Ensure every question has comments: []
        const safeData = data.map(q => ({
          ...q,
          comments: Array.isArray(q.comments) ? q.comments : []
        }));
        setQuestions(safeData);
      });

    setQuestion('');
  };

  const handleLike = (idx) => {
    if (!user) return;
    setQuestions(questions => questions.map((q, i) =>
      i === idx ? { ...q, likes: q.liked ? q.likes - 1 : q.likes + 1, liked: !q.liked } : q
    ));
  };

  const handleCommentInput = (idx, value) => {
    setCommentInputs(inputs => ({ ...inputs, [idx]: value }));
  };

  const handleAddComment = (idx) => {
    if (!user) return;
    const comment = commentInputs[idx]?.trim();
    if (!comment) return;
    setQuestions(questions => questions.map((q, i) =>
      i === idx ? { ...q, comments: [...q.comments, { text: comment, user: user.name || user.email || 'You' }] } : q
    ));
    setCommentInputs(inputs => ({ ...inputs, [idx]: '' }));
  };

  // --- Edit/Delete for Questions ---
  const startEditQuestion = (idx, text) => {
    if (!user) return;
    setEditingQIdx(idx);
    setEditingQText(text);
  };
  const saveEditQuestion = async (idx) => {
    if (!user) return;
    const q = questions[idx];
    const updatedQuestion = editingQText;
    // Call backend to update
    await fetch(`http://localhost:5001/api/qna/${q.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user.name || user.email, question: updatedQuestion })
    });
    // Re-fetch questions
    fetch('http://localhost:5001/api/qna')
      .then(res => res.json())
      .then(data => {
        // Ensure every question has comments: []
        const safeData = data.map(q => ({
          ...q,
          comments: Array.isArray(q.comments) ? q.comments : [],
          response: q.id === q.id ? updatedQuestion : q.response
        }));
        setQuestions(safeData);
      });
    setEditingQIdx(null);
    setEditingQText('');
  };
  const deleteQuestion = async (idx, id) => {
    if (!user) return;
    // Call backend to delete
    await fetch(`http://localhost:5001/api/qna/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user.name || user.email })
    });
    // Re-fetch questions
    fetch('http://localhost:5001/api/qna')
      .then(res => res.json())
      .then(data => {
        // Ensure every question has comments: []
        const safeData = data.map(q => ({
          ...q,
          comments: Array.isArray(q.comments) ? q.comments : [],
          response: q.id === id ? '' : q.response
        }));
        setQuestions(safeData);
      });
  };

  // --- Edit/Delete for Comments ---
  const startEditComment = (qIdx, cIdx, text) => {
    if (!user) return;
    setEditingCIdx({ qIdx, cIdx });
    setEditingCText({ text });
  };
  const saveEditComment = (qIdx, cIdx) => {
    setQuestions(questions => questions.map((q, i) => {
      if (i !== qIdx) return q;
      return {
        ...q,
        comments: q.comments.map((c, j) =>
          j === cIdx ? { ...c, text: editingCText.text } : c
        )
      };
    }));
    setEditingCIdx({});
    setEditingCText({});
  };
  const deleteComment = (qIdx, cIdx) => {
    if (!user) return;
    setQuestions(questions => questions.map((q, i) => {
      if (i !== qIdx) return q;
      return {
        ...q,
        comments: q.comments.filter((_, j) => j !== cIdx)
      };
    }));
  };

  return (
    <div className="qna-main-layout">
      <aside className="qna-sidebar">
        {user && (
          <div className="qna-user-box">
            <span className="qna-welcome">Welcome, {user.name || user.email}!</span>
            <button
              className="qna-logout-btn"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        )}
        {/* You can add more sidebar content here, like navigation or topics */}
      </aside>
      <div className="qna-bg">
        <div className="qna-header">Ask Your Question</div>
        <form className="qna-form-card" onSubmit={handleSubmit}>
          <textarea
            className="qna-textarea"
            placeholder={user ? "What's on your mind?" : "Sign in to ask a question"}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={!user}
          />
          <button className="qna-submit-btn" type="submit" disabled={!user}>
            <MessageCircle size={18} style={{ marginRight: 8 }} /> Submit Question
          </button>
          {!user && (
            <div style={{ color: '#a86c6c', marginTop: 12 }}>
              Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to post or interact.
            </div>
          )}
        </form>
        {questions.map((q, idx) => (
          <div className="qna-card" key={idx}>
            <div className="qna-card-header">
              <div className="qna-avatar">{q.user[0]}</div>
              <div>
                <span className="qna-user">{q.user}</span>
                <span className="qna-date">{q.date}</span>
              </div>
              {user && (q.user === user.name || q.user === user.email) && (
                <div style={{ marginLeft: 16, display: 'flex', gap: 8 }}>
                  {editingQIdx === idx ? (
                    <>
                      <button className="qna-action-btn" type="button" onClick={() => saveEditQuestion(idx)} title="Save"><Save size={16} /></button>
                    </>
                  ) : (
                    <>
                      <button className="qna-action-btn" type="button" onClick={() => startEditQuestion(idx, q.question)} title="Edit"><Edit2 size={16} /></button>
                      <button className="qna-action-btn" type="button" onClick={() => deleteQuestion(idx, q.id)} title="Delete"><Trash2 size={16} /></button>
                    </>
                  )}
                </div>
              )}
            </div>
            {editingQIdx === idx ? (
              <textarea
                className="qna-textarea"
                style={{ marginLeft: 50, marginBottom: 10 }}
                value={editingQText}
                onChange={e => setEditingQText(e.target.value)}
              />
            ) : (
              <div className="qna-question">{q.question}</div>
            )}
            <div className="qna-response-block">
              <div className="qna-response-title">
                <MessageCircle size={16} style={{ marginRight: 6 }} /> Liz's Response
              </div>
              {isAdmin ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <textarea
                    value={editingQIdx === idx ? editingQText : q.response || ''}
                    onChange={e => {
                      if (editingQIdx === idx) setEditingQText(e.target.value);
                    }}
                    placeholder="Type your response as Liz..."
                    style={{ minHeight: 60, borderRadius: 6, border: '1px solid #ccc', padding: 8, fontSize: '1rem' }}
                    disabled={editingQIdx !== idx}
                  />
                  {editingQIdx === idx ? (
                    <button
                      className="qna-action-btn"
                      style={{ alignSelf: 'flex-end', background: '#a86c6c', color: '#fff', borderRadius: 6, padding: '6px 18px', border: 'none', fontWeight: 500 }}
                      onClick={async () => {
                        // Save Liz's response
                        await fetch(`http://localhost:5001/api/qna/${q.id}/response`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ user: user.name || user.email, response: editingQText, is_admin: isAdmin })
                        });
                        fetch('http://localhost:5001/api/qna')
                          .then(res => res.json())
                          .then(data => {
                            const safeData = data.map(q => ({
                              ...q,
                              comments: Array.isArray(q.comments) ? q.comments : []
                            }));
                            setQuestions(safeData);
                          });
                        setEditingQIdx(null);
                        setEditingQText('');
                      }}
                    >Save Response</button>
                  ) : (
                    <button
                      className="qna-action-btn"
                      style={{ alignSelf: 'flex-end', background: '#e0e0e0', color: '#a86c6c', borderRadius: 6, padding: '6px 18px', border: 'none', fontWeight: 500 }}
                      onClick={() => {
                        setEditingQIdx(idx);
                        setEditingQText(q.response || '');
                      }}
                    >Edit Response</button>
                  )}
                </div>
              ) : (
                <div className="qna-response">{q.response || <span style={{ color: '#bfa6a6' }}>No response yet.</span>}</div>
              )}
            </div>
            <div className="qna-actions">
              <button className="qna-action-btn" onClick={() => handleLike(idx)} type="button" disabled={!user}>
                <Heart size={18} color={q.liked ? '#e25555' : '#a86c6c'} fill={q.liked ? '#e25555' : 'none'} style={{ marginRight: 4 }} />
                Like ({q.likes})
              </button>
              <button className="qna-action-btn" type="button" onClick={() => user && document.getElementById(`comment-input-${idx}`).focus()} disabled={!user}>
                💬 Comment
              </button>
            </div>
            <div className="qna-comments" style={{ marginLeft: 50, marginTop: 10 }}>
              {Array.isArray(q.comments) && q.comments.length > 0 && (
                <ul style={{ paddingLeft: 0, marginBottom: 8 }}>
                  {q.comments.map((c, cIdx) => (
                    <li key={cIdx} style={{ listStyle: 'none', color: '#555', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 500, color: '#a86c6c' }}>{c.user}:</span> {editingCIdx.qIdx === idx && editingCIdx.cIdx === cIdx ? (
                        <>
                          <input
                            value={editingCText.text}
                            onChange={e => setEditingCText({ text: e.target.value })}
                            style={{ fontSize: '1rem', padding: '2px 6px', borderRadius: 4, border: '1px solid #ccc' }}
                          />
                          <button className="qna-action-btn" type="button" onClick={() => saveEditComment(idx, cIdx)} title="Save"><Save size={14} /></button>
                        </>
                      ) : (
                        <>
                          {c.text}
                          {user && (
                            <>
                              <button className="qna-action-btn" type="button" onClick={() => startEditComment(idx, cIdx, c.text)} title="Edit"><Edit2 size={14} /></button>
                              <button className="qna-action-btn" type="button" onClick={() => deleteComment(idx, cIdx)} title="Delete"><Trash2 size={14} /></button>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  id={`comment-input-${idx}`}
                  className="qna-textarea"
                  style={{ minHeight: 36, marginBottom: 0, flex: 1, fontSize: '1rem' }}
                  placeholder={user ? "Add a comment..." : "Sign in to comment"}
                  value={commentInputs[idx] || ''}
                  onChange={e => handleCommentInput(idx, e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddComment(idx); } }}
                  disabled={!user}
                />
                <button
                  className="qna-submit-btn"
                  style={{ padding: '0 16px', minWidth: 0, fontSize: '1rem' }}
                  type="button"
                  onClick={() => handleAddComment(idx)}
                  disabled={!user}
                >Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnA; 