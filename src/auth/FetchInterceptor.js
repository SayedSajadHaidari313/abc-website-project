import { notification } from "antd";
import axios from "axios";
import { logout, useAuthStore } from "./auth.store";

const unauthorizedCode = [401, 403];
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Correct way to access environment variables in Vite
  params: {},
  timeout: 60000,
});

notification.config({
  placement: "topRight", // Choose a suitable placement
  rtl: false, // Set RTL to true for right-to-left layout
});

service.interceptors.request.use((request) => {
  if (!request.headers) {
    request.headers = {};
  }
  const token = useAuthStore.getState().token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a network error (no response from server)
    if (!error.response) {
      // Don't show notification for network errors to avoid empty/bad notifications
      console.warn("Network error detected:", error.message);
      return Promise.reject(error);
    }

    let notificationParam = {
      message: "",
      description: "",
    };

    if (error?.response?.status) {
      switch (error.response.status) {
        case 401:
          notificationParam.message = "Login error";
          notificationParam.description = "The email or password is incorrect";
          localStorage.removeItem("AUTH_TOKEN");
          logout();
          break;
        case 403:
          notificationParam.message = "Unauthorized access";
          notificationParam.description =
            error.response.data.message ||
            "You do not have permission to access this section";
          break;
        case 422: {
          notificationParam.message = "Data entry error";
          const errors = error.response.data.errors;
          const descriptions = Object.keys(errors)
            .map((key) => {
              if (errors[key].includes("The email has already been taken.")) {
                return "This email has already been registered.";
              }
              if (errors[key].includes("The phone has already been taken.")) {
                return "This phone number has already been registered.";
              }
              
            })
            .filter(Boolean)
            .join("\n");
          notificationParam.description = descriptions || "Data entry error";
          break;
        }
        case 404:
          notificationParam.message = "Not found";
          break;
        case 500:
          notificationParam.message = "Internal server error";
          break;
        case 508:
          notificationParam.message = "Timeout";
          break;
        case 409:
          notificationParam.message = "Insufficient Balance";
          notificationParam.description =
            error.response.data.message ||
            "You don't have enough balance to post a job.";
          break;
        default:
          notificationParam.message =
            error.response.data.message || "An unexpected error occurred";
      }
    }

    // Only show notification if we have a meaningful message
    if (notificationParam.message) {
      notification.error(notificationParam);
    }

    return Promise.reject(error?.response);
  }
);

export async function getRequest(url, params, header) {
  return service.get(url, { params }, header).then((response) => response.data);
}

export async function postRequest(url, params, headers) {
  return service.post(url, params, headers).then((response) => response?.data);
}
export async function putRequest(url, params, headers) {
  return service.put(url, params, headers).then((response) => response?.data);
}
export async function updateRequest(url, params, header) {
  return service.put(url, params, header).then((response) => response?.data);
}
export async function patchRequest(url, params, header) {
  return service.patch(url, params, header).then((response) => response?.data);
}

export async function deleteRequest(url, params) {
  return await service.delete(url, params).then((response) => response.data);
}
export default service;
