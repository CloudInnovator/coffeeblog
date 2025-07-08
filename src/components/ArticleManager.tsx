import React, { useState, useEffect } from 'react';
import ArticleEditor from './ArticleEditor';
import { ArticleData } from './ArticleEditor';
import './ArticleManager.css';

interface ArticleManagerProps {
  onClose: () => void;
}

const ArticleManager: React.FC<ArticleManagerProps> = ({ onClose }) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [editingArticle, setEditingArticle] = useState<ArticleData | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load articles from localStorage
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
    setArticles(savedArticles);
  }, []);

  // Save articles to localStorage
  const saveArticlesToStorage = (updatedArticles: ArticleData[]) => {
    localStorage.setItem('userArticles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  // Toggle publish status
  const togglePublishStatus = (articleId: string) => {
    const updatedArticles = articles.map(article => 
      article.id === articleId 
        ? { ...article, published: !article.published }
        : article
    );
    saveArticlesToStorage(updatedArticles);
  };

  // Delete article
  const deleteArticle = (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      const updatedArticles = articles.filter(article => article.id !== articleId);
      saveArticlesToStorage(updatedArticles);
    }
  };

  // Start editing
  const startEditing = (article: ArticleData) => {
    setEditingArticle(article);
  };

  // Save edited article
  const saveEditedArticle = (updatedArticle: ArticleData) => {
    const updatedArticles = articles.map(article =>
      article.id === updatedArticle.id
        ? { 
            ...updatedArticle,
            date: article.date // Keep original date
          }
        : article
    );
    saveArticlesToStorage(updatedArticles);
    setEditingArticle(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingArticle(null);
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && article.published) ||
                         (filter === 'draft' && !article.published);
    
    const matchesSearch = searchTerm === '' ||
                         article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  if (editingArticle) {
    return (
      <div className="article-manager editing-mode">
        <ArticleEditor
          onSave={saveEditedArticle}
          onCancel={cancelEditing}
          initialData={editingArticle}
        />
      </div>
    );
  }

  return (
    <div className="article-manager">
      <div className="manager-header">
        <h2>📚 Manage Articles</h2>
        <button className="close-btn" onClick={onClose}>❌ Close</button>
      </div>

      <div className="manager-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            📄 All ({articles.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
            onClick={() => setFilter('published')}
          >
            🌐 Published ({articles.filter(a => a.published).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            📝 Drafts ({articles.filter(a => !a.published).length})
          </button>
        </div>

        <div className="search-controls">
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="articles-list">
        {filteredArticles.length === 0 ? (
          <div className="no-articles">
            <p>📭 No articles found.</p>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')} className="reset-filter-btn">
                Show All Articles
              </button>
            )}
          </div>
        ) : (
          filteredArticles.map(article => (
            <div key={article.id} className={`article-card ${article.published ? 'published' : 'draft'}`}>
              <div className="article-header">
                <h3 className="article-title">{article.title}</h3>
                <div className="article-status">
                  <span className={`status-badge ${article.published ? 'published' : 'draft'}`}>
                    {article.published ? '🌐 Published' : '📝 Draft'}
                  </span>
                </div>
              </div>

              <div className="article-meta">
                <span className="category">{article.category}</span>
                <span className="author">By {article.author}</span>
                <span className="date">{new Date(article.date).toLocaleDateString()}</span>
                <span className="read-time">{article.readTime}</span>
              </div>

              <p className="article-excerpt">{article.excerpt}</p>

              <div className="article-actions">
                <button 
                  className="edit-btn"
                  onClick={() => startEditing(article)}
                  title="Edit article"
                >
                  ✏️ Edit
                </button>

                <button 
                  className={`publish-btn ${article.published ? 'unpublish' : 'publish'}`}
                  onClick={() => togglePublishStatus(article.id)}
                  title={article.published ? 'Unpublish article' : 'Publish article'}
                >
                  {article.published ? '📤 Unpublish' : '🚀 Publish'}
                </button>

                <button 
                  className="delete-btn"
                  onClick={() => deleteArticle(article.id)}
                  title="Delete article"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleManager;
