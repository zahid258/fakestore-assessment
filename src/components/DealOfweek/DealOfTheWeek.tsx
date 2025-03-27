import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Image } from "antd";

const { Title, Text } = Typography;

const DealOfTheWeek = () => {
  const [bgColor, setBgColor] = useState("#2d3436");

  useEffect(() => {
    const updateBackground = () => {
      const bodyBgColor = getComputedStyle(document.body).backgroundColor;
      setBgColor(bodyBgColor || "#1a1a1a");
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div
      style={{
        background: bgColor,
        paddingTop: "80px",
        paddingBottom: "50px",
        minHeight: "100vh",
      }}
    >
      <Row
        justify="center"
        align="middle"
        gutter={[32, 32]}
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <Col xs={24} md={12}>
          <Image
            src="/path-to-your-image.png"
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
  );
};

export default DealOfTheWeek;
