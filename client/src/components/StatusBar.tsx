const StatusBar = () => {
  const hour = new Date().getHours();
  const isOpen = hour >= 9 && hour < 21;

  return (
    <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium mt-16">
      <div className="container flex items-center justify-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-accent animate-pulse" : "bg-primary-foreground/40"}`} />
        {isOpen ? "Open Now — Serving Fresh Juice" : "Opening at 9:00 AM"}
        <span className="text-primary-foreground/60 ml-2">Dudulgaon, Pune</span>
      </div>
    </div>
  );
};

export default StatusBar;
