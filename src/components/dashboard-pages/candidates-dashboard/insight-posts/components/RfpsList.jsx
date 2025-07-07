import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Modal,
  Skeleton,
  message,
  Table,
  notification,
  Select,
  DatePicker,
  Dropdown,
  Space,
  Tooltip,
  Checkbox,
  Tag,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ReloadOutlined,
  SettingOutlined,
  SearchOutlined,
  ClearOutlined,
  FileOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import CreateRfps from "./CreateRfps";
import UpdateRfps from "./UpdateRfps";
import CustomPagination from "@/components/pagination/CustomPagination";
import {
  useGetMyRfpsData,
  useGetRfpsData,
  useSingleDelete,
} from "@/queries/website.query/rfps.query";
import { useAuthStore } from "@/auth/auth.store";

const { RangePicker } = DatePicker;
const { Option } = Select;

function Index() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRfpsData, setSelectedRfpsData] = useState(null);
  const { mutate: singleDelete } = useSingleDelete();
  const [openAdd, setOpenAdd] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [RfpsIdToDelete, setRfpsIdToDelete] = useState(null);
  const [searchInput, setSearchInput] = useState(
    localStorage.getItem("searchInput") || ""
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    searchQuery: null,
  });

  // New state for enhanced functionality
  const [filters, setFilters] = useState({
    requestType: [],
    dateRange: null,
    status: [],
  });
  const [sorting, setSorting] = useState({
    field: null,
    order: null,
  });
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    description: true,
    post_date: true,
    close_date: true,
    request_type: true,
    file: true,
    actions: true,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const { data, isLoading, isError, refetch } = useGetMyRfpsData(
    pagination.current,
    pagination.pageSize,
    pagination.searchQuery
  );

  const RfpsData = (data?.data || []).filter((rfp) => rfp.user_id === user?.id);
  console.log("data in here", RfpsData);

  useEffect(() => {
    localStorage.setItem("searchInput", searchInput);
  }, [searchInput]);

  // Get unique request types for filter
  const uniqueRequestTypes = [
    ...new Set(RfpsData.map((item) => item.request_type)),
  ].filter(Boolean);

  const openCreateRfps = () => {
    setOpenAdd(true);
  };

  // Enhanced columns with sorting and filtering
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortOrder: sorting.field === "title" ? sorting.order : null,
      filteredValue: filters.title || null,
      onFilter: (value, record) =>
        record.title.toLowerCase().includes(value.toLowerCase()),
      render: (text) => (
        <Tooltip title={text}>
          <span className="font-medium">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: true,
      sortOrder: sorting.field === "description" ? sorting.order : null,
      filteredValue: filters.description || null,
      onFilter: (value, record) =>
        record.description.toLowerCase().includes(value.toLowerCase()),
      render: (text) => (
        <Tooltip title={text}>
          <span>
            {text?.substring(0, 100) + (text?.length > 100 ? "..." : "")}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Post Date",
      dataIndex: "post_date",
      key: "post_date",
      sorter: true,
      sortOrder: sorting.field === "post_date" ? sorting.order : null,
      filteredValue: filters.post_date || null,
      onFilter: (value, record) => {
        if (!filters.dateRange) return true;
        const postDate = dayjs(record.post_date);
        return (
          postDate.isAfter(filters.dateRange[0]) &&
          postDate.isBefore(filters.dateRange[1])
        );
      },
      render: (date) => (
        <Tag color="blue">{dayjs(date).format("MMM DD, YYYY")}</Tag>
      ),
    },
    {
      title: "Close Date",
      dataIndex: "close_date",
      key: "close_date",
      sorter: true,
      sortOrder: sorting.field === "close_date" ? sorting.order : null,
      filteredValue: filters.close_date || null,
      onFilter: (value, record) => {
        if (!filters.dateRange) return true;
        const closeDate = dayjs(record.close_date);
        return (
          closeDate.isAfter(filters.dateRange[0]) &&
          closeDate.isBefore(filters.dateRange[1])
        );
      },
      render: (date) => {
        const isExpired = dayjs(date).isBefore(dayjs());
        return (
          <Tag color={isExpired ? "red" : "green"}>
            {dayjs(date).format("MMM DD, YYYY")}
            {isExpired && <Badge status="error" text="Expired" />}
          </Tag>
        );
      },
    },
    {
      title: "Request Type",
      dataIndex: "request_type",
      key: "request_type",
      sorter: true,
      sortOrder: sorting.field === "request_type" ? sorting.order : null,
      filteredValue: filters.requestType || null,
      onFilter: (value, record) =>
        filters.requestType.includes(record.request_type),
      render: (type) => <Tag color="purple">{type}</Tag>,
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) => {
        if (!file) {
          return <Tag color="default">No file</Tag>;
        }

        const fileName = file.split("/").pop(); // Extract filename from path

        return (
          <Space size="small">
            <Tooltip title={fileName}>
              <span className="font-medium">
                {fileName?.length > 20
                  ? fileName.substring(0, 20) + "..."
                  : fileName}
              </span>
            </Tooltip>
            <Tooltip title="Download file">
              <Button
                type="primary"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => downloadFile(file)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEditRfps(record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() => showDeleteConfirm(record.id)}
              type="primary"
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Filter visible columns
  const filteredColumns = columns.filter((col) => visibleColumns[col.key]);

  const openEditRfps = (RfpsId) => {
    const selectedRfps = data?.data?.find((Rfps) => Rfps.id === RfpsId);
    setSelectedRfpsData(selectedRfps);
    setOpenEdit(true);
  };

  const singleRfpsDelete = useCallback(
    (id) => {
      singleDelete(
        { id },
        {
          onSuccess: () => {
            notification.success({
              message: "The RFP has been successfully deleted.",
            });
            setPagination((prev) => ({ ...prev, current: 1 }));
          },
          onError: (error) => {
            notification.error({
              message: "Error in deleting the RFP.",
              description: error.message,
            });
          },
        }
      );
    },
    [singleDelete]
  );

  const showDeleteConfirm = (id) => {
    setIsModalVisible(true);
    setRfpsIdToDelete(id);
  };

  const handleOk = () => {
    singleRfpsDelete(RfpsIdToDelete);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const onDeleteSelectedRfpss = (inactiveRfpsIds) => {
    inactiveRfpsIds.forEach((id) => {
      singleRfpsDelete(id);
    });
    setSelectedRowKeys([]); // Reset selection
  };

  const handleMultipleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select the RFP(s) to delete.");
      return;
    }

    Modal.confirm({
      title: "Delete RFPs",
      content: `Are you sure you want to delete selected RFP(s)?`,
      okText: "Okay",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        onDeleteSelectedRfpss(selectedRowKeys);
      },
    });
  };

  const onPageChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  const onPageSizeChange = (value) => {
    setPagination({ ...pagination, pageSize: value });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const onSearch = (value) => {
    setSearchInput(value);
    setPagination({ ...pagination, searchQuery: value });
  };

  // Enhanced table functionality
  const handleTableChange = (pagination, filters, sorter) => {
    setSorting({
      field: sorter.field,
      order: sorter.order,
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      requestType: [],
      dateRange: null,
      status: [],
    });
    setSorting({
      field: null,
      order: null,
    });
    setSearchInput("");
    setPagination((prev) => ({ ...prev, searchQuery: null }));
  };

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const exportToCSV = () => {
    const headers = filteredColumns.map((col) => col.title).join(",");
    const csvData = RfpsData.map((row) =>
      filteredColumns
        .map((col) => {
          const value = row[col.dataIndex];
          if (col.dataIndex === "post_date" || col.dataIndex === "close_date") {
            return dayjs(value).format("MMM DD, YYYY");
          }
          return value || "";
        })
        .join(",")
    ).join("\n");

    const csv = `${headers}\n${csvData}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rfps-${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    notification.success({
      message: "Data exported successfully!",
    });
  };

  const refreshData = () => {
    setLoading(true);
    refetch().finally(() => setLoading(false));
  };

  // Column visibility dropdown items
  const columnVisibilityItems = Object.keys(visibleColumns).map((key) => ({
    key,
    label: (
      <Checkbox
        checked={visibleColumns[key]}
        onChange={() => toggleColumnVisibility(key)}
      >
        {columns.find((col) => col.key === key)?.title}
      </Checkbox>
    ),
  }));

  const downloadFile = (file) => {
    if (!file) {
      notification.warning({
        message: "No file available for download",
      });
      return;
    }

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = file; // Assuming the file path is a valid URL
    link.download = file.split("/").pop(); // Extract filename from path
    link.target = "_blank";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notification.success({
      message: "File download started",
    });
  };

  return (
    <div>
      <UpdateRfps
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
          setSelectedRfpsData(null);
        }}
        selectedRfps={selectedRfpsData}
      />

      {/* Enhanced Header Card */}
      <Card
        style={{ marginBottom: 10, backgroundColor: "#ebf1fe", color: "#fff" }}
      >
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input.Search
              placeholder="Search RFPs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={onSearch}
              enterButton={<SearchOutlined />}
              allowClear
              className="w-full"
            />
          </Col>

          <Col xs={24} sm={12} md={16}>
            <Space wrap>
              <Button
                type="default"
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>

              <Dropdown
                menu={{ items: columnVisibilityItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button icon={<SettingOutlined />}>Columns</Button>
              </Dropdown>

              <Button
                type="default"
                icon={<DownloadOutlined />}
                onClick={exportToCSV}
              >
                Export
              </Button>

              <Button
                type="default"
                icon={<ReloadOutlined />}
                onClick={refreshData}
                loading={loading}
              >
                Refresh
              </Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateRfps}
              >
                Add RFP
              </Button>

              {selectedRowKeys.length > 0 && (
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleMultipleDelete}
                >
                  Delete ({selectedRowKeys.length})
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {/* Advanced Filters */}
        {showFilters && (
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={6}>
              <Select
                mode="multiple"
                placeholder="Filter by Request Type"
                value={filters.requestType}
                onChange={(value) => handleFilterChange("requestType", value)}
                style={{ width: "100%" }}
                allowClear
              >
                {uniqueRequestTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <RangePicker
                placeholder={["Start Date", "End Date"]}
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange("dateRange", dates)}
                style={{ width: "100%" }}
              />
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Button icon={<ClearOutlined />} onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </Col>
          </Row>
        )}
      </Card>

      {/* Enhanced Table Card */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <Skeleton active />
        ) : isError ? (
          <div>Error in fetching RFPs data.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              scroll={{ x: "1200px" }}
              rowSelection={rowSelection}
              columns={filteredColumns}
              dataSource={RfpsData}
              pagination={false}
              rowKey="id"
              onChange={handleTableChange}
              size="middle"
              bordered
              loading={loading}
            />
          </div>
        )}
        {data && (
          <CustomPagination
            total={data.total}
            current={pagination.current}
            pageSize={pagination.pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </Card>

      <Modal
        title="Delete RFP"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Okay"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this RFP?</p>
      </Modal>

      <CreateRfps
        open={openAdd}
        onCancel={() => {
          setOpenAdd(false);
        }}
      />
    </div>
  );
}

export default Index;
