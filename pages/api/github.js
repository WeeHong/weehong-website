import Axios from "axios";

export default async function handler(req, res) {
  const variables = {
    login: req.body.username,
  };
  const data = await Axios.post(
    req.body.url,
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${req.body.token}`,
      },
    }
  );

  if (data.data.errors) {
    res.status(data.status).json({
      message: res.data.errors[0].message || "Could not fetch user",
    });
  }

  res.status(data.status).json({
    data: data.data.data.user.repositories.nodes,
  });
}
