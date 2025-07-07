import React from "react";
import { Button, Card, Progress, Tag, Typography } from "antd";
import { useGetAuthUserData } from "@/queries/auth.query";

const { Text } = Typography;

const ProfileCompletionCard = () => {
  const { data: userData } = useGetAuthUserData();
  const user = userData?.user || {};

  // Define fields to check with labels and their values
  const fieldsToCheck = [
    { label: "Full Name", value: user.name },
    { label: "Bio", value: user.user_about },
    { label: "Email", value: user.email },
    { label: "Profile Photo", value: user.user_image },
  ];

  // Calculate completion percentage and collect missing fields
  const calculateCompletion = () => {
    let completedFields = 0;
    const missingFields = [];

    fieldsToCheck.forEach(({ label, value }) => {
      if (value && value.trim() !== "") {
        completedFields++;
      } else {
        missingFields.push(label);
      }
    });

    const completionPercent = Math.round(
      (completedFields / fieldsToCheck.length) * 100
    );

    return { completionPercent, missingFields };
  };

  const { completionPercent, missingFields } = calculateCompletion();

  // Do not show card if profile is fully complete
  // if (completionPercent === 100) return null;

  return (
    <Card style={{ marginBottom: 24 }}>
      <Card.Meta
        title={`Your Profile is ${completionPercent}% Complete`}
        description={
          <>
            <Progress percent={completionPercent} />
            <p style={{ marginTop: 16, fontSize: 14 }}>
              Please complete your profile to get the best job matches.
            </p>

            {missingFields.length > 0 && (
              <>
                <Text strong>Missing or incomplete fields:</Text>
                <div style={{ marginTop: 8 }}>
                  {missingFields.map((field) => (
                    <Tag color="red" key={field} style={{ marginBottom: 8 }}>
                      {field}
                    </Tag>
                  ))}
                </div>
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

export default ProfileCompletionCard;
