type callback = (data: Record<string, unknown>) => void;
type Listeners = Record<string, callback[]>

export default class EventBus {
    protected listeners:Listeners = {};

    static instance:EventBus;

    constructor(isNew = false) {
      if (EventBus.instance && !isNew) {
        return EventBus.instance;
      }
      if (isNew) {
        EventBus.instance = this;
      }
    }

    public on(event: string, callback:(data: Record<string, unknown>) => void):void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }

    public off(event: string, callback:unknown):void {
      this.listeners[event].forEach((item: unknown, key: number) => {
        if (item === callback) {
          this.listeners[event].splice(key, 1);
        }
      });
    }

    public emit(event:string, args:Record<string, unknown>):void {
      if (!Object.keys(this.listeners).includes(event)) {
        throw new Error(`Missing event: ${event}`);
      } else {
        this.listeners[event].forEach((listener) => {
          listener(args);
        });
      }
    }
}
