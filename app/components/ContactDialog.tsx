"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

export default function ContactDialog({ isDark, onClose }: { isDark: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const busy = useRef(false);
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => {
      element?.close();
      previousFocus?.focus();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/myezqrag", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  const border = isDark ? "border-neutral-700" : "border-neutral-300";
  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className={`fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm max-h-[90dvh] overflow-y-auto rounded-2xl border p-4 md:p-5 text-sm shadow-2xl backdrop:bg-black/50 ${border} ${isDark ? "bg-neutral-900 text-neutral-100" : "bg-white text-neutral-900"}`}
    >
      <header className={`relative border-b pb-3 ${border}`}>
        <h2 id={titleId} className={`text-base font-semibold text-center ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Contact</h2>
        <button type="button" aria-label="Close contact form" onClick={onClose} className="cursor-pointer absolute right-0 top-0 text-2xl leading-none opacity-60 hover:opacity-100">×</button>
      </header>
      {status === "success" ? (
        <div className="py-10 text-center">
          <p role="status">Your message has been sent. Thank you for reaching out!</p>
          <button type="button" onClick={onClose} className="cursor-pointer mt-6 rounded-full px-5 py-1.5 text-sm font-semibold bg-neutral-300 text-neutral-900">Done</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor={titleId + "-email"} className={`flex items-center gap-1 border-b py-3 text-sm ${border}`}>
            <span className="shrink-0 text-neutral-500">From:</span>
            <input id={titleId + "-email"} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="(enter your email address)…" className="min-w-0 flex-1 bg-transparent text-sm outline-none focus:ring-0" readOnly={status === "sending"} />
          </label>
          <label className="sr-only" htmlFor={titleId + "-message"}>Your message</label>
          <textarea id={titleId + "-message"} name="message" required maxLength={10000} placeholder="Write your message…" className="w-full min-h-32 h-[42dvh] resize-y bg-transparent py-3 text-sm outline-none focus:ring-0" readOnly={status === "sending"} />
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          {status === "error" && <p role="alert" className="pb-4 text-sm">Your message couldn’t be sent. Please try again, or email richlrd@umich.edu.</p>}
          <footer className={`flex justify-end gap-3 border-t pt-4 ${border}`}>
            <button type="button" onClick={onClose} className={`cursor-pointer rounded-full px-4 py-1 text-xs font-semibold ${isDark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600"}`}>Cancel</button>
            <button type="submit" disabled={status === "sending"} className="cursor-pointer rounded-full px-4 py-1 text-xs font-semibold bg-neutral-300 text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed">{status === "sending" ? "Sending…" : "Send"}</button>
          </footer>
        </form>
      )}
    </dialog>
  );
}
