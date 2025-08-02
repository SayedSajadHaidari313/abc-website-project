import { Alert, Skeleton, Typography, Card } from "antd";
import PropTypes from "prop-types";
import { useGetRfpById } from "@/queries/website.query/rfps.query";
import { HiDocumentText } from "react-icons/hi2";

const { Title, Paragraph } = Typography;

const JobDetailsDescriptions = ({ rfpId }) => {
  const { data, isLoading, isError } = useGetRfpById(rfpId);

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
        style={{ borderRadius: "8px" }}
      />
    );

  const rfp = data?.data;

  if (!rfp) return null;

  return (
    <div style={{ marginBottom: "32px" }}>
      <Title level={4} style={{ marginBottom: "16px", color: "#1a1a1a" }}>
        <HiDocumentText style={{ marginRight: "8px" }} />
        RFP Description
      </Title>

      <Card
        style={{
          borderRadius: "12px",
          border: "1px solid #f0f0f0",
          backgroundColor: "#fafafa",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <div
          style={{
            lineHeight: "1.6",
            color: "#333",
            fontSize: "16px",
          }}
          dangerouslySetInnerHTML={{
            __html: rfp.description || "No description available.",
          }}
        />
      </Card>
    </div>
  );
};

JobDetailsDescriptions.propTypes = {
  rfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default JobDetailsDescriptions;
