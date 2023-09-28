import { ReactNode, useEffect, useState } from 'react';

import { Header } from '../components/Header';

import { Box } from '@mui/material';

interface ILayoutBase {
  children: ReactNode;
}

const LayoutBase = ({ children }: ILayoutBase) => {
  const [pageFullLoad, setPageFullLoad] = useState(false);

  // Isso server para que a página só seja exibida após o material-ui ser carregado por completo.
  useEffect(() => {
    setPageFullLoad(true);
  }, []);
  return (
    <>
      {pageFullLoad && (
        <>
          <Header />
          <Box component="section" display="flex" flex={1}>
            {children}
          </Box>
          <Box component="footer">rodape</Box>
        </>
      )}
    </>
  );
};

export { LayoutBase };
