import { useState, useCallback } from "react";
import { Input, Skeleton, Modal, Button, notification, Tag } from "antd";
import {
  DeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditOutlined,
} from "@ant-design/icons";
import CreateInsightPost from "./CreateInsightPost.jsx";
import CustomPagination from "@/components/pagination/CustomPagination.jsx";
import {
  useGetInsightData,
  useSingleDelete,
} from "@/queries/all.insight.query.js";
import { useAuthStore } from "@/auth/auth.store.js";
import UpdateInsightPost from "./UpdateInsightPost.jsx";

const InsightList = () => {
  // --- Delete Hook ---
  const { mutate: singleDelete } = useSingleDelete();
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id;
  // --- States ---
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [InsightIdToDelete, setInsightIdToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedInsightData, setSelectedInsightData] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    searchQuery: localStorage.getItem("searchInput") || "",
  });

  // --- Fetch Data ---
  const { data, isLoading } = useGetInsightData(
    pagination.current,
    pagination.pageSize,
    pagination.searchQuery
  );
  const insightData = data?.data;

  // --- Pagination Handlers ---
  const onPageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const onPageSizeChange = (value) => {
    setPagination({ ...pagination, pageSize: value, current: 1 });
  };

  // --- Search Handler ---
  const handleSearch = (value) => {
    setPagination({ ...pagination, searchQuery: value, current: 1 });
    localStorage.setItem("searchInput", value);
  };

  // --- Delete Handler ---
  const singleInsightDelete = useCallback(
    (id) => {
      singleDelete(
        { id },
        {
          onSuccess: () => {
            notification.success({
              message: "The insight has been deleted successfully.",
            });
            setPagination((prev) => ({ ...prev, current: 1 }));
          },
          onError: (error) => {
            notification.error({
              message: "Error in deleting the insight.",
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
    setInsightIdToDelete(id);
  };

  const handleOk = () => {
    singleInsightDelete(InsightIdToDelete);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColorByIndex = (index) => {
    const colors = [
      "magenta",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    return colors[index % colors.length];
  };
  const openEditInsight = (insightId) => {
    const selectedInsight = data?.data?.find(
      (insight) => insight.id === insightId
    );
    setSelectedInsightData(selectedInsight);
    setOpenEdit(true);
  };
  // --- JSX ---
  return (
    <>
      {/* Component for creating a new insight */}

      <CreateInsightPost />

      <div className="tabs-box">
        <div className="widget-title">
          <h4>My Insights</h4>
        </div>

        <div className="widget-content">
          {/* Search Input */}
          <Input.Search
            placeholder="Search insights..."
            defaultValue={pagination.searchQuery}
            onSearch={handleSearch}
            enterButton
            allowClear
            style={{ marginBottom: 16, maxWidth: 300 }}
          />

          <div className="table-outer">
            {/* Table */}
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Content</th>
                  {/* <th>Tags</th> */}
                  {/* <th>Is Featured</th> */}
                  <th>Is Career</th>
                  <th>Tag Names</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6">
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </td>
                  </tr>
                ) : (
                  insightData
                    ?.filter((item) => item?.user_id === currentUserId)
                    ?.map((item) => (
                      <tr key={item?.id}>
                        <td>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item?.content || "---",
                            }}
                          />
                        </td>
                        <td>
                          {item?.is_career_lession === "yes" ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                          ) : (
                            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                          )}
                        </td>
                        <td>
                          {item?.tag?.map((tag, index) => (
                            <Tag key={index} color={getColorByIndex(index)}>
                              {tag.name}
                            </Tag>
                          ))}
                        </td>
                        <td>
                          <div className="option-box">
                            <ul className="option-list">
                              <li>
                                <Button
                                  onClick={() => openEditInsight(item.id)}
                                  type="primary"
                                  size="small"
                                  icon={<EditOutlined />}
                                  style={{ marginLeft: "10px" }}
                                />
                              </li>
                              <li>
                                <Button
                                  onClick={() => showDeleteConfirm(item.id)}
                                  type="primary"
                                  size="small"
                                  danger
                                  icon={<DeleteOutlined />}
                                  style={{ marginLeft: "10px" }}
                                />
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
            <UpdateInsightPost
              open={openEdit}
              onCancel={() => {
                setOpenEdit(false);
                setSelectedInsightData(null);
              }}
              selectedInsightData={selectedInsightData}
            />

            {/* Pagination */}
            <CustomPagination
              total={data?.total || 0}
              current={pagination.current}
              pageSize={pagination.pageSize}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />

            {/* Delete Confirmation Modal */}
            <Modal
              title="Delete Insight"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Okay"
              cancelText="Cancel"
            >
              <p>Are you sure you want to delete this Insight?</p>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsightList;
