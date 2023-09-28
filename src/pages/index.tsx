import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';

import { directToWhatsapp } from '../shared/components/Header';

import { getPrismicClient } from '../shared/services/prismic';

import { maskPhone, maskPhone9 } from '../shared/utils/masks';

import Prismic from '@prismicio/client';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { FTextField, FTextFieldMask } from '../shared/forms/FTextField';

interface IPrismicContent {
  title_1: string;
  sub_title_1: string;
  imagem_main: { url: string; alt: string };

  title_2: string;

  img_service_1: { url: string; alt: string };
  title_service_1: string;
  text_service_1: string;

  img_service_2: { url: string; alt: string };
  title_service_2: string;
  text_service_2: string;

  img_service_3: { url: string; alt: string };
  title_service_3: string;
  text_service_3: string;

  title_3: string;
  sub_title_3: string;
}
interface ICardService {
  img_service: { url: string; alt: string };
  title_service: string;
  text_service: string;
}
const CardService = ({ img_service, title_service, text_service }: ICardService) => {
  return (
    <Card sx={{ display: 'flex', height: '100%' }}>
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <CardMedia component="img" height="250" image={img_service.url} alt={img_service.alt} />
        <CardContent sx={{ flex: 1, paddingBottom: 4 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title_service}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text_service}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface IFormData {
  name: string;
  email: string;
  contact: string;
}
const scheme: yup.Schema<IFormData> = yup.object().shape({
  name: yup.string().required().trim().max(100),
  email: yup.string().required().trim().email().max(100),
  contact: yup
    .string()
    .required()
    .trim()
    .test('valid-length', 'Insira um contato válido.', (value) => {
      if (value.length === 10 || value.length === 11) return true;
      return false;
    }),
});
const initialValues: IFormData = {
  name: '',
  email: '',
  contact: '',
};

export default function Home({ content }: { content: IPrismicContent }) {
  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const formik = useFormik<IFormData>({
    initialValues: initialValues,
    validationSchema: scheme,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      formik.resetForm({
        values: {
          ...initialValues,
        },
      });
      setSnackbarOpen(true);

      // Não vou aguardar o retorno.
      axios.post('/api/sendEmail', { ...values });
    },
  });

  const handleCloseSnackbar = useCallback((event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <Box display="flex" flex={1} maxWidth="desktop" margin="0 auto" marginBottom={7}>
        <Box flex={1}>
          {/* Sessão inicial */}
          <Box
            component="section"
            display="flex"
            sx={{
              flexDirection: { mobile: 'column', tablet: 'row' },
              padding: { mobile: 2, tablet: 4 },
              marginTop: { mobile: 2, tablet: 10 },
            }}
          >
            <Box maxWidth={730} display="flex" flexDirection="column">
              <Typography
                variant={desktop || tablet ? 'h3' : 'h4'}
                lineHeight={1.3}
                fontWeight={700}
                component="h1"
                color="white"
                sx={{ textAlign: { mobile: 'center', tablet: 'left' } }}
              >
                {content.title_1}
              </Typography>
              <Typography
                variant="body1"
                lineHeight={2}
                component="span"
                color="#AFAFAF"
                sx={{ textAlign: { mobile: 'center', tablet: 'left' }, marginTop: 2 }}
              >
                {content.sub_title_1}
              </Typography>
              <Box sx={{ marginTop: 3, display: 'flex', justifyContent: { mobile: 'center', tablet: 'flex-start' } }}>
                <Button onClick={directToWhatsapp} variant="contained" size="large">
                  Contatar
                </Button>
              </Box>
            </Box>
            <Box sx={{ marginLeft: { tablet: 5 }, marginTop: desktop || tablet ? 0 : 4 }}>
              <Avatar
                alt={content.imagem_main.alt}
                variant="square"
                src={content.imagem_main.url}
                sx={{ width: 'auto', height: '100%', mr: 10, margin: '0 auto' }}
              />
            </Box>
          </Box>

          <Box marginTop={5} marginBottom={5}>
            <Divider />
          </Box>

          {/* Sessão conhecer produtos */}
          <Box
            component="section"
            display="flex"
            sx={{
              flexDirection: 'column',
              padding: { mobile: 2, tablet: 4 },
              marginTop: { mobile: 2, tablet: 5 },
            }}
          >
            <Typography
              variant={desktop || tablet ? 'h3' : 'h4'}
              lineHeight={1.3}
              fontWeight={700}
              component="h2"
              color="white"
              sx={{ textAlign: 'center' }}
            >
              {content.title_2}
            </Typography>

            <Box sx={{ marginTop: desktop || tablet ? 8 : 6 }}>
              <Grid container spacing={desktop ? 4 : tablet ? 3 : 2}>
                <Grid mobile={12} tablet={6} desktop={4} item>
                  <CardService
                    img_service={{ ...content.img_service_1 }}
                    title_service={content.text_service_1}
                    text_service={content.text_service_1}
                  />
                </Grid>
                <Grid mobile={12} tablet={6} desktop={4} item>
                  <CardService
                    img_service={{ ...content.img_service_2 }}
                    title_service={content.text_service_2}
                    text_service={content.text_service_2}
                  />
                </Grid>
                <Grid mobile={12} tablet={6} desktop={4} item>
                  <CardService
                    img_service={{ ...content.img_service_3 }}
                    title_service={content.text_service_3}
                    text_service={content.text_service_3}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box marginTop={5} marginBottom={5}>
            <Divider />
          </Box>

          {/* Sessão orçamento */}
          <Box
            component="section"
            display="flex"
            sx={{
              flexDirection: { mobile: 'column', tablet: 'row' },
              padding: { mobile: 2, tablet: 4 },
              marginTop: { mobile: 2, tablet: 5 },
            }}
          >
            <Box maxWidth={730} display="flex" flexDirection="column">
              <Typography
                variant={desktop || tablet ? 'h3' : 'h4'}
                lineHeight={1.3}
                fontWeight={700}
                component="h3"
                color="white"
                sx={{ textAlign: { mobile: 'center', tablet: 'left' } }}
              >
                {content.title_3}
              </Typography>
              <Typography
                variant="body1"
                lineHeight={2}
                component="span"
                color="#AFAFAF"
                sx={{ textAlign: { mobile: 'center', tablet: 'left' }, marginTop: 2 }}
              >
                {content.sub_title_3}
              </Typography>
            </Box>
            <Box
              component={Paper}
              width="100%"
              sx={{
                padding: desktop ? 4 : tablet ? 3 : 2,
                paddingBottom: desktop ? 4 : tablet ? 4 : 3,
                marginLeft: { tablet: 5 },
                marginTop: desktop || tablet ? 0 : 4,
              }}
            >
              <FTextField required label="Seu nome" name="name" formik={formik} maxLength={100} />
              <FTextField required label="E-mail" name="email" formik={formik} maxLength={100} />
              <FTextFieldMask
                required
                label="Telefone"
                name="contact"
                mask={[maskPhone, maskPhone9]}
                inputMode="numeric"
                formik={formik}
              />
              <Box sx={{ marginTop: 3, display: 'flex', justifyContent: { mobile: 'center', tablet: 'flex-end' } }}>
                <Button type="submit" onClick={() => formik.handleSubmit()} sx={{ textTransform: 'none' }} variant="contained">
                  Enviar informações
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Formulário enviado com sucesso! Entraremos em contato em breve."
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response: any = await prismic.query([Prismic.Predicates.at('document.type', 'home')]);

  console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
  console.log(response.results[0].data);

  if (!response || !response.results[0] || response.results[0].data) {
    return {
      notFound: true,
    };
  }

  const {
    title_1,
    sub_title_1,
    imagem_main,
    title_2,
    img_service_1,
    title_service_1,
    text_service_1,
    img_service_2,
    title_service_2,
    text_service_2,
    img_service_3,
    title_service_3,
    text_service_3,
    title_3,
    sub_title_3,
  } = response.results[0].data;

  const content = {
    title_1: title_1[0].text,
    sub_title_1: sub_title_1[0].text,
    imagem_main: { url: imagem_main.url, alt: imagem_main.alt },
    title_2: title_2[0].text,

    img_service_1: { url: img_service_1.url, alt: img_service_1.alt },
    title_service_1: title_service_1[0].text,
    text_service_1: text_service_1[0].text,

    img_service_2: { url: img_service_2.url, alt: img_service_2.alt },
    title_service_2: title_service_2[0].text,
    text_service_2: text_service_2[0].text,

    img_service_3: { url: img_service_3.url, alt: img_service_3.alt },
    title_service_3: title_service_3[0].text,
    text_service_3: text_service_3[0].text,

    title_3: title_3[0].text,
    sub_title_3: sub_title_3[0].text,
  };

  return {
    props: { content },
    revalidate: 60 * 2, // A cada 2 minutos
  };
};
