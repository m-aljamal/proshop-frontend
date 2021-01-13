import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/actions/auth-actions";
import { message } from "antd";
import Router from "next/router";
const Signup = () => {
  const [userForm, setUserForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassowrd: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassowrd) {
      message.error("Passwords does not match");
    } else {
      dispatch(createAccount({ email, name, password }, Router));
    }
  };
  const { name, email, password, confirmPassowrd } = userForm;
  return (
    <form onSubmit={onSubmit}>
      <h2>Create Account</h2>
      <div>
        <input
          type="text"
          required
          name="name"
          value={name}
          onChange={handleChange}
        />
        <label>Name</label>
      </div>
      <div>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label>Email</label>
      </div>
      <div>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <label>Password</label>
      </div>
      <div>
        <input
          type="password"
          required
          name="confirmPassowrd"
          value={confirmPassowrd}
          onChange={handleChange}
        />
        <label>Confirm Passowrd</label>
      </div>
      <button>Signup</button>
    </form>
  );
};

export default Signup;
