import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Blog.module.css";

const Blog = ({ content: blogs }) => {
  return (
    <div>
      <Head>
        <title>Wee Hong KOH - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title="Wee Hong KOH - Blog"
        description="Wee Hong enjoys to writing code while learning new knowledge and write it into an article."
        canonical="https://www.weehong.me/blog"
        openGraph={{
          url: "https://www.weehong.me/blog",
          title: "Wee Hong KOH - Blog",
          description:
            "Wee Hong enjoys to writing code while learning new knowledge and write it into an article.",
          site_name: `Wee Hong KOH - Blog`,
        }}
      />
      <div className="flex justify-center">
        <main className={`w-full ${styles.container} ${styles.main}`}>
          <h1 className="text-4xl font-ibm font-bold mb-10">Blogs</h1>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-2 sm:grid-cols-2 md:grid-cols-3">
              {blogs.map((blog) => {
                const content = blog.attributes;
                return (
                  <div
                    className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
                    key={`${blog.id}-${content.Slug}`}
                  >
                    <Image
                      src={content.Image}
                      alt={`${content.Slug}-image`}
                      width="100%"
                      height="50"
                      layout="responsive"
                    />
                    <div className="p-5">
                      <div className="flex mb-3">
                        {content.Tags.map((tag) => (
                          <span
                            className="rounded-full px-5 py-1 bg-indigo-500 text-white text-xs"
                            key={tag.Topic}
                          >
                            {tag.Topic}
                          </span>
                        ))}
                      </div>
                      <div className={styles.titleBg}>
                        <Link href={"/blogs/" + content.Slug} passHref>
                          <h5 className="font-ibm text-gray-900 font-bold text-2xl tracking-tight mb-2">
                            {content.Title}
                          </h5>
                        </Link>
                      </div>
                      <p className="font-normal text-gray-700 mb-3">
                        {content.ShortDescription}
                      </p>
                      <div className="flex justify-end mt-5">
                        <Link href={"/blogs/" + content.Slug}>
                          <a
                            className="text-white bg-indigo-700 hover:bg-indigo-800
                      focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg
                      text-sm px-3 py-2 text-center inline-flex items-center"
                          >
                            Read more
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex relative h-64 w-full">
              <Image
                src="/images/coming-soon.webp"
                alt="coming-soon-image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const blog = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
  return {
    props: {
      content: blog.data.data,
    },
  };
};
