import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credential fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Direct login bypass of MFA
        onLogin({
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
          accessToken: data.accessToken
        });
        if (data.user.role === "employee") {
          navigate("/report-incident");
        } else {
          navigate("/");
        }
        return;
      } else {
        setError(data.message || "Invalid security credentials provided.");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Backend API offline. Authenticating against local simulation database.");
    }

    // Local simulation fallback authentication (MFA Bypassed)
    const allHelpers = [
      {
        email: "Admin123@sentinelx.io",
        password: "AdminSec123",
        role: "admin",
        name: "System Administrator"
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        email: `analyst${i + 1}@sentinelx.io`,
        password: `Analyst@123456`,
        role: "soc",
        name: `SOC Analyst ${i + 1}`
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        email: `employee${i + 1}@sentinelx.io`,
        password: `Employee@123456`,
        role: "employee",
        name: `Employee Operator ${i + 1}`
      }))
    ];

    const match = allHelpers.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (match) {
      onLogin({
        email: match.email,
        role: match.role,
        name: match.name,
        accessToken: "mock-session-token"
      });
      if (match.role === "employee") {
        navigate("/report-incident");
      } else {
        navigate("/");
      }
    } else {
      setError("Invalid security credentials provided.");
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center px-4 animate-in fade-in duration-300 relative"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] z-0"></div>
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 z-10 relative">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-3">SentinelX Security Center</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Immutability Ledger & AI threat analytics</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Corporate Email / ID</label>
            <input
              type="email"
              placeholder="e.g. analyst1@sentinelx.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-850 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Security Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-blue-500/10 transition duration-150 cursor-pointer border-0 mt-2 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Authenticate Portal"}
          </button>
        </form>

      </div>

    </div>
  );
}
