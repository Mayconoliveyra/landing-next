import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

export default function Home({ dateCurrency }: { dateCurrency: string }) {
  const [pageFullLoad, setPageFullLoad] = useState(false);

  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));

  // Isso server para que a página só seja exibida após o material-ui ser carregado por completo.
  useEffect(() => {
    setPageFullLoad(true);
  }, []);
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      {pageFullLoad && (
        <Box border={1}>
          <Typography variant={desktop ? 'h1' : 'h6'}>Olá, mundo!</Typography>
          <Typography variant={desktop ? 'h1' : 'h6'}>{dateCurrency}</Typography>
        </Box>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 2, // A cada 2 minutos
  };
};
