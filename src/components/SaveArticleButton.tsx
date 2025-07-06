import React, { useState, useEffect } from 'react';
import './SaveArticleButton.css';

interface SaveArticleButtonProps {
  articleId: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
}

const SaveArticleButton: React.FC<SaveArticleButtonProps> = ({
  articleId,
  title,
  excerpt,
  category,
  url
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if article is already saved
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const isArticleSaved = savedArticles.some((article: any) => article.id === articleId);
    setIsSaved(isArticleSaved);
  }, [articleId]);

  const handleSaveToggle = () => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');

    if (isSaved) {
      // Remove from saved articles
      const updatedArticles = savedArticles.filter((article: any) => article.id !== articleId);
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
      
      // Also remove associated notes
      const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
      const updatedNotes = userNotes.filter((note: any) => note.articleId !== articleId);
      localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
      
      setIsSaved(false);
    } else {
      // Add to saved articles
      const newArticle = {
        id: articleId,
        title,
        excerpt,
        category,
        url,
        savedAt: new Date().toISOString()
      };
      const updatedArticles = [...savedArticles, newArticle];
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
      setIsSaved(true);
    }
  };

  return (
    <button
      className={`save-article-btn ${isSaved ? 'saved' : ''}`}
      onClick={handleSaveToggle}
      title={isSaved ? 'Remove from saved' : 'Save article'}
    >
      {isSaved ? '💾 Saved' : '🔖 Save'}
    </button>
  );
};

export default SaveArticleButton;
