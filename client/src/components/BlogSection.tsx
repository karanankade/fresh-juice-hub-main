import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import api from "@/lib/api";

const fallbackPosts = [
  { _id: "1", title: "5 Benefits of Sugarcane Juice You Didn't Know", excerpt: "From boosting immunity to improving digestion, sugarcane juice is packed with natural goodness.", category: "Health", createdAt: "2026-03-12" },
  { _id: "2", title: "Summer Health Tips: Stay Cool Naturally", excerpt: "Beat the Pune heat with natural drinks — skip the sodas and reach for fresh sugarcane.", category: "Tips", createdAt: "2026-03-08" },
  { _id: "3", title: "Why Fresh Juice is Better Than Packaged", excerpt: "Packaged juices contain preservatives and added sugar. Here's why fresh always wins.", category: "Health", createdAt: "2026-03-01" },
];

const BlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blogs")
      .then(({ data }) => setPosts(data.length > 0 ? data : fallbackPosts))
      .catch(() => setPosts(fallbackPosts))
      .finally(() => setLoading(false));
  }, []);

  const shareOnWhatsApp = (title: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out: ${title}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  return (
    <section id="blog" className="py-20 bg-muted/50">
      <div className="container">
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-2">Blog</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">Fresh Reads</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl shadow-card p-6 space-y-3 animate-pulse">
                  <div className="h-3 w-16 bg-muted rounded" />
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              ))
            : posts.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-card rounded-2xl shadow-card p-6 flex flex-col hover:-translate-y-1 transition-transform"
                >
                  <span className="text-[10px] tracking-widest uppercase font-bold text-primary mb-3">{post.category}</span>
                  <h3 className="font-display font-semibold text-lg mb-2 tracking-tight">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <button onClick={() => shareOnWhatsApp(post.title)} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                  </div>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
