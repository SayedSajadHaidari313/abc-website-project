import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  Tag,
  Space,
  Spin,
  Alert,
  Typography,
  Divider,
} from "antd";
import { formatImageUrl } from "@/utils/imageUtils";
import { HiBuildingOffice2, HiPhone } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";
import { useGetItemsByCategoryId } from "@/queries/website.query/items.query";

const { Title, Text } = Typography;

const RelatedCompany = ({ currentCompany }) => {
  const {
    data: companyData,
    isLoading,
    isError,
  } = useGetItemsByCategoryId({
    categoryId: currentCompany?.category?.id,
    current: 1,
    pageSize: 10,
    searchQuery: "",
  });

  const primaryColor = "var(--primary-color)";
  const secondaryColor = "var(--primary-2nd-color)";

  if (isLoading) {
    return (
      <div className="related-company__loading">
        <Spin size="large" />
        <div className="related-company__loading-text">
          <Text type="secondary">Loading related companies...</Text>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Unable to load related companies"
        description="We're experiencing technical difficulties. Please try again later."
        type="error"
        showIcon
        className="related-company__error"
      />
    );
  }

  // If no current company or no category, don't show anything
  if (!currentCompany || !currentCompany.category) {
    return null;
  }

  // Extract data from the response - it might be nested
  const companies = companyData?.data || companyData;

  // Check if we have data and it's in the expected format
  if (!companies || !Array.isArray(companies)) {
    return null;
  }

  // Filter companies with the same category, excluding the current company
  const relatedCompanies = companies.filter(
    (company) =>
      company.category?.id === currentCompany.category.id &&
      company.id !== currentCompany.id
  );

  // If no related companies found, don't show anything
  if (!relatedCompanies || relatedCompanies.length === 0) {
    return null;
  }

  // Limit to 6 companies for better UX
  const displayCompanies = relatedCompanies.slice(0, 6);

  return (
    <section
      className="related-company"
      style={{
        borderRadius: 12,
        padding: 16,
        background:
          "linear-gradient(135deg, rgba(249,171,0,0.06) 0%, rgba(249,171,0,0.03) 100%)",
      }}
    >
      {/* Professional Header Section */}
      <div className="related-company__header" style={{ marginBottom: 12 }}>
        <div
          className="related-company__header-title-container"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            className="related-company__header-accent"
            style={{
              width: 4,
              height: 20,
              borderRadius: 4,
              background: secondaryColor,
            }}
          />
          <Title
            level={4}
            className="related-company__header-title"
            style={{ margin: 0 }}
          >
            Related Companies
          </Title>
        </div>
        <Text
          type="secondary"
          className="related-company__header-subtitle"
          style={{ display: "block", marginTop: 6 }}
        >
          Discover other companies in the{" "}
          <Tag
            className="related-company__header-category-tag"
            style={{
              color: secondaryColor,
              borderColor: secondaryColor,
              background: "rgba(249,171,0,0.10)",
            }}
          >
            {currentCompany.category.category_name}
          </Tag>{" "}
          category
        </Text>
      </div>

      {/* Professional Grid Layout */}
      <div
        className="related-company__grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {displayCompanies.map((company) => (
          <Card
            key={company.id}
            hoverable
            className="related-company__card"
            bodyStyle={{ padding: 0 }}
            style={{
              borderRadius: 10,
              borderLeft: `4px solid #e28642`,
              borderTop: "1px solid rgba(249,171,0,0.20)",
              borderRight: "1px solid rgba(249,171,0,0.20)",
              borderBottom: "1px solid rgba(249,171,0,0.20)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
            }}
          >
            <Link
              to={`/company/${company.item_slug || company.id}`}
              className="related-company__card-link"
              style={{ display: "block", color: "inherit" }}
            >
              {/* Company Header */}
              <div
                className="related-company__card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                }}
              >
                <div
                  className="related-company__card-header-content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flex: 1,
                  }}
                >
                  <Avatar
                    size={56}
                    shape="square"
                    src={
                      company?.item_image
                        ? formatImageUrl(company.item_image)
                        : null
                    }
                    icon={!company?.item_image && <HiBuildingOffice2 />}
                    className="related-company__card-avatar"
                    style={{ border: "2px solid rgba(249,171,0,0.25)" }}
                  />
                  <div
                    className="related-company__card-header-info"
                    style={{ flex: 1 }}
                  >
                    <Space
                      direction="vertical"
                      size={2}
                      style={{ width: "100%" }}
                    >
                      <Title
                        level={5}
                        className="related-company__card-title"
                        style={{ margin: 0 }}
                      >
                        {company?.item_title}
                      </Title>
                      {company?.item_status === 1 && (
                        <div
                          className="related-company__card-status"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <div
                            className="related-company__card-status-dot"
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#e28642",
                            }}
                          />
                          <Text
                            className="related-company__card-status-text"
                            style={{ color: "#e28642" }}
                          >
                            Active Company
                          </Text>
                        </div>
                      )}
                    </Space>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="related-company__card-details">
                <div
                  className="related-company__card-details-content"
                  style={{ padding: "0 12px 12px" }}
                >
                  {/* Location */}
                  {(company?.city?.city_name || company?.country?.name) && (
                    <div
                      className="related-company__card-detail-item"
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        className="related-company__card-detail-icon"
                        style={{ color: "#e28642", fontSize: 16 }}
                      >
                        <MdLocationOn />
                      </div>
                      <div>
                        <Text
                          className="related-company__card-detail-text"
                          style={{ color: "#4b5563" }}
                        >
                          {`${company?.city?.city_name || ""} ${
                            company?.country?.name || ""
                          }`.trim() || "Location not specified"}
                        </Text>
                      </div>
                    </div>
                  )}

                  {/* Description Preview */}
                  {company?.item_description && (
                    <div>
                      <Divider style={{ margin: "10px 0 8px" }} />
                      <Text
                        type="secondary"
                        className="related-company__card-description"
                        style={{ display: "block" }}
                      >
                        {company.item_description.length > 100
                          ? `${company.item_description.substring(0, 100)}...`
                          : company.item_description}
                      </Text>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="related-company__card-view-button">
                    <Text
                      className="related-company__card-view-button-text"
                      style={{ color: "#e28642", fontWeight: 500 }}
                    >
                      View Company Details →
                    </Text>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Professional Footer */}
      {relatedCompanies.length > 6 && (
        <div className="related-company__footer">
          <Text type="secondary" className="related-company__footer-text">
            Showing {displayCompanies.length} of {relatedCompanies.length}{" "}
            related companies
          </Text>
        </div>
      )}
    </section>
  );
};

RelatedCompany.propTypes = {
  currentCompany: PropTypes.object,
};

export default RelatedCompany;
