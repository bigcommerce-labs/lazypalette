import Channel, { MessagingChannel } from 'jschannel';

import { SdkNotLoaded } from './errors/sdkNotLoaded';

interface BroadcastParams {
    method: string;
    params: object;
    success(v: any): void;
    error(v: any): void;
}

interface ConstructorParams {
    window: Window;
    sdkReady(): void;
    sdkNotReady(): void;
}

export default class ChannelService {
    private static instance: ChannelService;
    private static channel: MessagingChannel;
    private static debugOutput = false;
    private static sdkLoaded = false;
    private static sdkReady: () => void;
    private static sdkNotReady: () => void;

    CHANNEL_SCOPE = 'stencilEditor';

    constructor({ window, sdkReady, sdkNotReady }: ConstructorParams) {
        if (ChannelService.instance) {
            return ChannelService.instance;
        }

        ChannelService.channel = Channel.build({
            debugOutput: ChannelService.debugOutput,
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
                raceConditionHandler(error);

                return;
            }

            // Re-raise the exception if it is not a SdkNotLoaded error
            throw error;
        }
    }

    // Bind this channel to specific event types. Events which are bound are fired from the Stencil Preview Sdk.
    private bindEvents() {
        ChannelService.channel.bind('sdk-ready', () => {
            ChannelService.sdkLoaded = true;
            ChannelService.sdkReady();
        });

        ChannelService.channel.bind('sdk-not-ready', () => {
            ChannelService.sdkLoaded = false;
            ChannelService.sdkNotReady();
        });
    }
}
