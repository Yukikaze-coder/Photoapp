import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMoon } from "react-icons/fa"; // If using react-icons
import './Comment.css';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface Photo {
  id: number;
  url: string;
  title?: string;
}

interface CommentProps {
  photoId: number;
  comments: Comment[];
  onAddComment: (photoId: number, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  standalone?: boolean; // If true, render the full comment UI
  handleToggleDarkMode?: () => void; // Add this for the button
  photos?: Photo[];
  onSelectPhoto?: (photoId: number) => void;
}

const CommentSection: React.FC<CommentProps> = ({
  photoId,
  comments,
  onAddComment,
  standalone = false,
  handleToggleDarkMode,
  photos,
  onSelectPhoto,
}) => {
  const navigate = useNavigate();
  const [author, setAuthor] = React.useState('');
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      alert('Please fill out both fields.');
      return;
    }
    onAddComment(photoId, { author, text });
    setAuthor('');
    setText('');
  };

  // Styles for the comment box
  const boxStyle: React.CSSProperties = {
    borderRadius: 16,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    background: '#fff',
    padding: '1.5rem',
    margin: '2rem auto',
    maxWidth: 500,
    cursor: standalone ? 'default' : 'pointer',
    transition: 'box-shadow 0.2s',
    border: standalone ? '2px solid #0077cc' : '2px solid #eee',
    outline: standalone ? 'none' : undefined,
    userSelect: 'none'
  };

  // Show selector if photos are provided and onSelectPhoto exists
  // Removed unused renderPhotoSelector function

  if (!standalone) {
    // The whole box acts as a button that navigates to the comment page
    return (
        <div
          style={boxStyle}
          tabIndex={0}
          onClick={() => navigate(`/comments?photoId=${photoId}`)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') navigate(`/comments?photoId=${photoId}`);
          }}
          aria-label="Open comment section"
          role="button"
        >
          {/* No button inside! Just text */}
          <div style={{ textAlign: 'center', color: '#0077cc', fontWeight: 600, fontSize: '1.2rem' }}>
            💬 Discuss and share feedback on this photo
          </div>
        </div>
      );
    }

  // Standalone full comment UI
  return (
    <div style={boxStyle}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0077cc",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "12px 12px 0 0",
          margin: "-1.5rem -1.5rem 1.5rem -1.5rem"
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer"
          }}
          aria-label="Home"
        >
          <FaHome />
        </button>
        <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>Comments</span>
        <button
          onClick={handleToggleDarkMode}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer"
          }}
          aria-label="Toggle dark mode"
        >
          <FaMoon />
        </button>
      </div>
      <h3 style={{ color: '#0077cc', marginBottom: '1rem' }}>Comments</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{
              background: '#f4f8fb',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
            }}>
              <strong style={{ color: '#0077cc' }}>{comment.author}</strong>{' '}
              <span style={{ color: 'gray', fontSize: '0.9rem' }}>
                ({new Date(comment.timestamp).toLocaleString()})
              </span>
              <p style={{ margin: '0.5rem 0 0 0' }}>{comment.text}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#888' }}>No comments yet. Be the first to comment!</p>
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Move photo selector here */}
        {photos && photos.length > 0 && onSelectPhoto && (
          <select
            id="photo-select"
            value={photoId}
            onChange={e => onSelectPhoto(Number(e.target.value))}
            style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: '1rem' }}
            required
          >
            <option value="" disabled>Select Photo</option>
            {photos.map(photo => (
              <option key={photo.id} value={photo.id}>
                {photo.title || `Photo #${photo.id}`}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: 8,
            fontSize: '1rem'
          }}
          required
        />
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: 8,
            fontSize: '1rem'
          }}
          required
        ></textarea>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              background: '#eee',
              color: '#0077cc',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Back
          </button>
          <button
            type="submit"
            style={{
              background: '#0077cc',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;