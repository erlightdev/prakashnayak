let confirmAudio: HTMLAudioElement | null = null;
let lastPlayedTime = 0;

export function playConfirmSound(volume = 0.5): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastPlayedTime < 50) return;
  lastPlayedTime = now;

  try {
    if (!confirmAudio) {
      confirmAudio = new Audio("/sounds/confirm.wav");
    }
    const sound = confirmAudio.cloneNode() as HTMLAudioElement;
    sound.volume = volume;
    sound.play().catch(() => {});
  } catch {}
}
