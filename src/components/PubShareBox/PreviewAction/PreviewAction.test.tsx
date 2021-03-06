import { mount, shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../../utils/testUtil';

import PreviewAction from './PreviewAction';

describe('InactiveAction', () => {
    const buyButton = sel('buy');
    const addThemeButton = sel('add-theme');

    const mockWindow: any = window;
    mockWindow.location.assign = jest.fn();

    const PreviewActionElement = <PreviewAction
        price={100}
        variationId={'234'}
    />;

    const previewActionShallow = shallow(PreviewActionElement);

    it('renders', () => {
        expect(previewActionShallow).toMatchSnapshot();
    });

    describe('when price is zero', () => {
        const previewActionMount = mount(
            <PreviewAction
                price={0}
                variationId={'234'}
            />
        );
        it('should have "Add Theme" button', () => {
            previewActionMount.setProps({price: 0});
            expect(previewActionMount.find(addThemeButton).hostNodes().length).toBe(1);
        });
    });

    describe('when price is greater than 0', () => {
        const previewActionMount = mount(
            <PreviewAction
                price={100}
                variationId={'234'}
            />
        );

        it('should have a "Buy" button', () => {
            previewActionMount.setProps({price: 100});
            expect(previewActionMount.find(buyButton).hostNodes().length).toBe(1);
        });

        describe('when price is 100', () => {
            it('buy button has the text "Buy $10.00"', () => {
                previewActionMount.setProps({price: 100});
                expect(previewActionMount.find(buyButton).hostNodes().text()).toBe('Buy $10.00');
            });
        });
    });

    describe('when you click on Buy or Add Theme', () => {
        const previewActionMount = mount(
            <PreviewAction
                price={100}
                variationId={'234'}
            />
        );
        const redirectUrl = '/manage/marketplace/themes/234?action=purchase';

        it(`should redirect to ${redirectUrl}`, () => {
            previewActionMount.setProps({price: 100});
            previewActionMount.find(buyButton).hostNodes().simulate('click');
            expect(mockWindow.location.assign).toBeCalledWith(redirectUrl);
        });
    });
});
