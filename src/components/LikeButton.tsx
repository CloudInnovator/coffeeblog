import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './LikeButton.css';

interface LikeButtonProps {
  articleId: string;
  title: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId, title }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLikeStatus();
    getLikeCount();
  }, [articleId]);

  const checkLikeStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('article_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('article_id', articleId)
        .single();

      setIsLiked(!!data);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const getLikeCount = async () => {
    try {
      const { count } = await supabase
        .from('article_likes')
        .select('*', { count: 'exact' })
        .eq('article_id', articleId);

      setLikeCount(count || 0);
    } catch (error) {
      console.error('Error getting like count:', error);
    }
  };

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to like articles');
        return;
      }

      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('article_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('article_id', articleId);

        if (error) throw error;
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        // Add like
        const { error } = await supabase
          .from('article_likes')
          .insert([
            {
              user_id: user.id,
              article_id: articleId,
              article_title: title
            }
          ]);

        if (error) throw error;
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error liking article:', error);
      alert('Error liking article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`like-btn ${isLiked ? 'liked' : ''}`}
      title={isLiked ? 'Unlike' : 'Like'}
    >
      {isLoading ? '...' : isLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  );
};

export default LikeButton;
