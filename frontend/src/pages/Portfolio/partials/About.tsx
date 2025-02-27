import {
  DownloadOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Progress,
  Row,
  Space,
  Typography,
} from "antd";

const { Title, Text } = Typography;

const About = () => {
  const contactInfo = [
    {
      icon: <PhoneOutlined style={{ fontSize: 24, color: "#10b981" }} />,
      title: "+1 234 5678",
      description: "Call Me",
    },
    {
      icon: <EnvironmentOutlined style={{ fontSize: 24, color: "#10b981" }} />,
      title: "San Francisco, CA",
      description: "Address",
    },
    {
      icon: <MailOutlined style={{ fontSize: 24, color: "#10b981" }} />,
      title: "hello@johndoe.com",
      description: "Email Me",
    },
  ];

  return (
    <Space direction="vertical" size={48} style={{ width: "100%" }}>
      {/* Header Section */}
      <Row gutter={[48, 48]}>
        <Col xs={24} lg={16}>
          <Space direction="vertical" size={24}>
            <div>
              <Title level={1} style={{ marginBottom: 16 }}>
                Hello!
              </Title>
              <Title
                level={2}
                type="success"
                style={{ color: "#10b981", fontWeight: "normal" }}
              >
                I'm John Doe, Full Stack Developer
                <br />
                Based in San Francisco
              </Title>
            </div>

            <Descriptions
              column={{ xs: 1, sm: 2 }}
              style={{ marginBottom: 24 }}
            >
              <Descriptions.Item label="Name">John Doe</Descriptions.Item>
              <Descriptions.Item label="Email">
                hello@johndoe.com
              </Descriptions.Item>
              <Descriptions.Item label="Phone">+1 234 5678</Descriptions.Item>
              <Descriptions.Item label="Location">
                San Francisco, CA
              </Descriptions.Item>
            </Descriptions>

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              style={{ backgroundColor: "#10b981" }}
            >
              Download Resume
            </Button>
          </Space>
        </Col>
        <Col xs={24} lg={8}>
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="John Doe"
            style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
            shape="square"
          />
        </Col>
      </Row>

      {/* Skills Section */}
      <div>
        <Title level={2} style={{ marginBottom: 24 }}>
          Skills
        </Title>
        <Row gutter={[48, 48]}>
          {/* Industry Knowledge */}
          <Col xs={24} md={8}>
            <Card
              title={
                <Text type="success" strong>
                  Industry Knowledge
                </Text>
              }
              bordered={false}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={24}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Brand Identity</Text>
                    <Text>85%</Text>
                  </div>
                  <Progress
                    percent={85}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Product Design</Text>
                    <Text>95%</Text>
                  </div>
                  <Progress
                    percent={95}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Interaction Design</Text>
                    <Text>80%</Text>
                  </div>
                  <Progress
                    percent={80}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Tools */}
          <Col xs={24} md={8}>
            <Card
              title={
                <Text type="success" strong>
                  Tools
                </Text>
              }
              bordered={false}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={24}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Figma</Text>
                    <Text>70%</Text>
                  </div>
                  <Progress
                    percent={70}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Sketch</Text>
                    <Text>90%</Text>
                  </div>
                  <Progress
                    percent={90}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>After Effects</Text>
                    <Text>75%</Text>
                  </div>
                  <Progress
                    percent={75}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Languages */}
          <Col xs={24} md={8}>
            <Card
              title={
                <Text type="success" strong>
                  Languages
                </Text>
              }
              bordered={false}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={24}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>English</Text>
                    <Text>95%</Text>
                  </div>
                  <Progress
                    percent={95}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>French</Text>
                    <Text>45%</Text>
                  </div>
                  <Progress
                    percent={45}
                    showInfo={false}
                    strokeColor="#10b981"
                  />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Contact Section */}
      <div style={{ textAlign: "center" }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          Let's work together on your next project
        </Title>
        <Row justify="center" gutter={48}>
          {contactInfo.map((item, index) => (
            <Col key={index}>
              <Space direction="vertical" align="center">
                {item.icon}
                <Text strong style={{ color: "#10b981" }}>
                  {item.title}
                </Text>
                <Text type="secondary">{item.description}</Text>
              </Space>
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
};

export default About;
