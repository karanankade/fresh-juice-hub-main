import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const fallbackReviews = [
  { _id: "1", name: "Amit K.", text: "Best sugarcane juice in Pune! Super fresh and hygienic.", rating: 5 },
  { _id: "2", name: "Priya M.", text: "The ginger lemon variant is amazing. My kids love it too.", rating: 5 },
  { _id: "3", name: "Rahul S.", text: "Affordable and tasty. The masala juice is a must-try!", rating: 4 },
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/reviews")
      .then(({ data }) => setReviews(data.length > 0 ? data : fallbackReviews))
      .catch(() => setReviews(fallbackReviews))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/reviews", { name, text, rating });
      toast.success("Review submitted! It will appear after admin approval.");
      setName(""); setText(""); setRating(5);
    } catch {
      toast.error("Failed to submit review");
    }
    setSubmitting(false);
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-2">Reviews</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">What Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl shadow-card space-y-3 animate-pulse">
                  <div className="flex gap-1">{Array.from({ length: 5 }).map((_, j) => <div key={j} className="w-4 h-4 bg-muted rounded" />)}</div>
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                  <div className="h-4 w-1/3 bg-muted rounded" />
                </div>
              ))
            : reviews.map((r, i) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  className="bg-card p-6 rounded-2xl shadow-card"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < r.rating ? "text-accent-foreground fill-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{r.text}"</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                </motion.div>
              ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-md mx-auto">
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl shadow-card space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your Review" required rows={3} className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Rating:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setRating(s)}>
                  <Star className={`w-5 h-5 ${s <= rating ? "text-accent-foreground fill-accent" : "text-border"}`} />
                </button>
              ))}
            </div>
            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all disabled:opacity-50">
              <Send className="w-4 h-4" /> {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
