import React from 'react';

import { Axis, SizeModal } from './styles';

import InputField from '../InputField/InputField';

const CustomSize = ({defaultValue}: {defaultValue: string}) => {
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
            type="number" />
        </Axis>
      ))}
    </SizeModal>
  );
};

export default CustomSize;
