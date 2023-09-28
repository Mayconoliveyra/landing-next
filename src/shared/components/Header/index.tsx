import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { WhatsApp } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const PAGES_OPTIONS = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: 'sobre' },
  { name: 'Blog', path: 'blog' },
];
const CONTACT_WHATSAPP = '558399675920';
const MENSAGEM_WHATSAPP = `Olá, preciso de um orçamento.`;

const directToWhatsapp = () => {
  const linkRedirect = `https://wa.me/${CONTACT_WHATSAPP}?text=${MENSAGEM_WHATSAPP}`;
  window.open(linkRedirect, '_blank');
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="desktop">
        <Toolbar disableGutters sx={{ paddingY: 1 }}>
          <Avatar
            component={Link}
            href="/"
            alt="Maycon Developer"
            variant="square"
            src="/assets/images/logo.png"
            sx={{ width: 'auto', height: 65, mr: 10, ml: 2, display: { mobile: 'none', tablet: 'flex' } }}
          />

          <Box sx={{ flexGrow: 1, display: { mobile: 'flex', tablet: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { mobile: 'block', tablet: 'none' },
              }}
            >
              {PAGES_OPTIONS.map((page) => (
                <MenuItem sx={{ marginRight: 8 }} key={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { mobile: 'flex', tablet: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
            <Avatar
              component={Link}
              href="/"
              alt="Maycon Developer"
              variant="square"
              src="/assets/images/logo.png"
              sx={{ width: 'auto', height: 65, mr: 2 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { mobile: 'none', tablet: 'flex' } }}>
            {PAGES_OPTIONS.map((page) => (
              <Button
                key={page.path}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  marginRight: 3,
                  textTransform: 'none',
                  color: router.pathname === page.path ? '#FFBE16' : 'white',
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 600,
                  ':hover': { backgroundColor: 'transparent', color: '#FFBE16' },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { mobile: 'none' } }}>
            <Button onClick={directToWhatsapp} size="large" variant="outlined" sx={{ textTransform: 'none' }}>
              Contato <WhatsApp sx={{ marginLeft: 1, width: 23, height: 23 }} />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header, directToWhatsapp };
