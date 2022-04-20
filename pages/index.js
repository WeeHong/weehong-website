import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import ApplicationInfo from "../components/ApplicantInfo";
import { renderLayout, useLanguages } from "../components/GitHubStats";
import GitHub from "../icons/GitHub";
import LinkedIn from "../icons/LinkedIn";
import Medium from "../icons/Medium";
import styles from "../styles/Home.module.css";

const Home = ({ languages, content }) => {
  const { attributes: data } = content;
  const { langs, totalLanguageSize } = useLanguages(languages, [], 5);
  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Software Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`${data.Name} - ${data.Title}`}
        description={data.Description}
        canonical="https://www.weehong.me/"
        openGraph={{
          url: "https://www.weehong.me/",
          title: `${data.Name} - ${data.Title}`,
          description: `${data.Description}`,
          site_name: `${data.Name} - ${data.Title}`,
          type: "website",
        }}
      />

      <main className={`${styles.container} ${styles.main}`}>
        <div className="grid gap-0 grid-cols-1 md:gap-4 md:grid-cols-3">
          <div
            className={`flex flex-col justify-center items-center relative ${styles.introBg}`}
          >
            <h1 className="text-4xl font-ibm font-bold my-2">{data.Name}</h1>
            <h2 className="text-2xl font-ibm">{data.Title}</h2>
            <div className="flex mt-5">
              <a
                className="text-accent hover:text-yellow-500"
                href="https://github.com/WeeHong/"
                target="_blank"
                rel="noreferrer"
              >
                <GitHub width="50" height="50" />
              </a>
              <a
                className="text-accent hover:text-yellow-500 px-5"
                href="https://www.linkedin.com/in/weehongayden/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedIn width="50" height="50" />
              </a>
              <a
                className="text-accent hover:text-yellow-500"
                href="https://medium.weehong.me/"
                target="_blank"
                rel="noreferrer"
              >
                <Medium width="50" height="50" />
              </a>
            </div>
            <div className="flex justify-center items-center px-8 py-5 rounded mt-5 bg-white/50 shadow w-full md:w-auto">
              <div>
                <h3 className="font-ibm mb-7">
                  Most Used Programming Languages
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderLayout(langs, 300, totalLanguageSize),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="relative col-span-2 mt-5 md:mt-0">
            <div>
              <ApplicationInfo content={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

/* The GitHub Extraction function were copied from
 * anuraghazra's repository, github-readme-stats
 * https://github.com/anuraghazra/github-readme-stats
 */
export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const exclude_repo = [];

  const githubStats = Axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/github`,
    {
      username: process.env.GITHUB_USER,
      url: process.env.GITHUB_API_URL,
      token: process.env.GITHUB_PERSONAL_TOKEN,
    }
  );

  const strapiContent = Axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/about`
  );

  const [githubResp, strapiResp] = await Axios.all([
    githubStats,
    strapiContent,
  ]);

  let repoNodes = githubResp.data.data;
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
      content: strapiResp.data.data,
    },
  };
};
