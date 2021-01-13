import "../styles/globals.css";
import buildClient from "./api/buildClient";
import Page from "../components/Page";
import "antd/dist/antd.css";
import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/actions/auth-actions";
function MyApp({ Component, pageProps, currentUser }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser(currentUser));
  }, [currentUser]);
  return (
    <Page currentUser={currentUser}>
      <Component {...pageProps} currentUser={currentUser} />
    </Page>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  try {
    const { data } = await client.get("http://localhost:5000/api/auth/me", {
      withCredentials: true,
    });
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
      currentUser: data,
    };
  } catch (error) {}
};

export default wrapper.withRedux(MyApp);
