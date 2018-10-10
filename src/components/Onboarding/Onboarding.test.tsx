import { shallow } from 'enzyme';
import React from 'react';

import { Onboarding } from './Onboarding';

describe('<Onboarding />', () => {
    const mockSetQueryParams = jest.fn();
    beforeEach(() => {
        mockSetQueryParams.mockReset();
    });

    describe('when rendering', () => {
        describe('when optIn query parameter is "true"', () => {
            it('renders correctly', () => {
                const onboarding = shallow(
                    <Onboarding
                        queryParams={'blah&optIn=true'}
                        setQueryParams={mockSetQueryParams}
                    />);

                expect(onboarding).toMatchSnapshot();
            });
        });

        describe('when optIn query parameter is not "true"', () => {
            it('renders correctly', () => {
                const onboarding = shallow(
                    <Onboarding
                        queryParams={'blah&optIn=blah'}
                        setQueryParams={mockSetQueryParams}
                    />);

                expect(onboarding).toMatchSnapshot();
            });
        });

        describe('when optIn query parameter is not present', () => {
            it('renders correctly', () => {
                const onboarding = shallow(
                    <Onboarding
                        queryParams={'blah'}
                        setQueryParams={mockSetQueryParams}
                    />);

                expect(onboarding).toMatchSnapshot();
            });
        });
    });

    describe('when onboarding is complete', () => {
        it('removed the optIn query parameter', () => {
            const onboarding = shallow(
                <Onboarding
                    queryParams={'?variationId=123&optIn=true'}
                    setQueryParams={mockSetQueryParams}
                />);

            expect(mockSetQueryParams).not.toHaveBeenCalled();
            (onboarding.instance() as Onboarding).onboardingComplete();
            expect(mockSetQueryParams).toHaveBeenCalled();
        });
    });
});
