import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/blogs';
const MAX_WORDS = 1000;
const STORAGE_KEY = 'dev_chronicle_blogs_fallback';

const INITIAL_BLOGS = [
  {
    id: '1',
    title: 'Getting Started with React Hooks & Modular Architecture',
    author: 'Souvik Das',
    date: '2026-11-18',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    videoUrl: '',
    content:
      'React Hooks revolutionized functional components by enabling state and lifecycle management without writing class components. By organizing applications into modular folders—separating contexts, reusable UI components, and page views—developers keep codebases scalable, maintainable, and easy to debug.'
  },
  {
    id: '2',
    title: 'Understanding REST APIs and CRUD Operations with Axios',
    author: 'Rima Khara',
    date: '2026-11-19',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    videoUrl: '',
    content:
      'CRUD stands for Create, Read, Update, and Delete—the four foundational operations of persistent storage. Using Axios alongside JSON Server allows front-end engineers to simulate real asynchronous REST endpoints locally using standard HTTP verbs: POST, GET, PUT, and DELETE.'
  }
];

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOfflineDemo, setIsOfflineDemo] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [viewMode, setViewMode] = useState('list');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    imageUrl: '',
    videoUrl: '',
    content: ''
  });

  const countWords = (text) => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  };

  const getLocalBlogs = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    return INITIAL_BLOGS;
  };

  const saveLocalBlogs = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setBlogs(updated);
  };

  // READ
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { timeout: 1500 });
      setBlogs([...res.data].reverse());
      setIsOfflineDemo(false);
    } catch {
      // Fallback for Vercel / when JSON Server isn't running
      setBlogs(getLocalBlogs());
      setIsOfflineDemo(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (countWords(text) <= MAX_WORDS) {
      setFormData({ ...formData, content: text });
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ title: '', author: '', imageUrl: '', videoUrl: '', content: '' });
    setViewMode('form');
  };

  const openEditForm = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      author: blog.author,
      imageUrl: blog.imageUrl || '',
      videoUrl: blog.videoUrl || '',
      content: blog.content
    });
    setViewMode('form');
  };

  const openBlogDetail = (blog) => {
    setSelectedBlog(blog);
    setViewMode('view');
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    if (countWords(formData.content) > MAX_WORDS) return;

    const payload = {
      ...formData,
      author: formData.author.trim() || 'Anonymous',
      date: new Date().toISOString().split('T')[0]
    };

    if (!isOfflineDemo) {
      try {
        if (editingId) {
          const res = await axios.put(`${API_URL}/${editingId}`, payload);
          setBlogs(blogs.map((b) => (b.id === editingId ? res.data : b)));
        } else {
          const res = await axios.post(API_URL, payload);
          setBlogs([res.data, ...blogs]);
        }
        setViewMode('list');
        return;
      } catch {
        setIsOfflineDemo(true);
      }
    }

    // Fallback Create/Update
    if (editingId) {
      const updated = blogs.map((b) => (b.id === editingId ? { ...payload, id: editingId } : b));
      saveLocalBlogs(updated);
    } else {
      const newPost = { ...payload, id: String(Date.now()) };
      saveLocalBlogs([newPost, ...blogs]);
    }
    setViewMode('list');
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post permanently?')) return;

    if (!isOfflineDemo) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setBlogs(blogs.filter((b) => b.id !== id));
        if (selectedBlog?.id === id) setViewMode('list');
        return;
      } catch {
        setIsOfflineDemo(true);
      }
    }

    const updated = blogs.filter((b) => b.id !== id);
    saveLocalBlogs(updated);
    if (selectedBlog?.id === id) setViewMode('list');
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    return url;
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      b.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      b.author.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="blog-shell">
      <nav className="blog-nav">
        <h1 onClick={() => setViewMode('list')} style={{ cursor: 'pointer' }}>
          Dev<span>Chronicle</span>
        </h1>
        <div className="nav-btns">
          <button onClick={() => setViewMode('list')} className="btn-ghost">All Posts</button>
          <button onClick={openCreateForm} className="btn-primary">+ New Blog</button>
        </div>
      </nav>

      <main className="blog-main">
        {loading && (
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Fetching articles...</p>
          </div>
        )}

        {!loading && viewMode === 'list' && (
          <>
            <div className="search-strip">
              <input
                type="text"
                placeholder="Search blogs by keyword, title, or author..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="empty-state">
                <h3>No Blogs Available</h3>
                <p>No articles match your search, or the collection is currently empty.</p>
                <button onClick={openCreateForm} className="btn-primary" style={{ marginTop: '1rem' }}>
                  Write First Blog
                </button>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredBlogs.map((blog) => (
                  <article key={blog.id} className="blog-card">
                    {blog.imageUrl && (
                      <img src={blog.imageUrl} alt={blog.title} className="card-cover" />
                    )}
                    <div className="card-body">
                      <span className="meta-text">By {blog.author} • {blog.date}</span>
                      <h2>{blog.title}</h2>
                      <p className="excerpt">{blog.content.slice(0, 140)}...</p>
                      <div className="card-actions">
                        <button onClick={() => openBlogDetail(blog)} className="btn-view">Read More</button>
                        <button onClick={() => openEditForm(blog)} className="btn-edit">Edit</button>
                        <button onClick={() => handleDelete(blog.id)} className="btn-delete">Delete</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {!loading && viewMode === 'form' && (
          <div className="form-container">
            <h2>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            <form onSubmit={handleSubmit} className="blog-form">
              <label>Blog Title *</label>
              <input
                type="text"
                placeholder="Enter an engaging headline..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <label>Author Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />

              <label>Cover Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />

              <label>Video URL (YouTube or MP4 link - Optional)</label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              />

              <div className="word-counter-row">
                <label>Blog Content * (Max {MAX_WORDS} words)</label>
                <span className={countWords(formData.content) >= MAX_WORDS ? 'limit-hit' : ''}>
                  {countWords(formData.content)} / {MAX_WORDS} words
                </span>
              </div>
              <textarea
                rows="8"
                placeholder="Write your article here..."
                value={formData.content}
                onChange={handleContentChange}
                required
              ></textarea>

              <div className="form-footer">
                <button type="button" onClick={() => setViewMode('list')} className="btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Blog' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!loading && viewMode === 'view' && selectedBlog && (
          <article className="single-blog-view">
            <button onClick={() => setViewMode('list')} className="btn-back">
              ← Back to All Blogs
            </button>
            <h1>{selectedBlog.title}</h1>
            <p className="single-meta">
              Published by <strong>{selectedBlog.author}</strong> on {selectedBlog.date} • {countWords(selectedBlog.content)} words
            </p>

            {selectedBlog.imageUrl && (
              <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="hero-media" />
            )}

            {selectedBlog.videoUrl && (
              <div className="video-wrapper">
                <iframe
                  src={getEmbedUrl(selectedBlog.videoUrl)}
                  title="Blog Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="blog-content-body">
              {selectedBlog.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="single-actions">
              <button onClick={() => openEditForm(selectedBlog)} className="btn-edit">Edit Post</button>
              <button onClick={() => handleDelete(selectedBlog.id)} className="btn-delete">Delete Post</button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}