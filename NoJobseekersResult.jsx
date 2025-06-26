import React from "react";
import { CloseCircleOutlined, PhoneOutlined, DollarOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

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
        icon={<PhoneOutlined />}
        href="tel:+93700123456"
        style={{ marginRight: 8 }}
      >
        Contact Admin
      </Button>,
      <Button
        key="payment"
        type="default"
        icon={<DollarOutlined />}
        href="/payment"
      >
        Make Payment
      </Button>
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