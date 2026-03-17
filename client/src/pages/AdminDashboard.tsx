import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, FileText, Image, Star, MessageSquare, Plus, Trash2, Check, X, Upload } from "lucide-react";
import api from "@/lib/api";

type Tab = "blogs" | "gallery" | "reviews" | "messages";

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("blogs");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  };

  const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: "blogs", label: "Blogs", icon: FileText },
    { key: "gallery", label: "Gallery", icon: Image },
    { key: "reviews", label: "Reviews", icon: Star },
    { key: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card shadow-card-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display font-bold text-lg">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-card/80"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "blogs" && <BlogsManager />}
        {tab === "gallery" && <GalleryManager />}
        {tab === "reviews" && <ReviewsManager />}
        {tab === "messages" && <MessagesManager />}
      </div>
    </div>
  );
};

// ---- BLOGS ----
function BlogsManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Health");

  const fetchBlogs = () => api.get("/blogs").then(({ data }) => setBlogs(data));
  useEffect(() => { fetchBlogs(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/blogs", { title, excerpt, content, category });
      toast.success("Blog added!");
      setShowForm(false); setTitle(""); setExcerpt(""); setContent(""); setCategory("Health");
      fetchBlogs();
    } catch { toast.error("Failed to add blog"); }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/blogs/${id}`);
    toast.success("Blog deleted");
    fetchBlogs();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display font-semibold text-xl">Manage Blogs</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Blog
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-card p-6 rounded-2xl shadow-card space-y-3 mb-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none">
            <option>Health</option><option>Tips</option><option>Summer Drinks</option><option>News</option>
          </select>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt" className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content" rows={5} className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none resize-none" />
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold">Save</button>
        </form>
      )}
      <div className="space-y-3">
        {blogs.map((b) => (
          <div key={b._id} className="bg-card p-4 rounded-2xl shadow-card-sm flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{b.category}</span>
              <h3 className="font-display font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.excerpt}</p>
            </div>
            <button onClick={() => handleDelete(b._id)} className="text-destructive p-2 hover:bg-destructive/10 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {blogs.length === 0 && <p className="text-muted-foreground text-sm">No blogs yet. Add your first one!</p>}
      </div>
    </div>
  );
}

// ---- GALLERY ----
function GalleryManager() {
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchItems = () => api.get("/gallery").then(({ data }) => setItems(data));
  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append("files", f));
    try {
      await api.post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Uploaded!");
      fetchItems();
    } catch { toast.error("Upload failed"); }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/gallery/${id}`);
    toast.success("Deleted");
    fetchItems();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display font-semibold text-xl">Manage Gallery</h2>
        <label className={`flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer ${uploading ? "opacity-50" : ""}`}>
          <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Files"}
          <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="relative group rounded-2xl overflow-hidden shadow-card aspect-square bg-card">
            {item.media_type === "video" ? (
              <video src={item.url} className="w-full h-full object-cover" muted />
            ) : (
              <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
            )}
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm col-span-full">No gallery items. Upload photos or videos!</p>}
      </div>
    </div>
  );
}

// ---- REVIEWS ----
function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = () => api.get("/reviews/all").then(({ data }) => setReviews(data));
  useEffect(() => { fetchReviews(); }, []);

  const toggleApprove = async (id: string) => {
    await api.patch(`/reviews/${id}/approve`);
    toast.success("Updated!");
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/reviews/${id}`);
    toast.success("Deleted");
    fetchReviews();
  };

  return (
    <div>
      <h2 className="font-display font-semibold text-xl mb-4">Manage Reviews</h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="bg-card p-4 rounded-2xl shadow-card-sm flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{r.name}</span>
                <span className="text-xs text-muted-foreground">{"⭐".repeat(r.rating)}</span>
                {r.approved ? (
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">Approved</span>
                ) : (
                  <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-md">Pending</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => toggleApprove(r._id)} className="p-2 hover:bg-muted rounded-lg" title={r.approved ? "Unapprove" : "Approve"}>
                {r.approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4 text-primary" />}
              </button>
              <button onClick={() => handleDelete(r._id)} className="text-destructive p-2 hover:bg-destructive/10 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-muted-foreground text-sm">No reviews yet.</p>}
      </div>
    </div>
  );
}

// ---- MESSAGES ----
function MessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = () => api.get("/messages").then(({ data }) => setMessages(data));
  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await api.patch(`/messages/${id}/read`);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/messages/${id}`);
    toast.success("Deleted");
    fetchMessages();
  };

  return (
    <div>
      <h2 className="font-display font-semibold text-xl mb-4">Customer Messages</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className={`bg-card p-4 rounded-2xl shadow-card-sm flex justify-between items-start ${!m.read ? "border-l-4 border-primary" : ""}`}>
            <div onClick={() => !m.read && markRead(m._id)} className="cursor-pointer flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{m.name}</span>
                {!m.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                <span className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">{m.message}</p>
            </div>
            <button onClick={() => handleDelete(m._id)} className="text-destructive p-2 hover:bg-destructive/10 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted-foreground text-sm">No messages yet.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
