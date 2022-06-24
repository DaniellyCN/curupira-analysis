import "../../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../theme/createEmotionCache";
import Head from "next/head";
import LoginContext from "../context/LoginContext";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Cucupira Analysis</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginContext>
          <Component {...pageProps} />
        </LoginContext>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
