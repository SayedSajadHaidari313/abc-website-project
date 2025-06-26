import React, { useState } from "react";
import { Card, Input, notification, Select } from "antd";
import { usePostInsightCreate } from "@/queries/all.insight.query";
import { useGetInsightTagsData } from "@/queries/insight.tags.query";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const CreateInsightPost = () => {
  const { mutate } = usePostInsightCreate();
  const [loading, setLoading] = useState(false);
  const { data } = useGetInsightTagsData();
  const tagData = data || []; // لیست تگ‌ها
  const [formValues, setFormValues] = useState({
    content: "",
    tags: "",
    is_featured: false,
    tag_id: [], // برای ذخیره IDهای تگ‌های انتخاب‌شده
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagIdChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      tag_id: value, // ذخیره تگ‌های انتخاب‌شده
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      content: formValues.content,
      tags: formValues.tags, // رشته تگ‌ها، مثلا "#ux, #design"
      is_featured: formValues.is_featured ? "yes" : "no",
      is_career_lession: formValues.is_career_lession ? "yes" : "no",
      tag_id: formValues.tag_id, // آرایه از IDهای تگ‌ها
    };

    mutate(payload, {
      onSuccess: () => {
        notification.success({
          message: "Success!",
          description: "Insight post created successfully!",
        });
        setFormValues({
          content: "",
          tags: "",
          is_featured: false,
          is_career_lesson: false,
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
          <TextArea
            required
            className="form-control"
            name="content"
            value={formValues.content}
            onChange={handleChange}
          ></TextArea>
        </div>

        <div className="form-group mb-3">
          <label>Tags (Optional: comma separated)</label>
          <Input
            type="text"
            name="tags"
            className="form-control"
            value={formValues.tags}
            onChange={handleChange}
            placeholder="#marketing, #design"
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
            showSearch // این برای فعال‌سازی جستجوست
            optionFilterProp="children" // جستجو بر اساس متن گزینه‌ها
          >
            {tagData.map((tag) => (
              <Option key={tag.id} value={tag.id}>
                {tag.name} {/* نام تگ */}
              </Option>
            ))}
          </Select>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="is_featured"
            className="form-check-input"
            id="isFeatured"
            checked={formValues.is_featured}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isFeatured">
            Mark as Featured
          </label>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="is_career_lesson"
            className="form-check-input"
            id="isCareer"
            checked={formValues.is_career_lesson}
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
