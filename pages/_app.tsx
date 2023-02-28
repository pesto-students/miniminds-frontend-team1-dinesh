import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nprogress from "nprogress";
import { Router } from "next/router";
import { AuthProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  Nprogress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", (url) => {
    Nprogress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    Nprogress.done(false);
  });
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
