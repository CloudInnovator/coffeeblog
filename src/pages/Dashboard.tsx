import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor';
import ArticleManager from '../components/ArticleManager';
import { ArticleData } from '../components/ArticleEditor';
import './Dashboard.css';

export interface SavedArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  savedAt: string;
}

export interface UserNote {
  id: string;
  articleId: string;
  articleTitle: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserComment {
  id: string;
  articleId: string;
  articleTitle: string;
  content: string;
  date: string;
  isAnonymous: boolean;
  username?: string;
}

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'notes' | 'comments' | 'articles' | 'createArticle'>('saved');
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    const notes = localStorage.getItem('userNotes');
    const comments = localStorage.getItem('userComments');
    const user = localStorage.getItem('currentUser');
    
    if (saved) setSavedArticles(JSON.parse(saved));
    if (notes) setUserNotes(JSON.parse(notes));
    if (comments) setUserComments(JSON.parse(comments));
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(userData.username);
    }
  }, []);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('currentUser', JSON.stringify({ username: user }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('currentUser');
  };

  // Handle saving new articles
  const handleSaveArticle = (article: ArticleData) => {
    const existingArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
    const newArticle = {
      ...article,
      id: article.id || Date.now().toString(),
      date: new Date().toISOString(),
      saved: true
    };
    
    existingArticles.push(newArticle);
    localStorage.setItem('userArticles', JSON.stringify(existingArticles));
    
    // Show success message and switch to articles tab
    setActiveTab('articles');
  };

  const removeArticle = (articleId: string) => {
    const updated = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
    
    // Also remove associated notes
    const updatedNotes = userNotes.filter(note => note.articleId !== articleId);
    setUserNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
  };

  const saveNote = (articleId: string) => {
    if (!noteContent.trim()) return;

    const article = savedArticles.find(a => a.id === articleId);
    if (!article) return;

    const existingNoteIndex = userNotes.findIndex(note => note.articleId === articleId);
    const now = new Date().toISOString();

    if (existingNoteIndex >= 0) {
      // Update existing note
      const updatedNotes = [...userNotes];
      updatedNotes[existingNoteIndex] = {
        ...updatedNotes[existingNoteIndex],
        content: noteContent,
        updatedAt: now
      };
      setUserNotes(updatedNotes);
      localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    } else {
      // Create new note
      const newNote: UserNote = {
        id: Date.now().toString(),
        articleId,
        articleTitle: article.title,
        content: noteContent,
        createdAt: now,
        updatedAt: now
      };
      const updatedNotes = [...userNotes, newNote];
      setUserNotes(updatedNotes);
      localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    }

    setNoteContent('');
    setSelectedArticle(null);
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = userNotes.filter(note => note.id !== noteId);
    setUserNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
  };

  const getArticleNote = (articleId: string) => {
    return userNotes.find(note => note.articleId === articleId);
  };

  const openNoteEditor = (articleId: string) => {
    const existingNote = getArticleNote(articleId);
    setSelectedArticle(articleId);
    setNoteContent(existingNote ? existingNote.content : '');
  };

  const LoginForm: React.FC = () => {
    const [loginUsername, setLoginUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (loginUsername.trim()) {
        handleLogin(loginUsername.trim());
      }
    };

    return (
      <div className="login-form">
        <h3>Login to Dashboard</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Enter any username to access your dashboard</p>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            📖 Saved Articles ({savedArticles.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            📝 My Notes ({userNotes.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            💬 My Comments ({userComments.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'createArticle' ? 'active' : ''}`}
            onClick={() => setActiveTab('createArticle')}
          >
            ✍️ Create Article
          </button>
          <button 
            className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            📚 Manage Articles
          </button>
        </div>

        {activeTab === 'saved' && (
          <div className="saved-articles-section">
            {savedArticles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No saved articles yet</h3>
                <p>Start saving articles you want to read later!</p>
                <Link to="/blog" className="btn btn-primary">Browse Articles</Link>
              </div>
            ) : (
              <div className="articles-grid">
                {savedArticles.map(article => {
                  const note = getArticleNote(article.id);
                  return (
                    <div key={article.id} className="saved-article-card">
                      <div className="article-header">
                        <div className="category-badge">{article.category}</div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeArticle(article.id)}
                          title="Remove from saved"
                        >
                          ×
                        </button>
                      </div>
                      <h3 className="article-title">
                        <Link to={article.url}>{article.title}</Link>
                      </h3>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-footer">
                        <span className="saved-date">
                          Saved {new Date(article.savedAt).toLocaleDateString()}
                        </span>
                        <div className="article-actions">
                          {note ? (
                            <button 
                              className="note-btn has-note"
                              onClick={() => openNoteEditor(article.id)}
                            >
                              📝 Edit Note
                            </button>
                          ) : (
                            <button 
                              className="note-btn"
                              onClick={() => openNoteEditor(article.id)}
                            >
                              📝 Add Note
                            </button>
                          )}
                          <Link to={article.url} className="read-btn">
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="notes-section">
            {userNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No notes yet</h3>
                <p>Add private notes to your saved articles!</p>
                <Link to="/blog" className="btn btn-primary">Browse Articles</Link>
              </div>
            ) : (
              <div className="notes-grid">
                {userNotes.map(note => (
                  <div key={note.id} className="note-card">
                    <div className="note-header">
                      <div className="note-article-info">
                        <Link to={`/blog/${note.articleId}`} className="note-article-title">
                          {note.articleTitle}
                        </Link>
                      </div>
                      <button 
                        className="delete-note-btn"
                        onClick={() => deleteNote(note.id)}
                        title="Delete note"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="note-content">{note.content}</div>
                    <div className="note-meta">
                      <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                      {note.updatedAt !== note.createdAt && (
                        <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="comments-section">
            {userComments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No comments yet</h3>
                <p>Start commenting on articles!</p>
                <Link to="/blog" className="btn btn-primary">Browse Articles</Link>
              </div>
            ) : (
              <div className="comments-grid">
                {userComments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <h4>{comment.articleTitle}</h4>
                    <div className="comment-content">{comment.content}</div>
                    <div className="comment-meta">
                      <span className="date">{comment.date}</span>
                      <span className="comment-type">
                        {comment.isAnonymous ? 'Anonymous' : `As ${comment.username}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Note Editor Modal */}
        {selectedArticle && (
          <div className="note-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="note-modal" onClick={e => e.stopPropagation()}>
              <div className="note-modal-header">
                <h3>Add/Edit Private Note</h3>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedArticle(null)}
                >
                  ×
                </button>
              </div>
              <div className="note-modal-body">
                <div className="article-info">
                  {savedArticles.find(a => a.id === selectedArticle)?.title}
                </div>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your private note here... (only you can see this)"
                  className="note-textarea"
                  rows={6}
                />
              </div>
              <div className="note-modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedArticle(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => saveNote(selectedArticle)}
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'createArticle' && (
          <div className="create-article-section">
            <ArticleEditor
              onSave={handleSaveArticle}
              onCancel={() => setActiveTab('saved')}
            />
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="manage-articles-section">
            <ArticleManager
              onClose={() => setActiveTab('saved')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
