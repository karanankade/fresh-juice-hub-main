const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-10">
    <div className="container text-center space-y-3">
      <h3 className="font-display font-bold text-xl">Nath Krupa Raswanti Gruh</h3>
      <p className="text-primary-foreground/70 text-sm">
        Talekar Nagar, Dudulgaon, Pune · +91 77220 59126
      </p>
      <p className="text-primary-foreground/50 text-xs">
        © {new Date().getFullYear()} Nath Krupa Raswanti Gruh. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
