import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SaveArticleButton from '../components/SaveArticleButton';
import LikeButton from '../components/LikeButton';
import ArticleComments from '../components/ArticleComments';
import './Blog.css';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  imageUrl?: string;
  published?: boolean;
  user_id?: string;
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Design System Architecture: Scaling Visual Consistency Across Organizations",
    excerpt: "Analysis of how modern design systems are architected to maintain consistency while enabling innovation at scale.",
    content: "Design systems represent the intersection of design and engineering, requiring careful architectural decisions to scale effectively. This analysis examines how companies like Atlassian, Shopify, and Adobe have built design systems that serve thousands of designers and developers. Key architectural patterns include token-based theming, component composition strategies, and automated design-to-code workflows that maintain consistency while reducing friction.",
    author: "Sarah Chen",
    date: "2024-07-20",
    category: "Systems",
    readTime: "8 min read",
    image: "🎨",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Component API Design: Building Intuitive Developer Interfaces",
    excerpt: "How component library APIs are designed to balance flexibility with ease of use in modern frameworks.",
    content: "Component API design requires balancing power and simplicity. This analysis explores patterns from leading component libraries like Material-UI, Ant Design, and Chakra UI. We examine composition vs configuration patterns, prop drilling solutions, render prop patterns, and how TypeScript is reshaping component interfaces to provide better developer experience and type safety.",
    author: "David Kim",
    date: "2024-07-15",
    category: "Engineering",
    readTime: "6 min read",
    image: "⚙️"
  },
  {
    id: 3,
    title: "Performance Engineering: Optimizing React Applications at Scale",
    excerpt: "Deep dive into performance optimization strategies for large React applications and component libraries.",
    content: "Performance optimization in modern React applications requires understanding both theoretical concepts and practical implementation strategies. This analysis covers bundle splitting strategies, lazy loading patterns, memoization techniques, and virtual scrolling implementations. We examine case studies from high-traffic applications and the engineering decisions that enable sub-second load times.",
    author: "Michael Torres",
    date: "2024-07-05",
    category: "Performance",
    readTime: "12 min read",
    image: "⚡"
  },
  {
    id: 4,
    title: "2024 Design & Engineering Trends: What's Shaping the Industry",
    excerpt: "Analysis of emerging trends in design systems, development frameworks, and engineering practices shaping 2024.",
    content: "The design and engineering landscape is rapidly evolving with new frameworks, design methodologies, and development practices. This analysis examines key trends including AI-assisted design tools, micro-interactions, serverless architectures, and the rise of design tokens. We explore how teams are adapting to new technologies while maintaining focus on user experience and development efficiency.",
    author: "Alex Thompson",
    date: "2024-07-30",
    category: "Trends",
    readTime: "12 min read",
    image: "📈"
  }
];

const categories = ["All", "Design", "Engineering", "Systems", "UI/UX", "AI/ML", "Performance", "Trends"];

type SortMode = "Newest" | "Oldest" | "A-Z" | "Z-A" | "Trends";

interface BlogProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onClearSearch?: () => void;
}

const Blog: React.FC<BlogProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  searchQuery: externalSearchQuery = "",
  onSearchChange: externalOnSearchChange,
  onClearSearch: externalOnClearSearch
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("Newest");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);

  // Load blog posts from Supabase
  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match BlogPost interface
      const transformedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.created_at,
        category: post.category,
        readTime: post.read_time,
        image: post.image,
        imageUrl: post.image_url,
        published: post.published,
        user_id: post.user_id
      }));

      setBlogPosts(transformedPosts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Fallback to default posts if Supabase fails
      setBlogPosts(defaultBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  // Sync external search query
  useEffect(() => {
    setSearchQuery(externalSearchQuery);
  }, [externalSearchQuery]);

  const toggleSortMode = () => {
    setSortMode(current => {
      switch (current) {
        case "Newest": return "Oldest";
        case "Oldest": return "A-Z";
        case "A-Z": return "Z-A";
        case "Z-A": return "Trends";
        case "Trends": return "Newest";
        default: return "Newest";
      }
    });
  };

  const getSortedPosts = (posts: BlogPost[]) => {
    switch (sortMode) {
      case "Newest":
        return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "Oldest":
        return [...posts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "A-Z":
        return [...posts].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...posts].sort((a, b) => b.title.localeCompare(a.title));
      case "Trends":
        return posts.filter(post => post.category === "Trends");
      default:
        return posts;
    }
  };

  const getSortIcon = () => {
    switch (sortMode) {
      case "Newest": return "🔥"; // Fire for newest/hot content
      case "Oldest": return "📅"; // Calendar for oldest/chronological
      case "A-Z": return "🔤"; // ABC for alphabetical A-Z
      case "Z-A": return "🔡"; // ZYX for reverse alphabetical Z-A
      case "Trends": return "📈"; // Chart for trending
      default: return "🔄";
    }
  };

  // Use blogPosts directly (includes both default and Supabase posts)
  const allPosts = blogPosts;

  // Filter posts based on search query
  const searchFilteredPosts = searchQuery.trim() === "" 
    ? allPosts
    : allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Apply category filter to search results
  const filteredPosts = selectedCategory === "All" 
    ? getSortedPosts(searchFilteredPosts)
    : getSortedPosts(searchFilteredPosts.filter(post => post.category === selectedCategory));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (externalOnSearchChange) {
      externalOnSearchChange(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (externalOnClearSearch) {
      externalOnClearSearch();
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className={`blog ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className={`blog ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <button className="back-btn" onClick={handleBackClick}>
            ← Back to Blog
          </button>
          <div className="blog-grid-single">
            <article className="blog-post-full">
              <header className="post-header">
                <div className="post-icon">{selectedPost.image}</div>
                <h1 className="post-title-full">{selectedPost.title}</h1>
              </header>
              <div className="post-meta-full">
                <span className="author">{selectedPost.author}</span>
                <span className="date">{new Date(selectedPost.date).toLocaleDateString()}</span>
                <span className="read-time">{selectedPost.readTime}</span>
                <span className="category">{selectedPost.category}</span>
              </div>
              <div className="post-content">
                <p className="lead">{selectedPost.excerpt}</p>
                <p>{selectedPost.content}</p>
                <p>This is a preview of our blog post content. In a full implementation, this would contain the complete article with proper formatting, images, and more detailed content.</p>
              </div>
              <div className="post-actions-full">
                <LikeButton
                  articleId={selectedPost.id.toString()}
                  title={selectedPost.title}
                />
                <button className="like-btn">
                  ❤️ Like Article
                </button>
                <SaveArticleButton
                  articleId={selectedPost.id.toString()}
                  title={selectedPost.title}
                  excerpt={selectedPost.excerpt}
                  category={selectedPost.category}
                  url={`/blog/${selectedPost.id}`}
                />
                <button className="reads-btn">
                  👁️ {Math.floor(Math.random() * 5000) + 1000}
                </button>
                <button className="comments-btn">
                  💬 {Math.floor(Math.random() * 100) + 10}
                </button>
              </div>
              <ArticleComments 
                articleId={selectedPost.id.toString()}
                articleTitle={selectedPost.title}
              />
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`blog ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        {searchQuery && (
          <div className="search-results-info">
            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
            for "{searchQuery}"
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        )}

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <button
            className="category-btn sort-btn"
            onClick={toggleSortMode}
            title={`Sort by ${sortMode}`}
          >
            {getSortIcon()}
          </button>
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={clearSearch}
                  title="Clear search"
                >
                  ×
                </button>
              )}
              <div className="search-icon">🔍</div>
            </div>
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className={`post-card ${post.imageUrl ? 'has-image' : 'has-default-image'}`}
            >
              {post.imageUrl ? (
                <div 
                  className="post-bg-image"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                />
              ) : (
                <div className="post-default-image">
                  <div className="post-default-overlay">
                    <span className="post-emoji">{post.image}</span>
                  </div>
                </div>
              )}
              <div className="post-content">
                <h3 className="post-title" onClick={() => handlePostClick(post)}>{post.title}</h3>
                <div className="post-article-preview">
                  {post.imageUrl 
                    ? post.content.substring(0, 250) + "..."
                    : post.content.substring(0, 450) + "..."
                  }
                </div>
                <div className="post-category-line">
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-meta-compact">
                  <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="post-read-time">{post.readTime}</span>
                  <div className="post-actions-inline">
                    <SaveArticleButton
                      articleId={post.id.toString()}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      url={`/blog/${post.id}`}
                    />
                    <button className="read-more" onClick={() => handlePostClick(post)}>Read More →</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
