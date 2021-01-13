import { useEffect } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth-actions";
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout(Router));
  }, []);
  return <div>Signing you out....</div>;
};

export default Logout;
