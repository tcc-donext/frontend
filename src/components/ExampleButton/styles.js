import styled from 'styled-components';

export const Button = styled.button`
  width: 200px;
  height: 50px;
  border: 2px solid #db7093;
  border-radius: 8px;
  color: #db7093;
  background-color: inherit;
  font-size: 20px;
  outline: none;

  &:hover {
    border-color: #cd3a6a;
    color: #cd3a6a;
  }

  &:active {
    border-color: #ab0838;
    color: #ab0838;
  }
`;
