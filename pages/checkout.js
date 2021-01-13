import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart, emptycart, applyCoupone } from "../redux/actions/cart-action";
import { addAdress } from "../redux/actions/auth-actions";
import Router from "next/router";
import Link from "next/link";
const checkout = () => {
  const dispatch = useDispatch();
  const [coupone, setCoupone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { cart, user } = useSelector((state) => ({ ...state }));
  const handCardEmpty = () => {
    // empty the cart
    dispatch(emptycart());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdress({ address: userAddress }));
    setUserAddress("");
  };
  const handleApplyCoupone = () => {
    dispatch(applyCoupone({ coupone }));
  };
  const createCashOrder = () =>{
    
  }
  return (
    <div>
      {!cart.checkoutItems ? (
        <Link href="/products">
          <a>Choose some product first</a>
        </Link>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h2>DeliveryAdderss</h2>
            <p>
              {user.user.address ? (
                user.user.address
              ) : (
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                  <button type="submit">Save address</button>
                </form>
              )}
            </p>
            <hr />
            <div>
              <h2>Got Coupon?</h2>

              <input
                type="text"
                value={coupone}
                onChange={(e) => setCoupone(e.target.value)}
              />
              <button type="submit" onClick={handleApplyCoupone}>
                Apply
              </button>
            </div>
          </div>
          <div>
            <h2>Order summary</h2>
            <hr />
            <p>
              {cart.checkoutItems.products &&
                cart.checkoutItems.products.map((prod) => (
                  <div key={prod._id}>
                    <p>name: {prod.product.name}</p>
                    <p>count: {prod.count}</p>
                    <p>price: {prod.price}</p>
                  </div>
                ))}
              <h2>Total ${cart.checkoutItems.cartTotal}</h2>
              <h2>
                Total after discount $
                {cart.discount && cart.discount.totalAfterDiscount}
              </h2>
              <button onClick={handCardEmpty}>Empty the card</button>
              {cart.payCashOnDelevery ? (
                <button onClick={createCashOrder}>Place order</button>
              ) : (
                <button onClick={() => Router.push("/payment")}>
                  Place order
                </button>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default checkout;
