import { GetStaticProps } from 'next';
import Head from 'next/head';

import { Box, Typography } from '@mui/material';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>{`Sobre - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>

      <Box display="flex" flex={1} maxWidth="desktop" margin="0 auto">
        <Typography marginTop={4} variant="h4" component="h1" color="text.primary" align="center" width="100%">
          Em breve...
        </Typography>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 2, // A cada 2 minutos
  };
};
