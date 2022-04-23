import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import ApplicationInfo from "../components/ApplicantInfo";
import GitHub from "../icons/GitHub";
import LinkedIn from "../icons/LinkedIn";
import Medium from "../icons/Medium";
import styles from "../styles/Home.module.css";

const Home = ({ content }) => {
  const { attributes: data } = content;
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
            <h2 className="text-2xl font-lexend-deca">{data.Title}</h2>
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
            <div className="flex justify-center gap-3 mt-5">
              {data.Languages &&
                data.Languages.map((v) => {
                  return (
                    <div
                      className={`text-sm px-5 py-1 rounded-full ${
                        v.Name === "JavaScript" ? "text-gray-700" : "text-white"
                      }`}
                      style={{ backgroundColor: v.URL }}
                    >
                      {v.Name}
                    </div>
                  );
                })}
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

  const strapiContent = Axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/about`
  );

  const [strapiResp] = await Axios.all([strapiContent]);

  return {
    props: {
      content: strapiResp.data.data,
    },
  };
};
