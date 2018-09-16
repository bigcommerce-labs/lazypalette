import { MessagingChannel } from 'jschannel';
import Window from 'window';

import ChannelService, { ConstructorParams } from './channelService';

describe('ChannelService', () => {
    const sdkReady = jest.fn();
    const sdkNotReady = jest.fn();
    const window = new Window();
    const serviceParams: ConstructorParams = {
        sdkNotReady,
        sdkReady,
        window,
    };
    const channelService = new ChannelService(serviceParams);

    describe('constructor', () => {
        it('returns singleton instance', () => {
            const channelServiceDuplicate = new ChannelService(serviceParams);

            expect(channelService).toEqual(channelServiceDuplicate);
        });

        describe('channel', () => {
            const channel: MessagingChannel = ChannelService.channel;

            it('builds a jsChannel', () => {
                expect(channel).toBeDefined();
            });

            it('subscribes to events on the jsChannel', () => {
                // Here we make sure that the event bindings are set up by checking if they can be unbound
                expect(channel.unbind('dummy-test-event-not-in-sdk')).toBe(false);
                expect(channel.unbind('sdk-ready')).toBe(true);
                expect(channel.unbind('sdk-not-ready')).toBe(true);
            });
        });
    });

    describe('sdkReadyHandler', () => {
        it('marks the sdk as loaded', () => {
            channelService.sdkReadyHandler();
            expect(ChannelService.sdkLoaded).toBe(true);
            expect(sdkReady).toBeCalled();
        });
    });

    describe('sdkNotReadyHandler', () => {
        it('marks the sdk as not loaded', () => {
            channelService.sdkNotReadyHandler();
            expect(ChannelService.sdkLoaded).toBe(false);
            expect(sdkNotReady).toBeCalled();
        });
    });

    describe('broadcast', () => {
        describe('when the sdk is loaded', () => {
            beforeEach(() => {
                ChannelService.sdkLoaded = true;
            });

            it('will broadcast', () => {
                const method = 'dummy-method';

                expect(ChannelService.sdkLoaded).toBe(true);
                expect(
                    () => channelService.broadcast({
                        error: (error: any) => { return; },
                        method,
                        params: {},
                        success: (data: any) => { return; },
                    })
                ).not.toThrow();
            });
        });

        describe('when the sdk is not loaded', () => {
            beforeEach(() => {
                ChannelService.sdkLoaded = false;
            });

            it('throw a SdkNotLoaded exception', () => {
                const method = 'dummy-method';

                expect(ChannelService.sdkLoaded).toBe(false);
                expect(
                    () => channelService.broadcast({
                        error: (error: any) => { return; },
                        method,
                        params: {},
                        success: (data: any) => { return; },
                    })
                ).toThrow(`Error: SDK not loaded. Attempted to call: ${method}`);
            });
        });
    });

    describe('safeBroadcast', () => {
        const method = 'dummy-method';

        describe('when the sdk is loaded', () => {
            beforeEach(() => {
                ChannelService.sdkLoaded = true;
            });

            it('does not raise exception and does not call raceConditionHandler', () => {
                const raceConditionHandler = jest.fn();

                expect(ChannelService.sdkLoaded).toBe(true);
                expect(
                    () => channelService.safeBroadcast({
                        error: (error: any) => { return; },
                        method,
                        params: {},
                        success: (data: any) => { return; },
                    }, raceConditionHandler)
                ).not.toThrow();
                expect(raceConditionHandler).not.toBeCalled();
            });
        });

        describe('when the sdk is not loaded', () => {
            beforeEach(() => {
                ChannelService.sdkLoaded = false;
            });

            it('does not throw an exception and calls the raceConditionHandler', () => {
                const raceConditionHandler = jest.fn();

                expect(ChannelService.sdkLoaded).toBe(false);
                expect(
                    () => channelService.safeBroadcast({
                        error: (error: any) => { return; },
                        method,
                        params: {},
                        success: (data: any) => { return; },
                    }, raceConditionHandler)
                ).not.toThrow();
                expect(raceConditionHandler).toBeCalled();
            });
        });

        describe('when the broadcast throws an exception which is not SdkNotLoaded', () => {
            const errorMessage = 'dummy-error';

            beforeEach(() => {
                ChannelService.sdkLoaded = true;

                const mockChannel = jest.fn(() => { throw new Error(errorMessage); });
                ChannelService.channel = mockChannel;
            });

            it('will throw original error and does not call raceConditionHandler', () => {
                const raceConditionHandler = jest.fn();

                expect(ChannelService.sdkLoaded).toBe(true);
                expect(
                    () => channelService.safeBroadcast({
                        error: (error: any) => { return; },
                        method,
                        params: {},
                        success: (data: any) => { return; },
                    }, raceConditionHandler)
                ).toThrow(errorMessage);
                expect(raceConditionHandler).not.toBeCalled();
            });
        });
    });
});
