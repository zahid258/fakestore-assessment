import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Input,
  Select,
} from "antd";
import CartItems from "../../components/CartItems/CartItems";

const { Title, Text } = Typography;
const { Option } = Select;

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItemsId);
  const total = cartItems.reduce((sum, product) => sum + product.price, 0);
  const shippingCost = 5;

  return (
    <Row justify="center" style={{ padding: "95px 20px", minHeight: "100vh", background:"#2d3436" }}>
      <Col xs={24} md={16} >
        <Card
          bordered={false}
          style={{
            borderRadius: 15,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row gutter={[16, 16]}>
            {/* Left Side - Cart Items */}
            <Col xs={24} md={16}>
              <Title level={3}>Shopping Cart</Title>
              <Text type="secondary">{cartItems.length} items</Text>
              <Divider />
              {cartItems.map((product) => (
                <CartItems key={product.id} item={product} />
              ))}
              <Divider />
              <Button type="link" href="/shop">
                &larr; Back to shop
              </Button>
            </Col>

            {/* Right Side - Summary */}
            <Col xs={24} md={8}>
              <Card
                bordered={false}
                style={{ background: "#f5f5f5", borderRadius: 15 }}
              >
                <Title level={4}>Summary</Title>
                <Divider />

                <Row justify="space-between">
                  <Text strong>Subtotal:</Text>
                  <Text>${total.toFixed(2)}</Text>
                </Row>

                <Divider />

                <Title level={5}>Shipping</Title>
                <Select
                  defaultValue="standard"
                  style={{ width: "100%", marginBottom: 10 }}
                >
                  <Option value="standard">Standard Delivery - $5.00</Option>
                </Select>

                <Title level={5}>Give Code</Title>
                <Input placeholder="Enter your code" />

                <Divider />

                <Row justify="space-between">
                  <Text strong>Total Price:</Text>
                  <Text>${(total + shippingCost).toFixed(2)}</Text>
                </Row>

                <Button
                  type="primary"
                  block
                  size="large"
                  style={{ marginTop: 10 }}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
