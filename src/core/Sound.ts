export default class Sound {
  protected context: AudioContext;

  protected audio: AudioBuffer;

  protected source: AudioBufferSourceNode|null;

  constructor(context: AudioContext, buffer: AudioBuffer) {
    this.context = context;
    this.audio = buffer;
    this.source = null;
  }

  protected init():void {
    const gainNode = this.context.createGain();
    this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.audio;
    this.source.connect(gainNode);
    gainNode.connect(this.context.destination);

    gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
  }

  public play():void {
    this.init();
    if (this.source) {
      this.source.start(this.context.currentTime);
    }
  }
}
