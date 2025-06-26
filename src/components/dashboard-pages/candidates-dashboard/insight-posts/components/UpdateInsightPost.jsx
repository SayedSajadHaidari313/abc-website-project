import React, { useEffect, useState, useRef } from "react";
import { Modal, Form, Input, Select, notification, Row, Button } from "antd";
import { useUpdateInsight } from "@/queries/all.insight.query";
import { useGetInsightTagsData } from "@/queries/insight.tags.query";
import ReactQuill from "react-quill";

const { TextArea } = Input;
const { Option } = Select;

const UpdateInsightPost = ({ open, onCancel, selectedInsightData }) => {
  const [form] = Form.useForm();
  const { mutate } = useUpdateInsight();
  const { data } = useGetInsightTagsData();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const tagData = data?.data || [];

  useEffect(() => {
    if (selectedInsightData) {
      form.setFieldsValue({
        id: selectedInsightData.id,
        content: selectedInsightData.content,
        tag_id: selectedInsightData.tag?.map((t) => t.id),
        tags: selectedInsightData.tags,
        is_featured: selectedInsightData.is_featured,
        is_career_lession: selectedInsightData.is_career_lession,
      });
    } else {
      form.resetFields();
    }
  }, [selectedInsightData, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Step 1 data
      formData.append("id", selectedInsightData.id);
      formData.append("content", values.content);
      formData.append("is_featured", values.is_featured);
      formData.append("is_career_lession", values.is_career_lession);

      if (values.tags) {
        formData.append("tags", values.tags);
      }

      formData.append("tag_id", JSON.stringify(values.tag_id)); // اگر نیاز دارید که JSON ارسال کنید.

      formData.append("_method", "PUT");

      mutate(formData, {
        onSuccess: () => {
          notification.success({ message: "Insight updated successfully." });
          form.resetFields();
          onCancel();
        },
        onError: (err) => {
          notification.error({
            message: "Update failed.",
            description:
              err?.response?.data?.message || err.message || "Unknown error",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      notification.error({ message: "Please fill in all sections correctly." });
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      title="Edit Insight"
      onCancel={handleModalCancel}
      width={800}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} ref={formRef}>
        <>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <ReactQuill
              size="large"
              theme="snow"
              style={{ height: "150px", marginBottom: "50px" }}
              rules={[{ type: "email", required: true }]}
            />
          </Form.Item>

          {/* <Form.Item name="tags" label="Tags (Optional: comma separated)">
              <Input placeholder="#marketing, #design" />
            </Form.Item> */}

          <Form.Item
            name="tag_id"
            label="Tag Categories"
            rules={[
              { required: true, message: "Please select tag categories" },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Select tag categories"
              showSearch
              optionFilterProp="children"
            >
              {tagData.map((tag) => (
                <Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="is_career_lession" label="Is Career Lesson">
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Form.Item name="is_featured" initialValue="no" hidden>
              <Input />
            </Form.Item>
          </Row>
        </>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <Button onClick={handleModalCancel}>Cancel</Button>
          <div>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateInsightPost;
