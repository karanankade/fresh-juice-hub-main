import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/messages", { name, message });
      toast.success("Message sent! We'll get back to you soon.");
      setName(""); setMessage("");
    } catch { toast.error("Failed to send message"); }
    setSending(false);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-2">Contact</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <motion.a href="https://maps.app.goo.gl/XHDYW2uTUoqMsFiN7?g_st=aw" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="flex items-start gap-4 bg-card p-5 rounded-2xl shadow-card-sm">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Our Location</h3>
                <p className="text-sm text-muted-foreground">MVFM+W3G, Talekar Nagar, Dudulgaon, Pune, Pimpri-Chinchwad, Maharashtra 412105</p>
              </div>
            </motion.a>

            <motion.a href="tel:7722059126" whileHover={{ y: -2 }} className="flex items-start gap-4 bg-card p-5 rounded-2xl shadow-card-sm">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Call Us</h3>
                <p className="text-sm text-muted-foreground">+91 77220 59126 — Rushikesh Borade</p>
              </div>
            </motion.a>

            <motion.a href="https://wa.me/917722059126" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="flex items-start gap-4 bg-card p-5 rounded-2xl shadow-card-sm">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Chat with us for orders & enquiries</p>
              </div>
            </motion.a>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl shadow-card space-y-4">
            <h3 className="font-display font-semibold text-lg mb-2">Send a Message</h3>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />
            <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full bg-muted px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none" />
            <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all disabled:opacity-50">
              <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
