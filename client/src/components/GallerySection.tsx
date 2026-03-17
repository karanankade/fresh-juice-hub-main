import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import api from "@/lib/api";

import heroImage from "@/assets/hero-juice.jpg";
import juiceNormal from "@/assets/juice-normal.jpg";
import juiceGingerLemon from "@/assets/juice-ginger-lemon.jpg";
import juiceMasala from "@/assets/juice-masala.jpg";

const fallbackImages = [
  { _id: "1", url: heroImage, alt: "Sugarcane juice machine in action", media_type: "image" },
  { _id: "2", url: juiceNormal, alt: "Fresh sugarcane juice glass", media_type: "image" },
  { _id: "3", url: juiceGingerLemon, alt: "Ginger lemon sugarcane juice", media_type: "image" },
  { _id: "4", url: juiceMasala, alt: "Masala sugarcane juice with spices", media_type: "image" },
];

const GallerySection = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/gallery")
      .then(({ data }) => setItems(data.length > 0 ? data : fallbackImages))
      .catch(() => setItems(fallbackImages))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-20">
      <div className="container">
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-2">Gallery</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">Inside Our Shop</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl aspect-square bg-muted animate-pulse" />
              ))
            : items.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="overflow-hidden rounded-2xl shadow-card aspect-square relative group"
                >
                  {item.media_type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted loop playsInline
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                        <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.alt || "Gallery image"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
