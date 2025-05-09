import React, { useRef, useState } from "react";
import "../App.css";
import { Photo, Metadata } from "../types.ts";

const UploadPhoto: React.FC = ({ setUserPhotos }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setStatusMessage("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    setStatusMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setStatusMessage("Please select a photo to upload.");
      return;
    } else {
      const name = file.name;
      localStorage.setItem(name, file);
      const metadata: Metadata = {
        name: name,
        camera: null,
        lens: null,
        iso: null,
        shutter: null,
        aperture: null,
      };
      const picture: Photo = {
        id: Math.floor(Math.random() * 1_000_000), // assign photo a random ID
        url: "", // todo: use localstorage here. It seems like a dataUrl can be created with the canvas API
        metadata,
      };
      setPhoto(picture);
      console.log(picture);
    }

    // setStatusMessage("Uploading...");

    // const formData = new FormData();
    // formData.append("img", file);
    // formData.append("title", title);
    // formData.append("description", description);
    // console.log("react form data:", formData
    // try {
    //   const token = localStorage.getItem("photo-app-token");
    //   const res = await fetch("/api/images/", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-type": "application/json",
    //     },
    //     body: formData.get("img"),
    //   });

    //   if (res.ok) {
    //     console.log();

    //     setStatusMessage("Photo uploaded successfully!");
    //     setPreview(null);
    //     setTitle("");
    //     setDescription("");
    //     if (fileInputRef.current) fileInputRef.current.value = "";
    //   } else {
    //     console.error(res);
    //     setStatusMessage("Upload failed.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setStatusMessage("Error uploading photo.");
    // }
  };

  return (
    <div
      className="auth-bg"
      style={{ minHeight: "100vh", background: "#f4f4f4" }}
    >
      <header
        style={{
          background: "#0077cc",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.5rem" }}>ProCamShare</div>
        <a
          href="/"
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            background: "#fff",
            color: "#0077cc",
            padding: "0.5rem 1rem",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          🏠 Home
        </a>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <form
          className="upload-form"
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          onSubmit={handleSubmit}
        >
          <h2 style={{ textAlign: "center", marginBottom: 0 }}>Upload Photo</h2>
          <div
            className={`drop-area${dragActive ? " dragover" : ""}`}
            style={{
              border: "2px dashed #0077cc",
              borderRadius: 10,
              padding: "2rem",
              textAlign: "center",
              color: "#0077cc",
              background: dragActive ? "#e3f1fc" : "#f9f9f9",
              cursor: "pointer",
              transition: "background 0.3s, border-color 0.3s",
            }}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {!preview && (
              <span>Drag &amp; drop a photo here, or click to select</span>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleInputChange}
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 180,
                  margin: "1rem auto",
                  display: "block",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
            )}
          </div>
          <input
            type="text"
            className="input-field"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: "1rem",
            }}
          />
          <textarea
            className="input-field"
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            className="button"
            style={{
              background: "#0077cc",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
          <div
            className="status-message"
            style={{
              textAlign: "center",
              color: "#0077cc",
              minHeight: "1.5em",
            }}
          >
            {statusMessage}
          </div>
        </form>
      </main>
      <footer
        style={{
          background: "#0077cc",
          color: "#fff",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <p>
          Made with ❤️ for photographers. &copy; 2025 ProCamShare / Code
          Chrysalis
        </p>
      </footer>
    </div>
  );
};

export default UploadPhoto;
