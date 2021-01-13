import axios from "axios";
import { useState } from "react";
import Router from "next/router";
import { useEffect } from "react";
import { signin } from "../../redux/actions/auth-actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Link from "next/link";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }, Router));
  };
  // useEffect(() => {
  //   if (currentUser) Router.push("/");
  // }, []);
   return (
    <Wrapper>
      <div className="contnent">
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <label>Password</label>
          </div>

          <button className="btn">Sign in</button>
          <p className="text">
            Don't have an account?
            <Link href="/auth/signup">
              <a>Register</a>
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default Signin;

const Wrapper = styled.div`
  .contnent {
    margin: 0 auto;
    max-width: 40%;
  }
`;
