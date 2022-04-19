import dynamic from "next/dynamic";
import Script from "next/script";
import "nprogress/nprogress.css";
import Nav from "../components/Navbar";
import "../styles/globals.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <TopProgressBar />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
