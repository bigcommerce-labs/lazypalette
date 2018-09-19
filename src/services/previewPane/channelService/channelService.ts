import Channel from 'jschannel';

import { SdkNotLoaded } from './errors/sdkNotLoaded';

export interface BroadcastParams {
    method: string;
    params: object;
    success(v: any): void;
    error(v: any): void;
}

export interface ConstructorParams {
    window: Window;
    sdkReady(): void;
    sdkNotReady(): void;
}

export default class ChannelService {
    static channel: any; // MessagingChannel, only an any for testing purposes
    static sdkLoaded = false;

    private static instance: ChannelService;
    private static debug = false; // set to true to enable debug output
    private static sdkReady: () => void;
    private static sdkNotReady: () => void;

    // Channel identifier, must match the identifier defined in the Stencil Preview SDK.
    CHANNEL_SCOPE = 'stencilEditor';

    constructor({ window, sdkReady, sdkNotReady }: ConstructorParams) {
        if (ChannelService.instance) {
            return ChannelService.instance;
        }

        ChannelService.channel = Channel.build({
            debugOutput: ChannelService.debug,
            // onReady: () => console.log('channel ready'),
            origin: '*',
            publish: true,
            reconnect: true,
            scope: this.CHANNEL_SCOPE,
            window,
        });

        ChannelService.sdkReady = sdkReady;
        ChannelService.sdkNotReady = sdkNotReady;

        this.bindEvents();

        ChannelService.instance = this;
    }

    broadcast({ method, params, error, success }: BroadcastParams) {
        if (!ChannelService.sdkLoaded) {
            throw new SdkNotLoaded(`Error: SDK not loaded. Attempted to call: ${method}`);
        }

        return ChannelService.channel.call({
            error: (v: any) => error(v),
            method,
            params: JSON.stringify(params),
            success: (v: any) => success(v),
        });
    }

    safeBroadcast(broadcastParams: BroadcastParams, raceConditionHandler: (error: Error) => void) {
        try {
            this.broadcast(broadcastParams);
        } catch (error) {
            // TODO find a way to check the error class directly rather than relying on name attribute
            if (error.name === 'SdkNotLoaded') {
                if (ChannelService.debug) {
                    console.log('calling raceConditionHandler'); // tslint:disable-line no-console
                }
                raceConditionHandler(error);

                return;
            }

            // Re-raise the exception if it is not a SdkNotLoaded error
            throw error;
        }
    }

    sdkReadyHandler() {
        if (ChannelService.debug) {
            console.log('sdkReady'); // tslint:disable-line no-console
        }
        ChannelService.sdkLoaded = true;
        ChannelService.sdkReady();
    }

    sdkNotReadyHandler() {
        if (ChannelService.debug) {
            console.log('sdkNotReady'); // tslint:disable-line no-console
        }
        ChannelService.sdkLoaded = false;
        ChannelService.sdkNotReady();
    }

    // Bind this channel to specific event types. Events which are bound are fired from the Stencil Preview Sdk.
    private bindEvents() {
        if (ChannelService.debug) {
            console.log('bindEvents'); // tslint:disable-line no-console
        }
        ChannelService.channel.bind('sdk-ready', this.sdkReadyHandler);
        ChannelService.channel.bind('sdk-not-ready', this.sdkNotReadyHandler);
    }
}
