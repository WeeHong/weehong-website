import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import Navbar from "../components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
        </Script>
      </Head>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
