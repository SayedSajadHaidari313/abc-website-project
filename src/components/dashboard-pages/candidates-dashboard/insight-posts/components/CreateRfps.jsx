// External dependencies
import React, { useRef, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
  notification,
  Select,
  DatePicker,
  Upload,
  Button,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import dayjs from "dayjs";

// Internal dependencies
import CancelButton from "@/components/Button/cancel.button";
import SubmitButton from "@/components/Button/submit.button";
import { usePostRfpsCreate } from "@/queries/website.query/rfps.query";
import { useAuthStore } from "@/auth/auth.store";

const { TextArea } = Input;
const { Dragger } = Upload;

// --- Constants ---
const REQUEST_TYPE_OPTIONS = [
  { label: "Request for Proposal", value: "RFP" },
  { label: "Request for Quote", value: "RFQ" },
];

const VALIDATION_SCHEMA = Yup.object().shape({
  logged_in_user_id: Yup.number().required("Logged in user ID is required!"),
  title: Yup.string()
    .required("Please enter RFP title!")
    .max(255, "Title must not exceed 255 characters"),
  description: Yup.string().required("Please enter description!"),
  post_date: Yup.date().required("Please select post date!"),
  close_date: Yup.date().required("Please select close date!"),
  file: Yup.mixed().required("Please upload a file!"),
  request_type: Yup.string()
    .required("Please select request type!")
    .max(255, "Request type must not exceed 255 characters"),
  user_id: Yup.number(),
});

const INITIAL_VALUES = {
  logged_in_user_id: undefined,
  title: "",
  description: "",
  post_date: null,
  close_date: null,
  file: null,
  request_type: "",
  user_id: undefined,
};

// --- Component ---
function CreateRfps({ open, onCancel }) {
  const formRef = useRef(null);
  const { mutate } = usePostRfpsCreate();
  const { user } = useAuthStore();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset form and file state
  const handleModalCancel = () => {
    onCancel();
    formRef.current?.resetFields();
    setFileList([]);
  };

  // Handle form submission
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const validatedData = {
        ...values,
        post_date: values.post_date
          ? dayjs(values.post_date).format("YYYY-MM-DD")
          : null,
        close_date: values.close_date
          ? dayjs(values.close_date).format("YYYY-MM-DD")
          : null,
        logged_in_user_id: user.id,
        user_id: user.id,
      };

      await VALIDATION_SCHEMA.validate(
        { ...validatedData, file: fileList[0] },
        { abortEarly: false }
      );

      const formData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      if (fileList.length > 0) {
        formData.append("file", fileList[0]);
      }

      mutate(formData, {
        onSuccess: () => {
          notification.success({ message: "RFP created successfully!" });
          formRef.current?.resetFields();
          setFileList([]);
          handleModalCancel();
        },
        onError: (error) => {
          const errorMsg = error.response?.data;
          message.error(
            errorMsg?.message || "Failed to create RFP. Please try again."
          );
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      if (error.inner) {
        const fieldErrors = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path] = [err.message];
        });
        formRef.current?.setFields(
          Object.entries(fieldErrors).map(([name, errors]) => ({
            name,
            errors,
          }))
        );
      }
      message.error("Please fill in all required fields correctly.");
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <Modal
      open={open}
      title={<div style={{ textAlign: "center" }}>Add New RFP</div>}
      onCancel={handleModalCancel}
      width={800}
      maskClosable={false}
      footer={null}
      className="formHeader"
    >
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        ref={formRef}
        initialValues={INITIAL_VALUES}
      >
        <Col span={12}>
          <Form.Item hidden name="user_id" />
        </Col>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter RFP title!" },
                { max: 255, message: "Title must not exceed 255 characters" },
              ]}
            >
              <Input placeholder="Enter RFP title" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Request Type"
              name="request_type"
              rules={[
                { required: true, message: "Please select request type!" },
                {
                  max: 255,
                  message: "Request type must not exceed 255 characters",
                },
              ]}
            >
              <Select
                placeholder="Select request type"
                options={REQUEST_TYPE_OPTIONS}
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
              label="File"
              name="file"
              rules={[{ required: true, message: "Please upload a file!" }]}
            >
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
                  return false; // prevent auto-upload
                }}
                fileList={fileList}
                onRemove={() => setFileList([])}
                maxCount={1}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully.`
                    );
                  } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
                onDrop={(e) => {
                  // Optionally handle dropped files
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
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <TextArea rows={4} placeholder="Enter RFP description" />
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
}

export default CreateRfps;
