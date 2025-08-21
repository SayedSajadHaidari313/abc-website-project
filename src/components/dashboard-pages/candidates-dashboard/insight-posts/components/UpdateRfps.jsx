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
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import * as Yup from "yup";
import { useAuthStore } from "@/auth/auth.store";

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

const REQUEST_TYPE_OPTIONS = [
  { label: "Request for Proposal", value: "RFP" },
  { label: "Request for Quote", value: "RFQ" },
];

const VALIDATION_SCHEMA = Yup.object().shape({
  id: Yup.mixed().required("RFP ID is required!"),
  logged_in_user_id: Yup.number().required("Logged in user ID is required!"),
  title: Yup.string()
    .required("Please enter RFP title!")
    .max(255, "Title must not exceed 255 characters"),
  description: Yup.string().required("Please enter description!"),
  post_date: Yup.date().required("Please select post date!"),
  close_date: Yup.date().required("Please select close date!"),
  request_type: Yup.string()
    .required("Please select request type!")
    .max(255, "Request type must not exceed 255 characters"),
  user_id: Yup.number(),
  file: Yup.mixed(), // Not required for update, but validated if present
});

const UpdateRfps = ({ open, onCancel, selectedRfps }) => {
  const { mutate } = useUpdateRfps();
  const { user } = useAuthStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [selectedRfps, form]);

  const handleUpdate = async (values) => {
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
        logged_in_user_id: user?.id,
        user_id: user?.id,
      };
      // Validate with Yup
      await VALIDATION_SCHEMA.validate(
        { ...validatedData, file: fileList[0]?.originFileObj || fileList[0] },
        { abortEarly: false }
      );
      const formData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
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
          const errorMsg = error.response?.data;
          message.error(
            errorMsg?.message || "Failed to update RFP. Please try again."
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
        form.setFields(
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

  const handleModalCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

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

                  // مهم: اضافه کردن فایل به originFileObj
                  file.originFileObj = file; // این تضمین می‌کند که فایل در آپدیت در دسترس باشد
                  setFileList([file]);
                  return false; // چون ما به صورت دستی آپلود می‌کنیم
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
