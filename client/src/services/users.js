import axios from "axios";

const userEndpoint = `/api/users`;

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

export default { addUser };
