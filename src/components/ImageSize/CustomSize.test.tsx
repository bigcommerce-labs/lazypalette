import { shallow } from 'enzyme';
import React from 'react';

import { StyledImageLock } from './styles';
import CustomSize from './CustomSize';

describe('<CustomSize /> test', () => {
    const mockFunction = jest.fn();

    it('should render 2 <NumberInput />', () => {
        const customImageSize = shallow(
            <CustomSize
                defaultValue="250x100"
                onChange={mockFunction}
            />
        );

        expect(customImageSize.find('NumberInput').length).toBe(2);
    });

    it('should render one of the ImputField with the label as "Max width" and the other as "Max height"', () => {
        const customImageSize = shallow(
            <CustomSize
                defaultValue="250x100"
                onChange={mockFunction}
            />
        );

        expect(customImageSize.find('NumberInput').getElements()[0].props.label).toBe('Max width');
        expect(customImageSize.find('NumberInput').getElements()[1].props.label).toBe('Max height');
    });

    describe('handleOnBlur', () => {
        it('should change value to 1', () => {
            const customImageSize = shallow(
                <CustomSize
                    defaultValue="250x100"
                    onChange={mockFunction}
                />
            );

            customImageSize.setState({ width: '0', height: '0' });
            const event = {
                target: {
                    value: '',
                },
            };
            const widthMock = customImageSize.find('NumberInput').find({ label: 'Max width' });
            const heightMock = customImageSize.find('NumberInput').find({ label: 'Max height' });
            widthMock.simulate('blur', event);
            heightMock.simulate('blur', event);
            expect(customImageSize.state()).toEqual({height: '1', imageLock: false, imageRatio: 0, width: '1'});
        });
    });

    describe('handleChange', () => {
        describe('when imageLock is NOT active', () => {
            it('should update values normally', () => {
                const customImageSize = shallow(
                    <CustomSize
                        defaultValue="250x100"
                        onChange={mockFunction}
                    />
                );

                const event = {
                    target: { value: '10' },
                };
                const widthMock = customImageSize.find('NumberInput').find({ label: 'Max width' });
                widthMock.simulate('change', event);
                expect(customImageSize.state('height')).toEqual('100');
            });
        });

        describe('when imageLock is active', () => {
            it('should update values with ratio', () => {
                const customImageSize = shallow(
                    <CustomSize
                        defaultValue="50x100"
                        onChange={mockFunction}
                    />
                );
                const event = {
                    target: { value: '100' },
                };
                const { value } = event.target;
                const expectedEvent = {
                    target: { value: `${value}x${Number(value) * 2}` },
                };

                const imageLock = customImageSize.find(StyledImageLock);
                imageLock.simulate('click');
                const widthMock = customImageSize.find('NumberInput').find({ label: 'Max width' });
                widthMock.simulate('change', event);
                expect(mockFunction).toHaveBeenLastCalledWith(expectedEvent);
            });
        });
    });
});
