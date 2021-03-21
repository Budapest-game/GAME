declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export default class SoundBuffer {
  protected context: AudioContext;

  protected fileUrls: Record<string, string>;

  public buffer: AudioBuffer|null;

  constructor(context: AudioContext, fileUrl: Record<string, string>) {
    this.context = context;
    this.fileUrls = fileUrl;
    this.buffer = null;
  }

  public loadSound(url: string):Promise<AudioBuffer> {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    return new Promise<AudioBuffer>((resolve) => {
      request.onload = () => {
        return this.context.decodeAudioData(request.response, (buffer) => {
          this.buffer = buffer;
          resolve(this.buffer);
        });
      };
      request.send();
    });
  }
}
