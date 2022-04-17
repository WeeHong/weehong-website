import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { convertDateFormat } from "../common/date";
import styles from "../styles/Resume.module.css";

const Resume = ({ content }) => {
  const resumes = content.Resume;

  const seoDescription = "".concat(
    resumes[0]["Name"] +
      resumes[0]["Position"] +
      resumes[0]["Country"] +
      resumes[0]["Description"]
  );

  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Working Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title="Wee Hong KOH - Working Experience"
        description={seoDescription}
        canonical="https://www.weehong.me/"
        openGraph={{
          url: "https://www.weehong.me/",
          title: "Wee Hong KOH - Working Experience",
          description: `${seoDescription}`,
          site_name: `Wee Hong KOH - Working Experience`,
        }}
      />

      <div className="flex justify-center">
        <main className={`${styles.container} ${styles.main}`}>
          <h1 className="text-4xl font-ibm font-bold mb-10">
            Working Experience
          </h1>
          <div>
            <ul role="list" className="divide-y divide-gray-200">
              {resumes.map((resume) => (
                <li className="py-4" key={resume.id}>
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="relative">
                          <span className="font-ibm text-sm">
                            {resume.Country}
                          </span>
                          <h2 className={`text-2xl font-ibm ${styles.titleBg}`}>
                            {resume.Name}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-500 font-ibm">
                          {convertDateFormat(resume.StartDate)} -{" "}
                          {convertDateFormat(resume.EndDate)}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-ibm">{resume.Position}</h3>
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={`text-sm text-gray-500 ${styles.markdown}`}
                        >
                          <ReactMarkdown>{resume.Description}</ReactMarkdown>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const resume = await Axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume`
  );

  return {
    props: {
      content: resume.data.data.attributes,
    },
  };
};
