import React,{ useState,useEffect } from 'react';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [urls, setUrls] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('urls')) || [];
    setUrls(savedUrls);
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);
  useEffect(() => {
    localStorage.setItem('urls', JSON.stringify(urls));
  }, [urls]);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  const deleteUrl = (id) => {
    setUrls(urls.filter((url) => url.short !== id));
  }
  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>URL Shortener</h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <UrlForm setUrls={setUrls}/>
        <UrlList urls={urls} deleteUrl={deleteUrl}/>
      </div>
    </div>
  );
}
export default App;