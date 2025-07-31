import {
  notification,
  message,
  Card,
  Avatar,
  Button,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { useGetAuthUserData } from "@/queries/user.query";
import { useUpdateUser } from "@/queries/website.query/user.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const { Text, Title } = Typography;
const { TextArea } = Input;

const PersonalInfoBox = () => {
  const { data: userData, isLoading, error } = useGetAuthUserData();
  const { mutate } = useUpdateUser();

  // Support both array and object user data
  const userObj =
    userData?.user ||
    userData?.items || // If items is an array, take the first user
    {};

  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    email: "",
    user_about: "",
    user_image: null,
    role_id: 3,
    user_prefer_country_id: 1,
  });

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (userObj && userObj.id) {
      setFormValues({
        id: userObj?.id || "",
        name: userObj?.name || "",
        email: userObj?.email || "",
        user_about: userObj?.user_about || "",
        user_image: null,
        role_id: userObj?.role_id || 3,
        user_prefer_country_id: userObj?.user_prefer_country_id || 1,
      });
    }
  }, [userObj]);

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div className="route-loading-spinner">
            <div className="route-loading-spinner__spinner" />
          </div>
        </div>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          Error loading user data. Please try again.
        </div>
      </Card>
    );
  }

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", formValues.id);
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("user_about", formValues.user_about);
      formData.append("role_id", formValues.role_id);
      formData.append(
        "user_prefer_country_id",
        formValues.user_prefer_country_id
      );
      if (formValues.user_image)
        formData.append("user_image", formValues.user_image);
      formData.append("_method", "PUT");

      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: "Success!",
            description: "Profile Updated successfully!",
          });
          setIsEditingUser(false);
        },
        onError: (error) => {
          if (error.response && error.response.data) {
            notification.error({ message: "Update Failed!" });
            console.error(error);
          }
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      message.error("Please fill all required inputs");
    }
  };

  return (
    <Card
      title={
        <div
          style={{
            color: "#00989a",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <UserOutlined />
          <span>Personal Information</span>
        </div>
      }
      extra={
        <Button
          type={isEditingUser ? "default" : "primary"}
          icon={isEditingUser ? <CloseOutlined /> : <EditOutlined />}
          onClick={() => setIsEditingUser(!isEditingUser)}
        >
          {isEditingUser ? "Cancel" : "Edit"}
        </Button>
      }
      style={{ marginBottom: 24 }}
      className="profile-card"
    >
      {!isEditingUser ? (
        <div>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={24} md={12} lg={4}>
              <Avatar
                size={80}
                src={
                  userData?.user?.user_image ? (
                    `${BASE_IMAGE_URL}/${userData?.user?.user_image}`
                  ) : (
                    <UserOutlined />
                  )
                }
                style={{ display: "block", margin: "0 auto" }}
              />
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} flex="1">
              <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
                {userObj.name}
              </Title>
              <Text
                type="secondary"
                style={{ display: "block", marginBottom: 4 }}
              >
                <MailOutlined /> {userObj.email}
              </Text>
              {userObj.user_about && (
                <div style={{ marginTop: 8 }}>
                  <Text>{userObj.user_about}</Text>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <form onSubmit={handleUserSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="user_image"
                label="Profile Photo"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  size="large"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) =>
                    setFileList(newFileList)
                  }
                  beforeUpload={() => false}
                  accept="image/*"
                  maxCount={1}
                >
                  {fileList.length < 1 && (
                    <div>
                      <InboxOutlined />
                      <div style={{ marginTop: 8 }}>Upload Image</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Full Name" required>
                <Input
                  size="large"
                  name="name"
                  value={formValues.name}
                  onChange={handleUserChange}
                  required
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Email" required>
                <Input
                  size="large"
                  name="email"
                  value={formValues.email}
                  onChange={handleUserChange}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="About">
                <TextArea
                  name="user_about"
                  value={formValues.user_about}
                  onChange={handleUserChange}
                  rows={4}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                style={{ marginRight: 8 }}
              >
                Save Changes
              </Button>
              <Button size="large" onClick={() => setIsEditingUser(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Card>
  );
};

export default PersonalInfoBox;
