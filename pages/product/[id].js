import { useRouter } from "next/router";
import { getProductBySlug } from "../../redux/actions/product-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Carousel } from "antd";
import AddTocart from "../../components/AddTocart";
import styled from "styled-components";
const Product = () => {
  const dispatch = useDispatch();

  const productState = useSelector(({ products: { product } }) => product);
  const router = useRouter();
  const { id } = router.query;
  const {
    name,
    images,
    price,
    description,
    numReviews,
    sold,
    quantity,
  } = productState;
  useEffect(() => {
    dispatch(getProductBySlug(id));
  }, [id]);
  return (
    <Wrapper>
      <div className="images">
        <Carousel dots fade autoplay>
          {images && images.map((img) => <img src={img.url} />)}
        </Carousel>
      </div>
      <div className="info">
        <h2>{name}</h2>
        <p>Number Reviews {numReviews}</p>
        <p>Price ${price}</p>
        <p>Shipping: Yes</p>
        <p>In stuck: {quantity}</p>
        <p>Sold {sold}</p>
        <p>Description: {description}</p>
        {quantity < 1 ? (
          <p>Out of stuck</p>
        ) : (
          <AddTocart product={productState} />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .images {
    width: 65%;
  }
  img {
    width: 100%;
  }
  .info {
    width: 35%;
  }
`;

export default Product;
