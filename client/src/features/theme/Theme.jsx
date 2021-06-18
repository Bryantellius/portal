import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    lightGray: '#f5f3f3'
  },
  layouts: {
    default: {
      topNav: {
        height: '75px'
      }
    },
    account: {
      sidebar: {
        width: '300px',
        height: '100vh',
        backgroundColor: '#354052',
        textColor: '#adb5bd'
      }
    }
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default Theme;