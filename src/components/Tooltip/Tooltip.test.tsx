import { mount } from 'enzyme';
import React from 'react';
import styled from 'styled-components';

import { StyledTooltip } from './styles';
import Tooltip from './Tooltip';

const ChildElement = styled.div``;

describe('Tooltip', () => {
    let tooltip: any;
    let mock: any;

    beforeEach(() => {
        mock = {
            elementClientRect: {
                bottom: 300,
                left: 200,
                right: 400,
                top: 200,
                width: 200,
            },
            tooltipClientRect: {
                height: 100,
                width: 100,
            },
            windowWidth: 1000,
        };
    });

    describe('renders correctly', () => {
        beforeEach(() => {
            tooltip = mount(
                <Tooltip
                    message="hello"
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );
        });

        it('when the tooltip is not shown', () => {
            expect(tooltip).toMatchSnapshot();
        });

        it('when the tooltip is shown', () => {
            tooltip.setState({ tooltipVisible: true });
            expect(tooltip).toMatchSnapshot();
        });

        it('when the tooltip is shown with a component as a message', () => {
            tooltip = mount(
                <Tooltip
                    message={<a>Click me</a>}
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );

            tooltip.setState({ tooltipVisible: true });
            expect(tooltip).toMatchSnapshot();
        });

        it('when the tooltip is shown but the message is undefined', () => {
            tooltip.setState({ message: undefined, tooltipVisible: true });
            expect(tooltip).toMatchSnapshot();
        });
    });

    describe('positions itself correctly', () => {
        it('when there is room for the tooltip in the default position', () => {
            tooltip = mount(
                <Tooltip
                    message="hello"
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );

            tooltip.setState({
                tooltipVisible: true,
            });

            expect(tooltip.state().tooltipPosition).toEqual({
                belowElement: false,
                x: 250,
                y: 100,
            });
        });

        it('when the element is on the top of the screen', () => {
            mock.elementClientRect.top = 90;

            tooltip = mount(
                <Tooltip
                    message="hello"
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );

            tooltip.setState({
                tooltipVisible: true,
            });

            expect(tooltip.state().tooltipPosition).toEqual({
                belowElement: true,
                x: 250,
                y: 300,
            });
        });

        it('when the element is on the left of the screen', () => {
            mock.elementClientRect.left = 10;
            mock.elementClientRect.width = 50;

            tooltip = mount(
                <Tooltip
                    message="hello"
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );

            tooltip.setState({
                tooltipVisible: true,
            });

            expect(tooltip.state().tooltipPosition).toEqual({
                belowElement: false,
                x: 10,
                y: 100,
            });
        });

        it('when the element is on the right of the screen', () => {
            mock.elementClientRect.left = 930;
            mock.elementClientRect.right = 980;
            mock.elementClientRect.width = 50;

            tooltip = mount(
                <Tooltip
                    message="hello"
                    mock={mock}
                >
                    <ChildElement/>
                </Tooltip>
            );

            tooltip.setState({
                tooltipVisible: true,
            });

            expect(tooltip.state().tooltipPosition).toEqual({
                belowElement: false,
                x: 880,
                y: 100,
            });
        });
    });

    describe('when handling mouse events', () => {
        beforeEach(() => {
            jest.useFakeTimers();

            tooltip = mount(
                <Tooltip
                    hideDelay={500}
                    message="hello"
                    mock={mock}
                    showDelay={1000}
                >
                    <ChildElement/>
                </Tooltip>
            );
        });

        describe('when the tooltip is not shown', () => {
            describe('when the mouse enters the child element', () => {
                it('starts a timer to show the tooltip', () => {
                    tooltip.find(ChildElement).simulate('mouseEnter');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(true);
                });
            });

            describe('when the mouse leaves the child element', () => {
                it('stops the timer to show the tooltip', () => {
                    tooltip.find(ChildElement).simulate('mouseEnter');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
                    tooltip.find(ChildElement).simulate('mouseLeave');
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(false);
                });
            });
        });

        describe('when the tooltip is shown', () => {
            beforeEach(() => {
                tooltip.setState({ tooltipVisible: true });
            });

            describe('when the mouse leaves the child element', () => {
                it('starts the timer to hide the tooltip', () => {
                    tooltip.find(ChildElement).simulate('mouseLeave');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(false);
                });
            });

            describe('when the mouse leaves the tooltip element', () => {
                it('starts the timer to hide the tooltip', () => {
                    tooltip.find(StyledTooltip).simulate('mouseLeave');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(false);
                });
            });

            describe('when the mouse enters the child element', () => {
                it('stops the timer to hide the tooltip', () => {
                    tooltip.find(ChildElement).simulate('mouseLeave');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
                    tooltip.find(ChildElement).simulate('mouseEnter');
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(true);
                });
            });

            describe('when the mouse enters the tooltip element', () => {
                it('stops the timer to hide the tooltip', () => {
                    tooltip.find(ChildElement).simulate('mouseLeave');
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
                    tooltip.find(StyledTooltip).simulate('mouseEnter');
                    jest.runAllTimers();
                    expect(tooltip.state().tooltipVisible).toEqual(true);
                });
            });
        });
    });
});
