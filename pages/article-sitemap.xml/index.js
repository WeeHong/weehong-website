import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (context) => {
  const blogs = await Axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );

  const fields = blogs.data.data.map((blog) => ({
    loc: `https://www.weehong.me/blogs/${blog.Slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(context, fields);
};

export default function Site() {}
