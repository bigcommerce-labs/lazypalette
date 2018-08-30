import { mount } from 'enzyme';
import React from 'react';

import Draggable from './Draggable';

describe('when moving', () => {
    let draggable: any;

    const eventMocks = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
    };

    beforeEach(() => {
        draggable = mount(<Draggable
            position={{ x: 5, y: 10 }}
        >
            <></>
        </Draggable>);

        draggable.setState({ size: { height: 30, width: 20 }});
        eventMocks.preventDefault.mockReset();
        eventMocks.stopPropagation.mockReset();
    });

    describe('when a mousedown occurs on the startMove element', () => {
        describe('when the left button was pressed', () => {
            it('begins moving', () => {
                const event = { button: 0, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startMove(event);
                expect(draggable.state().moving).toEqual(true);
                expect(draggable.state().moveStartPos).toEqual({ x: 45, y: 40 });

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });

        describe('when another button was pressed', () => {
            it('does nothing', () => {
                const event = { button: 1, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startMove(event);
                expect(draggable.state().moving).toEqual(false);

                expect(event.stopPropagation).not.toHaveBeenCalled();
                expect(event.preventDefault).not.toHaveBeenCalled();
            });
        });
    });

    describe('when a mousedown occurs on the startResize element', () => {
        describe('when the left button was pressed', () => {
            it('begins resizing', () => {
                const event = { button: 0, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startResize(event);
                expect(draggable.state().resizing).toEqual(true);
                expect(draggable.state().resizeStartPos).toEqual({ x: 50, y: 50 });

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });

        describe('when another button was pressed', () => {
            it('does nothing', () => {
                const event = { button: 1, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startResize(event);
                expect(draggable.state().resizing).toEqual(false);

                expect(event.stopPropagation).not.toHaveBeenCalled();
                expect(event.preventDefault).not.toHaveBeenCalled();
            });
        });
    });

    describe('when a mousemove occurs', () => {
        describe('when currently moving', () => {
            it('updates position correctly', done => {
                draggable.setState({
                    moveStartPos: { x: 10, y: 10 },
                    moving: true,
                }, () => {
                    const event = { pageX: 100, pageY: 50, ...eventMocks };
                    draggable.instance().drag(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();

                    setTimeout(() => {
                        expect(draggable.state().position).toEqual({ x: 90, y: 40 });
                        done();
                    });
                });
            });
        });

        describe('when not moving', () => {
            it('does not update position', done => {
                draggable.setState({
                    moveStartPos: { x: 10, y: 10 },
                    moving: false,
                }, () => {

                    const event = { pageX: 100, pageY: 50, ...eventMocks };
                    draggable.instance().drag(event);

                    expect(event.stopPropagation).not.toHaveBeenCalled();
                    expect(event.preventDefault).not.toHaveBeenCalled();

                    // to allow uiWindow to perform an async state update.
                    setTimeout(() => {
                        expect(draggable.state().position).toEqual({ x: 5, y: 10 });
                        done();
                    });
                });
            });
        });

        describe('when currently resizing', () => {
            it('updates size correctly', done => {
                draggable.setState({
                    resizeStartPos: { x: 10, y: 10 },
                    resizing: true,
                }, () => {
                    const event = { pageX: 100, pageY: 50, ...eventMocks };
                    draggable.instance().drag(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();

                    setTimeout(() => {
                        expect(draggable.state().size).toEqual({ height: 40, width: 90 });
                        done();
                    });
                });
            });
        });

        describe('when not resizing', () => {
            it('does not update size', done => {
                draggable.setState({
                    resizeStartPos: { x: 10, y: 10 },
                    resizing: false,
                }, () => {

                    const event = { pageX: 100, pageY: 50, ...eventMocks };
                    draggable.instance().drag(event);

                    expect(event.stopPropagation).not.toHaveBeenCalled();
                    expect(event.preventDefault).not.toHaveBeenCalled();

                    // to allow uiWindow to perform an async state update.
                    setTimeout(() => {
                        expect(draggable.state().size).toEqual({ height: 30, width: 20 });
                        done();
                    });
                });
            });
        });
    });

    describe('when a mouseup occurs', () => {
        describe('when moving', () => {
            it('ends the moving state', done => {
                draggable.setState({
                    moving: true,
                }, () => {

                    const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                    draggable.instance().stopDrag(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();

                    setTimeout(() => {
                        expect(draggable.state().moving).toEqual(false);
                        done();
                    });
                });
            });
        });

        describe('when resizing', () => {
            it('ends the resizing state', done => {
                draggable.setState({
                    resizing: true,
                }, () => {

                    const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                    draggable.instance().stopDrag(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();

                    setTimeout(() => {
                        expect(draggable.state().resizing).toEqual(false);
                        done();
                    });
                });
            });
        });
    });
});
