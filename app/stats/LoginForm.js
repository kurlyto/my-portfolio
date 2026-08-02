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
      <h1 className="text-xl font-semibold tracking-tight">Audience</h1>
      <p className="mt-1 text-sm text-neutral-500">Page privee.</p>

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
          className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-black/40 dark:border-white/20 dark:bg-neutral-900 dark:focus:border-white/50"
        />

        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={pending || password.length === 0}
          className="mt-3 w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40 dark:bg-white dark:text-black"
        >
          {pending ? "Verification..." : "Entrer"}
        </button>
      </form>
    </div>
  );
}
