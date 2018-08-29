import React, { PureComponent } from 'react';

import { StyledTooltip } from './styles';

interface TooltipProps {
    hideDelay?: number;
    message: JSX.Element | string;
    showDelay?: number;
    mock?: {
        elementClientRect: {
            bottom: number,
            left: number,
            right: number,
            top: number,
            width: number,
        },
        tooltipClientRect: {
            width: number,
            height: number,
        },
        windowWidth: number;
    };
}

interface TooltipState {
    message: (JSX.Element | string) | Array<JSX.Element | string>;
    tooltipPosition: { belowElement: boolean, x: number, y: number };
    tooltipVisible: boolean;
}

class Tooltip extends PureComponent<TooltipProps, TooltipState> {
    readonly state: TooltipState = {
        message: this.props.message,
        tooltipPosition: { belowElement: false, x: 0, y: 0 },
        tooltipVisible: false,
    };

    showTimer: NodeJS.Timer | null;
    hideTimer: NodeJS.Timer | null;
    childRef: any = React.createRef();
    tooltipRef: any = React.createRef();

    componentDidUpdate() {
        if (this.state.tooltipVisible) {
            const tooltipPosition = this.getTooltipPosition();

            if (tooltipPosition.x !== this.state.tooltipPosition.x ||
                tooltipPosition.y !== this.state.tooltipPosition.y) {
                this.setState({ tooltipPosition });
            }
        }
    }

    showTooltip = () => {
        this.setState({
            message: this.props.message,
            tooltipPosition: { belowElement: false, x: -2000, y: -2000 },
            tooltipVisible: true,
        });
    };

    getTooltipPosition = () => {
        const { mock } = this.props;

        const { bottom, left, right, top, width } = mock
            ? mock.elementClientRect
            : this.childRef.current.getBoundingClientRect();

        const { height: tooltipHeight, width: tooltipWidth } = mock
            ? mock.tooltipClientRect
            : this.tooltipRef.current.getBoundingClientRect();

        const windowWidth = mock ? mock.windowWidth : window.innerWidth;

        // get the maximum and minimum values of x that would still fully display the tooltip
        const xMax = windowWidth - tooltipWidth;
        const xMin = tooltipWidth / 2;

        // attempt to position the tooltip such that its center is  aligned with the center of the element
        let x = left + (width / 2) - (tooltipWidth / 2);

        if (x < xMin) {
            // if the tooltip goes off the left edge of the screen, instead align its left edge with the element
            x = left;
        } else if (x > xMax) {
            // if the tooltip goes off the right edge, align its right edge with the child
            x = right - tooltipWidth;
        }

        // attempt to position the tooltip above the element
        let y = top - tooltipHeight;
        let belowElement = false;

        if (y < 0) {
            // if the tooltip cannot fit above the element, position it below the element instead.
            y = bottom;
            belowElement = true;
        }

        return { belowElement, x, y };
    };

    hideTooltip = () => {
        this.setState({ tooltipVisible: false });
    };

    startShowTimer = () => {
        this.showTimer = setTimeout(() => {
            this.showTooltip();
            this.clearShowTimer();
        }, this.props.showDelay === undefined ? 250 : this.props.showDelay);
    };

    clearShowTimer = () => {
        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = null;
        }
    };

    startHideTimer = () => {
        this.hideTimer = setTimeout(() => {
            this.hideTooltip();
            this.clearHideTimer();
        }, this.props.hideDelay === undefined ? 100 : this.props.hideDelay);

    };

    clearHideTimer = () => {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    };

    onMouseEnter = () => {
        this.state.tooltipVisible ? this.clearHideTimer() : this.startShowTimer();
    };

    onMouseLeave = () => {
        this.state.tooltipVisible ? this.startHideTimer() : this.clearShowTimer();
    };

    render() {
        const child = React.Children.only(this.props.children);
        const { message, tooltipPosition, tooltipVisible } = this.state;

        return (
            <>
                {tooltipVisible &&
                    <StyledTooltip
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        innerRef={this.tooltipRef}
                        position={tooltipPosition}
                    >
                        {message}
                    </StyledTooltip>
                }
                {React.cloneElement(child, {
                    innerRef: this.childRef,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                })}
            </>

        );
    }
}

export default Tooltip;
