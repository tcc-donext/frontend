import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 5%;
  background-color: #e37fd6;
  color: #fff;
  font-size: ${props => props.fontSize || '120%'};
  font-weight: 300;

  width: ${props => props.width || '105px'};
  height: ${props => props.height || '42px'};
`;

export default StyledButton;
