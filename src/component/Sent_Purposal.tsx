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
  Tooltip,
} from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  UserOutlined,
  AntDesignOutlined,
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
import AddFieldsModal from "../component/common/AddFieldsModal";
// import AddFieldsModal from "./common/addFieldsModal";

interface Contact {
  id: number;
  initials: string;
  color: string;
}

const contacts: Contact[] = [
  { id: 1, initials: "OS", color: "#a5d6a7" },
  { id: 2, initials: "CJ", color: "#80cbc4" },
  { id: 3, initials: "NT", color: "#f48fb1" },
  { id: 4, initials: "M", color: "#ce93d8" },
  { id: 5, initials: "DO", color: "#ffab91" },
  { id: 6, initials: "R", color: "#ffcc80" },
  { id: 7, initials: "VT", color: "#e6ee9c" },
  { id: 8, initials: "O", color: "#bcaaa4" },
  { id: 9, initials: "JS", color: "#ffccbc" },
  { id: 10, initials: "TA", color: "#b0bec5" },
];
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
  const [form] = Form.useForm();
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
  const [hiddenFields1, setHiddenFields1] = useState<any>({});
  const handleDeleteField = (fieldName: string) => {
    setHiddenFields((prevState: any) => ({
      ...prevState,
      [fieldName]: true, // Mark this field as hidden
    }));
  };
  const handleDeleteField1 = (field_name: string) => {
    setHiddenFields1((prevState: any) => ({
      ...prevState,
      [field_name]: true, // Mark this field as hidden
    }));
  };
  // Get the pearls_lead_id from the URL query string
  const pearlsLeadId = searchParams.get("pearls_lead_id");
  const userId = searchParams.get("user_id");
  const field_for: any = searchParams.get("field_for");
  const field_Type: any = searchParams.get("fieldType");
  const emailMode: any = searchParams.get("email_mode");
  const emailType: any = searchParams.get("email_type");
  console.log(emailType, "email_type");

  const [formValues, setFormValues] = useState<any>({}); // Store form values
  const [filterArrayId1, setFilterArrayId1] = useState<any>([]); // Store form values
  console.log(filterArrayId1, "filterArrayId");
  const filterpearl_ids = filterArrayId1.map((res: any) => res?.pearl_id);

  // Convert the array to a JSON string
  const pearlIdsAsString = JSON.stringify(filterpearl_ids);
  const filteruser_ids = filterArrayId1.map((res: any) => res?.user_uuid);
  console.log(filteruser_ids, "filteruser_ids");

  const user_idssAsString = JSON.stringify(filteruser_ids);
  console.log(user_idssAsString, "user_idssAsString");
  // Log the pearlsLeadId to the console
  console.log(pearlsLeadId, "searchParam");
  console.log(userId, "userId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFields, setAddFields] = useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState<any>("");
  console.log(state, "state");
  const [storeState, setStoreState] = useState<any>([]);

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

  const [file, setFile] = useState<any>(null);
  const [file1, setFile1] = useState<any>(null);
  console.log(file1, "file1");

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
  const handleFileChange1 = (info: any) => {
    setFile1(info.file.originFileObj);
    if (info.fileList.length > 0) {
      const imageFile = info.fileList[0].originFileObj;
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageBase64 = reader.result as string;

        // Update the form state with the base64 image
        setAddFields({
          ...addFields,
          Attachment: [imageBase64], // Store as array
        });
      };

      reader.readAsDataURL(imageFile);
    }
  };
  const [activeKey, setActiveKey] = useState<any>(field_Type);
  console.log(activeKey, "activeKey");

  const onFinish = async (values: any) => {
    console.log("Form submitted with values:", file, values);
    const formData: any = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (emailType === "meta") {
      formData.append("user_uuid", emailMode ? [user_idssAsString] : userId);
      formData.append("meta_id", emailMode ? [user_idssAsString] : userId);
    } else {
      formData.append("user_uuid", emailMode ? [user_idssAsString] : userId);
      formData.append(
        "pearl_id",
        emailMode ? [pearlIdsAsString] : pearlsLeadId
      );
    }

    formData.append("subject", JSON.stringify(values?.subject));
    formData.append("productName", JSON.stringify(values?.productName));
    formData.append("email_content", JSON.stringify(values?.email_content));
    formData.append("email_type", JSON.stringify(emailType));

    let otherFieldsObject: any = {};

    for (const key in values) {
      if (
        // key !== "subject" &&
        // key !== "productName" &&
        // key !== "file" &&
        // key !== "email_content"
        key !== "subject" &&
        key !== "productName" &&
        key !== "file" &&
        key !== "email_content" &&
        key !== "names"
      ) {
        otherFieldsObject[key] = values[key];
      }
    }
    const mergedOtherFields = {
      names: values?.names, // Add names as part of the object
      ...otherFieldsObject, // Spread other fields into the object
    };
    const finalMergedObject = {
      ...mergedOtherFields, // Add existing merged fields
      ...storeState, // Add storeState values to the object
    };
    console.log(JSON.stringify(finalMergedObject), "otherFieldsObject");
    // Remove the trailing comma and close the curly brace
    formData.append("otherFields", JSON.stringify(finalMergedObject));

    let items = {
      user_uuid: userId,
      pearl_id: pearlsLeadId,
      sender_number: `+91${values?.sender_number}`,
      sender_body: values?.sender_body,
      email_type: emailType,
    };
    let items1 = {
      user_uuid: userId,
      meta_id: userId,
      sender_number: `+91${values?.sender_number}`,
      sender_body: values?.sender_body,
      email_type: emailType,
    };
    // return;

    try {
      if (emailMode) {
        console.log(formData, "formData");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, typeof value);
        }
        const res = await api.Leads.sent_email_queue(formData);
        toast.success("Email send successfully");
      } else {
        if (activeKey === "email") {
          const res = await api.Leads.sent_purposal(formData);
          toast.success("Email send successfully");
          console.log("Response:", res);
        } else {
          const res = await api.Leads.sent_messange(emailType==="meta"?items1:items);
          toast.success(res?.message);
          console.log(res, "gfhfh");
        }
      }
      localStorage.removeItem("extrafields");
      if (!emailMode) {
        router.replace(`/admin/${emailType==="meta"?"metalist":"pearls"}?filter=all`);
      } else {
        router.replace(`/admin/template?filter=all&leads_type=${emailType}`);
      }
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
  const targetName1 = "Document";
  console.log(targetName1, "targetName1");

  const textCount = data1?.data.filter(
    (item: any) => item.type === "text" && item.name === targetName
  ).length;
  // const textCount1 = (Array.isArray(addFields) ? addFields : []).filter(
  //   (item: any) =>item.type === "text" && item.name === targetName1
  // ).length;
  const textCount1 = Object.keys(addFields).filter(
    (key) => key.startsWith("dynamicText1-") && addFields[key]?.type === "text"
  ).length;
  console.log(textCount1, "textCount1");
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

  // Load initial form data from localStorage when the component mounts
  useEffect(() => {
    const storedValues = localStorage.getItem("formValues");
    if (storedValues) {
      setFormValues(JSON.parse(storedValues));
    }
  }, []);
  useEffect(() => {
    const arrayValues = localStorage.getItem("filterArrayId");
    console.log(arrayValues, "arrayValues");

    if (arrayValues) {
      setFilterArrayId1(JSON.parse(arrayValues));
    }
  }, []);

  // Function to handle form field changes and store in localStorage
  const handleFieldChange = (field: string, value: any) => {
    console.log(value, "ooo");

    const updatedValues = { ...formValues, [field]: value };
    setFormValues(updatedValues);
    localStorage.setItem("formValues", JSON.stringify(updatedValues)); // Save to localStorage
  };
  // const handleFieldChange2 = (field: string, value: any) => {
  //   console.log(value, "aaa");

  //   const updatedValues = { ...addFields, [field]: value };
  //   setAddFields(updatedValues);
  //   localStorage.setItem("extrafields", JSON.stringify(updatedValues)); // Save to localStorage
  // };
  console.log(storeState, "storeState");

  const handleFieldChange2 = (field: string, value: any) => {
    console.log(value, "aaa");
    console.log(field, "qwwqw");
    // const updatedValues = {  [field]: value };
    // console.log(updatedValues,"updatedValues");
    const updatedValues = { ...storeState, [field]: value };

    console.log(updatedValues, "Updated storeState");

    // Update the state with the new object
    setStoreState(updatedValues);
  };
  // setAddFields(updatedValues);
  // localStorage.setItem("extrafields", JSON.stringify(updatedValues));
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

  const filterData1 = Array.isArray(addFields)
    ? addFields.filter((res: any) => res?.field_name)
    : [];

  console.log(filterData1, "filterData1");
  if (typeof window !== "undefined" && filterData) {
    localStorage.setItem("filteredData", JSON.stringify(filterData));
  }
  let savedFilterData = [];

  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("filteredData");
    savedFilterData = storedData ? JSON.parse(storedData) : [];
  }
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
  const [fields, setFields] = useState<{ name: string }[]>([]); // To store the field names

  // Load field names from localStorage on component mount
  useEffect(() => {
    const savedFields = localStorage.getItem("formFields");
    if (savedFields) {
      const parsedFields = JSON.parse(savedFields);
      setFields(parsedFields.map((name: string) => ({ name }))); // Map to match the expected structure
    }
  }, []);

  // Store field names in localStorage whenever fields change
  const handleFieldChange1 = (index: number, value: any) => {
    const newFields = [...fields];
    newFields[index].name = value;
    setFields(newFields);
    localStorage.setItem(
      "formFields",
      JSON.stringify(newFields.map((f) => f.name))
    ); // Store only field names
  };

  console.log(addFields, "addFields");

  const handleCancel1 = () => {
    setIsModalOpen(false);
    // Optionally reset form fields
  };

  const showModal1 = () => {
    setIsModalOpen(true);
  };
  const [state1, setState1] = useState<any>(false);
  console.log(state1, "state1");

  const submit = (values: any) => {
    console.log("Form Submitted:", values);

    setIsModalOpen(false);

    try {
      const fields = JSON.parse(localStorage.getItem("extrafields") || "[]");
      fields.push(values);
      localStorage.setItem("extrafields", JSON.stringify(fields));
      setState1(true);
      form.resetFields();
      console.log("Field added:", values);
    } catch (error) {
      console.error("Error saving field data to localStorage:", error);
    }
  };
  useEffect(() => {
    const storedValues = localStorage.getItem("extrafields");
    console.log(storedValues, "storedValues");

    if (storedValues) {
      setAddFields(JSON.parse(storedValues));
    }
  }, [state1]);
  useEffect(() => {
    if (state1) {
      setState1(false); // Reset state1 after it's been processed
    }
  }, [state1]);
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
          <h2>Send {capFirst(activeKey || field_Type)} </h2>
          {!emailMode ? (
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
          ) : (
            <div
              className=""
              style={{
                marginTop: "67px",
                marginBottom: "10px",
                marginLeft: "128px",
              }}
            >
              <h3 className="">Send to following leads</h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar.Group
                  size="large"
                  max={{
                    count: 10,
                    style: {
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                    },
                    popover: { trigger: "click" },
                  }}
                >
                  {filterArrayId1.map((contact: any, index: number) => {
                    const initials = contact.name.slice(0, 2).toUpperCase();
                    const avatarColor = contacts[index % contacts.length].color;

                    return (
                      <>
                        <Tooltip title={contact.name} placement="top">
                          <Avatar
                            key={contact.pearl_id}
                            style={{ backgroundColor: avatarColor }}
                          >
                            {initials}
                          </Avatar>
                        </Tooltip>
                      </>
                    );
                  })}
                </Avatar.Group>

                {/* <Tooltip title="Show all leads"> */}
                {/* <span style={{ color: "#1890ff", cursor: "pointer" }}>
                  {filterArrayId1.length > 8 ? ` more leads...` : ""}
                </span> */}
                {/* </Tooltip> */}
              </div>
            </div>
          )}
          <Card
            title={`${capFirst(activeKey || field_Type)} Form`}
            // extra={
            //   <>
            //     {activeKey !== "sms" ? (
            //       <Button type="primary" onClick={showModal}>
            //         Preview
            //       </Button>
            //     ) : (
            //       ""
            //     )}
            //   </>
            // }
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
                  {filterData1?.map((item: any, index: any) => {
                    console.log(item, "popopopo");

                    if (hiddenFields1[item.field_name]) return null;
                    const validationRules = hiddenFields1[item.field_name]
                      ? [] // No validation if the field is hidden
                      : [
                          {
                            required: true,
                            message: `Please fill ${item.field_name}!`,
                          },
                        ];
                    switch (item.field_type) {
                      case "textarea":
                        return (
                          <>
                            <Form.Item
                              key={index}
                              name={item.field_name}
                              label={item.field_name}
                              rules={validationRules}
                            >
                              <TextArea
                                placeholder={`Enter text area ${index + 1}`}
                                value={addFields[item.field_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange2(
                                    item.field_name,
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
                                    handleDeleteField1(item.field_name)
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
                              name={item.field_name}
                              label={item.field_name}
                              rules={validationRules}
                            >
                              <Input
                                type="number"
                                placeholder={`Enter number ${index + 1}`}
                                value={addFields[item.field_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange2(
                                    item.field_name,
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
                                    handleDeleteField1(item.field_name)
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
                              name={item.field_name}
                              label={item.field_name}
                              rules={validationRules}
                            >
                              <Input
                                placeholder={`Enter text ${index + 1}`}
                                value={addFields[item.field_name]} // Bind the value to state
                                onChange={(e) =>
                                  handleFieldChange2(
                                    item.field_name,
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
                                    handleDeleteField1(item.field_name)
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
                            name={item.field_name}
                            label={item.field_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.field_name}!`,
                              },
                            ]}
                          >
                            <Radio.Group
                              value={addFields[item.field_name]} // Bind the value to state
                              onChange={(e) =>
                                handleFieldChange2(
                                  item.field_name,
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
                            name={item.field_name}
                            label={item.field_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.field_name}!`,
                              },
                            ]}
                          >
                            <Select
                              placeholder={`Select an option ${index + 1}`}
                              value={addFields[item.field_name]} // Bind the value to state
                              onChange={(value) =>
                                handleFieldChange2(item.field_name, value)
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
                            name={item.field_name}
                            valuePropName="checked"
                            label={item.field_name}
                            rules={[
                              {
                                required: true,
                                message: `Please fill ${item.field_name}!`,
                              },
                            ]}
                          >
                            <Checkbox
                              checked={addFields[item.field_name]} // Bind the value to state
                              onChange={(e: any) =>
                                handleFieldChange2(
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
                              label={item.field_name}
                              rules={[{ validator: fileValidator }]} // Custom validator function
                            >
                              <Dragger
                                // multiple={false} // Only allow one image
                                onChange={handleFileChange1}
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
                                    handleDeleteField1(item.field_name)
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
                  {Array.from({ length: textCount1 }).map((_, index) => (
                    <Form.Item
                      key={`dynamic-text1`}
                      name={`dynamicText1`}
                      label={`Text Input for ${targetName1}`}
                      rules={[
                        {
                          required: true,
                          message: `Please fill ${targetName1}!`,
                        },
                      ]}
                    >
                      <Input
                        placeholder={`Enter text for ${targetName1}`}
                        value={addFields[`dynamicText1-`]} // Bind the value to state
                        onChange={(e: any) =>
                          handleFieldChange2(`dynamicText1-`, e.target.value)
                        } // Update value on change
                      />
                    </Form.Item>
                  ))}
                  {/* <div className=""> */}
                  {/* <Form.List
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
                            {...(index === 0 ? { label: "Fields" } : {})}
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
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                  handleFieldChange("name", e.target.value)
                                }
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
                  </Form.List> */}
                  <div className="mt-5 mb-5">
                    {/* <AddFieldsModal /> */}
                    <AddFieldsModal
                      form={form}
                      submit={submit}
                      showModal1={showModal1}
                      handleCancel1={handleCancel1}
                      isModalOpen={isModalOpen}
                    />
                  </div>
                  {/* </div> */}
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
