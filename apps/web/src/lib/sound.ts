let confirmAudio: HTMLAudioElement | null = null;
let lampToggleAudio: HTMLAudioElement | null = null;
let lastConfirmSoundTime = 0;
let lastLampSoundTime = 0;

export function playConfirmSound(volume = 0.5): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastConfirmSoundTime < 50) return;
  lastConfirmSoundTime = now;

  try {
    if (!confirmAudio) {
      confirmAudio = new Audio("/sounds/confirm.wav");
    }
    const sound = confirmAudio.cloneNode() as HTMLAudioElement;
    sound.volume = volume;
    sound.play().catch(() => {});
  } catch {}
}

export function playLampToggleSound(volume = 0.6): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (now - lastLampSoundTime < 60) return;
  lastLampSoundTime = now;

  try {
    if (!lampToggleAudio) {
      lampToggleAudio = new Audio("/sounds/lamp-toggle.mp3");
    }
    const sound = lampToggleAudio.cloneNode() as HTMLAudioElement;
    sound.volume = volume;
    sound.play().catch(() => {});
  } catch {}
}
