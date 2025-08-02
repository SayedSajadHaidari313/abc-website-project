import { Input, Button, Form, message } from "antd";
import { UserOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle form submission here
    message.success("Message sent successfully!");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ width: "100%" }}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input
          size="large"
          placeholder="Your Name"
          prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
          style={{
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            height: "44px",
          }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input
          size="large"
          placeholder="Email Address"
          prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
          style={{
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            height: "44px",
          }}
        />
      </Form.Item>

      <Form.Item
        name="message"
        rules={[{ required: true, message: "Please enter your message!" }]}
      >
        <TextArea
          placeholder="Your Message"
          rows={4}
          style={{
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            resize: "none",
          }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          }}
        >
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Contact;
