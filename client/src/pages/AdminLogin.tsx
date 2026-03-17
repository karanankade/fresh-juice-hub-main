import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import api from "@/lib/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("admin_token", data.token);
      toast.success("Welcome, Admin!");
      navigate("/admin");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Nath Krupa Raswanti Gruh</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card p-6 rounded-2xl shadow-card space-y-4">
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
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-card-lg active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/admin-signup" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
