import Axios from "axios";

export default async function handler(req, res) {
  const data = await Axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=Tags`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );

  if (data.data.errors) {
    res.status(data.status).json({
      message: res.data.errors[0].message || "Could not fetch user",
    });
  }

  res.status(data.status).json({
    data: data.data.data,
  });
}
