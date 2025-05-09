import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import initialComments from "./sample_data/initial_comments";
import samplePhotos from "./sample_data/sample_photos";
import CommentPage from "./pages/CommentPage";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import HomePage from "./pages/HomePage";
import Persona from "./components/Persona";
import UploadPhoto from "./components/Upload";

import { Photo } from "./types";

function App() {
  const [currentSort, setCurrentSort] = useState("date");
  const [currentFilter, setCurrentFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loginToken, setLoginToken] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    setUserPhotos(samplePhotos);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setLoginToken(token);
    }
  }, []);

  // Handler for selecting a photo (can be expanded)
  const handleSelectPhoto = (photoId: number) => {
    alert(`Photo ${photoId} selected!`);
  };

  // Handler to add a comment
  const handleAddComment = (
    photoId: number,
    comment: { author: string; text: string }
  ) => {
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        photoId,
        author: comment.author,
        text: comment.text,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleLogout = () => {
    setLoginToken("");
    localStorage.removeItem("loginToken");
    setStatusMessage("Logged out!");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              currentSort={currentSort}
              currentFilter={currentFilter}
              darkMode={darkMode}
              loginToken={loginToken}
              statusMessage={statusMessage}
              setStatusMessage={setStatusMessage}
              setLoginToken={setLoginToken}
              handleToggleDarkMode={() => setDarkMode((prev) => !prev)}
              handleSortChange={setCurrentSort}
              handleFilterChange={setCurrentFilter}
              comments={comments}
              onAddComment={handleAddComment}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/upload"
          element={<UploadPhoto setUserPhotos={setUserPhotos} />}
        />
        <Route path="/persona" element={<Persona />} />
        <Route
          path="/gallery"
          element={
            <Gallery
              photos={userPhotos}
              onSelectPhoto={handleSelectPhoto}
              onBack={() => window.history.back()}
            />
          }
        />
        {/* Comment page route */}
        <Route
          path="/comments"
          element={
            <CommentPage comments={comments} onAddComment={handleAddComment} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
