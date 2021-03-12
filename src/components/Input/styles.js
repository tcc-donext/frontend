import styled from 'styled-components';

export const StyledInput = styled.input`
  border: 0;
  border-radius: 2.75pt;
  height: 6.5vh;
  width: ${props => props.width || 'auto'};
  outline: none;

  ${props =>
    props.icon &&
    `background: url(${props.icon}) 20px 15px / 40px 40px no-repeat scroll;`}
  background-color: #ebebeb;

  padding: ${props => props.padding || '2.5% 5% 2.5% 4%'};
  font-size: ${props => props.fontSize || '1.25em'};
  color: #403e4d;
`;

export const StyledLabel = styled.label`
  display: block;
  color: #5c5a6f;
  font-size: ${props => props.fontSize || '1.625em'};
  font-weight: 300;
  padding-bottom: 1vh;
  padding-left: 1%;
`;
