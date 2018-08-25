import { mount } from 'enzyme';
import React from 'react';

import Draggable from './Draggable';

describe('when dragging', () => {
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

        eventMocks.preventDefault.mockReset();
        eventMocks.stopPropagation.mockReset();
    });

    describe('when a mousedown occurs on the header', () => {
        describe('when the left button was pressed', () => {
            it('begins dragging', () => {
                const event = { button: 0, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startDrag(event);
                expect(draggable.state().dragging).toEqual(true);
                expect(draggable.state().dragStartPos).toEqual({ x: 45, y: 40 });

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });

        describe('when another button was pressed', () => {
            it('does nothing', () => {
                const event = { button: 1, pageX: 50, pageY: 50, ...eventMocks };
                draggable.instance().startDrag(event);
                expect(draggable.state().dragging).toEqual(false);

                expect(event.stopPropagation).not.toHaveBeenCalled();
                expect(event.preventDefault).not.toHaveBeenCalled();
            });
        });
    });

    describe('when a mousemove occurs', () => {
        describe('when currently dragging', () => {
            it('updates position correctly', done => {
                draggable.setState({
                    dragStartPos: { x: 10, y: 10 },
                    dragging: true,
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

        describe('when not dragging', () => {
            it('does not update position', done => {
                draggable.setState({
                    dragStartPos: { x: 10, y: 10 },
                    dragging: false,
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
    });

    describe('when a mouseup occurs', () => {
        describe('when dragging', () => {
            it('ends the dragging state', done => {
                draggable.setState({
                    dragging: true,
                }, () => {

                    const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                    draggable.instance().stopDrag(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();

                    setTimeout(() => {
                        expect(draggable.state().dragging).toEqual(false);
                        done();
                    });
                });
            });
        });
    });
});
