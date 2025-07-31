import FormInfoBox from "./FormInfoBox";
import ProfileCompletionCard from "./ProfileCompletionCard";

const index = () => {
  return (
    <>
      <div className="widget-content">
        {/* Profile Completion Card */}
        <ProfileCompletionCard />

        {/* User and Company Information */}
        <FormInfoBox />
      </div>
    </>
  );
};

export default index;
