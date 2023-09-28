import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../shared/services/prismic';

import Prismic from '@prismicio/client';

import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

export default function Home({ dateCurrency }: { dateCurrency: string }) {
  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <Box border={1}>
        <Typography variant={desktop ? 'h1' : 'h6'}>Olá, mundo!</Typography>
        <Typography variant={desktop ? 'h1' : 'h6'}>{dateCurrency}</Typography>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([Prismic.Predicates.at('document.type', 'home')]);

  console.log(response.results[0].data);

  return {
    props: {},
    revalidate: 60 * 2, // A cada 2 minutos
  };
};
