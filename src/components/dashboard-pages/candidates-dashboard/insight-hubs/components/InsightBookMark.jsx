import { useAuthStore } from "@/auth/auth.store";
import { useCheckBookmarkStatus } from "@/queries/bookmark.query";
import { usePostInsightBookMarkCreate } from "@/queries/insight.book.mark.query";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import "bootstrap-icons/font/bootstrap-icons.css";

const BookmarkButton = ({ insightId }) => {
  const { user: userAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isLoggedIn = !!userAuth;
  const isEmployer = userAuth?.role === "EMPLOYER";
  const isJobSeeker = userAuth?.role === "JOB_SEEKER";

  const { data: bookmarkStatus, isLoading } = useCheckBookmarkStatus(insightId, {
    enabled: isLoggedIn && isJobSeeker && !!insightId,
  });

  const isBookmarked = bookmarkStatus?.bookmarked ?? false;

  const { mutate } = usePostInsightBookMarkCreate();

  const toggleBookmark = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isEmployer) return; // Do nothing for employers

    mutate(
      { insight_id: insightId },
      {
        onSuccess: () => {
          queryClient.setQueryData(["bookmark-status", insightId], {
            bookmarked: !isBookmarked,
          });
        },
        onError: (error) => {
          console.error("Bookmark failed", error);
        },
      }
    );
  };

  if (isLoading) {
    return <Button type="text" loading />;
  }

  const tooltipText = isEmployer
    ? "Employers cannot bookmark"
    : !isLoggedIn
    ? "Login to bookmark"
    : isBookmarked
    ? "Remove Bookmark"
    : "Add Bookmark";

  return (
    <Tooltip title={tooltipText}>
      <Button
        type="text"
        disabled={isEmployer}
        icon={
          <i
            className={isBookmarked ? "bi-bookmark-fill" : "bi-bookmark"}
            style={{
              fontSize: 20,
              color: isBookmarked ? "#722ed1" : "#444",
            }}
          />
        }
        onClick={toggleBookmark}
      />
    </Tooltip>
  );
};

export default BookmarkButton;
