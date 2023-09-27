import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const breakpoints = {
  mobile: 0,
  tablet: 730,
  desktop: 1200,
};

export { roboto, breakpoints };
