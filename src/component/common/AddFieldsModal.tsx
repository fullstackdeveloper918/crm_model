"use client";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { ImportOutlined } from "@ant-design/icons";
const { Option } = Select;

const AddFieldsModal = ({isModalOpen,submit,showModal1,handleCancel1}:any) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     // Optionally reset form fields
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const submit = (values: any) => {
//     console.log("Form Submitted:", values); // Debug log to check if values are received

//     try {
//       // Retrieve the existing fields from localStorage, or initialize as an empty array if none exist
//       const fields = JSON.parse(localStorage.getItem("fields") || "[]");

//       // Add the new field from form values to the array
//       fields.push(values);

//       // Save the updated fields array back to localStorage
//       localStorage.setItem("fields", JSON.stringify(fields));

//       // Optionally, log the saved data or perform other actions
//       console.log("Field added:", values);

//       // Close the modal after submitting
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error saving field data to localStorage:", error);
//     }
//   };

  return (
    <div>
      <Button
        type="primary"
        htmlType="button"
        size="large"
        style={{ width: "50%" }}
        className="primaryBtn"
        icon={<ImportOutlined />}
        onClick={showModal1}
      >
        Add Field
      </Button>

      <Modal
        className="text-item-center"
        title={"Add Fields"}
        open={isModalOpen}
        onCancel={handleCancel1}
        footer={[
          <Button
            key="back"
            onClick={handleCancel1}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            form="myForm" // Ensure the button triggers the form submission
            type="primary"
            htmlType="submit" // Trigger form submit action
            style={{ marginLeft: "5px" }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          layout="vertical"
          onFinish={submit} // This will call submit when the form is submitted
        >
          <Form.Item
            name="field_name" // Corrected field name here
            label="Field Name"
            rules={[{ required: true, message: "Please input the field name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="field_type" // Corrected field name here
            label="Field Type"
            rules={[{ required: true, message: "Please select a field type!" }]}
          >
            <Select placeholder="Select an option" style={{ width: "100%" }}>
              <Option value="text">Text</Option>
              <Option value="textarea">Textarea</Option>
              <Option value="number">Number</Option>
              <Option value="image">Image</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddFieldsModal;
