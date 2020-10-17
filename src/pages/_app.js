import GlobalStyle from 'styles/globals';
import PageLayout from 'components/layouts/PageLayout';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || PageLayout;
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
