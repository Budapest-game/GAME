declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

type SoundBufferResult = {
  buffer: AudioBuffer,
  context: AudioContext,
};

export default class SoundBuffer {
  protected context: AudioContext;

  protected fileUrls: Record<string, string>;

  public buffer: AudioBuffer|null;

  constructor(fileUrl: Record<string, string>) {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.fileUrls = fileUrl;
    this.buffer = null;
  }

  public loadSound(url: string):Promise<SoundBufferResult> {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    return new Promise<SoundBufferResult>((resolve) => {
      request.onload = () => {
        return this.context.decodeAudioData(request.response, (buffer) => {
          resolve({
            buffer,
            context: this.context,
          });
        });
      };
      request.send();
    });
  }
}
