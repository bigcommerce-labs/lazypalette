import styled from 'styled-components';

export interface StyledSmallProps {
    required: boolean;
}

const StyledSmall = styled.small`
    float: right;
    color: ${(props: StyledSmallProps) => props.required ? '#f0603c' : 'initial'};
`;

export default StyledSmall;
