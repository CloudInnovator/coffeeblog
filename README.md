# Coffee Blog - React + Supabase

A modern blog application built with React, TypeScript, and Supabase backend.

## Features

- ✅ **Authentication**: Secure user registration and login with Supabase Auth
- ✅ **Blog System**: Create, read, update, and delete blog posts
- ✅ **User Interactions**: Like articles, save articles, and comment on posts
- ✅ **Search & Filter**: Search articles by title/content and filter by categories
- ✅ **Responsive Design**: Mobile-first responsive design with dark mode support
- ✅ **User Profiles**: User roles (admin, publisher, subscriber, donor)
- ✅ **Real-time Updates**: Live updates for comments and likes

## Tech Stack

- **Frontend**: React 19, TypeScript, CSS3
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router v7
- **Build Tool**: Create React App

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd coffeeblog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set up Database

1. Go to your Supabase dashboard
2. Open the SQL editor
3. Run the SQL script from `supabase-setup.sql` to create all necessary tables and policies

### 5. Start the Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`bash
npm install
npm start
```

Visit `http://localhost:3000` to view the blog.

## Project Structure

- `/src/pages/` - Main page components (Home, Blog, About, Contact, Subscriptions)
- `/src/components/` - Reusable components (Header, Footer)
- `/src/*.css` - Styling with modern design patterns

## Support

Support the blog through our coffee subscription system at `/subscriptions`.