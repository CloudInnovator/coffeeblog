import React, { useState, useEffect } from 'react';
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
}

const blogPosts: BlogPost[] = [
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
    title: "Micro-Frontend Architecture: Engineering Scalable UI Systems",
    excerpt: "Technical analysis of micro-frontend patterns and their impact on large-scale application architecture.",
    content: "Micro-frontends represent a significant shift in how we architect large applications. This analysis examines implementation patterns from companies like Spotify, IKEA, and Zalando. We explore module federation, shared dependencies, routing strategies, and the engineering challenges of maintaining consistent user experiences across independent teams and deployment cycles.",
    author: "Emma Rodriguez",
    date: "2024-07-10",
    category: "Architecture",
    readTime: "10 min read",
    image: "🏗️",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
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
    id: 5,
    title: "Machine Learning in Frontend Development: AI-Powered User Interfaces",
    excerpt: "Analysis of how machine learning is being integrated into frontend development workflows and user interface design.",
    content: "Machine learning is transforming frontend development through AI-powered design tools, intelligent code completion, and adaptive user interfaces. This analysis examines how ML models are being integrated into design systems, automated testing workflows, and user experience optimization. We explore tools like GitHub Copilot, Figma's AI features, and how predictive models are enabling more personalized user experiences.",
    author: "Dr. Lisa Wang",
    date: "2024-06-28",
    category: "AI/ML",
    readTime: "9 min read",
    image: "💅",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Accessibility Engineering: Building Inclusive Design Systems",
    excerpt: "How accessibility considerations are integrated into modern design system architecture and engineering workflows.",
    content: "Accessibility in design systems requires both design and engineering considerations from the ground up. This analysis explores how teams build accessible components, implement ARIA patterns, and create testing workflows that catch accessibility issues early. We examine automated testing tools, manual testing strategies, and how accessibility audits are integrated into CI/CD pipelines.",
    author: "Alex Martinez",
    date: "2024-06-20",
    category: "Engineering",
    readTime: "7 min read",
    image: "♿"
  },
  {
    id: 7,
    title: "Design Token Architecture: From Design to Code Automation",
    excerpt: "How design tokens are architected to create seamless design-to-development workflows and maintain visual consistency.",
    content: "Design tokens represent the bridge between design and development, encoding design decisions in a format that can be consumed by both design tools and code. This analysis examines token taxonomy strategies, multi-platform compilation workflows, and how teams like those at Amazon and Salesforce have built token systems that scale across products and platforms.",
    author: "Jordan Blake",
    date: "2024-07-25",
    category: "Design",
    readTime: "11 min read",
    image: "�"
  },
  {
    id: 8,
    title: "State Management Architecture: Engineering Predictable UI State",
    excerpt: "Analysis of state management patterns and architectures that enable predictable, maintainable user interfaces.",
    content: "State management is one of the most critical architectural decisions in modern applications. This analysis compares patterns from Redux, Zustand, Jotai, and Valtio, examining how different approaches handle state normalization, async operations, and component coupling. We explore the trade-offs between simplicity and power, and how state architecture decisions impact both developer experience and application performance.",
    author: "Maya Patel",
    date: "2024-07-18",
    category: "Architecture",
    readTime: "9 min read",
    image: "🔄"
  },
  {
    id: 9,
    title: "Mobile-First Design Engineering: Responsive Architecture Patterns",
    excerpt: "How mobile-first design principles are implemented in modern frontend architectures and design systems.",
    content: "Mobile-first design requires both design and engineering strategies that prioritize mobile experiences while scaling to desktop. This analysis examines responsive design patterns, progressive enhancement strategies, and how teams architect components that work seamlessly across device types. We explore CSS Grid and Flexbox patterns, touch interaction design, and performance considerations for mobile devices.",
    author: "Carlos Rodriguez",
    date: "2024-07-12",
    category: "UI/UX",
    readTime: "8 min read",
    image: "�"
  },
  {
    id: 10,
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

const categories = ["All", "Design", "Engineering", "Systems", "UI/UX", "AI/ML", "Performance"];

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
  const [userArticles, setUserArticles] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);

  // Load user articles from localStorage
  useEffect(() => {
    const savedArticles = localStorage.getItem('userArticles');
    if (savedArticles) {
      const articles = JSON.parse(savedArticles);
      // Only show published articles and convert to BlogPost format
      const publishedArticles = articles
        .filter((article: any) => article.published)
        .map((article: any) => ({
          id: parseInt(article.id),
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author,
          date: article.date,
          category: article.category,
          readTime: article.readTime,
          image: article.image,
          imageUrl: article.imageUrl
        }));
      setUserArticles(publishedArticles);
    }
  }, []);

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

  // Combine default blog posts with user articles
  const allPosts = [...blogPosts, ...userArticles];

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
