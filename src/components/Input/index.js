import { StyledInput, StyledLabel } from './styles';

const Input = props => {
  const { children, style, ...propsRest } = props;

  return (
    <div className="input" style={style}>
      <StyledLabel {...props.labelProps}>{props.label}</StyledLabel>
      <StyledInput {...propsRest} />
    </div>
  );
};

export default Input;
