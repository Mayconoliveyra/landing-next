import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import Document, { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document';
import * as React from 'react';

import createEmotionCache from '../shared/themes/createEmotionCache';
import { roboto } from '../shared/themes/shared';
import { MyAppProps } from './_app';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="pt-br" className={roboto.className}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
        <style>{`
          html {
            height: 100%;
          }
          body {
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
          #__next {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </body>
    </Html>
  );
}

// `getInitialProps` pertence a `_document` (ao invés de `_app`),
// é compatível com geração de site estático (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
