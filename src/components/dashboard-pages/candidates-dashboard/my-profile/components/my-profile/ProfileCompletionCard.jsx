// import React from "react";
// import { useGetAuthUserData } from "@/queries/user.query";
// import { Button, Card, Progress } from "antd";

// const ProfileCompletionCard = () => {
//   const { data: userData } = useGetAuthUserData();
//   const user = userData?.user || {};

//   // Function to calculate profile completeness percentage
//   const calculateCompletion = () => {
//     let completedFields = 0;
//     const totalFields = 10; // first_name, last_name, email, password

//     if (user.first_name && user.first_name.trim() !== "") completedFields++;
//     if (user.last_name && user.last_name.trim() !== "") completedFields++;
//     if (user.email && user.email.trim() !== "") completedFields++;
//     if (user?.phone && user?.phone.trim() !== "") completedFields++;
//     if (user?.photo && user?.photo.trim() !== "") completedFields++;
//     if (user?.jobseekerprofiles?.experience.trim() !== "") completedFields++;
//     if (user?.jobseekerprofiles?.gender.trim() !== "") completedFields++;
//     if (user?.jobseekerprofiles?.about.trim() !== "") completedFields++;
//     if (user?.jobseekerprofiles?.job_category?.name.trim() !== "")
//       completedFields++;
//     if (user?.jobseekerprofiles?.cv?.trim() !== "") completedFields++;

//     return Math.round((completedFields / totalFields) * 100);
//   };

//   const completion = calculateCompletion();


//   return (
//     <Card style={{ marginBottom: 24 }}>
//       <Card.Meta
//         title={`Your Profile is ${completion}% Complete`}
//         description={
//           <>
//             <Progress percent={completion} />
//             <p style={{ marginTop: 16, fontSize: 14 }}>
//               Please complete your profile to get the best job matches.
//             </p>
//           </>
//         }
//       />
//     </Card>
//   );
// };

// export default ProfileCompletionCard;

import React from "react";
import { useGetAuthUserData } from "@/queries/user.query";
import { Button, Card, Progress, Tag, Typography } from "antd";

const { Text } = Typography;

const ProfileCompletionCard = () => {
  const { data: userData } = useGetAuthUserData();
  const user = userData?.user || {};

  // Define fields to check with labels and their values
  const fieldsToCheck = [
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Profile Photo", value: user.photo },
    { label: "Experience", value: user.jobseekerprofiles?.experience },
    { label: "Gender", value: user.jobseekerprofiles?.gender },
    { label: "About Me", value: user.jobseekerprofiles?.about },
    {
      label: "Job Category",
      value: user.jobseekerprofiles?.job_category?.name,
    },
    { label: "CV", value: user.jobseekerprofiles?.cv },
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
