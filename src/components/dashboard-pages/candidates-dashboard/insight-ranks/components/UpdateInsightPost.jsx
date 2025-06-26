import { useEffect } from "react";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import {
  usePostInsightCreate,
  useUpdateInsight,
  useGetTags,
} from "@/queries/all.insight.query.js";

const { TextArea } = Input;

const UpdateInsightPost = ({ editData, onClose }) => {
  const [form] = Form.useForm();

  // Create and Update hooks
  const { mutate: createInsight } = usePostInsightCreate();
  const { mutate: updateInsight } = useUpdateInsight();

  // Fetch tags for Select
  const { data: tagOptions = [] } = useGetTags();

  // Fill form on edit
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        content: editData.content,
        tag_ids: editData.tag?.map((t) => t.id),
        is_featured: editData.is_featured,
        is_career_lession: editData.is_career_lession,
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  // Submit handler
  const handleSubmit = (values) => {
    const payload = {
      ...values,
    };

    if (editData?.id) {
      updateInsight(
        { id: editData.id, ...payload },
        {
          onSuccess: () => {
            notification.success({ message: "Insight updated successfully." });
            form.resetFields();
            onClose?.();
          },
          onError: (err) => {
            notification.error({
              message: "Update failed.",
              description: err.message,
            });
          },
        }
      );
    } else {
      createInsight(payload, {
        onSuccess: () => {
          notification.success({ message: "Insight created successfully." });
          form.resetFields();
        },
        onError: (err) => {
          notification.error({
            message: "Creation failed.",
            description: err.message,
          });
        },
      });
    }
  };

  return (
    <Modal
      title={editData ? "Edit Insight" : "Create Insight"}
      open={!!editData}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={editData ? "Update" : "Create"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          is_featured: "no",
          is_career_lession: "no",
        }}
      >
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Please enter content" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="tag_ids"
          label="Tags"
          rules={[{ required: true, message: "Please select tags" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select tags"
            options={tagOptions?.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="is_featured" label="Is Featured">
          <Select>
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="is_career_lession" label="Is Career Lession">
          <Select>
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateInsightPost;
