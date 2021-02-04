import StyledButton from './styles';

/**
 * Props aceitos para o Button:
 * inverted: boolean
 * fontSize: string
 * height: string
 * width: string
 * obs.: as strings tem que ter medida, como px, pt, etc.
 */

const Button = props => {
  return <StyledButton {...props} />;
};

export default Button;
