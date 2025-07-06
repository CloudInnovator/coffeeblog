import React, { useState } from 'react';
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
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Design System Architecture: Scaling Visual Consistency Across Organizations",
    excerpt: "Analysis of how modern design systems are architected to maintain consistency while enabling innovation at scale.",
    content: "Design systems represent the intersection of design and engineering, requiring careful architectural decisions to scale effectively. This analysis examines how companies like Atlassian, Shopify, and Adobe have built design systems that serve thousands of designers and developers. Key architectural patterns include token-based theming, component composition strategies, and automated design-to-code workflows that maintain consistency while reducing friction.",
    author: "Sarah Chen",
    date: "2024-07-20",
    category: "Design Systems",
    readTime: "8 min read",
    image: "🎨"
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
    image: "🏗️"
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
    title: "CSS Architecture: Modern Styling Strategies for Component-Based Design",
    excerpt: "Analysis of CSS methodologies and tools that enable maintainable styling in component-based architectures.",
    content: "CSS architecture has evolved significantly with the rise of component-based design. This analysis examines CSS-in-JS solutions, utility-first frameworks like Tailwind, and hybrid approaches that balance performance with developer experience. We explore scoping strategies, theming systems, and how modern build tools are changing the CSS development workflow.",
    author: "Dr. Lisa Wang",
    date: "2024-06-28",
    category: "Frontend",
    readTime: "9 min read",
    image: "💅"
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
    category: "Design Systems",
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
  }
];

const categories = ["All", "Design Systems", "UI/UX", "Engineering", "Architecture", "Frontend", "Performance"];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="blog">
        <div className="container">
          <button className="back-btn" onClick={handleBackClick}>
            ← Back to Blog
          </button>
          <article className="blog-post-full">
            <header className="post-header">
              <div className="post-icon">{selectedPost.image}</div>
              <h1>{selectedPost.title}</h1>
              <div className="post-meta">
                <span className="author">By {selectedPost.author}</span>
                <span className="date">{new Date(selectedPost.date).toLocaleDateString()}</span>
                <span className="category">{selectedPost.category}</span>
                <span className="read-time">{selectedPost.readTime}</span>
              </div>
              <div className="post-actions">
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
              </div>
            </header>
            <div className="post-content">
              <p className="lead">{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              <p>This is a preview of our blog post content. In a full implementation, this would contain the complete article with proper formatting, images, and more detailed content.</p>
            </div>
            <ArticleComments 
              articleId={selectedPost.id.toString()}
              articleTitle={selectedPost.title}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="container">
        <header className="blog-header">
          <h1>Design & Engineering Analysis</h1>
          <p>Deep analysis of design systems, engineering architecture, and technical innovation</p>
        </header>

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
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="post-card"
            >
              <div className="post-image">{post.image}</div>
              <div className="post-content">
                <h3 className="post-title" onClick={() => handlePostClick(post)}>{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="read-more-container">
                  <span className="post-category">{post.category}</span>
                  <button className="read-more" onClick={() => handlePostClick(post)}>Read More →</button>
                </div>
                <div className="post-header">
                  <div className="post-actions">
                    <LikeButton
                      articleId={post.id.toString()}
                      title={post.title}
                    />
                    <SaveArticleButton
                      articleId={post.id.toString()}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      url={`/blog/${post.id}`}
                    />
                    <button className="reads-btn" disabled>
                      👁️ {Math.floor(Math.random() * 5000) + 1000}
                    </button>
                    <button className="comments-btn" disabled>
                      💬 {Math.floor(Math.random() * 100) + 10}
                    </button>
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
