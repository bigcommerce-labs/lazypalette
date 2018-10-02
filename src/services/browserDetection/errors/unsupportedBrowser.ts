export class UnsupportedBrowser extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnsupportedBrowser';
    }
}
