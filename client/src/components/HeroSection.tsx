import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-juice.jpg";

const transition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const };

const HeroSection = () => {
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Fresh sugarcane juice being pressed" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative container py-24 md:py-36 flex flex-col items-start gap-6">
        {/* Freshness badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
        >
          ✓ Quality Checked · {today}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl text-primary-foreground max-w-xl leading-tight"
        >
          Pure Sugarcane. No Shortcuts.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="text-primary-foreground/80 text-lg max-w-md"
        >
          Crushed fresh at 4°C. 100% Natural. Served with pride in Dudulgaon, Pune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="https://maps.app.goo.gl/XHDYW2uTUoqMsFiN7?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all"
          >
            <MapPin className="w-4 h-4" /> Visit Us
          </a>
          <a
            href="https://wa.me/917722059126?text=Hi%20I%20want%20to%20order%20sugarcane%20juice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
