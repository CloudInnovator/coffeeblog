import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Donations from "./pages/Donations";
import Subscriptions from "./pages/Subscriptions";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

// Create context for dark mode
export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'publisher' | 'subscriber' | 'donor';
  created_at: string;
}

interface AppContentProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();
  const isOnBlogPage = location.pathname === "/" || location.pathname === "/blog";

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
          showSearch={isOnBlogPage}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Blog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} searchQuery={searchQuery} onSearchChange={handleSearchChange} onClearSearch={clearSearch} />} />
            <Route path="/blog" element={<Blog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} searchQuery={searchQuery} onSearchChange={handleSearchChange} onClearSearch={clearSearch} />} />
            <Route path="/donations" element={<Donations isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/subscriptions" element={<Subscriptions isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/auth" element={<Auth isDarkMode={isDarkMode} onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/dashboard" element={currentUser ? <Dashboard isDarkMode={isDarkMode} currentUser={currentUser} onLogout={handleLogout} /> : <Auth isDarkMode={isDarkMode} onAuthSuccess={handleAuthSuccess} />} />
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </DarkModeContext.Provider>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference on app start
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("blogDarkMode");
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("blogDarkMode", JSON.stringify(newDarkMode));
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("darkModeChange", { 
      detail: { isDarkMode: newDarkMode } 
    }));
  };

  return (
    <Router>
      <AppContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}

export default App;
