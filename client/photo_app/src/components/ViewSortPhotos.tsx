import React, { useState, useMemo } from 'react';
import CommentSection from '../components/Comment';
import './Persona.css'; 

interface Photo {
  id: number;
  url: string;
  title?: string;
  uploadedAt?: string;
  [key: string]: string | number | undefined;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

const mockPhotos: Photo[] = [
  { id: 1, url: '/Nikon.jpg', title: 'Nikon', uploadedAt: '2024-05-01' },
  { id: 2, url: '/Canon XF605.jpg', title: 'Canon', uploadedAt: '2024-05-02' },
  { id: 3, url: '/cameraBanner.jpg', title: 'Sony', uploadedAt: '2024-05-03' },
];

const mockComments: { [photoId: number]: Comment[] } = {
  1: [],
  2: [],
  3: [],
};

const ViewSortPhotos: React.FC = () => {
  const [photos] = useState<Photo[]>(mockPhotos);
  const [comments, setComments] = useState<{ [photoId: number]: Comment[] }>(mockComments);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'uploadedAt'>('uploadedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);

  // Filter and sort photos
  const filteredPhotos = useMemo(() => {
    let result = photos;
    if (filter.trim()) {
      result = result.filter(photo =>
        (photo.title || '').toLowerCase().includes(filter.toLowerCase())
      );
    }
    result = [...result].sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';
      if (sortBy === 'uploadedAt') {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        aVal = aDate.toString();
        bVal = bDate.toString();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [photos, filter, sortBy, sortOrder]);

  // Add comment handler
  const handleAddComment = (photoId: number, comment: Omit<Comment, 'id' | 'timestamp'>) => {
    setComments(prev => ({
      ...prev,
      [photoId]: [
        ...(prev[photoId] || []),
        {
          ...comment,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  };

  return (
    <div className="persona-container" style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2 style={{ color: '#0077cc', marginBottom: 24 }}>View &amp; Sort Photos</h2>
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Filter by title..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid #ccc',
            borderRadius: 8,
            fontSize: '1rem',
            flex: 1,
            minWidth: 180
          }}
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'title' | 'uploadedAt')}
          style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc' }}
        >
          <option value="uploadedAt">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <button
          onClick={() => setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))}
          style={{
            background: '#0077cc',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1.2rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc'}
        </button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 24
      }}>
        {filteredPhotos.map(photo => (
          <div
            key={photo.id}
            className="persona-card"
            style={{
              borderRadius: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              background: '#fff',
              padding: '1.5rem',
              marginBottom: 16,
              border: selectedPhotoId === photo.id ? '2px solid #0077cc' : '2px solid #eee',
              transition: 'border 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPhotoId(photo.id)}
          >
            <img
              src={photo.url}
              alt={photo.title || `Photo #${photo.id}`}
              style={{
                width: '100%',
                borderRadius: 12,
                marginBottom: 12,
                objectFit: 'cover',
                maxHeight: 180
              }}
            />
            <div style={{ fontWeight: 700, color: '#0077cc', fontSize: '1.1rem', marginBottom: 4 }}>
              {photo.title || `Photo #${photo.id}`}
            </div>
            <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: 8 }}>
              Uploaded: {photo.uploadedAt ? new Date(photo.uploadedAt).toLocaleDateString() : 'Unknown'}
            </div>
            <button
              style={{
                background: '#f4f8fb',
                color: '#0077cc',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 8
              }}
              onClick={e => {
                e.stopPropagation();
                setSelectedPhotoId(photo.id);
              }}
            >
              💬 Comment
            </button>
            {selectedPhotoId === photo.id && (
              <div style={{ marginTop: 12 }}>
                <CommentSection
                  photoId={photo.id}
                  comments={comments[photo.id] || []}
                  onAddComment={handleAddComment}
                  standalone={true}
                  photos={filteredPhotos}
                  onSelectPhoto={setSelectedPhotoId}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSortPhotos;