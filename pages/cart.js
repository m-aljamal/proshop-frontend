import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

import ModalImage from "react-modal-image";
import {
  addToCartWithNoDropdown,
  saveCartToDatabase,
} from "../redux/actions/cart-action";
import Link from "next/link";
 import Router from "next/router";
const cart = () => {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.cartList.reduce((curr, nextv) => {
      return curr + nextv.count * nextv.price;
    }, 0);
  };

  const handleCheckout = () => {
    // save to database
    dispatch(saveCartToDatabase(cart.cartList, Router));
  };
  const payCash = () => {
    dispatch({ type: "CASH_ON_DELEVERY", payload: true });
    dispatch(saveCartToDatabase(cart.cartList, Router));
  };
  return cart.cartList ? (
    <Wrapper>
      <div className="products">
        {cart.cartList.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      <div className="order">
        order summary
        <hr />
        <p>Products</p>
        <hr />
        <div>
          {cart.cartList.map((item) => (
            <p key={item._id}>
              {item.name} * {item.count} = ${item.price * item.count}
            </p>
          ))}
        </div>
        <hr />
        Total <b>${getTotal()}</b>
        <div>
          {!user.isAuthenticated ? (
            <Link
              href={{
                pathname: "/auth/signin",
                query: { from: "cart" },
              }}
            >
              <a>Login to checkout</a>
            </Link>
          ) : (
            <>
              <button onClick={handleCheckout} disabled={!cart.cartList.length}>
                Checkout
              </button>
              <button onClick={payCash} disabled={!cart.cartList.length}>
                Pay cash on deleviry
              </button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  ) : (
    <h2>Loading...</h2>
  );
};

const Wrapper = styled.div`
  display: flex;
  .products {
    width: 70%;
  }
  .order {
    border: 1px solid var(--light);
    width: 30%;
    height: fit-content;
    text-align: center;
  }
  .image {
    width: 150px;
  }
  .itemContainer {
    display: flex;
    align-items: center;
  }
  .name {
    margin-right: 20px;
  }
`;
export default cart;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.count);
  const handleQtyChange = (e) => {
    setQty(e.target.value);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === item._id) {
          cart[i].count = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCartWithNoDropdown(cart));
    }
  };
  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === item._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCartWithNoDropdown(cart));
    }
  };
  return (
    <div className="itemContainer">
      <ModalImage
        small={item.images[0].url}
        large={item.images[0].url}
        alt="Hello World!"
      />
      <p className="name">{item.name}</p>
      <p>${item.price}</p>
      <div>
        <label>Qty</label>
        <input
          value={qty}
          type="number"
          onChange={handleQtyChange}
          min={1}
          max={item.quantity}
          maxLength={item.quantity}
        />
      </div>
      <p onClick={handleRemove} style={{ color: "red", cursor: "pointer" }}>
        Delete
      </p>
    </div>
  );
};
