import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons"; // Importing an icon
import React from "react";

function SubmitButton({ htmlType, loading }) {
  return (
    <Button
      type="primary"
      htmlType={htmlType}
      icon={<SaveOutlined />} // Adding an icon
      style={{ marginRight: "10px" }}
      loading={loading}
    >
      Submit
    </Button>
  );
}

export default SubmitButton;
