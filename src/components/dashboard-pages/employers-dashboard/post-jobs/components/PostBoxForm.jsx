import { useRef, useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  message,
  notification,
  Button,
  Select,
  Steps,
  InputNumber,
  DatePicker,
  Switch,
  Divider,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetEducationLevelData } from "@/queries/get.education.level";
import { useGetJobCategoryData } from "@/queries/job.category.query";
import {
  useGetCompanyNameData,
  usePostPostJobCreate,
} from "@/queries/employer.post.job";
import { Country, State } from "country-state-city";
import { useGetAllContractTypeData } from "@/queries/contract.type.query";

const { Step } = Steps;
const { Option } = Select;

export default function PostJobFormInline() {
  const formRef = useRef(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { mutate } = usePostPostJobCreate();
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { data: contractType } = useGetAllContractTypeData();
  const filteredcontract = contractType?.data || [];

  const { data: educationLevel } = useGetEducationLevelData();
  const { data } = useGetJobCategoryData();
  const JobCategory = data || [];

  // const [form] = Form.useForm();
  const { data: companyNameData } = useGetCompanyNameData();
  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const values = formRef.current.getFieldsValue(true);
      const formData = new FormData();

      // Add all fields to formData as in your original logic
      formData.append("job_title", values.job_title);
      formData.append("job_description", values.job_description);
      formData.append("email", values.email);
      formData.append("number_Of_vacancy", values.number_Of_vacancy);
      formData.append("reference", values.reference);
      formData.append("salary_range", values.salary_range);
      formData.append("experiance", values.experiance);
      formData.append("probation_period", values.probation_period);
      formData.append("contract_type_id", values.contract_type_id);
      formData.append("contract_duration", values.contract_duration);
      formData.append(
        "contract_extensible",
        values.contract_extensible ? "yes" : "no"
      );
      formData.append("education_level_id", values.education_level_id);
      formData.append("job_requirement", values.job_requirement);
      formData.append("submission_guideline", values.submission_guideline);
      formData.append("job_category_id", values.job_category_id);
      formData.append("apply_online_link", values.apply_online_link);
      formData.append("submission_email", values.submission_email);
      formData.append("gender", values.gender);
      formData.append("countries", values.countries);
      formData.append("provinces", values.provinces);
      formData.append("post_date", values.post_date.format("YYYY-MM-DD"));
      formData.append("closing_date", values.closing_date.format("YYYY-MM-DD"));
      formData.append("company_id", companyNameData.company_name);
      formData.append("job_type", values.job_type);
      formData.append("application_type", values.application_type);
      formData.append("job_status", values.job_status);

      mutate(formData, {
        onSuccess: () => {
          notification.success({ message: "Post Job created successfully!" });
          formRef.current.resetFields();
          setStep(0);
        },
        onError: () => {
          message.error("Something went wrong. Please try again.");
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      message.error("Please fill in all sections correctly.");
      setLoading(false);
    }
  };

  const handleCountryChange = (isoCode) => {
    setSelectedCountry(isoCode);
    const stateList = State.getStatesOfCountry(isoCode);
    setStates(stateList);
  
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.isoCode === isoCode
    );
    if (selectedCountry) {
      formRef.current.setFieldsValue({
        countries: selectedCountry.name,
      });
    }
  };

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
      <Steps current={step} style={{ marginBottom: 24 }}>
        <Step title="Post Job" />
        <Step title="Done Post Job" />
      </Steps>

      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        ref={formRef}
        initialValues={{
          status: "ACTIVE",
          company_id: companyNameData?.company_name,
          job_status: "active",
          contract_extensible: false,
        }}
      >
        {step === 0 && (
          <>
            <Divider> General Job Information:</Divider>
            <Row gutter={16}>
              <Form.Item name="company_id" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="job_status" hidden>
                <Input />
              </Form.Item>

              <Col span={12}>
                <Form.Item
                  name="job_title"
                  label="Job Title"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="job_category_id"
                  label="Job Category"
                  rules={[
                    {
                      required: true,
                      message: "Please select at least one category",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select categories"
                    options={JobCategory?.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="job_type"
                  label="Job Type"
                  rules={[{ required: true }]}
                >
                  <Select size="large">
                    <Option value="full_time">Full Time</Option>
                    <Option value="part_time">Part Time</Option>
                    <Option value="freelance">Free Lance</Option>
                    <Option value="remote">Remote</Option>
                    <Option value="internship">Internship</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="gender" label="Gender">
                  <Select size="large">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="any">any</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="number_Of_vacancy"
                  label="Number of Vacancy"
                  rules={[{ required: true }]}
                >
                  <InputNumber size="large" min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="reference" label="Reference">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="post_date"
                  label="Post Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder="Select Start Date"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="closing_date"
                  label="Closing Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder="Select Start Date"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider> Job Description & Requirements:</Divider>
            <Form.Item
              name="job_description"
              label="Job Description"
              rules={[
                { required: true, message: "Please enter Job Description" },
              ]}
            >
              <ReactQuill
                size="large"
                theme="snow"
                style={{ height: "150px", marginBottom: "50px" }}
              />
            </Form.Item>
            <Form.Item
              name="job_requirement"
              label="Job Requirements"
              rules={[
                {
                  required: true,
                  message: "Please enter job requirements",
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                style={{ height: "150px", marginBottom: "50px" }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="education_level_id"
                  label="Education Level"
                  rules={[{ required: true }]}
                >
                  <Select
                    size="large"
                    placeholder="Select a Eduction Level"
                    options={educationLevel?.map((eduction) => ({
                      value: eduction?.id,
                      label: eduction?.education_level,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="experiance" label="Experience (in years)">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {step === 1 && (
          <>
            <Divider>Contract Details: </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="contract_type_id"
                  label="Contract Type"
                  rules={[{ required: true }]}
                >
                  <Select
                    size="large"
                    placeholder="Select a Contract Type"
                    options={filteredcontract?.map((contract) => ({
                      value: contract.id,
                      label: contract.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="contract_duration" label="Contract Duration">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="contract_extensible"
                  label="Contract Extensible"
                  valuePropName="checked"
                >
                  <Switch
                    size="large"
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="probation_period"
                  label="Probation Period (in months)"
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Divider>Salary & Benefits:</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="salary_range"
                  label="Salary Range"
                >
                  <Input size="large" placeholder="e.g. $500 - $1000" />
                </Form.Item>
              </Col>
            </Row>
            <Divider>Job Location:</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="countries"
                  label="Country"
                  rules={[{ required: true }]}
                >
                  <Select
                    size="large"
                    placeholder="Select Country"
                    onChange={handleCountryChange}
                  >
                    {Country.getAllCountries().map((country) => (
                      <Select.Option
                        key={country.isoCode}
                        value={country.isoCode}  // Store full country name here
                      >
                        {country.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="provinces"
                  label="Province"
                  rules={[{ required: true }]}
                >
                  <Select size="large" placeholder="Select State">
                    {states?.map((state) => (
                      <Select.Option key={state.isoCode} value={state.name}>
                        {state?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider>Application Submission:</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="apply_online_link"
                  label="Apply Online Link"
                  rules={[
                    { required: true, message: "Please enter Website Link " },
                  ]}
                >
                  <Input size="large" placeholder="https://insightdeed.com" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="submission_email"
                  label="Submission Email"
                  rules={[{ type: "email", required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item
                name="submission_guideline"
                label="Submission Guideline"
                rules={[{ required: true }]}
              >
                <ReactQuill
                  size="large"
                  theme="snow"
                  style={{ height: "150px", marginBottom: "50px" }}
                  rules={[{ required: true }]}
                />
              </Form.Item>
            </Col>
            <Divider>Internal Contact Info & Job Status:</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ type: "email", required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="application_type"
                  label="Application Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select application type!",
                    },
                  ]}
                >
                  <Select size="large" placeholder="Select Application Type">
                    <Option value="online">Apply Online</Option>
                    <Option value="submission_email">
                      Submission Guideline + Submission Email
                    </Option>
                    <Option value="external_link">External Link</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Form.Item>
          {step > 0 && (
            <Button
              size="large"
              style={{ marginRight: 8 }}
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          {step < 1 ? (
            <Button
              size="large"
              type="primary"
              onClick={async () => {
                try {
                  await formRef.current.validateFields();
                  setStep(step + 1);
                } catch {
                  message.error("Please complete required fields.");
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
