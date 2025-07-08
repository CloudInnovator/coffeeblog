import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsletterBar from "./components/NewsletterBar";
import Blog from "./pages/Blog";
import Subscriptions from "./pages/Subscriptions";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

// Create context for dark mode
export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

interface AppContentProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        {!isDashboard && <NewsletterBar isDarkMode={isDarkMode} />}
        <Header isDarkMode={isDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Blog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/blog" element={<Blog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/subscriptions" element={<Subscriptions isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
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
