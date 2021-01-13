import { addToCart, hideCartList } from "../redux/actions/cart-action";
import { useDispatch } from "react-redux";

const AddTocart = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddtoCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        //   if there is items in cart
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //   no cart in local storage
      cart.push({ ...product, count: 1 });

      // remove duplicate
      const unique = cart.reduce((acc, current) => {
        const x = acc.find((item) => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      //   save to local storage
      dispatch(addToCart(unique));
      setTimeout(() => {
        dispatch(hideCartList());
      }, 3000);
      localStorage.setItem("cart", JSON.stringify(unique));
    }
  };
  return (
    <div>
      <button onClick={handleAddtoCart}>Add to cart</button>
    </div>
  );
};

export default AddTocart;
