-- This is an open source project, therefore you can use this file to set up your Supabase project.         
-- Enable Row Level Security (RLS) for all tables
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'subscriber' CHECK (role IN ('admin', 'publisher', 'subscriber', 'donor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_articles table
CREATE TABLE IF NOT EXISTS saved_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    url TEXT NOT NULL,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- Create article_likes table
CREATE TABLE IF NOT EXISTS article_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL,
    article_title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- Create article_comments table
CREATE TABLE IF NOT EXISTS article_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL,
    article_title TEXT NOT NULL,
    content TEXT NOT NULL,
    username TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_notes table
CREATE TABLE IF NOT EXISTS user_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL,
    article_title TEXT NOT NULL,
    content TEXT NOT NULL,
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_articles table (for user-generated content)
CREATE TABLE IF NOT EXISTS user_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for blog_posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Users can insert their own blog posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blog posts" ON blog_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blog posts" ON blog_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for saved_articles
CREATE POLICY "Users can view their own saved articles" ON saved_articles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved articles" ON saved_articles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved articles" ON saved_articles
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for article_likes
CREATE POLICY "Users can view their own likes" ON article_likes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own likes" ON article_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON article_likes
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for article_comments
CREATE POLICY "Comments are viewable by everyone" ON article_comments
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON article_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON article_comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON article_comments
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_notes
CREATE POLICY "Users can view their own notes" ON user_notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" ON user_notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON user_notes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON user_notes
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_articles
CREATE POLICY "Published user articles are viewable by everyone" ON user_articles
    FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own articles" ON user_articles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own articles" ON user_articles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own articles" ON user_articles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own articles" ON user_articles
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically handle updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at BEFORE UPDATE ON user_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_articles_updated_at BEFORE UPDATE ON user_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, read_time, image, image_url, published) VALUES
(
    'Getting Started with Supabase',
    'Learn how to set up and use Supabase for your next project',
    'Supabase is an open-source alternative to Firebase that provides a complete backend solution including database, authentication, and real-time subscriptions. In this article, we''ll explore how to get started with Supabase and build a simple blog application.',
    'Tech Writer',
    'Engineering',
    '5 min read',
    '🚀',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    true
),
(
    'Modern React Development',
    'Best practices for building scalable React applications',
    'React has evolved significantly over the years, and modern development practices have changed accordingly. This article covers hooks, context, performance optimization, and testing strategies for building robust React applications.',
    'React Expert',
    'Engineering',
    '8 min read',
    '⚛️',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    true
),
(
    'UI/UX Design Principles',
    'Essential principles for creating intuitive user interfaces',
    'Great user interface design is about more than just aesthetics. It''s about creating intuitive, accessible, and delightful experiences for users. This article explores fundamental UI/UX principles and how to apply them in your projects.',
    'Design Lead',
    'UI/UX',
    '6 min read',
    '🎨',
    'https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    true
);
