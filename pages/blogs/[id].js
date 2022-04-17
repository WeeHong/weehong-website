import Axios from "axios";
import moment from "moment";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import styles from "../../styles/Blog.module.css";

const Blog = ({ content }) => {
  const { attributes: blog } = content;
  return (
    <main className={`w-full ${styles.container} ${styles.main}`}>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <h1 className="text-4xl font-bold font-ibm">{blog.Title}</h1>
          <h2 className="text-2xl font-ibm">{blog.ShortDescription}</h2>
        </div>
        <div className="flex items-end">
          <span className="font-ibm text-sm text-gray-600">
            Created At: {moment(new Date(blog.createdAt)).format("DD MMM YYYY")}
          </span>
        </div>
      </div>
      <span></span>
      <div className="flex my-3">
        {blog.Tags.map((tag) => (
          <span
            className="rounded-full px-5 py-1 bg-indigo-500 text-white text-xs"
            key={tag.Topic}
          >
            {tag.Topic}
          </span>
        ))}
      </div>
      <div className="my-7">
        <Image
          src={blog.Image}
          alt={`${blog.Slug}-image`}
          width="100%"
          height="50"
          layout="responsive"
        />
      </div>
      <div className={styles.markdown}>
        <ReactMarkdown
          components={{
            p: ({ node, children }) => {
              if (node.children[0].tagName === "img") {
                const image = node.children[0];
                return (
                  <div className="image">
                    <Image
                      src={`/images/${image.properties.src}`}
                      alt={image.properties.alt}
                      width="600"
                      height="300"
                    />
                  </div>
                );
              }
              // Return default child if it's not an image
              return <p>{children}</p>;
            },
            code({ className, children }) {
              // Removing "language-" because React-Markdown already added "language-"
              const language = className && className.replace("language-", "");
              return (
                <SyntaxHighlighter style={materialDark} language={language}>
                  {children[0]}
                </SyntaxHighlighter>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {blog.Content}
        </ReactMarkdown>
      </div>
    </main>
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

  const paths = blogs.data.data.data.map((blog) => {
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`
  );
  return {
    props: {
      content: blog.data.data,
    },
  };
};