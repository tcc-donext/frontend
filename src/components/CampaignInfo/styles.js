import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  margin-top: 0.65vh;
  height: 99%;
  padding: 4vh;
`;
export const FormLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const InputArea = styled.textarea`
  outline: none;
  background-color: #ebebeb;
  color: #403e4d;
  height: 20vh;
  border: none;
  resize: none;
  width: 32vw;
  font-size: 24px;
`;
export const SelectArea = styled.select`
  background-color: #ebebeb;
  color: #403e4d;
  height: 6.5vh;
  border: none;
  font-size: 1.25em;
  width: 32vw
  
`

export const InputField = styled.div`
  font-size: 24px;
  display:flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const RowCenter = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FileInputContainer = styled.label`
  overflow: hidden;
  position: relative;
  [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    min-height: 100%;
    min-width: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
  }
  [type=file] {
    cursor: pointer;
  }
`;