import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { FaCog, FaExclamationTriangle, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardChart from "./DashboardChart/DashboardChart";

const { Title, Paragraph } = Typography;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Account Management",
      icon: <FaUsers className="text-2xl" />,
      path: "/admin/accounts",
      description: "Manage user accounts, roles and permissions",
    },
    {
      label: "Report Management",
      icon: <FaExclamationTriangle className="text-2xl" />,
      path: "/admin/reports",
      description: "Review and process user reports and complaints",
    },
    {
      label: "System Configuration",
      icon: <FaCog className="text-2xl" />,
      path: "/admin/system-configuration",
      description: "Configure system parameters and settings",
    },
  ];

  return (
    <div className="admin-dashboard">
      <Title
        level={2}
        style={{ marginBottom: 24 }}
        className="text-3xl font-bold chivo"
      >
        Admin Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        {menuItems.map((item, index) => (
          <Col xs={24} md={12} lg={8} key={index}>
            <Card
              hoverable
              onClick={() => navigate(item.path)}
              style={{ height: "100%" }}
              className="dashboard-card"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 text-emerald-600">
                  {item.icon}
                </div>
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {item.label}
                  </Title>
                  <Paragraph className="text-gray-500 mt-1">
                    {item.description}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <DashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
