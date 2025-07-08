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
  images?: string[];
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

export type UserRole = 'subscriber' | 'publisher' | 'admin' | 'donor';

export interface User {
  username: string;
  email: string;
  role: UserRole;
}

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'notes' | 'comments' | 'articles' | 'createArticle' | 'manageSubscriptions' | 'manageDonations' | 'manageDonorSubscriptions'>('saved');
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [noteImages, setNoteImages] = useState<string[]>([]);


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
      setCurrentUser(userData);
    }
  }, []);

  const handleLogin = (email: string, username: string) => {
    // Determine role based on email
    let role: UserRole = 'subscriber';
    
    switch (email.toLowerCase()) {
      case 'admin@test.com':
        role = 'admin';
        break;
      case 'publisher@test.com':
        role = 'publisher';
        break;
      case 'subscriber@test.com':
        role = 'subscriber';
        break;
      case 'donor@test.com':
        role = 'donor';
        break;
      default:
        // For any other email, default to subscriber
        role = 'subscriber';
        break;
    }

    const user: User = { username, email, role };
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
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
        images: noteImages,
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
        images: noteImages,
        createdAt: now,
        updatedAt: now
      };
      const updatedNotes = [...userNotes, newNote];
      setUserNotes(updatedNotes);
      localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    }

    setNoteContent('');
    setNoteImages([]);
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
    setNoteImages(existingNote?.images || []);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            setNoteImages(prev => [...prev, imageDataUrl]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setNoteImages(prev => prev.filter((_, i) => i !== index));
  };

  const LoginForm: React.FC = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginUsername, setLoginUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (loginEmail.trim() && loginUsername.trim()) {
        handleLogin(loginEmail.trim(), loginUsername.trim());
      }
    };

    const getRoleFromEmail = (email: string): string => {
      switch (email.toLowerCase()) {
        case 'admin@test.com':
          return 'Admin';
        case 'publisher@test.com':
          return 'Publisher';
        case 'subscriber@test.com':
          return 'Subscriber';
        case 'donor@test.com':
          return 'Donor';
        default:
          return 'Subscriber (default)';
      }
    };

    return (
      <div className="login-form">
        <h3>Login to Dashboard</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email address"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter display name"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />
          {loginEmail && (
            <div className="role-preview">
              <span>Role: {getRoleFromEmail(loginEmail)}</span>
            </div>
          )}
          <button type="submit">Login</button>
        </form>
        <div className="role-descriptions">
          <h4>Test Accounts:</h4>
          <ul>
            <li><strong>admin@test.com:</strong> Full access including managing donations and subscriptions</li>
            <li><strong>publisher@test.com:</strong> Create and manage articles, suggest edits</li>
            <li><strong>subscriber@test.com:</strong> Save articles, make notes, comment</li>
            <li><strong>donor@test.com:</strong> Subscriber features + manage recurring donations</li>
          </ul>
          <p><small>Any other email will default to subscriber role.</small></p>
        </div>
      </div>
    );
  };

  const SubscriptionManager: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Load subscriptions from localStorage
      const storedSubscriptions = localStorage.getItem('emailSubscriptions');
      if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
      }
      setLoading(false);
    }, []);

    const deleteSubscription = (email: string) => {
      const updatedSubscriptions = subscriptions.filter(sub => sub.email !== email);
      setSubscriptions(updatedSubscriptions);
      localStorage.setItem('emailSubscriptions', JSON.stringify(updatedSubscriptions));
    };

    if (loading) {
      return <div className="loading">Loading subscriptions...</div>;
    }

    return (
      <div className="subscription-manager">
        <h2>Manage Email Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <div className="empty-state">
            <h3>No email subscriptions yet</h3>
            <p>Users haven't subscribed to notifications yet.</p>
          </div>
        ) : (
          <div className="subscriptions-list">
            {subscriptions.map((subscription, index) => (
              <div key={index} className="subscription-item">
                <div className="subscription-info">
                  <div className="email">{subscription.email}</div>
                  <div className="categories">
                    Categories: {subscription.categories?.join(', ') || 'All'}
                  </div>
                  <div className="date">
                    Subscribed: {new Date(subscription.subscribedAt).toLocaleDateString()}
                  </div>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => deleteSubscription(subscription.email)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const DonationManager: React.FC = () => {
    const [donations, setDonations] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, count: 0 });

    useEffect(() => {
      // Load donations from localStorage (in a real app, this would be from a backend)
      const storedDonations = localStorage.getItem('donations');
      if (storedDonations) {
        const donationList = JSON.parse(storedDonations);
        setDonations(donationList);
        
        // Calculate stats
        const total = donationList.reduce((sum: number, donation: any) => sum + (donation.amount || 0), 0);
        setStats({ total, count: donationList.length });
      } else {
        // Initialize test data if not exists
        const testDonations = [
          {
            id: '1',
            amount: 25,
            message: 'Love your coffee blog articles!',
            donorName: 'John Doe',
            donorEmail: 'donor@test.com',
            isRecurring: true,
            date: new Date('2024-12-01').toISOString()
          },
          {
            id: '2',
            amount: 10,
            message: 'Great work on the design systems article!',
            donorName: 'Anonymous',
            donorEmail: 'anonymous@example.com',
            isRecurring: false,
            date: new Date('2024-12-15').toISOString()
          }
        ];
        localStorage.setItem('donations', JSON.stringify(testDonations));
      }
    }, []);

    const addTestDonation = () => {
      const testDonation = {
        id: Date.now().toString(),
        amount: Math.floor(Math.random() * 50) + 5,
        message: 'Thank you for the great content!',
        donorName: 'Anonymous',
        donorEmail: 'anonymous@example.com',
        isRecurring: Math.random() > 0.7,
        date: new Date().toISOString()
      };

      const updatedDonations = [...donations, testDonation];
      setDonations(updatedDonations);
      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      
      // Update stats
      const total = updatedDonations.reduce((sum, donation) => sum + donation.amount, 0);
      setStats({ total, count: updatedDonations.length });
    };

    return (
      <div className="donation-manager">
        <h2>Manage Donations</h2>
        
        <div className="donation-stats">
          <div className="stat-card">
            <div className="stat-value">${stats.total}</div>
            <div className="stat-label">Total Raised</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.count}</div>
            <div className="stat-label">Total Donations</div>
          </div>
        </div>

        <div className="donation-actions">
          <button className="btn btn-primary" onClick={addTestDonation}>
            Add Test Donation
          </button>
        </div>

        {donations.length === 0 ? (
          <div className="empty-state">
            <h3>No donations yet</h3>
            <p>Donations will appear here when supporters contribute.</p>
          </div>
        ) : (
          <div className="donations-list">
            {donations.map((donation) => (
              <div key={donation.id} className="donation-item">
                <div className="donation-info">
                  <div className="amount">${donation.amount}</div>
                  <div className="donor">{donation.donorName} ({donation.donorEmail})</div>
                  <div className="message">"{donation.message}"</div>
                  <div className="donation-meta">
                    <span className="date">{new Date(donation.date).toLocaleDateString()}</span>
                    {donation.isRecurring && (
                      <span className="recurring-badge">Recurring</span>
                    )}
                    {donation.stoppedAt && (
                      <span className="stopped-badge">Stopped</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const DonorSubscriptionManager: React.FC = () => {
    const [donations, setDonations] = useState<any[]>([]);
    const [isRecurring, setIsRecurring] = useState(false);

    useEffect(() => {
      // Load user's donations from localStorage
      const userEmail = currentUser?.email;
      const allDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      
      // Filter donations for current user
      const userDonations = allDonations.filter((donation: any) => 
        donation.donorEmail === userEmail
      );
      setDonations(userDonations);

      // Check if user has recurring donations
      const hasRecurring = userDonations.some((donation: any) => donation.isRecurring);
      setIsRecurring(hasRecurring);
    }, [currentUser?.email]);

    const stopRecurringDonations = () => {
      const userEmail = currentUser?.email;
      const allDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      
      // Update donations to stop recurring ones
      const updatedDonations = allDonations.map((donation: any) => {
        if (donation.donorEmail === userEmail && donation.isRecurring) {
          return { ...donation, isRecurring: false, stoppedAt: new Date().toISOString() };
        }
        return donation;
      });

      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      
      // Update local state
      const userDonations = updatedDonations.filter((donation: any) => 
        donation.donorEmail === userEmail
      );
      setDonations(userDonations);
      setIsRecurring(false);
    };

    const addTestDonation = () => {
      const newDonation = {
        id: Date.now().toString(),
        amount: Math.floor(Math.random() * 50) + 5,
        message: 'Thank you for the great content!',
        donorName: currentUser?.username || 'Anonymous',
        donorEmail: currentUser?.email,
        isRecurring: Math.random() > 0.5,
        date: new Date().toISOString()
      };

      const allDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      const updatedDonations = [...allDonations, newDonation];
      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      
      setDonations(prev => [...prev, newDonation]);
      setIsRecurring(newDonation.isRecurring || isRecurring);
    };

    const totalDonated = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);

    return (
      <div className="donor-subscription-manager">
        <h2>My Donations</h2>
        
        <div className="donor-stats">
          <div className="stat-card">
            <div className="stat-value">${totalDonated}</div>
            <div className="stat-label">Total Contributed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{donations.length}</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{isRecurring ? 'Active' : 'None'}</div>
            <div className="stat-label">Recurring Status</div>
          </div>
        </div>

        <div className="donor-actions">
          <button className="btn btn-primary" onClick={addTestDonation}>
            Make Test Donation
          </button>
          {isRecurring && (
            <button className="btn btn-danger" onClick={stopRecurringDonations}>
              Stop Recurring Donations
            </button>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="empty-state">
            <h3>No donations yet</h3>
            <p>Your donation history will appear here.</p>
          </div>
        ) : (
          <div className="donations-list">
            {donations.map((donation) => (
              <div key={donation.id} className="donation-item">
                <div className="donation-info">
                  <div className="amount">${donation.amount}</div>
                  <div className="message">"{donation.message}"</div>
                  <div className="donation-meta">
                    <span className="date">{new Date(donation.date).toLocaleDateString()}</span>
                    {donation.isRecurring && (
                      <span className="recurring-badge">Recurring</span>
                    )}
                    {donation.stoppedAt && (
                      <span className="stopped-badge">Stopped {new Date(donation.stoppedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            <span>Welcome, {currentUser?.username} ({currentUser?.email}) - {currentUser?.role}</span>
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
          {(currentUser?.role === 'publisher' || currentUser?.role === 'admin') && (
            <>
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
            </>
          )}
          {currentUser?.role === 'donor' && (
            <button 
              className={`tab-btn ${activeTab === 'manageDonorSubscriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('manageDonorSubscriptions')}
            >
              💳 My Donations
            </button>
          )}
          {currentUser?.role === 'admin' && (
            <>
              <button 
                className={`tab-btn ${activeTab === 'manageSubscriptions' ? 'active' : ''}`}
                onClick={() => setActiveTab('manageSubscriptions')}
              >
                📧 Manage Subscriptions
              </button>
              <button 
                className={`tab-btn ${activeTab === 'manageDonations' ? 'active' : ''}`}
                onClick={() => setActiveTab('manageDonations')}
              >
                ☕ Manage Donations
              </button>
            </>
          )}
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
                    <div className="note-images">
                      {note.images && note.images.length > 0 && (
                        <div className="images-grid">
                          {note.images.map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image} alt={`Note image ${index + 1}`} className="note-image" />
                              <button 
                                className="remove-image-btn"
                                onClick={() => removeImage(index)}
                                title="Remove image"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                
                {/* Image Upload Section */}
                <div className="note-images-section">
                  <div className="image-upload-area">
                    <label htmlFor="note-image-upload" className="image-upload-btn">
                      📷 Add Images
                    </label>
                    <input
                      id="note-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                  
                  {noteImages.length > 0 && (
                    <div className="uploaded-images">
                      {noteImages.map((image, index) => (
                        <div key={index} className="image-preview">
                          <img src={image} alt={`Note image ${index + 1}`} />
                          <button
                            className="remove-image-btn"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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

        {activeTab === 'createArticle' && (currentUser?.role === 'publisher' || currentUser?.role === 'admin') && (
          <div className="create-article-section">
            <ArticleEditor
              onSave={handleSaveArticle}
              onCancel={() => setActiveTab('saved')}
            />
          </div>
        )}

        {activeTab === 'articles' && (currentUser?.role === 'publisher' || currentUser?.role === 'admin') && (
          <div className="manage-articles-section">
            <ArticleManager
              onClose={() => setActiveTab('saved')}
            />
          </div>
        )}

        {activeTab === 'manageDonorSubscriptions' && currentUser?.role === 'donor' && (
          <div className="manage-donor-subscriptions-section">
            <DonorSubscriptionManager />
          </div>
        )}

        {activeTab === 'manageSubscriptions' && currentUser?.role === 'admin' && (
          <div className="manage-subscriptions-section">
            <SubscriptionManager />
          </div>
        )}

        {activeTab === 'manageDonations' && currentUser?.role === 'admin' && (
          <div className="manage-donations-section">
            <DonationManager />
          </div>
        )}

        {activeTab === 'manageDonorSubscriptions' && currentUser?.role === 'donor' && (
          <div className="manage-donor-subscriptions-section">
            <DonorSubscriptionManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
