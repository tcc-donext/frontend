import GlobalStyle from 'styles/globals';
import PageLayout from 'components/layouts/PageLayout';
import { AuthProvider } from 'contexts/auth';

import 'overlayscrollbars/css/OverlayScrollbars.css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || PageLayout;
  const layoutConfig = Component.getLayoutConfig || {};

  return (
    <>
      <AuthProvider>
        <Layout config={layoutConfig}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
