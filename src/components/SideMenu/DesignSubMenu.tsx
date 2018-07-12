import React, { PureComponent } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import { DesignMenuButtons } from './styles';
import SubMenu from './SubMenu';

interface MenuItem {
    label: string;
    path: string;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
    isChanged: boolean;
    handleSave(): void;
    handleReset(): void;
}

const staticItems: MenuItem[] = [
    {
        label: 'Logo and name',
        path: 'logo',
    },
    {
        label: 'Store theme',
        path: 'theme',
    },
];

const getItems = (sections: string[]) => {
    return sections.map((section: string, index: number) => (
        {
            label: section,
            path: `style/${index}`,
        }
    ));
};

class DesignSubMenu extends PureComponent<DesignSubMenuProps> {
    handleSave = () => this.props.handleSave();

    handleReset = () => this.props.handleReset();

    render() {
        const { currentPath, isChanged } = this.props;

        return (
            <>
                <SubMenu
                    title="Design"
                    items={[...staticItems, ...getItems(this.props.sections)]}
                    currentPath={currentPath}
                    showArrows={false}
                />
                <DesignMenuButtons>
                    <ButtonInput
                        onClick={this.handleSave}
                        classType="primary"
                        type="button"
                    >
                        Save
                    </ButtonInput>
                    <ButtonInput
                        onClick={this.handleReset}
                        disabled={!isChanged}
                        type="button"
                    >
                        Reset
                    </ButtonInput>
                </DesignMenuButtons>
            </>
        );
    }
}

export default DesignSubMenu;
