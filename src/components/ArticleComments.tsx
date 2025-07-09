import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './ArticleComments.css';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  username: string;
  is_anonymous: boolean;
}

interface ArticleCommentsProps {
  articleId: string;
  articleTitle: string;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId, articleTitle }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to comment');
        return;
      }

      // Get user profile for username
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('article_comments')
        .insert([
          {
            user_id: user.id,
            article_id: articleId,
            article_title: articleTitle,
            content: newComment.trim(),
            username: isAnonymous ? 'Anonymous' : (profile?.username || 'User'),
            is_anonymous: isAnonymous
          }
        ]);

      if (error) throw error;

      setNewComment('');
      setIsAnonymous(false);
      await loadComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="article-comments">
      <h3>Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmitComment} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="comment-input"
        />
        <div className="comment-form-actions">
          <label className="anonymous-checkbox">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="submit-comment-btn"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {isLoading ? (
          <div className="loading">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="no-comments">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.username}</span>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="comment-content">{comment.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleComments;
