import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import createMockStore from 'redux-mock-store';

import { UpdatePagePayload } from '../../actions/previewPane';

import PreviewPane, { PreviewPane as PreviewPaneNotConnected } from './PreviewPane';

import { VIEWPORT_TYPES } from './constants';

describe('PreviewPane', () => {
    const versionId = '26a5d5b0-72ff-0134-79ee-0242ac112a0f';
    const variationId = '3fde4290-8d3c-0136-f365-0242ac11000d';
    const configurationId = '26a5d5b0-72ff-0134-79ee-0242ac112a0f';
    const lastCommitId = '';
    const fontUrl = null;
    const isFetching = false;
    const isRotated = false;
    const needsForceReload = false;
    const page = '/';
    const iframeUrl = `/?stencilEditor=${versionId}@${configurationId}`;
    const viewportType = VIEWPORT_TYPES.DESKTOP;

    const previewPaneState = {
        fontUrl,
        iframeUrl,
        isFetching,
        isRotated,
        needsForceReload,
        page,
        viewportType,
    };

    const themeState = {
        configurationId,
        lastCommitId,
        variationId,
        versionId,
    };

    describe('render', () => {
        describe('when the iframeUrl is not ready', () => {
            it('does not render the inner iframe', () => {
                const store = createMockStore([])({
                    previewPane: { ...previewPaneState, iframeUrl: '' },
                    theme: themeState,
                });
                const previewPane = mount(<PreviewPane/>, { context: { store } });
                expect(toJson(previewPane)).toMatchSnapshot();
            });
        });

        it('renders the component', () => {
            const store = createMockStore([])({
                previewPane: { ...previewPaneState },
                theme: themeState,
            });
            const previewPane = mount(<PreviewPane/>, { context: { store } });
            expect(toJson(previewPane)).toMatchSnapshot();
        });
    });

    describe('viewport switching', () => {
        const viewportTypes = [
            VIEWPORT_TYPES.DESKTOP,
            VIEWPORT_TYPES.TABLET,
            VIEWPORT_TYPES.MOBILE,
        ];

        for (const viewport of viewportTypes) {
            describe(`when the viewport type is set to ${viewport.glyphName.toUpperCase()}`, () => {
                it('updates the viewportType correctly', () => {
                    const store = createMockStore([])({
                        previewPane: { ...previewPaneState, viewportType: viewport },
                        theme: themeState,
                    });

                    const previewPane = render(<PreviewPane/>, { context: { store } });
                    const iframe = previewPane.find('iframe');

                    expect(iframe.attr('height')).toBe(viewport.viewportHeight);
                    expect(iframe.attr('width')).toBe(viewport.viewportWidth);
                    expect(toJson(iframe)).toMatchSnapshot();
                });

                describe('when rotated', () => {
                    it('updates the rotated viewportType correctly', () => {
                        const store = createMockStore([])({
                            previewPane: { ...previewPaneState, viewportType: viewport, isRotated: true },
                            theme: themeState,
                        });
                        const previewPane = render(<PreviewPane/>, { context: { store } });
                        const iframe = previewPane.find('iframe');

                        expect(iframe.attr('height')).toBe(viewport.viewportWidth);
                        expect(iframe.attr('width')).toBe(viewport.viewportHeight);
                        expect(toJson(iframe)).toMatchSnapshot();
                    });
                });
            });
        }
    });

    describe('componentDidUpdate', () => {
        describe('when we have a font update', () => {
            describe('when the previewPane channel is not set up', () => {
                it('runs the raceConditionHandler which will regenerate the iframe URL', () => {
                    const buildIframeUrl = jest.fn();
                    const previewPanePageReloaded = jest.fn();
                    const component = mount(
                        <PreviewPaneNotConnected
                            versionId={versionId}
                            variationId={variationId}
                            configurationId={configurationId}
                            lastCommitId={lastCommitId}
                            fontUrl={fontUrl}
                            isFetching={isFetching}
                            isRotated={isRotated}
                            needsForceReload={needsForceReload}
                            page={page}
                            iframeUrl={iframeUrl}
                            viewportType={viewportType}
                            buildIframeUrl={buildIframeUrl}
                            previewPaneLoaded={() => { return; } }
                            previewPaneLoading={() => { return; } }
                            previewPanePageReloaded={previewPanePageReloaded}
                            updatePage={(payload: UpdatePagePayload) => { return; } }
                        />
                    );

                    // The channel is undefined but we are triggering componentDidUpdate
                    const newFontUrl = 'https://placekitten.com/100/100';
                    component.setProps({ fontUrl: newFontUrl });

                    expect(buildIframeUrl).toHaveBeenCalledTimes(1);
                    expect(buildIframeUrl).toBeCalledWith(page);
                    expect(previewPanePageReloaded).toHaveBeenCalledTimes(1);
                });
            });

            describe('when the previewPane is loaded and the channel is available', () => {
                describe('when the user changes styles', () => {
                    it('will broadcast the operation to the previewPane channel', () => {
                        const component = mount(
                            <PreviewPaneNotConnected
                                versionId={versionId}
                                variationId={variationId}
                                configurationId={configurationId}
                                lastCommitId={lastCommitId}
                                fontUrl={fontUrl}
                                isFetching={isFetching}
                                isRotated={isRotated}
                                needsForceReload={needsForceReload}
                                page={page}
                                iframeUrl={iframeUrl}
                                viewportType={viewportType}
                                buildIframeUrl={() => { return; } }
                                previewPaneLoaded={() => { return; } }
                                previewPaneLoading={() => { return; } }
                                previewPanePageReloaded={() => { return; } }
                                updatePage={(payload: UpdatePagePayload) => { return; } }
                            />
                        );
                        const previewPane: any = component.instance();

                        const channelService = { safeBroadcast: jest.fn() };
                        previewPane.channelService = channelService;

                        const newFontUrl = 'https://placekitten.com/100/100';
                        component.setProps({ fontUrl: newFontUrl });

                        expect(channelService.safeBroadcast).toHaveBeenCalledTimes(1);
                        expect(channelService.safeBroadcast).toBeCalledWith(
                            expect.objectContaining({
                                error: expect.any(Function),
                                method: 'add-font',
                                params: {
                                    fontUrl: newFontUrl,
                                },
                                success: expect.any(Function),
                            }),
                            expect.any(Function)
                        );
                    });
                });
            });
        });

        describe('when we have a style/css update', () => {
            describe('when the previewPane channel is not set up', () => {
                it('runs the raceConditionHandler which will regenerate the iframe URL', () => {
                    const buildIframeUrl = jest.fn();
                    const previewPanePageReloaded = jest.fn();
                    const component = mount(
                        <PreviewPaneNotConnected
                            versionId={versionId}
                            variationId={variationId}
                            configurationId={configurationId}
                            lastCommitId={lastCommitId}
                            fontUrl={fontUrl}
                            isFetching={isFetching}
                            isRotated={isRotated}
                            needsForceReload={needsForceReload}
                            page={page}
                            iframeUrl={iframeUrl}
                            viewportType={viewportType}
                            buildIframeUrl={buildIframeUrl}
                            previewPaneLoaded={() => { return; } }
                            previewPaneLoading={() => { return; } }
                            previewPanePageReloaded={previewPanePageReloaded}
                            updatePage={(payload: UpdatePagePayload) => { return; } }
                        />
                    );

                    // The channel is undefined but we are triggering componentDidUpdate
                    const newConfigurationId = '07f53480-8d3e-0136-972b-0242ac11000d';
                    component.setProps({ configurationId: newConfigurationId });

                    expect(buildIframeUrl).toHaveBeenCalledTimes(1);
                    expect(buildIframeUrl).toBeCalledWith(page);
                    expect(previewPanePageReloaded).toHaveBeenCalledTimes(1);
                });
            });

            describe('when the previewPane is loaded and the channel is available', () => {
                describe('when the user changes styles', () => {
                    it('will broadcast the operation to the previewPane channel', () => {
                        const component = mount(
                            <PreviewPaneNotConnected
                                versionId={versionId}
                                variationId={variationId}
                                configurationId={configurationId}
                                lastCommitId={lastCommitId}
                                fontUrl={fontUrl}
                                isFetching={isFetching}
                                isRotated={isRotated}
                                needsForceReload={needsForceReload}
                                page={page}
                                iframeUrl={iframeUrl}
                                viewportType={viewportType}
                                buildIframeUrl={() => { return; } }
                                previewPaneLoaded={() => { return; } }
                                previewPaneLoading={() => { return; } }
                                previewPanePageReloaded={() => { return; } }
                                updatePage={(payload: UpdatePagePayload) => { return; } }
                            />
                        );
                        const previewPane: any = component.instance();

                        const channelService = { safeBroadcast: jest.fn() };
                        previewPane.channelService = channelService;

                        const newConfigurationId = '07f53480-8d3e-0136-972b-0242ac11000d';
                        component.setProps({ configurationId: newConfigurationId });

                        expect(channelService.safeBroadcast).toHaveBeenCalledTimes(1);
                        expect(channelService.safeBroadcast).toBeCalledWith(
                            expect.objectContaining({
                                error: expect.any(Function),
                                method: 'reload-stylesheets',
                                params: {
                                    configurationId: newConfigurationId,
                                },
                                success: expect.any(Function),
                            }),
                            expect.any(Function)
                        );
                    });
                });
            });
        });

        describe('when we have a structural update', () => {
            describe('when the previewPane channel is not set up', () => {
                it('runs the raceConditionHandler which will regenerate the iframe URL', () => {
                    const buildIframeUrl = jest.fn();
                    const previewPanePageReloaded = jest.fn();
                    const component = mount(
                        <PreviewPaneNotConnected
                            versionId={versionId}
                            variationId={variationId}
                            configurationId={configurationId}
                            lastCommitId={lastCommitId}
                            fontUrl={fontUrl}
                            isFetching={isFetching}
                            isRotated={isRotated}
                            needsForceReload={needsForceReload}
                            page={page}
                            iframeUrl={iframeUrl}
                            viewportType={viewportType}
                            buildIframeUrl={buildIframeUrl}
                            previewPaneLoaded={() => { return; } }
                            previewPaneLoading={() => { return; } }
                            previewPanePageReloaded={previewPanePageReloaded}
                            updatePage={(payload: UpdatePagePayload) => { return; } }
                        />
                    );

                    // The channel is undefined but we are triggering componentDidUpdate
                    component.setProps({ needsForceReload: true });

                    expect(buildIframeUrl).toHaveBeenCalledTimes(1);
                    expect(buildIframeUrl).toBeCalledWith(page);
                    expect(previewPanePageReloaded).toHaveBeenCalledTimes(1);
                });
            });

            describe('when the previewPane is loaded and the channel is available', () => {
                describe('when the user changes variation', () => {
                    it('will broadcast the operation to the previewPane channel', () => {
                        const component = mount(
                            <PreviewPaneNotConnected
                                versionId={versionId}
                                variationId={variationId}
                                configurationId={configurationId}
                                lastCommitId={lastCommitId}
                                fontUrl={fontUrl}
                                isFetching={isFetching}
                                isRotated={isRotated}
                                needsForceReload={needsForceReload}
                                page={page}
                                iframeUrl={iframeUrl}
                                viewportType={viewportType}
                                buildIframeUrl={() => { return; } }
                                previewPaneLoaded={() => { return; } }
                                previewPaneLoading={() => { return; } }
                                previewPanePageReloaded={() => { return; } }
                                updatePage={(payload: UpdatePagePayload) => { return; } }
                            />
                        );
                        const previewPane: any = component.instance();

                        const channelService = { safeBroadcast: jest.fn() };
                        previewPane.channelService = channelService;

                        const newVariationId = 'a544ae50-9dd2-0136-f26b-0242ac110012';
                        component.setProps({ variationId: newVariationId });

                        expect(channelService.safeBroadcast).toHaveBeenCalledTimes(1);
                        expect(channelService.safeBroadcast).toBeCalledWith(
                            expect.objectContaining({
                                error: expect.any(Function),
                                method: 'set-cookie',
                                params: {
                                    configurationId,
                                    reloadPage: true,
                                    sessionId: lastCommitId,
                                    variationId: newVariationId,
                                    versionId,
                                },
                                success: expect.any(Function),
                            }),
                            expect.any(Function)
                        );
                    });
                });

                describe('when the user makes a structural setting update', () => {
                    it('will broadcast the operation to the previewPane channel', () => {
                        const component = mount(
                            <PreviewPaneNotConnected
                                versionId={versionId}
                                variationId={variationId}
                                configurationId={configurationId}
                                lastCommitId={lastCommitId}
                                fontUrl={fontUrl}
                                isFetching={isFetching}
                                isRotated={isRotated}
                                needsForceReload={needsForceReload}
                                page={page}
                                iframeUrl={iframeUrl}
                                viewportType={viewportType}
                                buildIframeUrl={() => { return; } }
                                previewPaneLoaded={() => { return; } }
                                previewPaneLoading={() => { return; } }
                                previewPanePageReloaded={() => { return; } }
                                updatePage={(payload: UpdatePagePayload) => { return; } }
                            />
                        );

                        const previewPane: any = component.instance();

                        const channelService = { safeBroadcast: jest.fn() };
                        previewPane.channelService = channelService;

                        component.setProps({ needsForceReload: true });

                        expect(channelService.safeBroadcast).toHaveBeenCalledTimes(1);
                        expect(channelService.safeBroadcast).toBeCalledWith(
                            expect.objectContaining({
                                error: expect.any(Function),
                                method: 'set-cookie',
                                params: {
                                    configurationId,
                                    reloadPage: true,
                                    sessionId: lastCommitId,
                                    variationId,
                                    versionId,
                                },
                                success: expect.any(Function),
                            }),
                            expect.any(Function)
                        );
                    });
                });
            });
        });
    });
});
