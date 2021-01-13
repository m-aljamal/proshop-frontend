import React from "react";
import { useState } from "react";
import { createProduct } from "../../redux/actions/product-actions";
import { useDispatch } from "react-redux";
import Router from "next/router";
import ImageUpload from "../../components/ImageUpload";
import styled from "styled-components";
const Add = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 1,
    quantity: 1,
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const { name, description, price, quantity, images } = productData;
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData, Router));
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <h2>Add new product</h2>
        <div className="form-controller">
          <label>Name</label>
          <input name="name" required onChange={handleChange} value={name} />
        </div>
        <div className="form-controller">
          <label>description</label>
          <input
            name="description"
            required
            onChange={handleChange}
            value={description}
          />
        </div>
        <div className="form-controller">
          <label>price</label>
          <input
            type="number"
            name="price"
            required
            onChange={handleChange}
            value={price}
          />
        </div>
        <div className="form-controller">
          <label>quantity</label>
          <input
            type="number"
            name="quantity"
            required
            onChange={handleChange}
            value={quantity}
          />
        </div>
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <div className="imageUploder">
            <ImageUpload
              images={images}
              setImages={setProductData}
              setLoading={setLoading}
              productData={productData}
            />
          </div>
          // <UploadImageWidget images={images} setImages={setImages} />
        )}

        <button type="submit">Create product</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  margin: 0 auto;
  text-align: center;
  label {
    font-size: 15px;
    margin-right: 20px;
  }
  .imageUploder {
    margin: 10px 0;
  }
  .form-controller {
    margin: 20px 0;
  }
`;
export default Add;
