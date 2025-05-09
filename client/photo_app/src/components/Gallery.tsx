import React, { useEffect, useState } from "react";
import { Photo } from "../types";

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("photos");
    if (stored) {
      setPhotos(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = photos.filter((photo) => photo.id !== id);
    setPhotos(updated);
    localStorage.setItem("photos", JSON.stringify(updated));
  };

  const handlePhotoClick = (photo: Photo) => {
    setFullscreenPhoto(photo);
  };

  const handleCloseFullscreen = () => {
    setFullscreenPhoto(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {photos.length === 0 && <p>No photos uploaded yet.</p>}
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 8,
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={photo.url}
              alt={photo.metadata.name}
              style={{ maxWidth: 200, borderRadius: 8 }}
              onClick={() => handlePhotoClick(photo)}
            />
            <div>
              <strong>{photo.metadata.name}</strong>
            </div>
            <button
              onClick={() => handleDelete(photo.id)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "0.25rem 0.5rem",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {fullscreenPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseFullscreen}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "/";
            }}
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              background: "#fff",
              color: "#0077cc",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            🏠 Home
          </button>
          <img
            src={fullscreenPhoto.url}
            alt={fullscreenPhoto.metadata.name}
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            style={{
              color: "#fff",
              marginTop: 16,
              fontSize: "1.25rem",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{fullscreenPhoto.metadata.name}</strong>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseFullscreen();
            }}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
