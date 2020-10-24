import { StyledInput, StyledLabel } from './styles';

const Input = props => {
  return (
    <div className="input">
      <StyledLabel {...props.labelProps}>{props.label}</StyledLabel>
      <StyledInput {...props} />
    </div>
  );
};

export default Input;
