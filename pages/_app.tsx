import type { AppProps } from "next/app";
import { AptosWalletProvider } from "../context/AptosWalletProvider";
import "../styles/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AptosWalletProvider>
      <Component {...pageProps} />
    </AptosWalletProvider>
  );
}

export default MyApp;
