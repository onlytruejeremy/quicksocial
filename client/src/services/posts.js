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

export let deletePost = (postId) => {
  const config = {
    method: "DELETE",
    url: `${postsEndpoint}`,
    data: postId,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export let editPost = (postData) => {
  const config = {
    method: "PUT",
    url: `${postsEndpoint}`,
    data: postData,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export let getAllPosts = () => {
  const config = {
    method: "GET",
    url: `${postsEndpoint}/all`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export default { newPost, getMyPosts, deletePost, editPost, getAllPosts };
