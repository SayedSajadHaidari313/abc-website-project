import { Button, Tooltip } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

function CreateButton({ onClick }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <Tooltip title="اضافه کردن ">
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={onClick}
        >
          افزودن مصارف روزانه
        </Button>
      </Tooltip>
    </div>
  );
}

export default CreateButton;
