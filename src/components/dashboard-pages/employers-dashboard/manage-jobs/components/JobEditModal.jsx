import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  notification,
  Divider,
  Row,
  Col,
  Switch,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Country, State } from "country-state-city";
import { useGetJobCategoryData } from "@/queries/job.category.query";
import { useGetContractTypeData } from "@/queries/get.contract.type";
import { useGetEducationLevelData } from "@/queries/get.education.level";
import { useAuthStore } from "@/auth/auth.store";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const { Option } = Select;

const JobEditModal = ({ visible, job, onClose }) => {
  const { token } = useAuthStore(); // توکن را از zustand می‌گیریم

  const queryClient = useQueryClient();

  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { data } = useGetJobCategoryData();
  const { data: contractType } = useGetContractTypeData();
  const filteredcontract = contractType?.data ? [contractType?.data[0]] : [];
  const { data: educationLevel } = useGetEducationLevelData();
  const filterededuction = educationLevel ? [educationLevel[0]] : [];

  const [form] = Form.useForm();

  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        ...job,
        post_date: dayjs(job.post_date),
        closing_date: dayjs(job.closing_date),
      });
    }
  }, [job]);

  const { mutate: updateJob, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        `${BASE_IMAGE_URL}/api/employer/employer_post_jobs/${job.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status?.toLowerCase().includes("success")) {
        return response.data;
      } else {
        throw new Error("Job update failed");
      }
    },

    onSuccess: () => {
      notification.success({ message: "Job updated successfully!" });
      queryClient.invalidateQueries(["jobs"]);
      onClose();
    },

    onError: (error) => {
      notification.error({ message: error.message || "Failed to update job" });
    },
  });

  const onFinish = (values) => {
    updateJob({
      ...values,
      post_date: values.post_date
        ? values.post_date.format("YYYY-MM-DD")
        : null,
      closing_date: values.closing_date
        ? values.closing_date.format("YYYY-MM-DD")
        : null,
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    const stateList = State.getStatesOfCountry(value);
    setStates(stateList);
  };

  return (
    <Modal
      title={<div style={{ textAlign: "center" }}>Update PostJob</div>}
      width={1000}
      footer={null}
      maskClosable={false}
      open={visible}
      onCancel={onClose}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Divider> General Job Information:</Divider>
        <Row gutter={16}>
          <Form.Item name="company_id" hidden>
            <Input />
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name="job_title"
              label="Job Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="reference"
              label="Reference"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
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
                mode="multiple" // ← multi-select mode
                placeholder="Select categories"
                options={data?.data?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="job_type"
              label="Job Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="full_time">Full Time</Option>
                <Option value="part_time">Part Time</Option>
                <Option value="freelance">Free Lance</Option>
                <Option value="remote">Remote</Option>
                <Option value="internship">Internship</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="gender" label="Gender">
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="any">any</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="number_Of_vacancy"
              label="Number of Vacancy"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="post_date"
          label="Post Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="closing_date"
          label="Closing Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Divider> Job Description & Requirements:</Divider>
        <Form.Item
          name="job_description"
          label="Job Description"
          rules={[{ required: true, message: "Please enter Job Description" }]}
        >
          <ReactQuill
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
                placeholder="Select a Eduction Level"
                options={filterededuction.map((eduction) => ({
                  value: eduction?.id,
                  label: eduction?.education_level,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="experiance" label="Experience (in years)">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider>Contract Details: </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contract_type_id"
              label="Contract Type"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a Contract Type"
                options={filteredcontract.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="contract_duration" label="Contract Duration">
              <Input />
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
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="probation_period"
              label="Probation Period (in months)"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider>Salary & Benefits:</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="salary_range" label="Salary Range">
              <Input placeholder="e.g. $500 - $1000" />
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
                placeholder="Select a country"
                onChange={handleCountryChange}
                options={Country.getAllCountries().map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="provinces"
              label="Province"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select State">
                {states.map((state) => (
                  <Select.Option key={state.isoCode} value={state.name}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider>Application Submission:</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="apply_online_link" label="Apply Online Link">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="submission_email"
              label="Submission Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <Form.Item name="submission_guideline" label="Submission Guideline">
            <ReactQuill
              theme="snow"
              style={{ height: "150px", marginBottom: "50px" }}
            />
          </Form.Item>
        </Col>
        <Divider>Internal Contact Info & Job Status:</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="job_status"
              label="Job Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
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
              <Select>
                <Option value="online">Apply Online</Option>
                <Option value="submission_email">
                  Submission Guideline + Submission Email
                </Option>
                <Option value="external_link">External Link</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Update Job
              </Button>
              <Button onClick={handleModalCancel}>Cancel</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

JobEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
};

export default JobEditModal;
