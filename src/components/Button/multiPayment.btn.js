import { Button, Tooltip } from 'antd';
import React from 'react';
import {
  PlusOutlined,
} from '@ant-design/icons';
function MultiPayment({ onClick }) {
  return (
      <Button
      style={{
        marginLeft: '10px',
      }}
        type="primary"
        onClick={onClick}
        icon={<PlusOutlined />}
        // size="large"
      >
        چاپ معاشات کارمندان
      </Button>
  );
}

export default MultiPayment;
