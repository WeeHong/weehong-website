import "../styles/globals.css";

import Navbar from "../components/Navbar";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'G-ZSCEHQLM4G', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
