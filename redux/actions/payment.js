import axios from "axios";
export const createPaymentIntent = () =>
  axios.post(
    `${process.env.API_DEV}/payment/create-payment`,
    {},
    { withCredentials: true }
  );
