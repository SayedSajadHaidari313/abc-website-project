import { Pagination, Select } from 'antd';
import React from 'react';

function CustomPagination({
  pageSize,
  onPageSizeChange,
  current,
  onPageChange,
  total,
}) {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Select
        value={pageSize}
        onChange={onPageSizeChange}
        style={{ width: 80, marginRight: 8 }}
        // popupMatchSelectWidth={false} // Ensure dropdown is not constrained by the width of Select
      >
        <Select.Option value={5}>5</Select.Option>
        <Select.Option value={10}>10</Select.Option>
        <Select.Option value={20}>20</Select.Option>
        <Select.Option value={30}>30</Select.Option>
        <Select.Option value={50}>50</Select.Option>
      </Select>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showSizeChanger={false} // Hide built-in size changer since we're using a custom one
      />
    </div>
  );
}

export default CustomPagination;
