import React from "react";
import UrlCard from "./UrlCard";

function UrlList({ urls, deleteUrl }) {
  return (
    <div>
      {urls.length === 0 ? (
        <p className="text-muted">No shortened URLs yet.</p>
      ) : (
        urls.map((url) => (
          <UrlCard key={url.short} url={url} deleteUrl={deleteUrl} />
        ))
      )}
    </div>
  );
}

export default UrlList;
