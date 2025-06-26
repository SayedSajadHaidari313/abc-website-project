import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { usePostInsightVoteCreate } from "@/queries/insight.vote.query";
import { useAuthStore } from "@/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { useGetVoterData } from "@/queries/useCheckInsightVote.query";
import "bootstrap-icons/font/bootstrap-icons.css";

const VoteButton = ({ insightId, initialVotes = 0 }) => {
  const navigate = useNavigate();
  const { user: userAuth } = useAuthStore();

  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(initialVotes);

  const isLoggedIn = !!userAuth;
  const isEmployer = userAuth?.role === "EMPLOYER";
  const isJobSeeker = userAuth?.role === "JOB_SEEKER";

  const { mutate } = usePostInsightVoteCreate();

  const { data: voteStatus, isLoading, refetch } = useGetVoterData(insightId, {
    enabled: isLoggedIn && isJobSeeker && !!insightId,
  });

  useEffect(() => {
    if (voteStatus?.voted !== undefined) {
      setVoted(voteStatus.voted);
      setVoteCount(voteStatus.likes_count);
    }
  }, [voteStatus]);

  const handleVote = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isEmployer) return; // Prevent employer from voting

    const voteAction = voted ? "remove" : "add";

    mutate(
      {
        insight_id: insightId,
        user_id: userAuth.id,
        action: voteAction,
      },
      {
        onSuccess: () => {
          setVoted(!voted);
          setVoteCount((prev) => (voted ? prev - 1 : prev + 1));
          refetch();
        },
      }
    );
  };

  const tooltipText = isEmployer
    ? "Only jobseekers can vote"
    : !isLoggedIn
    ? "Login to vote"
    : voted
    ? "Unvote"
    : "Vote";

  return (
    <Tooltip title={tooltipText}>
      <Button
        type="text"
        disabled={isEmployer}
        icon={
          <i
            className={`bi ${voted ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}
            style={{
              color: voted ? "#1890ff" : "black",
              fontSize: 18,
            }}
          />
        }
        onClick={handleVote}
      >
        {voteCount}
      </Button>
    </Tooltip>
  );
};

export default VoteButton;
