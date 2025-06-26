import { useGettermsData } from "@/queries/termsCondition";
import { Skeleton } from "antd";

const TermsText = () => {
  const { data, isLoading } = useGettermsData();

  if (isLoading) return <Skeleton active paragraph={{ rows: 3 }} />;

  return (
    <div style={{ padding: "20px" }}>
      <center>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.terms || "<p>No terms available.</p>",
          }}
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        />
      </center>
    </div>
  );
};

export default TermsText;
