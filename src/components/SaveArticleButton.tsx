import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [articleId]);

  const checkIfSaved = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('saved_articles')
        .select('id')
        .eq('user_id', user.id)
        .eq('article_id', articleId)
        .single();

      setIsSaved(!!data);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to save articles');
        return;
      }

      if (isSaved) {
        // Remove from saved articles
        const { error } = await supabase
          .from('saved_articles')
          .delete()
          .eq('user_id', user.id)
          .eq('article_id', articleId);

        if (error) throw error;
        setIsSaved(false);
      } else {
        // Add to saved articles
        const { error } = await supabase
          .from('saved_articles')
          .insert([
            {
              user_id: user.id,
              article_id: articleId,
              title,
              excerpt,
              category,
              url
            }
          ]);

        if (error) throw error;
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`save-btn ${isSaved ? 'saved' : ''}`}
      title={isSaved ? 'Remove from saved' : 'Save article'}
    >
      {isLoading ? '...' : isSaved ? '📚' : '🔖'}
    </button>
  );
};

export default SaveArticleButton;
