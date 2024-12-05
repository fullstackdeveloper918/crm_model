import React, { useState } from 'react'
import dayjs from "dayjs"
import { Button, DatePicker, TimePicker, Select, Form, Typography, Input, Space, Row, Col } from 'antd'

const { Title } = Typography
const { Option } = Select

const CreatMeeting = () => {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [meetingLink, setMeetingLink] = useState<string>("")

  console.log(meetingLink, "meetingLink")

  // Function to handle the select dropdown change
  const handleSelectChange = (value: string) => {
    setSelectedOption(value)
  }

  // Function to handle date and time inputs
  const handleInputChange1 = (
    date: any, // dayjs object for DatePicker
    time: string,
    type: string
  ) => {
    if (type === "startDate") setStartDate(date.format("YYYY-MM-DD"))
    if (type === "startTime") setStartTime(time)
    if (type === "endDate") setEndDate(date.format("YYYY-MM-DD"))
    if (type === "endTime") setEndTime(time)
  }

  // Function to generate Google Meet or Zoom link
  const generateMeetingLink = async () => {
    const startDateTime = dayjs(`${startDate}T${startTime}`)
    const endDateTime = dayjs(`${endDate}T${endTime}`)

    // Validate if dates are valid
    if (!startDateTime.isValid() || !endDateTime.isValid() || !selectedOption) {
      setMeetingLink("Please fill in all fields and select a platform.")
      return
    }

    // Format the date and time for the URL
    const formattedStartDate = startDateTime.format("YYYY-MM-DDTHH:mm:ss")
    const formattedEndDate = endDateTime.format("YYYY-MM-DDTHH:mm:ss")

    if (selectedOption === "googleMeet") {
      setMeetingLink(`https://meet.google.com/new?start=${formattedStartDate}&end=${formattedEndDate}`)
    } else if (selectedOption === "zoom") {
      try {
        const response = await fetch("/api/createZoomMeeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            startTime: formattedStartDate,
            endDate: formattedEndDate,
            endTime: formattedEndDate,
          }),
        })

        const data = await response.json()
        if (data.link) {
          setMeetingLink(data.link) // Zoom meeting link from API response
        } else {
          setMeetingLink("Failed to create Zoom meeting.")
        }
      } catch (error) {
        setMeetingLink("Error creating Zoom meeting.")
      }
    } else if (selectedOption === "teams") {
      try {
        const response = await fetch("/api/createTeamsMeeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            startTime: formattedStartDate,
            endDate: formattedEndDate,
            endTime: formattedEndDate,
          }),
        })

        const data = await response.json()
        if (data.link) {
          setMeetingLink(data.link)
        } else {
          setMeetingLink("Failed to create Teams meeting.")
        }
      } catch (error) {
        setMeetingLink("Error creating Teams meeting.")
      }
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Title level={2} style={{ textAlign: 'center' }}>Meeting Link Generator</Title>
      
      <Form layout="vertical">
        {/* Select Platform */}
        <Form.Item label="Select Platform" required>
          <Select value={selectedOption} onChange={handleSelectChange} placeholder="Select a platform">
            <Option value="googleMeet">Google Meet</Option>
            <Option value="zoom">Zoom</Option>
            <Option value="teams">Microsoft Teams</Option>
          </Select>
        </Form.Item>
        
        {/* Start Date and Time */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Date" required>
              <DatePicker 
                value={startDate ? dayjs(startDate) : null}
                onChange={(date) => handleInputChange1(date, startTime, "startDate")}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Start Time" required>
              <TimePicker 
                value={startTime ? dayjs(`${startDate}T${startTime}`) : null}
                onChange={(time) => handleInputChange1(startDate ? dayjs(startDate) : dayjs(), time?.format('HH:mm'), "startTime")}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* End Date and Time */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="End Date" required>
              <DatePicker 
                value={endDate ? dayjs(endDate) : null}
                onChange={(date) => handleInputChange1(date, endTime, "endDate")}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Time" required>
              <TimePicker 
                value={endTime ? dayjs(`${endDate}T${endTime}`) : null}
                onChange={(time) => handleInputChange1(endDate ? dayjs(endDate) : dayjs(), time?.format('HH:mm'), "endTime")}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Generate Link Button */}
        <Form.Item>
          <Button type="primary" block onClick={generateMeetingLink}>Generate Link</Button>
        </Form.Item>
      </Form>

      {/* Display the Generated Link */}
      {meetingLink && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Title level={4}>Generated Link:</Title>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">
            <Button type="link" style={{ fontSize: 16 }}>{meetingLink}</Button>
          </a>
        </div>
      )}
    </div>
  )
}

export default CreatMeeting
