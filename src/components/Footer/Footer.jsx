import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Typography, List, Image } from "antd";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="container">
        <Row gutter={[16, 16]}>
          {/* Site Map */}
          <Col lg={8} md={12} sm={24}>
            <Title level={3} className="primary">
              Site Map
            </Title>
            <List
              className="three-column"
              dataSource={["Home", "Shop", "Cart", "About"]}
              renderItem={(item) => (
                <List.Item>
                  <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </List.Item>
              )}
            />
            {/* Social Icons */}
            <List
              className="social-list"
              grid={{ gutter: 16, column: 6 }}
              dataSource={Array.from({ length: 6 })}
              renderItem={(_, index) => (
                <List.Item key={index}>
                  <Image
                    src="http://placehold.it/48x48"
                    width={48}
                    height={48}
                    alt={`social icon ${index + 1}`}
                  />
                </List.Item>
              )}
            />
          </Col>

          {/* Latest Articles */}
          <Col lg={8} md={12} sm={24}>
            <Title level={3} className="primary">
              Latest Articles
            </Title>
            <div className="media">
              <a href="#">
                <Image
                  src="http://placehold.it/64x64"
                  width={64}
                  height={64}
                  alt="latest article"
                />
              </a>
              <div className="media-body">
                <Title level={4} className="media-heading primary">
                  Programming
                </Title>
                <Paragraph className="text-light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Paragraph>
              </div>
            </div>
          </Col>

          {/* Our Work */}
          <Col lg={8} sm={24}>
            <Title level={3} className="primary">
              Our Work
            </Title>
            {Array.from({ length: 4 }).map((_, index) => (
              <Image
                key={index}
                className="img-thumbnail"
                src="http://placehold.it/150x100"
                width={150}
                height={100}
                alt={`work sample ${index + 1}`}
              />
            ))}
          </Col>
        </Row>
      </div>

      <div className="copyright text-center">
        Copyright &copy; 2025 <span>Fake Store</span>
      </div>
    </AntFooter>
  );
};

export default Footer;
