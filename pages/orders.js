import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import { getOrders } from "../redux/actions/auth-actions";
const orders = () => {
  const [situation, setSituation] = useState("");
  const dispatch = useDispatch();
  console.log(situation);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orders = useSelector(({ user }) => user.orders);
  return (
    <div>
      <h2>Order List</h2>
      <div>
        {orders && 
          orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid" }}>
              <p>{order.orderStatus}</p>
              {order.products &&
                order.products.map((p) => (
                  <div key={p._id}>
                    <p>{p.product.name}</p>
                    <p>
                      count {p.count} * {p.product.price}
                    </p>
                    <p>By: {order.orderedBy.name}</p>
                    <p>email: {order.orderedBy.email}</p>
                    <p>address: {order.orderedBy.address}</p>
                    <select onChange={(e) => setSituation(e.target.value)}>
                      <option value="not processed">not processed</option>
                      <option value="processing">processing</option>
                      <option value="dispatched">dispatched</option>
                      <option value="cancelled">cancelled</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default orders;
