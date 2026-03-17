import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import api from "@/lib/api";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if an admin already exists
    api.get("/auth/can-signup")
      .then(({ data }) => setBlocked(!data.allowed))
      .catch(() => setBlocked(true));
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", { email, password });
      localStorage.setItem("admin_token", data.token);
      toast.success("Account created! Welcome, Admin.");
      navigate("/admin");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (blocked === null) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center bg-card p-8 rounded-2xl shadow-card">
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display font-bold text-xl mb-2">Access Denied</h1>
          <p className="text-sm text-muted-foreground mb-6">
            An admin account already exists. Only one admin account is allowed.
          </p>
          <Link
            to="/admin-login"
            className="inline-block w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-center hover:-translate-y-0.5 transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl">Create Admin Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Nath Krupa Raswanti Gruh</p>
        </div>

        <form onSubmit={handleSignup} className="bg-card p-6 rounded-2xl shadow-card space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-muted pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-muted pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Min. 6 characters"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full bg-muted pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/admin-login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
