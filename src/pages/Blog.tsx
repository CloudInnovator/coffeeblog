import React, { useState } from 'react';
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
    title: "Meta's New LLaMA 3.1: Breaking Down the 405B Parameter Model",
    excerpt: "Deep dive into Meta's latest language model and its implications for the future of AI development.",
    content: "Meta's LLaMA 3.1 represents a significant leap in open-source AI capabilities. With 405 billion parameters, this model challenges the dominance of closed-source alternatives like GPT-4. The engineering challenges in training such a massive model required innovative approaches to distributed computing and memory optimization.",
    author: "Sarah Chen",
    date: "2024-07-20",
    category: "AI/ML",
    readTime: "8 min read",
    image: "🤖"
  },
  {
    id: 2,
    title: "Google's Project Starline: The Future of Remote Communication",
    excerpt: "How Google is using advanced computer vision and real-time compression to create telepresence magic.",
    content: "Project Starline combines breakthrough advances in computer vision, machine learning, spatial audio, and real-time compression. The system creates a sense of volume and depth that makes you feel like you're actually sitting across from someone, even when you're cities apart.",
    author: "David Kim",
    date: "2024-07-15",
    category: "Hardware",
    readTime: "6 min read",
    image: "📹"
  },
  {
    id: 3,
    title: "Apple's M4 Chip Architecture: Engineering Marvel or Marketing Hype?",
    excerpt: "Technical analysis of Apple's latest silicon and its real-world performance implications.",
    content: "Apple's M4 chip represents the culmination of years of investment in custom silicon design. Built on TSMC's 3nm process, the M4 delivers unprecedented performance per watt. But how does it actually stack up against Intel and AMD's latest offerings in real-world scenarios?",
    author: "Emma Rodriguez",
    date: "2024-07-10",
    category: "Hardware",
    readTime: "10 min read",
    image: "💻"
  },
  {
    id: 4,
    title: "Netflix's Content Delivery at Scale: 15 Petabytes Per Day",
    excerpt: "Inside Netflix's global CDN infrastructure and how they deliver video to 260+ million subscribers.",
    content: "Netflix serves over 15 petabytes of data daily to more than 260 million subscribers worldwide. This requires one of the most sophisticated content delivery networks ever built, with edge servers in ISPs globally and advanced algorithms for content pre-positioning.",
    author: "Michael Torres",
    date: "2024-07-05",
    category: "Infrastructure",
    readTime: "12 min read",
    image: "🌐"
  },
  {
    id: 5,
    title: "Amazon's Just Walk Out Technology: Computer Vision at Retail Scale",
    excerpt: "Breaking down the ML pipelines and edge computing that power cashier-less shopping.",
    content: "Amazon's Just Walk Out technology combines computer vision, sensor fusion, and deep learning to track hundreds of customers and thousands of products simultaneously. The system processes terabytes of visual data in real-time while maintaining sub-second latency.",
    author: "Dr. Lisa Wang",
    date: "2024-06-28",
    category: "AI/ML",
    readTime: "9 min read",
    image: "�"
  },
  {
    id: 6,
    title: "Microsoft's Carbon Negative Data Centers: Engineering for Sustainability",
    excerpt: "How Microsoft is redesigning data center architecture to achieve carbon negative operations by 2030.",
    content: "Microsoft's ambitious carbon negative goal requires fundamental changes to data center design. From liquid cooling systems using seawater to AI-optimized power management, the company is pioneering sustainable computing at hyperscale.",
    author: "Alex Martinez",
    date: "2024-06-20",
    category: "Infrastructure",
    readTime: "7 min read",
    image: "🌱"
  }
];

const categories = ["All", "AI/ML", "Hardware", "Infrastructure", "Security", "Frontend"];

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
            </header>
            <div className="post-content">
              <p className="lead">{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              <p>This is a preview of our blog post content. In a full implementation, this would contain the complete article with proper formatting, images, and more detailed content.</p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="container">
        <header className="blog-header">
          <h1>Dot Product Tech Blog</h1>
          <p>Deep dives into engineering advances at FAANG and beyond</p>
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
              className="blog-card"
              onClick={() => handlePostClick(post)}
            >
              <div className="card-icon">{post.image}</div>
              <div className="card-content">
                <h3>{post.title}</h3>
                <p className="excerpt">{post.excerpt}</p>
                <div className="card-meta">
                  <span className="author">{post.author}</span>
                  <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="card-footer">
                  <span className="category">{post.category}</span>
                  <span className="read-time">{post.readTime}</span>
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
