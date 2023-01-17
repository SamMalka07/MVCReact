import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Menu inverted>
        <Menu.Item as={NavLink} to="/" name="home" className="ui large header">
          React
        </Menu.Item>

        <Menu.Item as={NavLink} to="/customer" name="customer">
          Customers
        </Menu.Item>

        <Menu.Item as={NavLink} to="/product" name="product">
          Products
        </Menu.Item>

        <Menu.Item as={NavLink} to="/store" name="store">
          Stores
        </Menu.Item>

        <Menu.Item as={NavLink} to="/sale" name="sale">
          Sales
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
