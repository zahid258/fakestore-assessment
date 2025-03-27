import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../Store/Slices/productSlice";
import { Layout, Row, Col, Card, Spin, Typography, Select } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card/Card";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function Shop() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Spin size="large" />
      </Row>
    );
  }

  if (error) {
    return (
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Typography.Text type="danger">Error: {error}</Typography.Text>
      </Row>
    );
  }

  // Filter products based on category (if available)
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <Layout style={{ padding: "90px", background:"#2d3436" }}>
      <Content>
        {/* Page Header */}
        <Row
          justify="center"
          style={{ marginBottom: "30px", textAlign: "center" }}
        >
          <Col>
            <Title level={2}>
              <ShoppingOutlined /> Shop Our{" "}
              <span style={{ color: "#1890ff" }}>Latest Collection</span>
            </Title>
            <Paragraph>Find the best products that suit your needs.</Paragraph>
          </Col>
        </Row>

        {/* Category Filter (If needed) */}
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col>
            <Select
              defaultValue={category || "all"}
              style={{ width: 200 }}
              onChange={(value) =>
                (window.location.href = `/shop/${value !== "all" ? value : ""}`)
              }
            >
              <Option value="all">All Categories</Option>
              {/* Assuming categories are available in products */}
              {[...new Set(products.map((p) => p.category))].map((cat) => (
                <Option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Product Listing */}
        <Row gutter={[16, 16]} justify="center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <CardComponent product={product} />
              </Col>
            ))
          ) : (
            <Col>
              <Typography.Text type="warning">
                No products available in this category.
              </Typography.Text>
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
  );
}
