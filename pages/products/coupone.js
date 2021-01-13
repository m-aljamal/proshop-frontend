import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import styled from "styled-components";
import {
  createCoupone,
  getAllCoupones,
  deleteCoupone,
} from "../../redux/actions/product-actions";
import { useEffect } from "react";
const Addcoupone = () => {
  const dispatch = useDispatch();
  const coupones = useSelector(({ products }) => products.coupones);
  const [couponeData, setCouponeData] = useState({
    name: "",
    expiry: "",
    discount: 1,
  });
  const { name, expiry, discount } = couponeData;
  const handleChange = (e) => {
    setCouponeData({
      ...couponeData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCoupone(couponeData, Router));
    setCouponeData({
      name: "",
      expiry: "",
      discount: 1,
    });
  };

  useEffect(() => {
    dispatch(getAllCoupones());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteCoupone(id));
  };
  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <h2>Add new coupone</h2>
        <div className="form-controller">
          <label>Name</label>
          <input name="name" required onChange={handleChange} value={name} />
        </div>
        <div className="form-controller">
          <label>discount %</label>
          <input
            type="number"
            min={1}
            name="discount"
            required
            onChange={handleChange}
            value={discount}
          />
        </div>
        <div className="form-controller">
          <label>expiry</label>
          <input
            type="date"
            name="expiry"
            required
            onChange={handleChange}
            value={expiry}
          />
        </div>

        <button type="submit">Create coupone</button>
      </form>
      <hr />
      <h2>Coupones</h2>
      {coupones ? (
        coupones.map((cou) => (
          <div key={cou._id} style={{ border: "1px solid" }}>
            <p> name: {cou.name}</p>
            <p> discount: {cou.discount}</p>
            <p> expiry: {cou.expiry}</p>
            <button onClick={() => handleDelete(cou._id)}>X</button>
          </div>
        ))
      ) : (
        <h2>No coupone found</h2>
      )}
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
export default Addcoupone;
