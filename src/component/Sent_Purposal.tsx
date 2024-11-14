"use client";
import {
  Button,
  Input,
  Upload,
  Row,
  Col,
  Card,
  List,
  Avatar,
  Form,
  Tabs,
  Badge,
  Modal,
  Radio,
  Select,
  Checkbox,
  Layout,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { UploadOutlined, LeftOutlined, InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Dragger from "antd/es/upload/Dragger";
import api from "@/utils/api";
import validation, { capFirst, replaceUnderScore } from "@/utils/validation";
import EmailEditor from "./EmailEditor";
import EmailPreview from "./EmailPreview";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import Recent_card from "./common/Recent_card";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const tabs = [
  {
    key: "email",
    label: <span>Email</span>,
  },
  {
    key: "sms",
    label: <span>SMS</span>,
  },
];
const Sent_Purposal = ({ data1 }: any) => {
  console.log(data1, "data1");
  const [editorValue, setEditorValue] = useState<string>("");

  // Handle change in editor
  useEffect(() => {
    const savedEditorValue = localStorage.getItem("editor_value");
    if (savedEditorValue) {
      setEditorValue(savedEditorValue);
    }
  }, []);

  // Update the editor value in state and localStorage
  const handleEditorChange = (values: string) => {
    console.log(values, "jjkjkjk");

    setEditorValue(values);
    // Save the editor value to localStorage
    localStorage.setItem("editor_value", values);
  };

  const searchParams = useSearchParams();
  const [hiddenFields, setHiddenFields] = useState<any>({});
  const handleDeleteField = (fieldName: string) => {
    setHiddenFields((prevState: any) => ({
      ...prevState,
      [fieldName]: true, // Mark this field as hidden
    }));
  };
  // Get the pearls_lead_id from the URL query string
  const pearlsLeadId = searchParams.get("pearls_lead_id");
  const userId = searchParams.get("user_id");
  const field_for: any = searchParams.get("field_for");
  const field_Type: any = searchParams.get("fieldType");

  // Log the pearlsLeadId to the console
  console.log(pearlsLeadId, "searchParam");
  console.log(userId, "userId");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState<any>("");
  console.log(state, "state");

  const showModal = (values: any) => {
    // setState(values)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const router = useRouter();
  const recentLeads = [
    {
      name: "Jenny Wilson",
      email: "j.wilson@example.com",
      amount: "$11,234",
      location: "Austin",
    },
    {
      name: "Devon Lane",
      email: "d.lane@example.com",
      amount: "$11,159",
      location: "New York",
    },
  ];

  const callLeads = [
    {
      name: "Jane Cooper",
      email: "j.cooper@example.com",
      amount: "$10,483",
      location: "Toledo",
    },
    {
      name: "Dianne Russell",
      email: "d.russell@example.com",
      amount: "$9,084",
      location: "Naperville",
    },
  ];

  const mailLeads = [
    {
      name: "Jane Cooper",
      email: "j.cooper@example.com",
      amount: "$10,483",
      location: "Toledo",
    },
    {
      name: "Dianne Russell",
      email: "d.russell@example.com",
      amount: "$9,084",
      location: "Naperville",
    },
  ];
  const [file, setFile] = useState<any>(null);
  // const handleFileChange = (info: any) => {
  //   setFile(info.file.originFileObj);
  // };
  const handleFileChange = (info: any) => {
    setFile(info.file.originFileObj);
    if (info.fileList.length > 0) {
      const imageFile = info.fileList[0].originFileObj;
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageBase64 = reader.result as string;

        // Update the form state with the base64 image
        setFormValues({
          ...formValues,
          Attachment: [imageBase64], // Store as array
        });
      };

      reader.readAsDataURL(imageFile);
    }
  };
  const [activeKey, setActiveKey] = useState<any>(field_Type);

  const onFinish = async (values: any) => {
    console.log("Form submitted with values:", file, values);
    const formData: any = new FormData();
    if (file) {
      formData.append("file", file);
    }

    formData.append("user_uuid", userId);
    formData.append("pearl_id", pearlsLeadId);
    formData.append("subject", values?.subject);
    formData.append("productName", values?.productName);
    formData.append("otherFields", values?.names);
    formData.append("email_content", values?.email_content);

    let otherFieldsObject: any = {};

    for (const key in values) {
      if (
        key !== "subject" &&
        key !== "productName" &&
        key !== "file" &&
        key !== "email_content"
      ) {
        otherFieldsObject[key] = values[key];
      }
    }
    console.log(JSON.stringify(otherFieldsObject), "otherFieldsObject");
    // Remove the trailing comma and close the curly brace
    formData.append("otherFields", JSON.stringify(otherFieldsObject));
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, typeof value);
    }
    let items = {
      user_uuid: userId,
      pearl_id: pearlsLeadId,
      sender_number: `+91${values?.sender_number}`,
      sender_body: values?.sender_body,
    };
    // return;

    try {
      if (activeKey === "email") {
        const res = await api.Leads.sent_purposal(formData);
        toast.success("Email send successfully");
        console.log("Response:", res);
      } else {
        const res = await api.Leads.sent_messange(items);
        toast.success(res?.message);
        console.log(res, "gfhfh");
      }

      router.replace(`/admin/pearls?filter=all`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (key: any) => {
    setActiveKey(key);
    console.log("Selected tab:", key);
  };
  console.log(data1?.data, "data1?.data");
  const [filedTypes, setFiledTypes] = useState<any>([]);

  useEffect(() => {
    if (data1?.data) {
      const types = data1.data.map((res: any) => res?.filed_type);
      console.log(types, "type");

      setFiledTypes(types);
    }
  }, [data1]);
  console.log(filedTypes, "filedTypes");
  const targetName = "Document";
  const textCount = data1?.data.filter(
    (item: any) => item.type === "text" && item.name === targetName
  ).length;
  console.log(textCount, "textCount");
  // const handleFinish = (values: any) => {
  //   onFinish(values); // pass values to onFinish
  //   // showModal(values);
  // };
  const fileValidator = (_: any, value: any) => {
    if (!value || value.file.length === 0) {
      return Promise.reject(new Error("Please upload a file"));
    }
    return Promise.resolve();
  };
  const [formValues, setFormValues] = useState<any>({}); // Store form values

  // Load initial form data from localStorage when the component mounts
  useEffect(() => {
    const storedValues = localStorage.getItem("formValues");
    if (storedValues) {
      setFormValues(JSON.parse(storedValues));
    }
  }, []);

  // Function to handle form field changes and store in localStorage
  const handleFieldChange = (field: string, value: any) => {
    const updatedValues = { ...formValues, [field]: value };
    setFormValues(updatedValues);
    localStorage.setItem("formValues", JSON.stringify(updatedValues)); // Save to localStorage
  };

  // Function to handle image change and store the image (only one image)
  const handleImageChange = (file: any, fieldName: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase64 = reader.result as string;
      // Save the image as the only entry in the array (replace existing one)
      handleFieldChange(fieldName, [imageBase64]); // This ensures that only one image is stored
    };
    reader.readAsDataURL(file); // Convert image to base64
  };
  const renderImage = (imageBase64: string) => {
    return (
      <div>
        <img src={imageBase64} alt="Uploaded Attachment" width={200} />
      </div>
    );
  };
  const handleClearLocalStorage = () => {
    localStorage.removeItem("formValues");
    router.back();
  };
  const entriesArray = Object.entries(formValues);
  console.log(entriesArray, "formValues");
  const filterData = data1?.data?.filter(
    (res: any) => res?.field_for === validation.toLowCase(field_for)
  );
  console.log(filterData, "filterData");
  if (filterData) {
    localStorage.setItem("filteredData", JSON.stringify(filterData));
  }
  const savedFilterData = JSON.parse(
    localStorage.getItem("filteredData") || "[]"
  );
  console.log(savedFilterData, "savedFilterData");

  const handleSelectChange = (value: string) => {
    // Get current query parameters from the URL
    const currentParams = new URLSearchParams(window.location.search);

    // Set the new query parameter `field_for`
    currentParams.set("field_for", value);

    // Update the URL with the new query string
    router.push(`?${currentParams.toString()}`);
  };
  console.log(activeKey, "activeKey");

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <Row gutter={16}>
        <Col span={16}>
          {/* <Link href={`/admin/pearls/${pearlsLeadId}`}> */}
          <Button
            icon={<LeftOutlined />}
            type="link"
            onClick={handleClearLocalStorage}
          >
            Back
          </Button>
          {/* </Link> */}
          <h2>Send </h2>
          <Tabs
            defaultActiveKey={field_Type}
            items={tabs}
            onChange={handleChange}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
          <Card
            title={`${capFirst(activeKey || field_Type)} Form`}
            extra={
              <>
                <Button type="primary" onClick={showModal}>
                  Preview
                </Button>
                {/* <Button type="primary">Add Field</Button> */}
              </>
            }
            style={{ width: 800, margin: "auto", marginTop: "20px" }}
          >
            <Form layout="vertical" onFinish={onFinish}>
              {activeKey !== "sms" ? (
                <>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "100%" }}
                  >
                    <Form.Item
                      // key={index}
                      name={"subject"}
                      label={"Subject"}
                      rules={[
                        {
                          required: true,
                          message: `Please fill Subject!`,
                        },
                      ]}
                    >
                      <Input
                        placeholder={`Enter text subject`}
                        value={formValues["subject"]} // Bind the value to state
                        onChange={(e) =>
                          handleFieldChange("subject", e.target.value)
                        } // Update value on change
                        style={{ width: "360px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      // key={index}
                      name={"productName"}
                      label={"Product Name"}
                      rules={[
                        {
                          required: true,
                          message: `Please fill Product Name!`,
                        },
                      ]}
                    >
                      <Input
                        placeholder={`Enter text product name`}
                        value={formValues["productName"]} // Bind the value to state
                        onChange={(e) =>
                          handleFieldChange("productName", e.target.value)
                        } // Update value on change
                        style={{ width: "360px" }}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Content"
                    name={"email_content"}
                    rules={[
                      {
                        required: true,
                        message: `Please fill Content!`,
                      },
                    ]}
                  >
                    {/* React Quill Editor */}
                    <ReactQuill
                      value={editorValue}
                      onChange={handleEditorChange}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["bold", "italic", "underline"],
                          ["link"],
                          [{ align: [] }],
                          ["image"],
                          ["clean"],
                        ],
                      }}
                      style={{
                        height: "110px", // This corresponds to approximately 5 lines, adjust as needed
                        // overflow: "auto", // Allows scrolling if content exceeds the height
                        fontSize: "14px", // Adjust font size if needed
                        lineHeight: "1.5", // Adjust line height if needed
                        marginBottom: "40px",
                      }}
                      placeholder="Start content here..."
                    />
                  </Form.Item>
                  {/* <ul className="m-0 list-unstyled d-flex gap-2">
                  <li>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure you want to delete ?"
                      // onConfirm={(event: any) => { archive(res?._id) }}
                      // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                    >
                      <Button
                        type="text"
                        danger
                        htmlType="button"
                        className="px-0"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </Popconfirm>
                  </li>
                </ul> */}

                  {/* <ul className="m-0 list-unstyled d-flex gap-2">
                  <li>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure you want to delete ?"
                      // onConfirm={(event: any) => { archive(res?._id) }}
                      // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                    >
                      <Button
                        type="text"
                        danger
                        htmlType="button"
                        className="px-0"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </Popconfirm>
                  </li>
                </ul> */}
                  {/* <div className="mt-5"> */}
                  {filterData?.map((item: any, index: any) => {
                    if (hiddenFields[item.filed_name]) return null;
                    const validationRules = hiddenFields[item.filed_name]
                      ? [] // No validation if the field is hidden
                      : [
                          {
                            required: true,
                            message: `Please fill ${item.filed_name}!`,
                          },
                        ];
                    switch (item.filed_type) {
                      case "textarea":
                        return (
                          <>
                            <Form.Item
                              key={index}
                              name={item.filed_name}
                              label={item.filed_name}
                              rules={validationRules}
                            >
                              <TextArea
                                placeholder={`Enter text area ${index + 1}`}
                                value={formValues[item.filed_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange(
                                    item.filed_name,
                                    e.target.value
                                  )
                                } // Update value on change
                              />
                            </Form.Item>
                            <ul className="m-0 list-unstyled d-flex gap-2">
                              <li>
                                <Popconfirm
                                  title="Delete"
                                  description="Are you sure you want to delete ?"
                                  onConfirm={() =>
                                    handleDeleteField(item.filed_name)
                                  }
                                  // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                                >
                                  <Button
                                    type="text"
                                    danger
                                    htmlType="button"
                                    className="px-0"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Button>
                                </Popconfirm>
                              </li>
                            </ul>
                          </>
                        );
                      case "number":
                        return (
                          <>
                            <Form.Item
                              key={index}
                              name={item.filed_name}
                              label={item.filed_name}
                              rules={validationRules}
                            >
                              <Input
                                type="number"
                                placeholder={`Enter number ${index + 1}`}
                                value={formValues[item.filed_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange(
                                    item.filed_name,
                                    e.target.value
                                  )
                                } // Update value on change
                              />
                            </Form.Item>
                            <ul className="m-0 list-unstyled d-flex gap-2">
                              <li>
                                <Popconfirm
                                  title="Delete"
                                  description="Are you sure you want to delete ?"
                                  onConfirm={() =>
                                    handleDeleteField(item.filed_name)
                                  }
                                  // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                                >
                                  <Button
                                    type="text"
                                    danger
                                    htmlType="button"
                                    className="px-0"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Button>
                                </Popconfirm>
                              </li>
                            </ul>
                          </>
                        );
                      case "text":
                        return (
                          <>
                            <Form.Item
                              key={index}
                              name={item.filed_name}
                              label={item.filed_name}
                              rules={validationRules}
                            >
                              <Input
                                placeholder={`Enter text ${index + 1}`}
                                value={formValues[item.filed_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange(
                                    item.filed_name,
                                    e.target.value
                                  )
                                } // Update value on change
                              />
                            </Form.Item>
                            <ul className="m-0 list-unstyled d-flex gap-2">
                              <li>
                                <Popconfirm
                                  title="Delete"
                                  description="Are you sure you want to delete ?"
                                  // onConfirm={(event: any) => { archive(res?._id) }}
                                  onConfirm={() =>
                                    handleDeleteField(item.filed_name)
                                  }
                                >
                                  <Button
                                    type="text"
                                    danger
                                    htmlType="button"
                                    className="px-0"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Button>
                                </Popconfirm>
                              </li>
                            </ul>
                          </>
                        );
                      case "radio":
                        return (
                          <Form.Item
                            key={index}
                            name={item.filed_name}
                            label={item.filed_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.filed_name}!`,
                              },
                            ]}
                          >
                            <Radio.Group
                              value={formValues[item.filed_name]} // Bind the value to state
                              onChange={(e) =>
                                handleFieldChange(
                                  item.filed_name,
                                  e.target.value
                                )
                              } // Update value on change
                            >
                              <Radio value="option1">Option 1</Radio>
                              <Radio value="option2">Option 2</Radio>
                            </Radio.Group>
                          </Form.Item>
                        );
                      case "dropDown":
                        return (
                          <Form.Item
                            key={index}
                            name={item.filed_name}
                            label={item.filed_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.filed_name}!`,
                              },
                            ]}
                          >
                            <Select
                              placeholder={`Select an option ${index + 1}`}
                              value={formValues[item.filed_name]} // Bind the value to state
                              onChange={(value) =>
                                handleFieldChange(item.filed_name, value)
                              } // Update value on change
                            >
                              <Select.Option value="option1">
                                Option 1
                              </Select.Option>
                              <Select.Option value="option2">
                                Option 2
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        );
                      case "checkbox":
                        return (
                          <Form.Item
                            key={index}
                            name={item.filed_name}
                            valuePropName="checked"
                            label={item.filed_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.filed_name}!`,
                              },
                            ]}
                          >
                            <Checkbox
                              checked={formValues[item.filed_name]} // Bind the value to state
                              onChange={(e) =>
                                handleFieldChange(
                                  item.filed_name,
                                  e.target.checked
                                )
                              } // Update value on change
                            >
                              Check this box
                            </Checkbox>
                          </Form.Item>
                        );
                      case "image":
                        return (
                          <>
                            <Form.Item
                              key={index}
                              label={item.filed_name}
                              rules={[{ validator: fileValidator }]} // Custom validator function
                            >
                              <Dragger
                                // multiple={false} // Only allow one image
                                onChange={handleFileChange}
                                // maxCount={1} // Limit to 1 image upload
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                              </Dragger>
                              {/* Display the uploaded image */}
                              {/* {formValues[item.filed_name] &&
                          formValues[item.filed_name][0] && (
                            <div style={{ marginTop: "10px" }}>
                              <img
                                src={formValues[item.filed_name][0]} // Display the first image in the array
                                alt="Uploaded"
                                width={100}
                              />
                            </div>
                          )} */}
                            </Form.Item>
                            <ul className="m-0 list-unstyled d-flex gap-2">
                              <li>
                                <Popconfirm
                                  title="Delete"
                                  description="Are you sure you want to delete ?"
                                  onConfirm={() =>
                                    handleDeleteField(item.filed_name)
                                  }
                                  // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                                >
                                  <Button
                                    type="text"
                                    danger
                                    htmlType="button"
                                    className="px-0"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Button>
                                </Popconfirm>
                              </li>
                            </ul>
                          </>
                        );
                      default:
                        return null;
                    }
                  })}

                  {/* </div> */}
                  {Array.from({ length: textCount }).map((_, i) => (
                    <Form.Item
                      key={`dynamic-text-${i}`}
                      name={`dynamicText-${i}`}
                      label={`Text Input for ${targetName}`}
                      rules={[
                        {
                          required: true,
                          message: `Please fill ${targetName}!`,
                        },
                      ]}
                    >
                      <Input
                        placeholder={`Enter text for ${targetName}`}
                        value={formValues[`dynamicText-${i}`]} // Bind the value to state
                        onChange={(e) =>
                          handleFieldChange(`dynamicText-${i}`, e.target.value)
                        } // Update value on change
                      />
                    </Form.Item>
                  ))}
                  <Form.List
                    name="names"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 1) {
                            return Promise.reject(
                              new Error("At least 1 field")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "Fields" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input field's name or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="field name"
                                style={{ width: "60%" }}
                              />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: "60%" }}
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>

                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item style={{ margin: "auto" }}>
                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    // key={index}

                    name={"sender_number"}
                    label={"Number"}
                    rules={[
                      {
                        required: true,
                        message: `Please fill Number!`,
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder={`Enter text number`}
                      value={formValues["number"]} // Bind the value to state
                      onChange={(e) =>
                        handleFieldChange("number", e.target.value)
                      } // Update value on change
                    />
                  </Form.Item>
                  <Form.Item
                    // key={index}
                    name={"sender_body"}
                    label={"Message"}
                    rules={[
                      {
                        required: true,
                        message: `Please fill Message!`,
                      },
                    ]}
                  >
                    <TextArea
                      placeholder={`Enter text message`}
                      value={formValues["message"]} // Bind the value to state
                      onChange={(e) =>
                        handleFieldChange("message", e.target.value)
                      } // Update value on change
                    />
                  </Form.Item>
                  <Form.Item style={{ margin: "auto" }}>
                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </Card>
        </Col>

        <Col span={8} style={{ marginBottom: "16px" }}>
          {/* Sidebar for Leads */}
          <div style={{ marginTop: "180px" }}>
            <Recent_card />
          </div>

          {/* <Card title="Recent Leads" style={{ marginBottom: "16px" }}>
            <List
              itemLayout="horizontal"
              dataSource={recentLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Recent Leads</Button>
          </Card> */}

          {/* <Card title="Call Leads" style={{ marginBottom: "16px" }}>
            <List
              itemLayout="horizontal"
              dataSource={callLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Call Leads</Button>
          </Card>

          <Card title="Mail Leads">
            <List
              itemLayout="horizontal"
              dataSource={mailLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Mail Leads</Button>
          </Card> */}
        </Col>
      </Row>
      <Modal
        title={`${capFirst(activeKey || "Email")} Form`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="emailModal"
        style={{ width: "720px" }}
      >
        <Card

        // style={{ width: 800, margin: 'auto', marginTop: '20px' }}
        >
          {formValues ? (
            <div
              style={{
                width: "100%",
                backgroundColor: "#ffffff",
                padding: "20px",
              }}
              className="XYZ"
            >
              {/* Main Wrapper */}
              <Row justify="center">
                <Col span={24} style={{ backgroundColor: "#ffffff" }}>
                  {/* Header Section */}
                  <Row
                    justify="center"
                    style={{
                      backgroundColor: "#70bbd9",
                      padding: "40px 0 30px 0",
                    }}
                  >
                    <Col>
                      <img
                        src="https://assets.codepen.io/210284/h1.png"
                        alt="Logo"
                        width={300}
                        style={{ height: "auto", display: "block" }}
                      />
                    </Col>
                  </Row>

                  {/* Main Content Section */}
                  <Row justify="start">
                    {entriesArray?.map((res: any, index: number) => (
                      <Col
                        span={16}
                        key={index}
                        style={{ padding: "36px 30px 42px" }}
                      >
                        <Title
                          level={1}
                          style={{ color: "#153643", fontSize: "24px" }}
                        >
                          {capFirst(replaceUnderScore(res[1] ? res[0] : " "))}
                        </Title>
                        <Text style={{ fontSize: "16px" }}>
                          {res[0] == "Attachment" ? (
                            formValues.Attachment &&
                            formValues.Attachment[0] ? (
                              renderImage(formValues.Attachment[0]) // Render the image using base64
                            ) : (
                              <p>No attachment found</p>
                            )
                          ) : (
                            res[1]
                          )}
                        </Text>
                        {/* <Text style={{ fontSize: '16px' }}>
                          {res[0] === 'Message' ? (
                            <div
                              style={{ fontSize: '16px', lineHeight: '24px' }}
                              dangerouslySetInnerHTML={{
                                __html: editorValue || '<p>No message content found.</p>',
                              }}
                            />
                          ) : (
                            res[1]
                          )}
                        </Text> */}
                        <br />
                        {/* <Text style={{ fontSize: '16px', lineHeight: '24px' }}>
                <a href="http://www.example.com" style={{ color: '#ee4c50', textDecoration: 'underline' }}>
                  In tempus felis blandit
                </a>
              </Text> */}
                      </Col>
                    ))}
                  </Row>

                  {/* Footer Section */}
                  {/* <Row justify="center" style={{ backgroundColor: '#ee4c50', padding: '30px' }}>
            <Col span={16}>
              <Row justify="space-between">
                <Col>
                  <Text style={{ color: '#ffffff', fontSize: '14px' }}>
                    &reg; Someone, Somewhere 2024
                    <br />
                    <a href="http://www.example.com" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                      Unsubscribe
                    </a>
                  </Text>
                </Col>
                <Col>
                  <Space>
                    <a href="http://www.twitter.com/" style={{ color: '#ffffff' }}>
                      <TwitterOutlined style={{ fontSize: '20px' }} />
                    </a>
                    <a href="http://www.facebook.com/" style={{ color: '#ffffff' }}>
                      <FacebookOutlined style={{ fontSize: '20px' }} />
                    </a>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row> */}
                </Col>
              </Row>
            </div>
          ) : (
            <p>No stored data found.</p>
          )}

          <div className="footer-email">
            <h3>CRM Model</h3>
            <div className="social-link">
              <a href="#">
                <FacebookOutlined />
              </a>
              <a href="#">
                <InstagramOutlined />
              </a>
              <a href="#">
                <YoutubeOutlined />
              </a>
              <a href="#">
                <TwitterOutlined />
              </a>
            </div>
            <p>1234 Example Street City, State 01234, Country</p>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default Sent_Purposal;
