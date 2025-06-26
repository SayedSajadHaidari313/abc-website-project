import { useGetAuthUserData } from "@/queries/user.query";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons"; // Replace with another icon if needed
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

function Profile() {
  const { data: userData } = useGetAuthUserData();
  const navigate = useNavigate();

  const fullName = `${userData?.user?.first_name || ""} ${
    userData?.user?.last_name || ""
  }`;

  return (
    <>
      {/* --- Profile Header --- */}
      <div className="col-12">
        <div className="user-profile-header bg-white p-5 rounded d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 shadow-sm position-relative">
          <div className="d-flex align-items-center gap-3">
            <img
              src={
                userData?.user?.photo
                  ? `${BASE_IMAGE_URL}${userData?.user?.photo}`
                  : "/images/default-avatar.png"
              }
              alt="Profile"
              className="rounded-circle border"
              style={{ width: "90px", height: "90px", objectFit: "cover" }}
            />
            <div>
              <h3 className="mb-1">{fullName}</h3>
              <p className="text-muted mb-1">
                {userData?.user?.phone || "____"}
              </p>
              <p className="text-muted mb-1">
                {userData?.user?.email || "____"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div>
            <button
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              onClick={() => navigate("/candidate/my-profile")}
            >
              <EditOutlined size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
