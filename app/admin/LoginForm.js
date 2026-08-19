"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/stats/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError((await res.json())?.error ?? "Connexion impossible");
        return;
      }

      // refresh() force le composant serveur a relire le cookie : la page
      // bascule sur le dashboard sans rechargement complet.
      router.refresh();
    } catch {
      setError("Connexion impossible");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/50">Espace prive</p>
      <h1 className="mt-2 font-display text-4xl font-bold leading-none">Tableau de bord</h1>
      <p className="mt-3 text-[15px] text-black/60">Page privee.</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="stats-password" className="sr-only">
          Mot de passe
        </label>
        <input
          id="stats-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border border-black/20 bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#ff6b35]"
        />

        {error && <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-[#d03b3b]">{error}</p>}

        <button
          type="submit"
          disabled={pending || password.length === 0}
          className="mt-3 w-full rounded-full px-4 py-3 font-mono text-[13px] font-bold uppercase tracking-wide text-white transition-all duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
          style={{ background: "#ff6b35" }}
        >
          {pending ? "Verification..." : "Entrer"}
        </button>
      </form>
    </div>
  );
}
