import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { usePostFollowCreate } from "@/queries/follow.query";
import { useGetAuthUserData, useGetUserData } from "@/queries/user.query";
import { Skeleton, Empty } from "antd";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

function YourNetwork() {
  const navigate = useNavigate();
  const { data: userAuth } = useGetAuthUserData();

  const { mutate } = usePostFollowCreate();
  const { data, isLoading: usersLoading } = useGetUserData();
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Filtered users based on the role "JOB_SEEKER"
  const filteredData =
    data?.data?.filter((user) => user?.role === "JOB_SEEKER") || [];

  // Filter out the users that are followed by the authenticated user
  useEffect(() => {
    if (userAuth && userAuth?.user?.followings) {
      setFollowedUsers(
        userAuth?.user?.followings.map((follow) => follow.following_id)
      );
    }
  }, [userAuth]);

  const handleFollow = (targetUserId) => {
    if (!userAuth) {
      navigate("/login");
      return;
    }

    const isFollowed = followedUsers.includes(targetUserId);
    const followAction = isFollowed ? "unfollow" : "follow";

    setLoadingUserId(targetUserId);
    mutate(
      {
        follower_id: userAuth?.user?.id,
        following_id: targetUserId,
        action: followAction,
      },
      {
        onSuccess: () => {
          const updatedList = isFollowed
            ? followedUsers.filter((id) => id !== targetUserId)
            : [...followedUsers, targetUserId];
          setFollowedUsers(updatedList);
          setLoadingUserId(null);
        },
        onError: () => {
          setLoadingUserId(null);
        },
      }
    );
  };

  if (usersLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  // If the user has not followed anyone
  if (followedUsers.length === 0) {
    return (
      <div>
        <Empty description="You haven't followed anyone yet." />
      </div>
    );
  }

  return (
    <div className="row">
      {filteredData
        ?.filter((user) => followedUsers.includes(user.id)) // Only show followed users
        ?.map((user) => {
          const isFollowed = followedUsers.includes(user.id);
          return (
            <div className="col-6" key={user.id}>
              <div className="bg-white p-4 rounded shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 border position-relative">
                <div className="d-flex gap-3 align-items-start">
                  <img
                    src={
                      user?.photo
                        ? `${BASE_IMAGE_URL}${user?.photo}`
                        : "/images/default-avatar.png"
                    }
                    alt="Profile"
                    className="rounded-circle border"
                    style={{
                      width: "72px",
                      height: "72px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h5 className="mb-1">
                      {user.first_name} {user.last_name}
                    </h5>
                    <p className="text-muted mb-1 small">
                      {user.jobseekerprofiles?.about || "No bio available"}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                      {user.jobseekerprofiles?.experience ||
                        "No experience info"}
                    </p>
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      <span className="badge bg-light text-dark border fw-medium">
                        {user.jobseekerprofiles?.job_category?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ms-auto" style={{ marginBlockEnd: "auto" }}>
                  <button
                    className="btn btn-dark d-flex align-items-center gap-2"
                    onClick={() => handleFollow(user.id)}
                    disabled={loadingUserId === user.id}
                  >
                    {loadingUserId === user.id ? (
                      <LoadingOutlined spin />
                    ) : (
                      <UserAddOutlined />
                    )}
                    {loadingUserId === user.id
                      ? "Loading..."
                      : isFollowed
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default YourNetwork;
