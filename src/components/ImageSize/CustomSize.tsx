import React from 'react';

import InputField from '../InputField/InputField';

import { Axis, SizeModal } from './styles';

const CustomSize = ({ defaultValue }: { defaultValue: string }) => {
    const dimensions = defaultValue ? defaultValue.split('x') : [];

    return (
        <SizeModal>
            {['width', 'height'].map((axis, i) => (
                <Axis>
                    <InputField
                        key={i}
                        defaultValue={+dimensions[i] || undefined}
                        label={`Max ${axis}`}
                        required={true}
                        type="number"/>
                </Axis>
            ))}
        </SizeModal>
    );
};

export default CustomSize;
