import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { renderLayout, useLanguages } from "../components/GitHubStats";
import styles from "../styles/Home.module.css";

export default function Home({ languages }) {
  const { langs, totalLanguageSize } = useLanguages(languages, [], 5);
  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Software Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title="Wee Hong KOH - Software Engineer"
        description="Wee Hong KOH is a software engineer who enjoys writing code to automate stuff and keep his life as lazy as possible."
        canonical="https://www.weehong.me/"
        openGraph={{
          url: "https://www.weehong.me/",
          title: "Wee Hong KOH - Software Engineer",
          description:
            "Wee Hong KOH is a software engineer who enjoys writing code to automate stuff and keep his life as lazy as possible.",
          site_name: "Wee Hong KOH - Software Engineer",
        }}
      />

      <main className={`${styles.container} ${styles.main}`}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-[Acme] font-bold my-2">
              Wee Hong KOH
            </h1>
            <h2 className="text-2xl">Software Engineer</h2>
            <div className="mt-5">
              <a
                className="text-accent hover:text-yellow-500"
                href="https://github.com/WeeHong/"
              >
                GitHub
              </a>
              <a
                className="text-accent hover:text-yellow-500 px-5"
                href="https://www.linkedin.com/in/weehongayden/"
              >
                LinkedIn
              </a>
              <a
                className="text-accent hover:text-yellow-500"
                href="https://medium.weehong.me/"
              >
                Medium
              </a>
            </div>
            <div className="flex justify-center items-center border border-slate-300 px-8 py-5 rounded mt-5">
              <div>
                <h3 className="mb-7">Most Used Programming Languages</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderLayout(langs, 300, totalLanguageSize),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* The GitHub Extraction function were copied from
 * anuraghazra's repository, github-readme-stats
 * https://github.com/anuraghazra/github-readme-stats
 */
export async function getServerSideProps(context) {
  const exclude_repo = [];

  const res = await Axios.post(`${process.env.NEXT_PUBLIC_URL}/api/github`, {
    username: process.env.GITHUB_USER,
    url: process.env.GITHUB_API_URL,
    token: process.env.GITHUB_PERSONAL_TOKEN,
  });

  let repoNodes = res.data.data;
  let repoToHide = {};

  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => {
      return !repoToHide[name.name];
    });

  repoNodes = repoNodes
    .filter((node) => {
      return node.languages.edges.length > 0;
    })
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      let langSize = prev.size;

      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
      }
      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
        },
      };
    }, {});

  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return {
    props: {
      languages: topLangs,
    },
  };
}
