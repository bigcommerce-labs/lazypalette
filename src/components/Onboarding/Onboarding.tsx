import * as queryString from 'query-string';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setQueryParams, QueryParamsData, UpdateQueryParamsAction } from '../../actions/merchant';
import { State } from '../../reducers/reducers';
import { updateQueryParamsService } from '../../services/queryParam';
import AlertModal from '../Modal/AlertModal/AlertModal';

import { OnboardingAction, OnboardingMessage, OnboardingTitle } from './constants';

interface OnboardingProps {
    queryParams: string;
    setQueryParams(queryData: QueryParamsData): UpdateQueryParamsAction;
}

export class Onboarding extends PureComponent<OnboardingProps, {}> {
    checkShouldShowOnboarding = () => {
        const queryParams = queryString.parse(this.props.queryParams);

        return queryParams.optIn === 'true';
    };

    onboardingComplete = () => {
        const queryParams = updateQueryParamsService({ optIn: null });
        this.props.setQueryParams({ queryParams });
    };

    render() {
        if (this.checkShouldShowOnboarding()) {
            return (
                <AlertModal
                    actionText={OnboardingAction}
                    title={OnboardingTitle}
                    body={OnboardingMessage}
                    primaryAction={this.onboardingComplete}
                />
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state: State) => ({
    queryParams: state.merchant.queryParams,
});

const mapDispatchToProps = {
    setQueryParams,
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
