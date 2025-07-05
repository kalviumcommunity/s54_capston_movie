import {
  Paper,
  Stack,
  Box,
  Typography,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import { GitHub, LinkedIn, Instagram, KeyboardArrowUp } from '@mui/icons-material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Paper
        square
        elevation={0}
        sx={{
          backgroundImage: 'unset',
          padding: '2rem 1rem',
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Top Section: Logo + Social */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          {/* Logo and Tagline */}
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <Logo />
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Discover. Watch. Enjoy.
            </Typography>
          </Box>

          {/* Social Links */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/Rickykumar010"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: theme.palette.text.secondary }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/rickykumar010"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: theme.palette.text.secondary }}
              >
                <LinkedIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
              <IconButton
                component="a"
                href="https://www.instagram.com/rickyshaw07/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: theme.palette.text.secondary }}
              >
                <Instagram />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Contact / Top Button */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}
            >
              📩 rickykumar26400@gmail.com
            </Typography>
            <Tooltip title="Back to Top">
              <IconButton onClick={scrollToTop} sx={{ color: theme.palette.primary.main }}>
                <KeyboardArrowUp />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Bottom Section */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            color: 'text.secondary',
          }}
        >
          &copy; {new Date().getFullYear()} Movie-Flex. Built by{' '}
          <a
            href="https://berthutapea.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Ricky Kumar
          </a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Footer;
