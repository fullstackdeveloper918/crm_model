// components/EmailScheduleModal.tsx
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface EmailScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dates: Date[]) => void;
}

const EmailScheduleModal: React.FC<EmailScheduleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const handleSubmit = () => {
    // Submit the selected dates
    onSubmit(selectedDates);
    onClose(); // Close modal after submit
    
  };

  if (!isOpen) return null; // Return nothing if the modal is closed

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2>Schedule Email</h2>
        <p>Select multiple dates to schedule the email:</p>
        <p className="">{selectedDates?.map((res:any)=>
        res.toDateString(),
        )}</p>
        <DayPicker 
          mode="multiple" 
          selected={selectedDates} 
          onDayClick={(date) => {
            setSelectedDates((prev) => {
              const isAlreadySelected = prev.some(d => d.toDateString() === date.toDateString());
              if (isAlreadySelected) {
                return prev.filter(d => d.toDateString() !== date.toDateString()); // Remove date
              }
              return [...prev, date]; // Add date
            });
          }}
        />
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <button 
            onClick={onClose} 
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailScheduleModal;
