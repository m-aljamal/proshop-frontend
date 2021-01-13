import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/actions/auth-actions";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import Invoice from "../../components/Invoice";
import Link from "next/link";
const profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <h2>My orders</h2>
      <div>
        {!user.orders.length ? (
          <p>No orders</p>
        ) : (
          user.orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid" }}>
              <p>Status: {order.orderStatus}</p>
              <p>Date: {order.createdAt}</p>
              {order.products &&
                order.products.map((p) => (
                  <div key={p._id}>
                    <p>Name: {p.product.name}</p>
                    <p>
                      {p.count} * {p.product.price}
                    </p>
                  </div>
                ))}
              <p>Total paid: {order.paymnetIntent.amount / 100}</p>

              <PDFDownloadLink
                document={<Invoice order={order} />}
                fileName="invoice.pdf"
              >
                Download PDF
              </PDFDownloadLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default profile;
