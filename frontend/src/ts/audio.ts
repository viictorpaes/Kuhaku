const homeThemeAudio = new Audio(new URL('../components/song/StarWarsMainTheme.mp3', import.meta.url).href);
const cantinaThemeAudio = new Audio(new URL('../components/song/Cantina Band - John Williams (youtube).mp3', import.meta.url).href);

homeThemeAudio.loop = true;
homeThemeAudio.volume = 1.0;

cantinaThemeAudio.loop = true;
cantinaThemeAudio.volume = 0.0;

let fadeTimer: ReturnType<typeof setInterval> | undefined;

function clearFade()
{
  if (fadeTimer !== undefined)
  {
    clearInterval(fadeTimer);
    fadeTimer = undefined;
  }
}

function playAudio(audio: HTMLAudioElement, volume: number)
{
  audio.volume = volume;

  if (!audio.paused)
    return;

  void audio.play().catch(() => {});
}

function stopAudio(audio: HTMLAudioElement)
{
  audio.pause();
  audio.currentTime = 0;
}

function fadeBetween(fromAudio: HTMLAudioElement, toAudio: HTMLAudioElement, fromVolume: number, toVolume: number, duration = 900, onFinish?: () => void)
{
  clearFade();
  playAudio(toAudio, toAudio.volume);

  const startedAt = Date.now();
  const toStartVolume = toAudio.volume;

  fromAudio.volume = fromVolume;
  toAudio.volume = toVolume === 1 ? 0 : toStartVolume;

  fadeTimer = setInterval(() =>
  {
    const progress = Math.min(1, (Date.now() - startedAt) / duration);
    fromAudio.volume = fromVolume * (1 - progress);
    toAudio.volume = toVolume * progress;

    if (progress >= 1)
    {
      clearFade();
      fromAudio.volume = 0;
      toAudio.volume = toVolume;
      stopAudio(fromAudio);
      onFinish?.();
    }
  }, 32);
}

function setMuted(muted: boolean)
{
  homeThemeAudio.muted = muted;
  cantinaThemeAudio.muted = muted;
}

export const starWarsTheme = 
{
  get muted() { return homeThemeAudio.muted && cantinaThemeAudio.muted; },
  start() 
  {
    fadeBetween(cantinaThemeAudio, homeThemeAudio, cantinaThemeAudio.volume || 1, 1, 900);
  },

  fadeToCantina()
  {
    fadeBetween(homeThemeAudio, cantinaThemeAudio, homeThemeAudio.volume || 1, 1, 900);
  },

  stop() 
  {
    clearFade();
    stopAudio(homeThemeAudio);
    stopAudio(cantinaThemeAudio);
  },

  mute() { setMuted(true); },
  unmute() { setMuted(false); },
};

let _audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext
{
  if (!_audioCtx) 
    _audioCtx = new AudioContext();
  return _audioCtx;
}

const _unlock = () => getAudioCtx().resume().catch(() => {});
document.addEventListener('click', _unlock);
document.addEventListener('keydown', _unlock);

function _scheduleBeep(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType, volume: number)
{
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function beep(frequency: number, duration: number, type: OscillatorType = 'square', volume = 0.18)
{
  try
  {
    const ctx = getAudioCtx();
    if (ctx.state === 'running')
      _scheduleBeep(ctx, frequency, duration, type, volume);
    else
      ctx.resume().then(() => _scheduleBeep(ctx, frequency, duration, type, volume)).catch(() => {});
  } catch { }
}

export function playArcadeError() 
{
  beep(220, 0.15, 'sawtooth', 0.2);
  setTimeout(() => beep(180, 0.20, 'sawtooth', 0.2), 120);
}

export function playArcadeCorrect() 
{
  beep(523, 0.10, 'sine', 0.18);
  setTimeout(() => beep(659, 0.10, 'sine', 0.18), 100);
  setTimeout(() => beep(784, 0.18, 'sine', 0.22), 200);
}
