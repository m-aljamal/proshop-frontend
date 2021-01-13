import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Dropdown, Menu, Badge } from "antd";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductHoverMenu from "./ProductHoverMenu";
import Search from "../components/Search";
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const menu = (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>
        <Link href="/auth/profile">
          <a>Profile</a>
        </Link>
      </Menu.Item>
      {user && user.user.role === "admin" && (
        <>
          <Menu.Item>
            <Link href="/products/add">
              <a>Add product</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/products/coupone">
              <a>Add Coupone</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item>
        <Link href="/auth/signout">
          <a>Logout</a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      <Link href="/">
        <a>ProShop</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Search />
      <div>
        {user.isAuthenticated ? (
          <Dropdown overlay={menu} placement="bottomCenter" className="drop">
            <span>
              {user.user.name} <DownOutlined />
            </span>
          </Dropdown>
        ) : (
          <Link href="/auth/signin">
            <a className="signin">Signin</a>
          </Link>
        )}
        <ProductHoverMenu cartVisible={cart.showHover} cartList={cart.cartList}>
          <Badge count={cart.cartList.length} offset={[-7, 2]}>
            <Link href="/cart">
              <a className="cart">
                <ShoppingCartOutlined /> Cart
              </a>
            </Link>
          </Badge>
        </ProductHoverMenu>
      </div>
    </Wrapper>
  );
};

export default Header;
const Wrapper = styled.div`
  background-color: var(--navColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  a {
    color: white;
  }
  .drop,
  .signin {
    margin-left: 10px;
    color: white;
  }
  .cart {
    margin-right: 20px;
    margin-left: 20px;
  }
`;
