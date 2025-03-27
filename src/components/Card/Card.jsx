import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Typography, Modal, message } from "antd";
import { addItem } from "../../Store/Slices/cartSlice";

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    message.success({
      content: `${product.title} added to cart!`,
      duration: 3,
      style: {
        marginTop: "20vh",
        right: "50px",
        height: "70px",
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "16px 24px",
        borderRadius: "8px",
        boxShadow: "none",
        border: "1px solid transparent",
      },
    });
  };

  return (
    <>
      {/* Product Card */}
      <Card
        hoverable
        onClick={() => setIsModalVisible(true)}
        style={{
          width: "100%",
          maxWidth: 300,
          margin: "16px auto",
          borderRadius: 16,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          overflow: "hidden",
        }}
        cover={
          <img
            alt={product.title}
            src={product.image}
            style={{
              height: 300,
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        }
      >
        <Title level={4} style={{ marginBottom: 8 }}>
          {product.title}
        </Title>
        <Text strong style={{ fontSize: 16 }}>
          ${product.price}
        </Text>
        <Text
          type="secondary"
          style={{
            display: "block",
            marginTop: 8,
            height: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.description}
        </Text>
      </Card>

      {/* Product Detail Modal */}
      <Modal
        title={product.title}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button key="add" type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>,
        ]}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "auto",
            marginBottom: 16,
            borderRadius: 8,
          }}
        />
        <Title level={4}>${product.price}</Title>
        <Text>{product.description}</Text>
      </Modal>
    </>
  );
};

export default ProductCard;
