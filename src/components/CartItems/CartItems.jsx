import React from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Row, Col, Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { removeItem } from "../../Store/Slices/cartSlice";

const { Title, Text } = Typography;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card
      bordered={false}
      style={{
        marginBottom: 16,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row align="middle" gutter={[16, 16]}>
        {/* Product Image */}
        <Col xs={6} sm={4} md={3}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              maxHeight: 80,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </Col>

        {/* Product Title */}
        <Col xs={10} sm={6} md={5}>
          <Title level={5} style={{ marginBottom: 0 }}>
            {item.title}
          </Title>
        </Col>

        {/* Product Price */}
        <Col xs={6} sm={4} md={3}>
          <Text strong style={{ fontSize: 16 }}>
            ${item.price}
          </Text>
        </Col>

        {/* Remove Button */}
        <Col xs={2} sm={2} md={2}>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<MinusOutlined />}
            onClick={() => dispatch(removeItem(item))}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
