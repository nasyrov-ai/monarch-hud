export class SoundService {
  private static audioContext: AudioContext | null = null;

  private static init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private static async playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    this.init();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

    gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + duration);
  }

  static playLevelUp() {
    // Majestic rising arpeggio
    const now = this.audioContext?.currentTime || 0;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'square', 0.5, 0.05), i * 100);
    });
  }

  static playXPGain() {
    // Short digital blip
    this.playTone(880, 'sine', 0.1, 0.05);
  }

  static playError() {
    // Low glitchy sound
    this.playTone(110, 'sawtooth', 0.3, 0.1);
    setTimeout(() => this.playTone(82.41, 'sawtooth', 0.3, 0.1), 50);
  }

  static playClick() {
    this.playTone(1200, 'sine', 0.05, 0.02);
  }
}
