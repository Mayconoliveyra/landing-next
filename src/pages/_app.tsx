import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { AppThemeProvider } from '../shared/context/ThemeContext';
import createEmotionCache from '../shared/themes/createEmotionCache';

import './../shared/forms/translationsYup';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="theme-color" content="#0c0c0c" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </CacheProvider>
  );
}
