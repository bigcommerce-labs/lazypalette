import { BCPrimaryLogo } from 'pattern-lab';
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { viewportChange } from '../../actions/previewPane';
import { State } from '../../reducers/reducers';
import { VIEWPORT_TYPES } from '../PreviewPane/constants';
import { ViewportType } from '../PreviewPane/PreviewPane';

import { StyledHeaderMenu, StyledIcon } from './styles';

interface HeaderMenuProps {
    isRotated: boolean;
    viewportType: ViewportType;
    toggleViewport(viewportType: ViewportType, isRotated?: boolean): void;
}

const HeaderMenu = (props: HeaderMenuProps) => {
    const { isRotated, toggleViewport, viewportType } = props;

    return (
        <StyledHeaderMenu>
            <BCPrimaryLogo />
            <StyledIcon
                isSelected={viewportType === VIEWPORT_TYPES.DESKTOP}
                onClick={() => toggleViewport(VIEWPORT_TYPES.DESKTOP)}
                viewportType={VIEWPORT_TYPES.DESKTOP}
            />
            <StyledIcon
                isRotated={isRotated}
                isSelected={viewportType === VIEWPORT_TYPES.TABLET}
                onClick={() => toggleViewport(
                    VIEWPORT_TYPES.TABLET,
                    viewportType === VIEWPORT_TYPES.TABLET ? !isRotated : isRotated
                )}
                viewportType={VIEWPORT_TYPES.TABLET}
            />
            <StyledIcon
                isRotated={isRotated}
                isSelected={viewportType === VIEWPORT_TYPES.MOBILE}
                onClick={() => toggleViewport(
                    VIEWPORT_TYPES.MOBILE,
                    viewportType === VIEWPORT_TYPES.MOBILE ? !isRotated : isRotated
                )}
                viewportType={VIEWPORT_TYPES.MOBILE}
            />
        </StyledHeaderMenu>
    );
};

const mapStateToProps = (state: State): Partial<HeaderMenuProps> => state.previewPane;

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderMenuProps> => bindActionCreators({
    toggleViewport: viewportChange,
}, dispatch);

export default connect<Partial<HeaderMenuProps>, Partial<HeaderMenuProps>, {}, State>(
    mapStateToProps, mapDispatchToProps
)(HeaderMenu);
