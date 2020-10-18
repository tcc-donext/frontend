import FormPageLayout from 'components/layouts/FormPageLayout';

const Login = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
    >
      <h1>Página Login</h1>
    </div>
  );
};

Login.layout = FormPageLayout;
Login.getLayoutConfig = {
  header: {
    title: 'Logar',
    logo: true
  },
  footer: {
    back: true
  }
};

export default Login;
