import { Button, Tooltip } from 'antd';
import React from 'react';
import {
  PlusOutlined,
} from '@ant-design/icons';
function SinglePayment({ onClick }) {
  return (
    <Button
    style={{
      marginRight: '10px',
      backgroundColor: '#faad14',
      borderColor: '#faad14',
      color: 'white',
    }}
          onClick={onClick}
      icon={<PlusOutlined />}
      // size="large"
    >
      چاپ معاشات یک کارمند
    </Button>
);
}

export default SinglePayment;
