import Axios from "axios";
import moment from "moment";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import colors from "../../data/programming-color.json";
import styles from "../../styles/Blog.module.css";

const Blog = ({ content }) => {
  const { attributes: blog } = content;
  return (
    <div className="flex justify-center">
      <Head>
        <title>Wee Hong KOH - {blog.Title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`Wee Hong KOH - ${blog.Title}`}
        description={blog.ShortDescription}
        canonical={`https://www.weehong.me/blogs/${blog.Slug}`}
        openGraph={{
          url: `https://www.weehong.me/blogs/${blog.Slug}`,
          title: `Wee Hong KOH - ${blog.Title}`,
          description: `${blog.ShortDescription}`,
          site_name: `Wee Hong KOH - ${blog.Title}`,
          image: `${blog.Image}`,
        }}
      />
      <main
        className={`w-full ${styles.container} ${styles.main} ${styles.details}`}
      >
        <div className="flex flex-col">
          <span className="font-ibm text-sm text-gray-600 mb-2">
            Created At: {moment(new Date(blog.createdAt)).format("DD MMM YYYY")}
          </span>
          <h1 className={`text-4xl font-bold font-ibm ${styles.titleBg}`}>
            {blog.Title}
          </h1>
          <h2 className="text-2xl font-ibm my-4 sm:my-2">
            {blog.ShortDescription}
          </h2>
        </div>
        <div className="flex my-3">
          {blog.Tags.map((tag) => {
            const color = colors.find(
              (color) => color.name.toLowerCase() == tag.Topic.toLowerCase()
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
        <div className="w-full h-136 relative my-7">
          <Image
            src={blog.Image}
            alt={`${blog.Slug}-image`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.markdown}>
          <ReactMarkdown
            components={{
              p: ({ node, children }) => {
                if (node.children[0].tagName === "img") {
                  const image = node.children[0];
                  return (
                    <div className="w-full h-136 relative">
                      <Image
                        src={image.properties.src}
                        alt={image.properties.alt}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  );
                }
                // Return default child if it's not an image
                return <p>{children}</p>;
              },
              pre({ node }) {
                const content = node.children[0].children[0].value;
                const languages =
                  node.children[0].properties.className &&
                  node.children[0].properties.className[0];
                // Removing "language-" because React-Markdown already added "language-"
                const language =
                  languages && languages.replace("language-", "");
                return (
                  <SyntaxHighlighter style={materialDark} language={language}>
                    {content}
                  </SyntaxHighlighter>
                );
              },
              blockquote({ node }) {
                const content = node.children[1].children[0].value;

                return (
                  <div
                    className={`border-l-4 border-gray-700 px-7 py-5 whitespace-pre-line ${styles.blockquote}`}
                  >
                    {content}
                  </div>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {blog.Content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const blogs = await Axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );

  const paths = blogs.data.data.map((blog) => {
    return {
      params: {
        id: blog.attributes.Slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const blog = await Axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${id}?populate=Tags`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );
  return {
    props: {
      content: blog.data.data,
    },
  };
};
