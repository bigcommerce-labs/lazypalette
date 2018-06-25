declare const window: Window;

export class WindowService {
    static getInstance(): WindowService {
        return this.instance;
    }

    private static instance: WindowService = new WindowService();

    private constructor() { }

    addEventListener(type: string, listener: EventListener): void {
        window.addEventListener('message', listener);
    }

    removeEventListener(type: string, listener: EventListener): void {
        window.removeEventListener('message', listener);
    }
}
