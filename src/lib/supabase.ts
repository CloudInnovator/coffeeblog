import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

// Debug logging (remove in production)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...')

if (!supabaseUrl || supabaseUrl.includes('your-project')) {
  console.error('❌ Supabase URL is not configured properly')
}

if (!supabaseAnonKey || supabaseAnonKey.includes('your-anon-key')) {
  console.error('❌ Supabase anon key is not configured properly')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  category: string;
  read_time: string;
  image: string;
  image_url?: string;
  published: boolean;
  user_id?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'publisher' | 'subscriber' | 'donor';
  created_at: string;
  updated_at: string;
}

export interface SavedArticle {
  id: string;
  user_id: string;
  article_id: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  saved_at: string;
}

export interface UserNote {
  id: string;
  user_id: string;
  article_id: string;
  article_title: string;
  content: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface UserComment {
  id: string;
  user_id: string;
  article_id: string;
  article_title: string;
  content: string;
  created_at: string;
  is_anonymous: boolean;
  username?: string;
}

export interface UserArticle {
  id: string;
  user_id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  read_time: string;
  image: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}
