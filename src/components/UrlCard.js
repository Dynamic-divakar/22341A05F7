import React, { useEffect, useState } from "react";

function UrlCard({ url, deleteUrl }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!url.expiry) return;
    const interval = setInterval(() => {
      const diff = url.expiry - new Date().getTime();
      if (diff <= 0) {
        setRemaining("Expired");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setRemaining(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [url.expiry]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url.short);
    alert("Copied to clipboard!");
  };

  return (
    <div className="custom-url-card">
      <div className="custom-url-card-body">
        <h5 className="custom-url-card-title">
          <a className="custom-url-link" href={url.original} target="_blank" rel="noopener noreferrer">
            {url.short}
          </a>
        </h5>
        <p className="custom-url-card-text"><strong>Original:</strong> {url.original}</p>
        {url.keyword && <p className="custom-url-card-text"><strong>Keyword:</strong> {url.keyword}</p>}
        {url.expiry && <p className="custom-url-card-text custom-url-expiry"><strong>Expires in:</strong> {remaining}</p>}
        <div className="custom-url-card-actions">
          <button className="btn custom-btn custom-btn-success" onClick={copyToClipboard}>Copy</button>
          <button className="btn custom-btn custom-btn-danger" onClick={() => deleteUrl(url.short)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default UrlCard;
