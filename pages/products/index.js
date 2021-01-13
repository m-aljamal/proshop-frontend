import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/product-actions";
import Product from "../../components/Product";
import styled from "styled-components";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
const Products = ({ products }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productsState = useSelector(({ products }) => products.productsList);
  useEffect(() => {
    dispatch(getProducts(products));
  }, [products, dispatch]);
  const limit = 2;
  const paginationNumber = Math.ceil(productsState.total / limit);
  return (
    <Wrapper>
      <h2>LATEST PRODUCTS</h2>
      <div className="productsList">
        {productsState.data &&
          productsState.data.map((pro) => (
            <Product key={pro._id} product={pro} />
          ))}
      </div>
      {/* <button onClick={() => router.push(`/products?page=${page - 1}`)}>
        Previous
      </button>
      <button onClick={() => router.push(`/products?page=${page + 1}`)}>
        Next
      </button> */}
      {paginationNumber && (
        <Pagination totalNumber={paginationNumber} router={router} />
      )}
    </Wrapper>
  );
};

export default Products;

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  console.log("page", query);
  let productsData = null;
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/products?limit=2&page=${page}`
    );

    productsData = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      products: productsData,
    },
  };
}

const Wrapper = styled.div`
  .productsList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }
`;
