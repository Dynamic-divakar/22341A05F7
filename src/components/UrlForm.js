import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {generateShortUrl} from "../utils/urlUtils";
import { Log } from "../utils/Log";
function UrlForm({ setUrls }) {
  const [original, setUrl] = useState("");
  const [expiryDate, setExpiryDate] = useState(() => new Date(Date.now() + 30 * 60 * 1000));
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVAlidUrl(original)) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");
    const newUrl = {
      original,
      short: generateShortUrl(keyword),
      keyword,
      expiry: expiryDate ? expiryDate.getTime() : null,
      createdAt: new Date().getTime(),
    };
    setUrls((prev) => [...prev, newUrl]);
    // Log the creation event
    await Log("frontend", "info", "component", `Shortened URL created: ${original} → ${newUrl.short}`);
    setUrl("");
    setExpiryDate(null);
    setKeyword("");
  };

  // Inline styles
  const formStyle = {
    background: 'rgba(255,255,255,0.65)',
    borderRadius: 22,
    boxShadow: '0 8px 32px 0 rgba(99,102,241,0.18), 0 2px 8px 0 rgba(99,102,241,0.10)',
    padding: '38px 32px 28px 32px',
    marginBottom: 40,
    maxWidth: 540,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '2px solid #a5b4fc',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55)'
  };
  const groupStyle = { marginBottom: 20, position: 'relative', zIndex: 1 };
  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    border: '2px solid #a5b4fc',
    borderRadius: 12,
    fontSize: '1.12rem',
    outline: 'none',
    background: 'rgba(255,255,255,0.92)',
    color: '#3730a3', // Make text visible and vibrant
    boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
    fontWeight: 600,
    transition: 'border 0.2s, box-shadow 0.2s',
    marginBottom: 0
  };
  const errorStyle = {
    background: 'linear-gradient(90deg, #fee2e2 60%, #fca5a5 100%)',
    color: '#b91c1c',
    borderRadius: 10,
    padding: '12px 16px',
    marginBottom: 16,
    fontSize: '1.04rem',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(239,68,68,0.10)',
    fontWeight: 500
  };
  const btnStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #6366f1 60%, #818cf8 100%)',
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.16rem',
    padding: '14px 0',
    borderRadius: 12,
    marginTop: 12,
    letterSpacing: '0.7px',
    boxShadow: '0 4px 16px rgba(99,102,241,0.13)',
    border: 'none',
    transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
    textShadow: '0 1px 2px rgba(67,56,202,0.08)',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={groupStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter original URL"
          value={original}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div style={{...groupStyle, zIndex: 1000}}>
        <label style={{fontWeight:600, color:'#3730a3', marginBottom:8, display:'block'}}>Expiry Date & Time (optional):</label>
        <DatePicker
          selected={expiryDate}
          onChange={date => setExpiryDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          inline
        />
      </div>
      <div style={groupStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Custom keyword (optional)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {error && <div style={errorStyle}>{error}</div>}
      <button type="submit" style={btnStyle}>Shorten</button>
    </form>
  );

}
export default UrlForm;
function isVAlidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}