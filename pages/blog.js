import Axios from "axios";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import colors from "../data/programming-color.json";
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
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {blogs.map((blog) => {
                const content = blog.attributes;
                return (
                  <div
                    className="flex flex-col bg-white shadow-md border border-gray-200 rounded-lg max-w-full md:max-w-sm mb-5 overflow-hidden"
                    key={`${blog.id}-${content.Slug}`}
                  >
                    <Image
                      src={content.Image}
                      alt={`${content.Slug}-image`}
                      width="100%"
                      height="50"
                      layout="responsive"
                    />
                    <div className="flex mb-3 px-5 pt-5">
                      {content.Tags.map((tag) => {
                        const color = colors.find(
                          (color) =>
                            color.name.toLowerCase() == tag.Topic.toLowerCase()
                        );
                        return (
                          <span
                            className={`inline-block rounded-full px-5 py-1 text-white text-xs ${styles.chips}`}
                            style={{ backgroundColor: color.color }}
                            key={tag.Topic}
                          >
                            {tag.Topic}
                          </span>
                        );
                      })}
                    </div>
                    <div className={`${styles.titleBg} px-5`}>
                      <Link href={"/blogs/" + content.Slug} passHref>
                        <h5 className="font-ibm text-gray-900 font-bold text-2xl tracking-tight mb-2 cursor-pointer">
                          {content.Title}
                        </h5>
                      </Link>
                    </div>
                    <div className="px-5">
                      <p className="font-normal text-gray-700 mb-3">
                        {content.ShortDescription}
                      </p>
                    </div>
                    <div className="flex justify-end mt-auto mb-5 pt-5 px-5">
                      <Link href={"/blogs/" + content.Slug}>
                        <a
                          className="text-white bg-indigo-500 hover:bg-indigo-800
                      focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg
                      text-sm px-3 py-2 text-center inline-flex items-center"
                        >
                          Read more
                        </a>
                      </Link>
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
