import { notification, message } from "antd";
import { useState, useEffect } from "react";
import { useUpdateItems } from "@/queries/website.query/items.query";

const ItemEditForm = ({ item }) => {
  const { mutate } = useUpdateItems();

  // Initialize form state with all item fields
  const [formValues, setFormValues] = useState({
    id: item?.id || "",
    item_title: item?.item_title || "",
    item_description: item?.item_description || "",
    item_image: null, // for file upload
    item_address: item?.item_address || "",
    item_postal_code: item?.item_postal_code || "",
    item_price: item?.item_price || "",
    item_website: item?.item_website || "",
    item_phone: item?.item_phone || "",
    item_lat: item?.item_lat || "",
    item_lng: item?.item_lng || "",
    item_social_facebook: item?.item_social_facebook || "",
    item_social_twitter: item?.item_social_twitter || "",
    item_social_linkedin: item?.item_social_linkedin || "",
    item_features_string: item?.item_features_string || "",
    item_categories_string: item?.item_categories_string || "",
    item_youtube_id: item?.item_youtube_id || "",
    // Add other fields as needed
  });

  useEffect(() => {
    if (item) {
      setFormValues((prev) => ({
        ...prev,
        ...item,
        item_image: null, // reset file input
      }));
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      // 2MB limit
      const maxSize = 2 * 1024 * 1024;
      if (name === "item_image" && file.size > maxSize) {
        message.error("Image must be less than 2MB");
        return;
      }
      setFormValues((prev) => ({ ...prev, [name]: file }));
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: "Success!",
            description: "Item updated successfully!",
          });
        },
        onError: (error) => {
          notification.error({ message: "Update Failed!" });
          console.error(error);
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      message.error("Please fill all inputs");
      setLoading(false);
    }
  };

  const RequiredLabel = ({ text }) => (
    <label>
      {text} <span className="text-danger">*</span>
    </label>
  );

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Title */}
        <div className="form-group col-lg-12">
          <RequiredLabel text="Title" />
          <input
            type="text"
            name="item_title"
            value={formValues.item_title}
            onChange={handleChange}
            required
          />
        </div>
        {/* Description */}
        <div className="form-group col-lg-12">
          <label>Description</label>
          <textarea
            name="item_description"
            value={formValues.item_description}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Image Upload */}
        <div className="form-group col-lg-12 mb-4">
          <label className="form-label fw-bold">Image</label>
          <div className="border rounded p-3 text-center bg-light">
            <input
              type="file"
              name="item_image"
              onChange={handleFileChange}
              className="form-control"
              style={{ cursor: "pointer" }}
            />
            <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
              📷 Upload a clear image (JPG, PNG). <br />
              ⚠️ Max file size: <strong>2MB</strong>
            </div>
          </div>
        </div>
        {/* Address */}
        <div className="form-group col-lg-12">
          <label>Address</label>
          <input
            type="text"
            name="item_address"
            value={formValues.item_address}
            onChange={handleChange}
          />
        </div>
        {/* Add more fields as needed, following the same pattern */}
        {/* Submit */}
        <div className="form-group col-lg-12">
          <button
            className="theme-btn btn-style-one d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ItemEditForm;
