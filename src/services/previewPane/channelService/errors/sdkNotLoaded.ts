export class SdkNotLoaded extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SdkNotLoaded';
    }
}
