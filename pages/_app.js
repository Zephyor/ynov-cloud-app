import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../src/contexts/auth.context';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme/theme';
import Header from './header';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <AppCacheProvider {...props}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <div style={{ paddingTop: '8rem' }}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </AppCacheProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
