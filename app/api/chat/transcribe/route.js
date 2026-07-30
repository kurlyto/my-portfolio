// Transcription des messages vocaux enregistres depuis le site, via Whisper
// chez Groq. Meme principe que shared/voice-transcribe.js cote Telegram, a une
// difference pres : ici l'audio arrive directement du navigateur (MediaRecorder,
// WebM/Opus) au lieu d'etre telecharge chez Telegram. Groq accepte ce format
// tel quel, aucune conversion ffmpeg n'est necessaire.
import { NextResponse } from "next/server";
import { clientIp, canTranscribe, recordTranscription, VOICE_LIMIT_MESSAGE } from "@/app/lib/chat/quota";

const GROQ_TRANSCRIPTION_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

// Un vocal de cadrage tient largement en 2 minutes ; au-dela c'est soit une
// erreur, soit un abus. Borne aussi la facture Groq.
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "transcription_unavailable" }, { status: 503 });
  }

  const ip = clientIp(request);
  if (!canTranscribe(ip)) {
    return NextResponse.json({ error: "quota_reached", message: VOICE_LIMIT_MESSAGE }, { status: 429 });
  }

  let audio;
  try {
    const form = await request.formData();
    audio = form.get("audio");
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (!audio || typeof audio === "string" || audio.size === 0) {
    return NextResponse.json({ error: "no_audio" }, { status: 400 });
  }
  if (audio.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const groqForm = new FormData();
  groqForm.append("file", audio, "voice.webm");
  groqForm.append("model", "whisper-large-v3");
  groqForm.append("language", "fr");
  groqForm.append("response_format", "text");

  let text;
  try {
    const res = await fetch(GROQ_TRANSCRIPTION_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: groqForm,
    });
    if (!res.ok) {
      return NextResponse.json({ error: "transcription_failed" }, { status: 502 });
    }
    text = (await res.text()).trim();
  } catch {
    return NextResponse.json({ error: "transcription_failed" }, { status: 502 });
  }

  if (!text) {
    return NextResponse.json({ error: "empty", message: "Je n'ai rien entendu, reessaie." }, { status: 422 });
  }

  recordTranscription(ip);
  return NextResponse.json({ text });
}
