import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons'; // Importing an icon
import React from 'react';

function CancelButton({ onClick }) {
  return (
    <Button
      type="primary"
      danger
      onClick={onClick}
      icon={<CloseOutlined />} // Adding an icon
      style={{ marginRight: '20px' }}
    >
      Cancel
    </Button>
  );
}

export default CancelButton;