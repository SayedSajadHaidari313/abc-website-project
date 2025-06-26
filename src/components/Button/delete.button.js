import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';

function DeleteButton({ onClick }) {
  return (
    <Tooltip title="حذف کردن ">
      <Button
        onClick={onClick}
        type="primary"
        // size="large"
        danger
        shape="circle"
        style={{
          marginLeft: '10px',
          fontSize: '20px',
          boxShadow: '0 0 5px black',
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 2 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"
            />
          </svg>
        </span>
      </Button>
    </Tooltip>
  );
}

export default DeleteButton;
