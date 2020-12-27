import axios from "axios";

axios.defaults.withCredentials = true;
const userEndpoint = `/api/users`;
const authEndpoint = `/api/auth`;
export let addUser = (payload) => {
  const config = {
    method: "POST",
    url: `${userEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export let loginUser = (payload) => {
  const config = {
    method: "POST",
    url: `${authEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export let getUserInfo = (token) => {
  const config = {
    method: "GET",
    url: `${authEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios(config);
};

export default { addUser, loginUser };
