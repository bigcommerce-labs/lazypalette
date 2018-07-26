import { shallow } from 'enzyme';
import React from 'react';

import ConfirmModal from './ConfirmModal';

describe('ConfirmModal', () => {
    it('renders', () => {
        const mockHandler = jest.fn();

        const mockBody = 'This theme will self-destruct in T-minus';

        const title = 'Please Confirm:';

        const confirmModal = shallow(
            <ConfirmModal
                body={mockBody}
                title={title}
                onClose={mockHandler}
                secondaryAction={mockHandler}
            />
        );

        expect(confirmModal).toMatchSnapshot();
    });
});
