import React, { useState } from "react";
import { Card, Input, notification, Select, Typography } from "antd";
import { usePostInsightCreate } from "@/queries/all.insight.query";
import { useGetInsightTagsData } from "@/queries/insight.tags.query";
import ReactQuill from "react-quill";

const { Option } = Select;
const { Text } = Typography;

const MAX_TAGS = 5;

const CreateInsightPost = () => {
  const { mutate } = usePostInsightCreate();
  const [loading, setLoading] = useState(false);
  const { data } = useGetInsightTagsData();
  const tagData = data || [];

  const [formValues, setFormValues] = useState({
    content: "",
    is_career_lession: false,
    tag_id: [],
  });

  const [tagLimitError, setTagLimitError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagIdChange = (value) => {
    if (value.length <= MAX_TAGS) {
      setFormValues((prev) => ({
        ...prev,
        tag_id: value,
      }));
      setTagLimitError(false);
    } else {
      setTagLimitError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.tag_id.length > MAX_TAGS) {
      setTagLimitError(true);
      return;
    }

    if (!formValues.tag_id || formValues.tag_id.length === 0) {
      setTagLimitError("Please select at least one tag.");
      return;
    } else if (formValues.tag_id.length > 5) {
      setTagLimitError("You can select up to a maximum of 5 tags.");
      return;
    } else {
      setTagLimitError(null);
    }
    setLoading(true);

    const payload = {
      content: formValues.content,
      is_featured: formValues.is_featured ? "yes" : "no",
      is_career_lession: formValues.is_career_lession ? "yes" : "no",
      tag_id: formValues.tag_id,
    };

    mutate(payload, {
      onSuccess: () => {
        notification.success({
          message: "Success!",
          description: "Insight post created successfully!",
        });
        setFormValues({
          content: "",
          is_featured: false,
          is_career_lession: false,
          tag_id: [],
        });
      },
      onError: () => {
        notification.error({
          message: "Error!",
          description: "Failed to create insight post.",
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <Card className="mb-10">
      <div className="widget-title">
        <h4>Post Your Insights</h4>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-3">
          <label>Insight Content</label>
          <ReactQuill
            size="large"
            theme="snow"
            style={{ height: "150px", marginBottom: "50px" }}
            rules={[{ required: true }]}
            value={formValues.content}
            onChange={(value) => setFormValues({ ...formValues, content: value })}
          />
        </div>

        <div className="form-group mb-3">
          <label>Select Tag</label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select tag categories"
            value={formValues.tag_id}
            onChange={handleTagIdChange}
            showSearch
            optionFilterProp="children"
          >
            {tagData?.map((tag) => (
              <Option key={tag.id} value={tag.id}>
                {tag?.name}
              </Option>
            ))}
          </Select>
          {tagLimitError && <Text type="danger">{tagLimitError}</Text>}
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="is_career_lession"
            className="form-check-input"
            id="isCareer"
            checked={formValues.is_career_lession}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isCareer">
            Mark as Career Lesson
          </label>
        </div>

        <button
          type="submit"
          className="theme-btn btn-style-one d-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Posting..." : "Post Insight"}
        </button>
      </form>
    </Card>
  );
};

export default CreateInsightPost;
