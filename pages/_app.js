import "@/styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
