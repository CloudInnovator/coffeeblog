-- Essential tables for the coffee blog app
-- Run this in your Supabase SQL Editor

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

-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Allow users to insert their own profile (more permissive for registration)
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (
        auth.uid() = id OR 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for blog_posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Users can insert their own blog posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, read_time, image, image_url, published) VALUES
(
    'Getting Started with Supabase',
    'Learn how to set up and use Supabase for your next project',
    'Supabase is an open-source alternative to Firebase that provides a complete backend solution including database, authentication, and real-time subscriptions.',
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
    'React has evolved significantly over the years, and modern development practices have changed accordingly.',
    'React Expert',
    'Engineering',
    '8 min read',
    '⚛️',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    true
);

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.email, 'subscriber');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
