import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Heart, Zap } from "lucide-react";

const highlights = [
  { icon: Leaf, title: "100% Natural", desc: "No water, no sugar, no preservatives." },
  { icon: ShieldCheck, title: "Hygienic Process", desc: "Stainless steel machines, cleaned every hour." },
  { icon: Heart, title: "Made with Care", desc: "Owned by Rushikesh Borade — a passion for freshness." },
  { icon: Zap, title: "Quick Service", desc: "Fresh juice ready in under 2 minutes." },
];

const AboutSection = () => (
  <section id="about" className="py-20">
    <div className="container">
      <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-2">About Us</p>
      <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Nath Krupa Raswanti Gruh</h2>
      <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
        Your go-to place for fresh and healthy sugarcane juice in Dudulgaon, Pune. We serve pure, hygienic,
        and refreshing juice made from high-quality sugarcane — keeping you cool and energized since day one.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="bg-card p-6 rounded-2xl shadow-card-sm"
          >
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-4">
              <h.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-1">{h.title}</h3>
            <p className="text-sm text-muted-foreground">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
