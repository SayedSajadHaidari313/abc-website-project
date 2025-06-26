import { Button } from 'antd';
import React from 'react';

function UpdateButton({ htmlType, loading }) {
  
  return (
    <Button type="primary" htmlType={htmlType} loading={loading}
    style={{ marginRight: '10px' }}
    >
      <span>ثبت کردن</span>
      
    </Button>
  );
}

export default UpdateButton;
