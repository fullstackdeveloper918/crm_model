// components/EmailPreview.tsx

interface EmailPreviewProps {
    htmlContent: string;
  }
  
  const EmailPreview: React.FC<EmailPreviewProps> = ({ htmlContent }) => {
    return (
      <div style={{ marginTop: 20 }}>
        <h2>Email Template Preview</h2>
        <div
          className="email-preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        />
      </div>
    );
  };
  
  export default EmailPreview;
  