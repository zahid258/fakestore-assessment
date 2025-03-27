import React, { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Spin, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Store/Slices/productSlice";
import homeImg from "../../images/home2.jpg";
import homeImg1 from "../../images/home1.jpg"
import CardComponent from "../../components/Card/Card";

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const [bgColor, setBgColor] = useState("#2d3436");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data || []);
  const loading = useSelector((state) => state.products?.loading);
  const error = useSelector((state) => state.products?.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateBackground = () => {
      const bodyBgColor = getComputedStyle(document.body).backgroundColor;
      setBgColor("#2d3436");
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  console.log("Products data:", products);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
    );
  if (error)
    return <Typography.Text type="danger">Error: {error}</Typography.Text>;

  return (
    <Layout style={{ background: bgColor }}>
      <Content
        style={{
          paddingTop: "80px",
          paddingBottom: "50px",
          minHeight: "100vh",
        }}
      >
        {/* Hero Section */}
        <Row justify="center" align="middle" style={{ textAlign: "center" }}>
          <Col xs={24} md={12}>
            <img
              src={homeImg1}
              alt="Fashion"
              style={{
                width: "80%",
                maxHeight: "700px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2} style={{ color: "#1890ff" }}>
              New Collections
            </Title>
            <Title level={1}>
              Meet the <span style={{ color: "#1890ff" }}>New Fashion</span>{" "}
              Week
            </Title>
          </Col>
        </Row>

        {/* Deal of the Week Section */}
        <div
          style={{
            background: bgColor,
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <Row
            justify="center"
            align="middle"
            gutter={[32, 32]}
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Col xs={24} md={12}>
              <Image
                src={homeImg}
                alt="Deal of the Week"
                width="100%"
                preview={false}
                style={{
                  borderRadius: "10px",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col
              xs={24}
              md={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text strong style={{ color: "#38f3be", letterSpacing: "1px" }}>
                DEAL OF THE WEEK
              </Text>
              <Title level={2} style={{ color: "#38f3be", marginBottom: 5 }}>
                MULTI BRAND
              </Title>
              <Title
                level={3}
                style={{ color: "#fff", marginTop: 5, lineHeight: 1.3 }}
              >
                Store Of <br /> Clothes <br /> Week
              </Title>
            </Col>
          </Row>
        </div>

        {/* Featured Products Section */}
        <Row
          justify="center"
          style={{ padding: "50px 0", textAlign: "center" }}
        >
          <Col span={24}>
            <Title>
              Featured <span style={{ color: "#1890ff" }}>Products</span>
            </Title>
          </Col>
          <Row gutter={[16, 16]} justify="center">
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <Col xs={24} sm={12} md={6} key={product.id}>
                  <CardComponent product={product} />
                </Col>
              ))
            ) : (
              <Typography.Text type="secondary">
                No products available
              </Typography.Text>
            )}
          </Row>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
