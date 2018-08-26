import { shallow } from 'enzyme';
import React from 'react';

import { appRoutes } from '../Routes/Routes';

import DesignSubMenu from './DesignSubMenu';

describe('DesignSubMenu', () => {
    const { styles } = appRoutes;

    it('renders', () => {
        const menu = shallow(
            <DesignSubMenu
                sections={['fred', 'joe']}
                currentPath={styles.path}
            />
        );

        expect(menu).toMatchSnapshot();
    });
});
