import * as Yup from "yup";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

export const employerValidationSchema = Yup.object().shape({
  photo: Yup.mixed()
    .required("Profile photo is required")
    .test(
      "fileSize",
      "Profile photo must be less than 2MB",
      (value) => value && value.size <= FILE_SIZE_LIMIT
    )
    .test(
      "fileType",
      "Unsupported profile photo format. Only images are allowed.",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          value.type
        )
    ),

  company_photo: Yup.mixed()
    .required("Company logo is required")
    .test(
      "fileSize",
      "Company logo must be less than 2MB",
      (value) => value && value.size <= FILE_SIZE_LIMIT
    )
    .test(
      "fileType",
      "Unsupported company logo format. Only images are allowed.",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          value.type
        )
    ),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
