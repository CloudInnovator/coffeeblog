import React, { useState, useEffect } from 'react';
import './ArticleComments.css';

interface Comment {
  id: string;
  articleId: string;
  content: string;
  username: string;
  isAnonymous: boolean;
  timestamp: string;
}

interface ArticleCommentsProps {
  articleId: string;
  articleTitle: string;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId, articleTitle }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load comments for this article
    const allComments = JSON.parse(localStorage.getItem('articleComments') || '[]');
    const articleComments = allComments.filter((comment: Comment) => comment.articleId === articleId);
    setComments(articleComments);

    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(userData.username);
    }
  }, [articleId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      articleId,
      content: newComment.trim(),
      username: isAnonymous ? 'Anonymous' : (username || 'Guest'),
      isAnonymous,
      timestamp: new Date().toISOString()
    };

    // Save to all comments
    const allComments = JSON.parse(localStorage.getItem('articleComments') || '[]');
    const updatedComments = [...allComments, comment];
    localStorage.setItem('articleComments', JSON.stringify(updatedComments));

    // Save to user's comments if they're logged in
    if (isLoggedIn) {
      const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
      const userComment = {
        id: comment.id,
        articleId,
        articleTitle,
        content: comment.content,
        date: new Date(comment.timestamp).toLocaleDateString(),
        isAnonymous,
        username: comment.username
      };
      userComments.push(userComment);
      localStorage.setItem('userComments', JSON.stringify(userComments));
    }

    // Update local state
    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="article-comments">
      <div className="comments-header">
        <h3>Comments ({comments.length})</h3>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.isAnonymous ? '👤 Anonymous' : `👤 ${comment.username}`}
                </span>
                <span className="comment-date">
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="comment-form">
        <h4>Add a Comment</h4>
        <form onSubmit={handleSubmitComment}>
          {!isLoggedIn && (
            <div className="username-input">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-field"
              />
            </div>
          )}
          
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="comment-textarea"
            rows={4}
            required
          />
          
          <div className="comment-options">
            <label className="anonymous-checkbox">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Comment anonymously
            </label>
            
            <button type="submit" className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleComments;
