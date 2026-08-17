"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#ff6b35";

// Au-dela, on coupe : un cadrage tient en 2 minutes et la facture Groq reste
// bornee.
const MAX_SECONDS = 120;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function MicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3" />
      <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2.08A7 7 0 0 0 19 11" />
    </svg>
  );
}

function StopIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

/**
 * Bouton + retour visuel d'enregistrement. Une fois le vocal transcrit,
 * `onResult` recoit le texte : c'est l'appelant qui decide quoi en faire.
 *
 * Deux variantes :
 *   - "overlay" (defaut) : modale plein ecran avec minuteur et onde. Adaptee
 *     au CTA du hero, ou le vocal EST l'action principale.
 *   - "inline" : tout se passe sur le bouton lui-meme (halo pulse, minuteur en
 *     pastille au-dessus). Adaptee a la barre de chat, ou une modale au milieu
 *     de l'ecran couperait la conversation en cours.
 */
export default function VoiceRecorder({ onResult, className, children, motionProps, onPreferWriting, variant = "overlay" }) {
  const [state, setState] = useState("idle"); // idle | recording | sending | error
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState(null);

  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const cancelledRef = useRef(false);

  // Coupe le micro quoi qu'il arrive : sans ca, l'indicateur d'enregistrement
  // du navigateur reste allume apres la fermeture de l'overlay.
  function releaseMic() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  useEffect(() => releaseMic, []);

  useEffect(() => {
    if (state !== "recording") return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === "recording" && seconds >= MAX_SECONDS) stop();
  }, [seconds, state]);

  async function start() {
    setError(null);
    setSeconds(0);
    cancelledRef.current = false;
    chunksRef.current = [];

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Ton navigateur ne permet pas l'enregistrement. Ecris-moi ton besoin.");
      setState("error");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = handleStop;
      recorder.start();
      setState("recording");
    } catch {
      // Permission refusee, micro absent, ou contexte non securise.
      setError("Je n'ai pas acces au micro. Verifie l'autorisation, ou ecris-moi ton besoin.");
      setState("error");
    }
  }

  async function handleStop() {
    releaseMic();
    if (cancelledRef.current) {
      setState("idle");
      return;
    }

    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    if (blob.size < 1000) {
      setError("Le message est trop court.");
      setState("error");
      return;
    }

    setState("sending");
    try {
      const form = new FormData();
      form.append("audio", blob, "voice.webm");
      const res = await fetch("/api/chat/transcribe", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message ?? "La transcription a echoue, reessaie.");
        setState("error");
        return;
      }

      setState("idle");
      onResult(data.text);
    } catch {
      setError("La connexion a ete interrompue.");
      setState("error");
    }
  }

  function stop() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function cancel() {
    cancelledRef.current = true;
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    } else {
      releaseMic();
      setState("idle");
    }
  }

  const open = state === "recording" || state === "sending" || state === "error";
  const inline = variant === "inline";

  // En inline, une erreur n'a pas de modale a fermer : elle s'affiche en
  // pastille au-dessus du bouton puis disparait toute seule.
  useEffect(() => {
    if (!inline || state !== "error") return undefined;
    const id = setTimeout(() => setState("idle"), 5000);
    return () => clearTimeout(id);
  }, [inline, state]);

  if (inline) {
    const recording = state === "recording";
    const sending = state === "sending";

    return (
      <div className="relative shrink-0">
        {/* Pastille d'etat au-dessus du bouton : minuteur pendant
            l'enregistrement, transcription, ou message d'erreur. */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            aria-live="polite"
            className="absolute bottom-full right-0 mb-2 z-10 flex items-center gap-2 rounded-full bg-white border border-black/10 shadow-lg px-3 py-1.5 text-[11px] font-mono whitespace-nowrap"
          >
            {recording && (
              <>
                <motion.span
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="tabular-nums font-bold">{formatTime(seconds)}</span>
                <button
                  type="button"
                  onClick={cancel}
                  data-cursor-hover
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  Annuler
                </button>
              </>
            )}
            {sending && <span className="opacity-60">Transcription…</span>}
            {state === "error" && <span className="text-red-600">{error}</span>}
          </motion.div>
        )}

        {/* Halo qui pulse autour du bouton pendant l'enregistrement. */}
        {recording && (
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500"
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.7, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.button
          type="button"
          onClick={recording ? stop : state === "error" ? () => setState("idle") : start}
          disabled={sending}
          data-cursor-hover
          aria-label={recording ? "Arreter l'enregistrement et transcrire" : "Enregistrer un message vocal"}
          className={className}
          // Le style gagne sur la classe bg-* passee par l'appelant : le bouton
          // vire au rouge pendant l'enregistrement sans imposer sa couleur de
          // repos.
          style={recording ? { background: "#ef4444" } : undefined}
          {...motionProps}
        >
          {recording ? (
            <StopIcon className="w-4 h-4" />
          ) : sending ? (
            <motion.span
              className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            children
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <>
      {/* motion.button systematiquement : le halo pulse du CTA principal est
          passe par `motionProps`, les autres appels n'en fournissent pas et se
          comportent comme un bouton normal. */}
      <motion.button
        type="button"
        onClick={start}
        data-cursor-hover
        className={className}
        {...motionProps}
      >
        {children}
      </motion.button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-live="polite"
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
          >
            {state === "recording" && (
              <>
                <div className="flex items-center justify-center gap-2.5">
                  <motion.span
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-sm font-mono uppercase tracking-widest opacity-60">
                    Enregistrement
                  </span>
                </div>

                <p className="font-display mt-4 text-4xl font-bold tabular-nums">
                  {formatTime(seconds)}
                </p>

                {/* La phrase d'exemple est ici plutot que sous le bouton du
                    hero : c'est pendant qu'on parle qu'on cherche quoi dire,
                    pas avant de cliquer. */}
                <p className="mt-4 text-[13px] leading-snug opacity-60">
                  Dites par exemple : «&nbsp;Je souhaite déléguer ma
                  prospection&nbsp;» ou «&nbsp;J&apos;ai besoin d&apos;aide sur
                  ma comptabilité&nbsp;».
                </p>

                {/* Onde purement decorative : rend l'attente vivante sans
                    pretendre representer le vrai niveau sonore. */}
                <div className="mt-6 flex items-end justify-center gap-1 h-10">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-1 rounded-full"
                      style={{ background: ACCENT }}
                      animate={{ height: ["18%", "100%", "35%", "70%", "18%"] }}
                      transition={{
                        duration: 1.1 + (i % 4) * 0.22,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.06,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={cancel}
                    data-cursor-hover
                    className="px-5 py-3 text-[13px] font-mono rounded border border-black/15 hover:border-black/40 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={stop}
                    data-cursor-hover
                    className="px-6 py-3 text-[13px] font-mono font-bold uppercase tracking-wide rounded text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: ACCENT }}
                  >
                    Envoyer
                  </button>
                </div>

                {/* Repli pour qui ouvre le micro puis se ravise (lieu bruyant,
                    pas envie de parler) : on coupe l'enregistrement avant de
                    basculer sur le chat, sinon le micro resterait actif. */}
                {onPreferWriting && (
                  <button
                    type="button"
                    onClick={() => {
                      cancel();
                      onPreferWriting();
                    }}
                    data-cursor-hover
                    className="mt-5 text-[13px] font-mono underline underline-offset-4 opacity-60 hover:opacity-100 hover:text-[#ff6b35] transition-colors"
                  >
                    Je préfère écrire &rarr;
                  </button>
                )}
              </>
            )}

            {state === "sending" && (
              <>
                <p className="font-display text-xl font-bold">Un instant...</p>
                <p className="mt-2 text-sm opacity-60">Je transcris ton message.</p>
              </>
            )}

            {state === "error" && (
              <>
                <p className="font-display text-xl font-bold">Ça n&apos;a pas marché</p>
                <p className="mt-2 text-sm opacity-70">{error}</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    data-cursor-hover
                    className="px-5 py-3 text-[13px] font-mono rounded border border-black/15 hover:border-black/40 transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    onClick={start}
                    data-cursor-hover
                    className="px-6 py-3 text-[13px] font-mono font-bold rounded text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: ACCENT }}
                  >
                    Réessayer
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
