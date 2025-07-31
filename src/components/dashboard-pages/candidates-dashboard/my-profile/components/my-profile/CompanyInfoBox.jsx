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
  Select,
  Spin,
} from "antd";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  BankOutlined,
  PhoneOutlined,
  GlobalOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { useGetAuthUserData } from "@/queries/user.query";
import {
  useUpdateItems,
  usePostItemsCreate,
} from "@/queries/website.query/items.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";
import { useGetAllCitiesData } from "@/queries/website.query/cities.query";
import { useGetAllStatesData } from "@/queries/website.query/states.query";
import { useGetAllCountryData } from "@/queries/website.query/country.query";

const { Text, Title } = Typography;
const { TextArea } = Input;

// Initial form state
const initialFormState = {
  id: null,
  item_title: "",
  item_description: "",
  item_phone: "",
  item_website: "",
  item_image: null,
  category_id: null,
  country_id: null,
  city_id: null,
  state_id: null,
  item_lat: null,
  item_lng: null,
  item_social_facebook: null,
};

const CompanyInfoBox = () => {
  // State management
  const [companyFormValues, setCompanyFormValues] = useState(initialFormState);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const formRef = useRef();

  // Data fetching hooks
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUserData,
  } = useGetAuthUserData();

  const { mutate: mutateCompany, isPending: isUpdating } = useUpdateItems();
  const { mutate: createCompany, isPending: isCreating } = usePostItemsCreate();

  const { data: cities, isLoading: citiesLoading } = useGetAllCitiesData();
  const { data: states, isLoading: statesLoading } = useGetAllStatesData();
  const { data: countries, isLoading: countriesLoading } =
    useGetAllCountryData();
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoryData();

  // Process data
  const dataCities = cities?.data || [];
  const dataStates = states?.data || [];
  const dataCountries = countries?.data || [];
  const dataCategories = categories?.data || [];
  const parentCategories = dataCategories?.filter(
    (item) => item.category_parent_id === null
  );

  // Support both array and object user data
  const userObj = userData?.user || userData?.items || {};
  const company = userObj?.items?.[0];

  // Check if company exists
  const hasCompany = company && userObj?.items?.length > 0;

  // Loading state
  const isLoading =
    userLoading ||
    citiesLoading ||
    statesLoading ||
    countriesLoading ||
    categoriesLoading;
  const isSubmitting = isUpdating || isCreating;

  // Initialize form data when user data changes
  useEffect(() => {
    if (hasCompany) {
      setCompanyFormValues({
        id: company.id,
        item_title: company.item_title || "",
        item_description: company.item_description || "",
        item_phone: company.item_phone || "",
        item_website: company.item_website || "",
        item_social_facebook: company.item_social_facebook || "",
        country_id: company.country_id ? Number(company.country_id) : null,
        category_id: company.category_id ? Number(company.category_id) : null,
        city_id: company.city_id ? Number(company.city_id) : null,
        state_id: company.state_id ? Number(company.state_id) : null,
        item_lat: company.item_lat || null,
        item_lng: company.item_lng || null,
        item_image: null,
      });
    } else {
      setCompanyFormValues(initialFormState);
    }
  }, [hasCompany, company]);

  // File upload handler
  const handleFileChange = useCallback(({ fileList: newFileList }) => {
    setFileList(newFileList);
  }, []);

  // Form submission
  const handleCompanySubmit = useCallback(
    async (values) => {
      // Validation
      if (!values.item_title?.trim()) {
        message.error("Company name is required");
        return;
      }

      if (!values.category_id) {
        message.error("Please select a category");
        return;
      }

      if (!values.country_id) {
        message.error("Please select a country");
        return;
      }

      setLoading(true);

      try {
        const formData = new FormData();

        // Add all form fields
        Object.keys(values).forEach((key) => {
          const value = values[key];
          if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
          }
        });

        // Add company ID for updates
        if (hasCompany && companyFormValues.id) {
          formData.append("id", companyFormValues.id);
        }

        // Add method for update
        if (hasCompany) {
          formData.append("_method", "PUT");
        }

        const mutationOptions = {
          onSuccess: () => {
            notification.success({
              message: "Success!",
              description: hasCompany
                ? "Company updated successfully!"
                : "Company created successfully!",
            });
            setIsEditingCompany(false);
            setFileList([]);
            refetchUserData();
          },
          onError: (error) => {
            notification.error({
              message: hasCompany ? "Update Failed!" : "Creation Failed!",
              description:
                error?.response?.data?.message || "An error occurred",
            });
            console.error("Company operation error:", error);
          },
          onSettled: () => {
            setLoading(false);
          },
        };

        if (hasCompany) {
          mutateCompany(formData, mutationOptions);
        } else {
          createCompany(formData, mutationOptions);
        }
      } catch (error) {
        message.error("An unexpected error occurred");
        setLoading(false);
        console.error("Form submission error:", error);
      }
    },
    [
      hasCompany,
      companyFormValues.id,
      mutateCompany,
      createCompany,
      refetchUserData,
    ]
  );

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    setIsEditingCompany(false);
    setFileList([]);
    // Reset form to original values
    if (hasCompany) {
      const resetValues = {
        id: company.id,
        item_title: company.item_title || "",
        item_description: company.item_description || "",
        item_phone: company.item_phone || "",
        item_website: company.item_website || "",
        item_social_facebook: company.item_social_facebook || "",
        country_id: company.country_id ? Number(company.country_id) : null,
        category_id: company.category_id ? Number(company.category_id) : null,
        city_id: company.city_id ? Number(company.city_id) : null,
        state_id: company.state_id ? Number(company.state_id) : null,
        item_lat: company.item_lat || null,
        item_lng: company.item_lng || null,
        item_image: null,
      };
      setCompanyFormValues(resetValues);
      formRef.current?.setFieldsValue(resetValues);
    } else {
      setCompanyFormValues(initialFormState);
      formRef.current?.setFieldsValue(initialFormState);
    }
  }, [hasCompany, company]);

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading company data...</div>
        </div>
      </Card>
    );
  }

  // Error state
  if (userError) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          <div>Error loading company data</div>
          <Button
            type="primary"
            onClick={() => refetchUserData()}
            style={{ marginTop: 8 }}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  // Render company information
  const renderCompanyInfo = () => (
    <div>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={6} lg={4}>
          <Avatar
            size={100}
            src={
              company?.item_image ? (
                `${BASE_IMAGE_URL}/${company.item_image}`
              ) : (
                <BankOutlined />
              )
            }
            style={{ display: "block", margin: "0 auto" }}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} flex="1">
          <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
            {company?.item_title || "No company name"}
          </Title>
          {company?.item_phone && (
            <div style={{ marginTop: 4, marginBottom: 4 }}>
              <Text type="secondary">
                <PhoneOutlined /> {company.item_phone}
              </Text>
            </div>
          )}
          {company?.item_website && (
            <div style={{ marginTop: 4, marginBottom: 4 }}>
              <Text type="secondary">
                <GlobalOutlined /> {company.item_website}
              </Text>
            </div>
          )}
          {company?.item_description && (
            <div style={{ marginTop: 8 }}>
              <Text>{company.item_description}</Text>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );

  // Render form
  const renderCompanyForm = () => (
    <Form
      ref={formRef}
      layout="vertical"
      initialValues={companyFormValues}
      onFinish={handleCompanySubmit}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            name="item_image"
            label="Company Logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              size="large"
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
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
          <Form.Item
            name="item_title"
            label="Company Name"
            required
            rules={[{ required: true, message: "Company name is required" }]}
          >
            <Input size="large" placeholder="Enter company name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="category_id"
            label="Category"
            required
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              size="large"
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={parentCategories?.map((cat) => ({
                label: cat.category_name,
                value: cat.id,
              }))}
              placeholder="Select a category"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="country_id"
            label="Country"
            required
            rules={[{ required: true, message: "Please select your country" }]}
          >
            <Select
              size="large"
              options={dataCountries?.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
              placeholder="Select a country"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="city_id" label="City">
            <Select
              size="large"
              options={dataCities?.map((c) => ({
                label: c.city_name,
                value: c.id,
              }))}
              placeholder="Select a city"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="state_id" label="State">
            <Select
              size="large"
              options={dataStates?.map((s) => ({
                label: s.state_name,
                value: s.id,
              }))}
              placeholder="Select a state"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="item_phone" label="Phone">
            <Input size="large" placeholder="Enter phone number" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="item_website" label="Website">
            <Input size="large" placeholder="Enter website URL" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="item_social_facebook"
            label="Facebook"
            normalize={(value) => value && value.trim()}
          >
            <Input size="large" placeholder="Enter Facebook URL" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="item_description" label="Description">
            <TextArea rows={4} placeholder="Enter company description" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={isSubmitting}
            style={{ marginRight: 8 }}
          >
            {hasCompany ? "Update Company" : "Create Company"}
          </Button>
          <Button size="large" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );

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
          <BankOutlined />
          <span>Company Information</span>
        </div>
      }
      extra={
        <Button
          type={isEditingCompany ? "default" : "primary"}
          icon={isEditingCompany ? <CloseOutlined /> : <EditOutlined />}
          onClick={() => setIsEditingCompany(!isEditingCompany)}
        >
          {isEditingCompany ? "Cancel" : hasCompany ? "Edit" : "Add Company"}
        </Button>
      }
      style={{ marginBottom: 24 }}
      className="profile-card"
    >
      {!isEditingCompany ? renderCompanyInfo() : renderCompanyForm()}
    </Card>
  );
};

export default CompanyInfoBox;
