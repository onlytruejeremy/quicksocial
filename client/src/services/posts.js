import axios from "axios";

const postsEndpoint = `/api/posts`;

export let newPost = (payload) => {
  const config = {
    method: "POST",
    url: `${postsEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export let getMyPosts = (id) => {
  const config = {
    method: "GET",
    url: `${postsEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export default { newPost, getMyPosts };
