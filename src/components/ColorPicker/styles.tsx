import React, { SFC } from 'react';
import styled from 'styled-components';

import { colors } from '../../styleConstants';

interface ContainerProps {
  children: any;
}

export const Container: SFC<ContainerProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

const SelectedColorOuter = styled.div`
  background: ${colors.lightGray};
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  height: 24px;
  padding: 1px;
  width: 24px;
`;

interface SelectedColorInnerProps {
  color: RGBAColor;
}

const SelectedColorInner = styled.div.attrs<SelectedColorInnerProps>({}) `
  background: ${(props: SelectedColorInnerProps) => `rgba(
    ${props.color.r},
    ${props.color.g},
    ${props.color.b},
    ${props.color.a}
  )`};
  border-radius: 3px;
  height: 24px;
  width: 24px;
`;

interface RGBAColor {
  a: string;
  b: string;
  g: string;
  r: string;
}

interface SelectedColorProps {
  color: any;
  onClick?: (() => void);
}

export const SelectedColor = (props: SelectedColorProps) => {
  return (
    <SelectedColorOuter onClick={props.onClick}>
      <SelectedColorInner color={props.color} />
    </SelectedColorOuter>
  );
};
