import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  message,
  notification,
  Select,
  DatePicker,
  Upload,
  Button,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import CancelButton from "@/components/Button/cancel.button";
import SubmitButton from "@/components/Button/submit.button";
import { useUpdateRfps } from "@/queries/website.query/rfps.query";
import { useGetUserData } from "@/queries/user.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const { TextArea } = Input;
const { Dragger } = Upload;

const TITLE_RULES = [
  { required: true, message: "Please enter RFP title!" },
  { max: 255, message: "Title must not exceed 255 characters" },
];
const DESCRIPTION_RULES = [
  { required: true, message: "Please enter description!" },
];
const REQUEST_TYPE_RULES = [
  { required: true, message: "Please select request type!" },
  { max: 255, message: "Request type must not exceed 255 characters" },
];

const UpdateRfps = ({ open, onCancel, selectedRfps }) => {
  const { mutate } = useUpdateRfps();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: users } = useGetUserData();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (selectedRfps) {
      form.setFieldsValue({
        id: selectedRfps.id,
        title: selectedRfps.title,
        description: selectedRfps.description,
        post_date: selectedRfps.post_date
          ? dayjs(selectedRfps.post_date)
          : null,
        close_date: selectedRfps.close_date
          ? dayjs(selectedRfps.close_date)
          : null,
        request_type: selectedRfps.request_type,
        user_id: selectedRfps.user_id,
      });

      // preload file
      if (selectedRfps.file) {
        setFileList([
          {
            uid: "-1",
            name: selectedRfps.file.split("/").pop(),
            status: "done",
            url: `${BASE_IMAGE_URL}/${selectedRfps.file}`,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [selectedRfps, form]);

  const handleUpdate = (values) => {
    setLoading(true);

    const formData = new FormData();
    const transformedValues = {
      ...values,
      post_date: values.post_date
        ? dayjs(values.post_date).format("YYYY-MM-DD")
        : null,
      close_date: values.close_date
        ? dayjs(values.close_date).format("YYYY-MM-DD")
        : null,
      logged_in_user_id: 1, // should come from auth
    };

    Object.entries(transformedValues).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    // Append file only if user uploaded a new one
    if (fileList.length && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    formData.append("_method", "PUT");

    mutate(formData, {
      onSuccess: () => {
        notification.success({ message: "RFP updated successfully!" });
        form.resetFields();
        setFileList([]);
        onCancel();
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        message.error(errorMessage);
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const requestTypeOptions = [
    { label: "Request for Proposal", value: "RFP" },
    { label: "Request for Quote", value: "RFQ" },
  ];

  return (
    <Modal
      open={open}
      title={<div style={{ textAlign: "center" }}>Update RFP</div>}
      onCancel={handleModalCancel}
      width={800}
      maskClosable={false}
      footer={null}
      className="formHeader"
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Row gutter={16}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Col span={12}>
            <Form.Item label="Title" name="title" rules={TITLE_RULES}>
              <Input placeholder="Enter RFP title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Request Type"
              name="request_type"
              rules={REQUEST_TYPE_RULES}
            >
              <Select
                placeholder="Select request type"
                options={requestTypeOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Post Date"
              name="post_date"
              rules={[{ required: true, message: "Please select post date!" }]}
            >
              <DatePicker
                placeholder="Select post date"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Close Date"
              name="close_date"
              rules={[{ required: true, message: "Please select close date!" }]}
            >
              <DatePicker
                placeholder="Select close date"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="User"
              name="user_id"
              rules={[{ required: true, message: "Please select a user!" }]}
            >
              <Select
                showSearch
                placeholder="Select a user"
                options={users?.data?.map((user) => ({
                  label: user.name || user.email,
                  value: user.id,
                }))}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="File" name="file">
              <Dragger
                beforeUpload={(file) => {
                  const isAllowed = [
                    "image/jpeg",
                    "image/png",
                    "application/pdf",
                  ].includes(file.type);
                  if (!isAllowed) {
                    message.error("Only JPG, PNG, and PDF files are allowed!");
                    return Upload.LIST_IGNORE;
                  }
                  setFileList([file]);
                  return false;
                }}
                fileList={fileList}
                onRemove={() => setFileList([])}
                maxCount={1}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully.`
                    );
                  } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
                onDrop={(e) => {
                  console.log("Dropped files", e.dataTransfer.files);
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for JPG, PNG, and PDF files. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={DESCRIPTION_RULES}
            >
              <TextArea placeholder="Enter RFP description" rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Form.Item>
            <CancelButton onClick={handleModalCancel} />
            <SubmitButton loading={loading} htmlType="submit" />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

UpdateRfps.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedRfps: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    post_date: PropTypes.string.isRequired,
    close_date: PropTypes.string.isRequired,
    file: PropTypes.string,
    request_type: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }),
};

export default UpdateRfps;
