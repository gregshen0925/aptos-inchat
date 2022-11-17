import type { AppProps } from "next/app";
import { AptosWalletProvider } from "../context/AptosWalletProvider";
import "../styles/styles.css";
import "../styles/globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const toastOptions = {
  style: {
    background: "rgb(0, 0, 0)",
    color: "white",
  },
  success: {
    className: "border border-green-500",
    iconTheme: {
      primary: "#10B981",
      secondary: "white",
    },
  },
  error: {
    className: "border border-red-500",
    iconTheme: {
      primary: "#EF4444",
      secondary: "white",
    },
  },
  loading: { className: "border border-yello-300" },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AptosWalletProvider>
      <Toaster position="top-center" toastOptions={toastOptions} />
      <Component {...pageProps} />
    </AptosWalletProvider>
  );
}

export default MyApp;
