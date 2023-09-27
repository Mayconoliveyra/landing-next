import { Global, css } from '@emotion/react';

const globalStyles = css`
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const GlobalStyles: React.FC = () => <Global styles={globalStyles} />;
