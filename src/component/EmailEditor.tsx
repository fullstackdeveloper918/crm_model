// components/EmailEditor.tsx
"use client"
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Input, Button, Row, Col } from "antd";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

interface EmailEditorProps {
  onChange: (html: string) => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ onChange }) => {
  const [editorValue, setEditorValue] = useState<string>("");

  const handleChange = (value: string) => {
    setEditorValue(value);
    onChange(value);
  };

  return (
    <div>
      <h2>Email Template Editor</h2>
      <Row gutter={16}>
        <Col span={24}>
          <Input
            placeholder="Subject"
            style={{ marginBottom: 20 }}
            onChange={(e) => console.log("Subject:", e.target.value)}
          />
        </Col>
      </Row>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
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
      />
      <Row justify="end" style={{ marginTop: 20 }}>
        <Col>
          <Button type="primary" onClick={() => alert("Saving template...")}>
            Save Template
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default EmailEditor;
