import { Menu, Dropdown } from "antd";
import { useState, useEffect } from "react";
const ProductHoverMenu = ({ children, cartVisible, cartList }) => {
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  useEffect(() => {
    handleVisibleChange(cartVisible);
  }, [cartVisible]);
  const menu = (
    <Menu>
      {cartList &&
        cartList.map((cart) => (
          <Menu.Item key={cart._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img style={{ width: "50px" }} src={cart.images[0].url} />
              <div>
                <p>{cart.name}</p>
                <p>{cart.price}$</p>
              </div>
            </div>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
      arrow
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      {children}
    </Dropdown>
  );
};

export default ProductHoverMenu;
