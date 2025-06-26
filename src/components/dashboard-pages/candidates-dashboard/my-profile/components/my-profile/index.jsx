import FormInfoBox from "./FormInfoBox";
import ProfileCompletionCard from "./ProfileCompletionCard";

const index = () => {
  return (
    <div className="widget-content">
      {/* <LogoUpload /> */}
      {/* End logo and cover photo components */}
    <ProfileCompletionCard/>
      <FormInfoBox />
      {/* compnay info box */}
    </div>
  );
};

export default index;
