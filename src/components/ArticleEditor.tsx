import React, { useState, useRef, useEffect } from 'react';
import './ArticleEditor.css';

export interface ArticleData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  imageUrl?: string;
  readTime: string;
  date: string;
  published: boolean;
  saved: boolean;
}

interface ArticleEditorProps {
  onSave: (article: ArticleData) => void;
  onCancel: () => void;
  initialData?: Partial<ArticleData>;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ onSave, onCancel, initialData }) => {
  const [article, setArticle] = useState<ArticleData>({
    id: initialData?.id || Date.now().toString(),
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'Engineering',
    author: initialData?.author || 'Guest Author',
    image: initialData?.image || '✍️',
    imageUrl: initialData?.imageUrl || '',
    readTime: initialData?.readTime || '5 min read',
    date: initialData?.date || new Date().toISOString(),
    published: initialData?.published || false,
    saved: initialData?.saved || false
  });

  const [isPreview, setIsPreview] = useState(false);
  const [showImageInserter, setShowImageInserter] = useState(false);
  const [showFormatHelp, setShowFormatHelp] = useState(false);
  const [activeFormat, setActiveFormat] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Engineering',
    'Design',
    'Systems',
    'Architecture',
    'Performance',
    'AI/ML',
    'UI/UX',
    'Trends'
  ];

  // Form validation
  const isFormValid = article.title.trim() && article.content.trim() && article.excerpt.trim();

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && isFormValid) {
      const timer = setTimeout(() => {
        console.log('Auto-saving article...', article.title);
        localStorage.setItem('draft-article', JSON.stringify(article));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [article, autoSave, isFormValid]);

  // Moved useEffect hooks after function declarations

  const handleInputChange = (field: keyof ArticleData, value: string) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setArticle(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleContentChange = (content: string) => {
    const readTime = calculateReadTime(content);
    setArticle(prev => ({ ...prev, content, readTime }));
  };

  // Get current selection in textarea
  const getCurrentSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = article.content.substring(start, end);
      return { start, end, selected };
    }
    return { start: 0, end: 0, selected: '' };
  };

  // Insert formatting around selected text or at cursor
  const insertFormatting = (format: string) => {
    if (!textareaRef.current) return;

    const { start, end, selected } = getCurrentSelection();
    const beforeText = article.content.substring(0, start);
    const afterText = article.content.substring(end);

    let newText = '';
    let cursorOffset = 0;

    // Show active format temporarily
    setActiveFormat(format);
    setTimeout(() => setActiveFormat(''), 300);

    switch (format) {
      case 'bold':
        newText = selected ? `**${selected}**` : '**Bold Text**';
        cursorOffset = selected ? 0 : 2;
        break;
      case 'italic':
        newText = selected ? `*${selected}*` : '*Italic Text*';
        cursorOffset = selected ? 0 : 1;
        break;
      case 'heading':
        const headingPrefix = beforeText && !beforeText.endsWith('\n') ? '\n' : '';
        const headingSuffix = afterText && !afterText.startsWith('\n') ? '\n' : '';
        newText = `${headingPrefix}## ${selected || 'Heading'}${headingSuffix}`;
        cursorOffset = selected ? 0 : 3;
        break;
      case 'quote':
        const quotePrefix = beforeText && !beforeText.endsWith('\n') ? '\n' : '';
        const quoteSuffix = afterText && !afterText.startsWith('\n') ? '\n' : '';
        newText = `${quotePrefix}> ${selected || 'Quote text'}${quoteSuffix}`;
        cursorOffset = selected ? 0 : 2;
        break;
      case 'list':
        const listPrefix = beforeText && !beforeText.endsWith('\n') ? '\n' : '';
        const listSuffix = afterText && !afterText.startsWith('\n') ? '\n' : '';
        newText = `${listPrefix}- ${selected || 'List item'}${listSuffix}`;
        cursorOffset = selected ? 0 : 2;
        break;
      case 'center':
        newText = selected ? `<div style="text-align: center">${selected}</div>` : '<div style="text-align: center">Centered text</div>';
        cursorOffset = selected ? 0 : 30;
        break;
      case 'justify':
        newText = selected ? `<div style="text-align: justify">${selected}</div>` : '<div style="text-align: justify">Justified text</div>';
        cursorOffset = selected ? 0 : 31;
        break;
      default:
        return;
    }

    const newContent = beforeText + newText + afterText;
    const readTime = calculateReadTime(newContent);
    setArticle(prev => ({ ...prev, content: newContent, readTime }));

    // Reset cursor position
    setTimeout(() => {
      textareaRef.current?.focus();
      const newPosition = selected ? start + newText.length : start + newText.length - cursorOffset;
      textareaRef.current?.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  // Drag and drop functionality
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        insertImageIntoContent(result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        insertImageIntoContent(result);
        setShowImageInserter(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageIntoContent = (imageUrl: string) => {
    if (!textareaRef.current) return;

    const { start } = getCurrentSelection();
    const beforeText = article.content.substring(0, start);
    const afterText = article.content.substring(start);
    
    const imageMarkdown = `\n![Image](${imageUrl})\n`;
    const newContent = beforeText + imageMarkdown + afterText;
    
    handleContentChange(newContent);
    
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
    }, 0);
  };

  const handleSave = () => {
    if (isFormValid) {
      localStorage.removeItem('draft-article');
      onSave(article);
    }
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
  };

  const renderPreview = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Handle images
      if (paragraph.includes('![Image](')) {
        const imageMatch = paragraph.match(/!\[Image\]\((.*?)\)/);
        if (imageMatch) {
          return (
            <div key={index} className="content-image-container">
              <img src={imageMatch[1]} alt="Article content" className="content-image" />
            </div>
          );
        }
      }
      
      // Handle headings
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="content-heading">{paragraph.substring(3)}</h3>;
      }
      
      // Handle quotes
      if (paragraph.startsWith('> ')) {
        return <blockquote key={index} className="content-quote">{paragraph.substring(2)}</blockquote>;
      }
      
      // Handle lists
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="content-list-item">{paragraph.substring(2)}</li>;
      }
      
      // Handle HTML formatted content (center, justify)
      if (paragraph.includes('<div style=')) {
        return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
      }
      
      // Handle bold and italic
      let formattedParagraph = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (formattedParagraph.trim()) {
        return <p key={index} dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
      }
      
      return null;
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') {
          e.preventDefault();
          insertFormatting('bold');
        } else if (e.key === 'i') {
          e.preventDefault();
          insertFormatting('italic');
        } else if (e.key === 's') {
          e.preventDefault();
          if (isFormValid) {
            handleSave();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFormValid, insertFormatting, handleSave]);

  return (
    <div className="article-editor">
      <div className="editor-header">
        <h2>✍️ {initialData ? 'Edit Article' : 'Create New Article'}</h2>
        <div className="editor-actions">
          <button 
            className={`auto-save-btn ${autoSave ? 'active' : ''}`}
            onClick={toggleAutoSave}
            title="Toggle auto-save (saves to localStorage)"
          >
            {autoSave ? '💾 Auto-save ON' : '💾 Auto-save OFF'}
          </button>
          <button 
            className={`preview-btn ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? '📝 Edit' : '👁️ Preview'}
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            ❌ Cancel
          </button>
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={!isFormValid}
            title={!isFormValid ? 'Please fill in title, excerpt, and content' : 'Save article'}
          >
            💾 Save Article
          </button>
        </div>
      </div>

      {!isPreview ? (
        <div className="editor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">📝 Title</label>
              <input
                id="title"
                type="text"
                value={article.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter an engaging article title..."
                className="title-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="excerpt">📄 Excerpt</label>
              <textarea
                id="excerpt"
                value={article.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description that will appear in the blog card..."
                className="excerpt-input"
                rows={3}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">🏷️ Category</label>
              <select
                id="category"
                value={article.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="category-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="author">👤 Author</label>
              <input
                id="author"
                type="text"
                value={article.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Author name..."
                className="author-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emoji">🎨 Emoji (if no image)</label>
              <input
                id="emoji"
                type="text"
                value={article.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="📝"
                className="emoji-input"
                maxLength={2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">🖼️ Upload Cover Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">📖 Article Content</label>
            <div className="content-section">
              <div className="content-toolbar">
                <div className="toolbar-group">
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('bold')} 
                    className={`format-btn ${activeFormat === 'bold' ? 'active' : ''}`}
                    title="Bold (Ctrl+B)"
                  >
                    <strong>B</strong>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('italic')} 
                    className={`format-btn ${activeFormat === 'italic' ? 'active' : ''}`}
                    title="Italic (Ctrl+I)"
                  >
                    <em>I</em>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('heading')} 
                    className={`format-btn ${activeFormat === 'heading' ? 'active' : ''}`}
                    title="Heading"
                  >
                    <span className="heading-icon">H</span>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group">
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('center')} 
                    className={`format-btn ${activeFormat === 'center' ? 'active' : ''}`}
                    title="Center Align"
                  >
                    <span className="align-icon">⊞</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('justify')} 
                    className={`format-btn ${activeFormat === 'justify' ? 'active' : ''}`}
                    title="Justify"
                  >
                    <span className="align-icon">≡</span>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group">
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('quote')} 
                    className={`format-btn ${activeFormat === 'quote' ? 'active' : ''}`}
                    title="Quote"
                  >
                    <span className="quote-icon">"</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => insertFormatting('list')} 
                    className={`format-btn ${activeFormat === 'list' ? 'active' : ''}`}
                    title="List"
                  >
                    <span className="list-icon">•</span>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group">
                  <button 
                    type="button" 
                    onClick={() => setShowImageInserter(!showImageInserter)} 
                    className={`format-btn image-btn ${showImageInserter ? 'active' : ''}`}
                    title="Insert Image"
                  >
                    🖼️
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowFormatHelp(!showFormatHelp)} 
                    className={`format-btn help-btn ${showFormatHelp ? 'active' : ''}`}
                    title="Formatting Help"
                  >
                    ❓
                  </button>
                </div>
              </div>
              
              {showFormatHelp && (
                <div className="format-help">
                  <h4>📝 Formatting Guide</h4>
                  <div className="help-grid">
                    <div className="help-item">
                      <strong>Bold:</strong> **text** or select text and click B
                    </div>
                    <div className="help-item">
                      <strong>Italic:</strong> *text* or select text and click I
                    </div>
                    <div className="help-item">
                      <strong>Heading:</strong> ## text or select text and click H
                    </div>
                    <div className="help-item">
                      <strong>Quote:</strong> {'>'}  text or select text and click "
                    </div>
                    <div className="help-item">
                      <strong>List:</strong> - text or select text and click •
                    </div>
                    <div className="help-item">
                      <strong>Center:</strong> Wraps text in center div
                    </div>
                    <div className="help-item">
                      <strong>Justify:</strong> Wraps text in justify div
                    </div>
                    <div className="help-item">
                      <strong>Images:</strong> Drag & drop or click 🖼️ to insert
                    </div>
                  </div>
                </div>
              )}
              
              {showImageInserter && (
                <div className="image-inserter">
                  <input
                    ref={contentImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleContentImageUpload}
                    className="content-image-input"
                  />
                  <span className="image-inserter-text">
                    📸 Select an image to insert into the article at cursor position
                  </span>
                </div>
              )}
              
              <div 
                className={`content-input-container ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <textarea
                  ref={textareaRef}
                  id="content"
                  value={article.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Write your article content here using markdown..."
                  className="content-input"
                  rows={15}
                />
                {isDragging && (
                  <div className="drag-overlay">
                    <div className="drag-message">
                      <span className="drag-icon">📁</span>
                      <span>Drop images here to insert them</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="content-meta">
              <span className="read-time">📖 {article.readTime}</span>
              <span className="word-count">📝 {article.content.trim().split(/\s+/).filter(w => w.length > 0).length} words</span>
              <span className="char-count">🔤 {article.content.length} characters</span>
              {autoSave && isFormValid && (
                <span className="auto-save-status">💾 Auto-saving...</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="article-preview">
          <div className="preview-card">
            {article.imageUrl ? (
              <div className="preview-image" style={{ backgroundImage: `url(${article.imageUrl})` }} />
            ) : (
              <div className="preview-default-image">
                <span className="preview-emoji">{article.image}</span>
              </div>
            )}
            <div className="preview-content">
              <h3 className="preview-title">{article.title || 'Article Title'}</h3>
              <p className="preview-excerpt">{article.excerpt || 'Article excerpt will appear here...'}</p>
              <div className="preview-category">
                <span className="category-badge">{article.category}</span>
              </div>
              <div className="preview-meta">
                <span>{new Date().toLocaleDateString()}</span>
                <span>{article.readTime}</span>
                <span>By {article.author}</span>
              </div>
            </div>
          </div>
          <div className="preview-full-content">
            <h2>Full Article Content</h2>
            <div className="preview-article-content">
              {renderPreview(article.content)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleEditor;
