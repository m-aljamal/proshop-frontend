import axios from "axios";
const buildClient = ({ req }) => {
  // ! req is for sending cookie with the request

  if (typeof window === "undefined") {
    // we are on server
    return axios.create({
      baseURL: "http://localhost:5000/api/auth/me",
      headers: req.headers,
    });
  } else {
    // we are on browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
