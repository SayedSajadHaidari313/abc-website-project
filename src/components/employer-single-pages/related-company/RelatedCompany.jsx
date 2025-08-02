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
import { HiBuildingOffice2, HiPhone, HiGlobeAlt } from "react-icons/hi2";
import { MdBusiness, MdLocationOn, MdTrendingUp } from "react-icons/md";
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
    <section className="related-company">
      {/* Professional Header Section */}
      <div className="related-company__header">
        <div className="related-company__header-title-container">
          <div className="related-company__header-accent" />
          <Title level={3} className="related-company__header-title">
            Related Companies
          </Title>
        </div>
        <Text type="secondary" className="related-company__header-subtitle">
          Discover other companies in the{" "}
          <Tag color="blue" className="related-company__header-category-tag">
            {currentCompany.category.category_name}
          </Tag>{" "}
          category
        </Text>
      </div>

      {/* Professional Grid Layout */}
      <div className="related-company__grid">
        {displayCompanies.map((company) => (
          <Card
            key={company.id}
            hoverable
            className="related-company__card"
            bodyStyle={{ padding: "0" }}
          >
            <Link
              to={`/company/${company.item_slug || company.id}`}
              className="related-company__card-link"
            >
              {/* Company Header */}
              <div className="related-company__card-header">
                <div className="related-company__card-header-content">
                  <Avatar
                    size={64}
                    src={
                      company?.item_image
                        ? formatImageUrl(company.item_image)
                        : null
                    }
                    icon={!company?.item_image && <HiBuildingOffice2 />}
                    className="related-company__card-avatar"
                  />
                  <div className="related-company__card-header-info">
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      {/* {company?.category && (
                        <Tag
                          color="blue"
                          className="related-company__card-category-tag"
                        >
                          {company.category.category_name}
                        </Tag>
                      )} */}
                      <Title level={4} className="related-company__card-title">
                        {company?.item_title}
                      </Title>
                      {company?.item_status === 1 && (
                        <div className="related-company__card-status">
                          <div className="related-company__card-status-dot" />
                          <Text className="related-company__card-status-text">
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
                <div className="related-company__card-details-content">
                  {/* Location */}
                  {(company?.city?.city_name || company?.country?.name) && (
                    <div className="related-company__card-detail-item">
                      <div className="related-company__card-detail-icon">
                        <MdLocationOn />
                      </div>
                      <div>
                        <Text className="related-company__card-detail-text">
                          {`${company?.city?.city_name || ""} ${
                            company?.country?.name || ""
                          }`.trim() || "Location not specified"}
                        </Text>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {company?.item_phone && (
                    <div className="related-company__card-detail-item">
                      <div className="related-company__card-detail-icon">
                        <HiPhone />
                      </div>
                      <div>
                        <Text className="related-company__card-detail-text">
                          {company.item_phone}
                        </Text>
                      </div>
                    </div>
                  )}

                  {/* Description Preview */}
                  {company?.item_description && (
                    <div>
                      <Divider style={{ margin: "16px 0 12px" }} />
                      <Text
                        type="secondary"
                        className="related-company__card-description"
                      >
                        {company.item_description.length > 120
                          ? `${company.item_description.substring(0, 120)}...`
                          : company.item_description}
                      </Text>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="related-company__card-view-button">
                    <Text className="related-company__card-view-button-text">
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
