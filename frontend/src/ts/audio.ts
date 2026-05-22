const mainaudio = new Audio('src/components/song/StarWarsMainTheme.mp3');
mainaudio.loop = true;
mainaudio.volume = 1.0;

export const starWarsTheme = 
{
  get muted() { return mainaudio.muted; },
  start() 
  {
    if (mainaudio.paused) mainaudio.play().catch(() => {});
  },

  stop() 
  {
    mainaudio.pause();
    mainaudio.currentTime = 0;
  },

  mute() { mainaudio.muted = true; },
  unmute() { mainaudio.muted = false; },
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
