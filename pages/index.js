import { NextSeo } from "next-seo";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Software Engineer</title>
        <link rel="icon" href="/favicon.ico" />
        <NextSeo
          title="Wee Hong KOH - Software Engineer"
          description="Wee Hong KOH, a software engineer who enjoy to get his hand as dirty as possible"
          canonical="https://www.weehong.me/"
          openGraph={{
            url: "https://www.weehong.me/",
            title: "Wee Hong KOH - Software Engineer",
            description:
              "Wee Hong KOH, a software engineer who enjoy to get his hand as dirty as possible",
            site_name: "Wee Hong KOH - Software Engineer",
          }}
        />
      </Head>

      <main className={`${styles.container} ${styles.main}`}>
        <h1 className="text-4xl my-2">Wee Hong KOH</h1>
        <h2 className="text-2xl">Software Engineer</h2>
        <div className="mt-5">
          <a className="text-indigo-500" href="https://github.com/WeeHong/">
            GitHub
          </a>
          <a
            className="text-indigo-500 px-5"
            href="https://www.linkedin.com/in/weehongayden/"
          >
            LinkedIn
          </a>
          <a className="text-indigo-500" href="https://medium.weehong.me/">
            Medium
          </a>
        </div>
      </main>
    </div>
  );
}
