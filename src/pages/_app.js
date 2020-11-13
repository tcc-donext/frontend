import GlobalStyle from 'styles/globals';
import PageLayout from 'components/layouts/PageLayout';

import 'overlayscrollbars/css/OverlayScrollbars.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || PageLayout;
  const layoutConfig = Component.getLayoutConfig || {};

  return (
    <>
      <Layout config={layoutConfig}>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
