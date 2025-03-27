import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const { Header } = Layout;

const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const updateBackground = () => {
      const bodyBgColor = getComputedStyle(document.body).backgroundColor;
      setBgColor(bodyBgColor || "#1a1a1a");
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  const products = useSelector((state) => state.products.data);

  const categories = [...new Set(products?.map((item) => item.category))];

  // Updated Ant Design Dropdown Menu
  const categoryMenu = (
    <Menu
      items={categories.map((category) => ({
        key: category,
        label: <Link to={`/shop/${category}`}>{category}</Link>,
      }))}
    />
  );

  return (
    <Header
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        background: "#2d3436",
        transition: "background 300ms ease-in-out",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          textDecoration: "none",
          paddingLeft: "8rem",
        }}
      >
        Fake
        <span style={{ fontStyle: "italic", color: "#38f3be" }}>STORE</span>
      </Link>

      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          flex: 1,
          marginLeft: 50,
          background: "transparent",
          borderBottom: "none",
        }}
      >
        <Menu.Item key="home">
          <NavLink to="/" activeStyle={{ fontWeight: "bold", color: "#fff" }}>
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="shop">
          <NavLink
            to="/shop"
            activeStyle={{ fontWeight: "bold", color: "#fff" }}
          >
            Shop
          </NavLink>
        </Menu.Item>
        <Dropdown
          menu={{ items: categoryMenu.props.items }}
          trigger={["hover"]}
        >
          <Menu.Item key="categories">Categories ▾</Menu.Item>
        </Dropdown>
      </Menu>

      {/* Social Media Icons & Cart */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          paddingRight: "8rem",
        }}
      >
        <Link to="/" style={{ color: "white", fontSize: 20 }}>
          <FaFacebook />
        </Link>
        <Link to="/" style={{ color: "white", fontSize: 22 }}>
          <AiFillTwitterCircle />
        </Link>
        <Link to="/cart" style={{ color: "white", fontSize: 20 }}>
          <BsFillCartFill />
        </Link>
      </div>
    </Header>
  );
};

export default Navbar;
