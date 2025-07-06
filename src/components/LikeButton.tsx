import React, { useState, useEffect } from 'react';
import './LikeButton.css';

interface LikeButtonProps {
  articleId: string;
  title: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  title
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Check if article is already liked
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    const isArticleLiked = likedArticles.some((article: any) => article.id === articleId);
    setIsLiked(isArticleLiked);

    // Get like count for this article
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
    setLikeCount(likeCounts[articleId] || 0);
  }, [articleId]);

  const handleLikeToggle = () => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');

    if (isLiked) {
      // Remove like
      const updatedArticles = likedArticles.filter((article: any) => article.id !== articleId);
      localStorage.setItem('likedArticles', JSON.stringify(updatedArticles));
      
      // Decrease like count
      const newCount = Math.max(0, (likeCounts[articleId] || 0) - 1);
      likeCounts[articleId] = newCount;
      localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
      
      setIsLiked(false);
      setLikeCount(newCount);
    } else {
      // Add like
      const newLike = {
        id: articleId,
        title,
        likedAt: new Date().toISOString()
      };
      const updatedArticles = [...likedArticles, newLike];
      localStorage.setItem('likedArticles', JSON.stringify(updatedArticles));
      
      // Increase like count
      const newCount = (likeCounts[articleId] || 0) + 1;
      likeCounts[articleId] = newCount;
      localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
      
      setIsLiked(true);
      setLikeCount(newCount);
    }
  };

  return (
    <button
      className={`like-article-btn ${isLiked ? 'liked' : ''}`}
      onClick={handleLikeToggle}
      title={isLiked ? 'Unlike article' : 'Like article'}
    >
      <span className="like-icon">{isLiked ? '💜' : '💜'}</span>
      <span className="like-text">
        {likeCount > 0 && `${likeCount}`}
      </span>
    </button>
  );
};

export default LikeButton;
