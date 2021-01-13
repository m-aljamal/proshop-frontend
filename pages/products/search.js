import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsWithFilter } from "../../redux/actions/product-actions";
import Product from "../../components/Product";
import { Empty } from "antd";

const ProductSearch = () => {
  const router = useRouter();
  const [priceFilter, setPriceFilter] = useState("");
  const { name } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsWithFilter(10, 1, name));
  }, [name, dispatch]);
  useEffect(() => {
    if (priceFilter) {
      dispatch(
        getProductsWithFilter(10, 1, name, priceFilter.split("-").map(Number))
      );
    }
  }, [priceFilter]);
  const productsState = useSelector(({ products }) => products.productsList);
  return productsState.data && productsState.data.length ? (
    <div style={{ display: "flex", marginTop: "30px" }}>
      <div style={{ width: "25%" }}>
        <h2>Search filters</h2>
        <p>Price</p>
        <div>
          <input
            type="radio"
            name="30-50"
            value="30-50"
            onChange={(e) => setPriceFilter(e.currentTarget.value)}
            checked={priceFilter === "30-50"}
          />
          <label>$30 - $50</label>
        </div>
        <div>
          <input
            type="radio"
            name="51-80"
            value="51-80"
            onChange={(e) => setPriceFilter(e.currentTarget.value)}
            checked={priceFilter === "51-80"}
          />
          <label>$51 - $80</label>
        </div>
        <div>
          <input
            type="radio"
            name="81-200"
            value="81-200"
            onChange={(e) => setPriceFilter(e.currentTarget.value)}
            checked={priceFilter === "81-200"}
          />
          <label>$81 - $200</label>
        </div>
        <div>
          <input
            type="radio"
            name="201-10000"
            value="201-10000"
            onChange={(e) => setPriceFilter(e.currentTarget.value)}
            checked={priceFilter === "201-10000"}
          />
          <label>$201 - $10,000</label>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {productsState.data.map((pro) => (
          <Product key={pro._id} product={pro} />
        ))}
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default ProductSearch;
