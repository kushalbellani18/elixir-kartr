import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Send } from "lucide-react";

const verticals = [
  "Fitness & Sport",
  "Media & Entertainment",
  "Finance (Wall Street)",
  "Real Estate",
  "Manufacturing",
  "Other",
];

export function ConsultForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    vertical: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all duration-300";
  const labelClass = "block text-xs font-medium text-primary/80 uppercase tracking-widest mb-2";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-primary/40 bg-primary/10 mb-8"
        >
          <CheckCircle className="text-primary" size={36} />
        </motion.div>
        <h3 className="text-3xl font-serif text-white mb-4">Request Received</h3>
        <p className="text-white/60 font-light leading-relaxed max-w-md mx-auto">
          Thank you for reaching out. The Elixir Kartr team will review your request and respond within 24 hours to schedule your private consultation.
        </p>
        <p className="mt-6 text-primary/70 text-sm tracking-wider uppercase">
          elixirkartr.strategy@zohomail.in
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-consult">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            data-testid="input-name"
            type="text"
            name="name"
            required
            placeholder="Alexandra Chen"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Company / Organization</label>
          <input
            data-testid="input-company"
            type="text"
            name="company"
            placeholder="Blackstone Capital"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Email Address *</label>
          <input
            data-testid="input-email"
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone (optional)</label>
          <input
            data-testid="input-phone"
            type="tel"
            name="phone"
            placeholder="+1 (212) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Industry Vertical</label>
        <select
          data-testid="select-vertical"
          name="vertical"
          value={form.vertical}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" className="bg-[#0d0d0f]">Select your industry...</option>
          {verticals.map((v) => (
            <option key={v} value={v} className="bg-[#0d0d0f]">{v}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Your Challenge / Vision *</label>
        <textarea
          data-testid="textarea-message"
          name="message"
          required
          rows={5}
          placeholder="Describe the AI/ML challenge or strategic objective you're seeking to address..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm border border-red-500/20 bg-red-500/5 px-4 py-3"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        <button
          data-testid="button-submit"
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Request Your Consult
            </>
          )}
        </button>
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Replies within 24 hours
        </span>
      </div>
    </form>
  );
}
