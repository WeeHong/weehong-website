import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Software Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title="Wee Hong KOH - Software Engineer"
        description="Wee Hong KOH is a software engineer who enjoys writing code to automate stuff and keep my life as lazy as possible."
        canonical="https://www.weehong.me/"
        openGraph={{
          url: "https://www.weehong.me/",
          title: "Wee Hong KOH - Software Engineer",
          description:
            "Wee Hong KOH is a software engineer who enjoys writing code to automate stuff and keep my life as lazy as possible.",
          site_name: "Wee Hong KOH - Software Engineer",
        }}
      />

      <main className={`${styles.container} ${styles.main}`}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center">
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
            <div className="relative w-full h-48 mt-5">
              <Image
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=WeeHong&layout=compact"
                alt="Most Used Programming Languages"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
