import { shallow } from 'enzyme';
import React from 'react';

import { appRoutes } from '../Routes/Routes';

import DesignSubMenu from './DesignSubMenu';

describe('DesignSubMenu', () => {
    const { styles } = appRoutes;

    describe('when rendering', () => {
        describe('when isPreview is false', () => {
            it('renders correctly', () => {
                const menu = shallow(
                    <DesignSubMenu
                        isPreview={false}
                        sections={[{ name: 'fred', index: 0 }, { name: 'joe', index: 1 }]}
                        currentPath={styles.path}
                    />
                );

                expect(menu).toMatchSnapshot();
            });
        });

        describe('when isPreview is true', () => {
            it('renders correctly', () => {
                const menu = shallow(
                    <DesignSubMenu
                        isPreview={true}
                        sections={[{ name: 'fred', index: 0 }, { name: 'joe', index: 1 }]}
                        currentPath={styles.path}
                    />
                );

                expect(menu).toMatchSnapshot();
            });
        });
    });
});
