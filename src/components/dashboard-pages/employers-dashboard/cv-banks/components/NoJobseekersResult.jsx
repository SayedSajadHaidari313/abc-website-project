import React from "react";
import {
  CloseCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { Link } from "react-router-dom";

const { Paragraph, Text } = Typography;

const NoJobseekersResult = () => (
  <Result
    status="error"
    title="Premium Feature Access Required"
    subTitle="This feature requires a premium subscription. Please contact the administrator to activate your access."
    extra={[
      <Button
        type="primary"
        key="contact"
        size="large"
        icon={<PhoneOutlined />}
        style={{ marginRight: 8 }}
      >
        <Link to="/contact">Contact Admin</Link>
      </Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text strong style={{ fontSize: 16 }}>
          Why you can't access the CV Bank:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
        premium subscription is not active.
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Payment
        is required to access the CV Bank feature.
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Please
        contact the administrator to complete the payment process.
      </Paragraph>
    </div>
  </Result>
);

export default NoJobseekersResult;
