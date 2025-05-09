import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "../types";
import "./Gallery.css";

interface GalleryProps {
  photos: Photo[];
  onSelectPhoto: (photoId: number) => void;
  onBack?: () => void; // Optional back handler
}

const Gallery: React.FC<GalleryProps> = ({ photos, onSelectPhoto }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const btn = document.getElementById("toggle-dark-mode");
    const toggle = () => {
      document.body.classList.toggle("dark");
    };
    btn?.addEventListener("click", toggle);
    return () => {
      btn?.removeEventListener("click", toggle);
    };
  }, []);

  return (
    <div>
      <header className="gallery-header">
        <button
          className="gallery-home-btn"
          onClick={() => navigate("/")}
          aria-label="Go to Home"
        >
          {/* Same icon as Persona */}
          <span role="img" aria-label="Home">
            🏠
          </span>
        </button>
        <h1>ProCamShare - Gallery</h1>
        <button
          id="toggle-dark-mode"
          aria-label="Toggle dark mode"
          className="toggle-dark-btn"
        >
          🌙
        </button>
      </header>
      <div className="gallery-page">
        <div className="gallery-grid">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div
                key={photo.id}
                className="gallery-item modern"
                onClick={() => onSelectPhoto(photo.id)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${photo.metadata.name}`}
                style={{ cursor: "pointer" }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onSelectPhoto(photo.id);
                }}
              >
                <div className="gallery-img-wrapper">
                  <img
                    src={photo.url}
                    alt={photo.metadata.name}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-hover-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="gallery-caption">
                  <h4>{photo.metadata.name}</h4>
                  <p>{photo.metadata.camera}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="gallery-empty">
              <p>No photos available. Please upload some!</p>
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>
          Made with ❤️ for photographers. &copy; 2025 ProCamShare / Code
          Chrysalis
        </p>
      </footer>
    </div>
  );
};

export default Gallery;
