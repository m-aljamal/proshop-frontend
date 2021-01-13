import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../redux/actions/payment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { message } from "antd";
import { createOrder } from "../redux/actions/auth-actions";
import { emptycart } from "../redux/actions/cart-action";
import { CREATE_ORDER } from "../redux/actions/types";
const StripeCheckout = () => {
  const dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    createPaymentIntent().then((res) => {
      console.log("create paument", res.data.clinetSecret);
      setClientSecret(res.data.clinetSecret);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: e.target.name.value,
      },
    });
    if (payload.error) {
      message.error(`Paymnet faild ${payload.error.message}`);
      setProcessing(false);
    } else {
      // result after seccess payment
      // create order in database
      //empty user cart

      createOrder(payload).then((res) => {
        if (res.data.ok) {
          dispatch(emptycart());
          dispatch({
            type: CREATE_ORDER,
            payload: res.data.order,
          });
        }
      });
      message.success("Payment success");
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    e.error && message.error(e.error.message);
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <form id="payment-form" className="stripe-form" onSubmit={onSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default StripeCheckout;
