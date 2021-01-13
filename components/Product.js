import styled from "styled-components";
import Link from "next/link";
import AddTocart from "./AddTocart";
const Product = ({ product }) => {
  const { name, images, price, slug, quantity } = product;
  return (
    <Wrapper>
      <Link href="/product/[id]" as={`/product/${slug}`}>
        <div className="img" style={{ cursor: "pointer" }}>
          <img src={images[0].url} />
        </div>
      </Link>
      <p>{name}</p>
      <p>Review</p>
      <h3>${price}</h3>
      {quantity < 1 ? <p>Out of stuck</p> : <AddTocart product={product} />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border: 1px solid #b0a8b9;
  .img {
    width: 200px;
  }
  img {
    width: 100%;
  }
`;
export default Product;
