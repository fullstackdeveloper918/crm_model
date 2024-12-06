'use client';

import React, { useEffect, useRef } from 'react';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css'; // Import DHTMLX Scheduler CSS

// Import DHTMLX Scheduler as a global object
import { scheduler } from 'dhtmlx-scheduler'; // Ensure you're using the default export for the scheduler

const SchedulerComponent = ({getdata}:any) => {
  const schedulerContainerRef = useRef<HTMLDivElement | null>(null);

  console.log(getdata.getByOne[0]?.user_uuid,"datadatadata");
  
  useEffect(() => {
    if (!schedulerContainerRef.current) return;

    // Configure DHTMLX Scheduler
    scheduler.config.details_on_dblclick = true;
    scheduler.config.details_on_create = true;
    scheduler.config.header = [
      'day',
      'week',
      'month',
      'date',
      'prev',
      'today',
      'next',
    ];

    // Initialize the scheduler in the container
    scheduler.init(schedulerContainerRef.current, new Date(2024, 11, 3), 'month');

    // Parse initial events
    scheduler.parse([
      { 
        start_date: '2024-12-06 09:00', 
        end_date: '2024-12-06 12:00', 
        text: 'English lesson' 
      },
      { 
        start_date: '2024-12-20 10:00', 
        end_date: '2024-12-21 16:00', 
        text: 'Math exam' 
      },
      { 
        start_date: '2024-12-21 10:00', 
        end_date: '2024-12-21 14:00', 
        text: 'Science lesson' 
      },
      { 
        start_date: '2024-12-23 16:00', 
        end_date: '2024-12-23 17:00', 
        text: 'English lesson' 
      },
      { 
        start_date: '2024-12-22 09:00', 
        end_date: '2024-12-22 17:00', 
        text: 'Usual event' 
      },
      // Single-day meeting should span the entire day
      {
        start_date: '2024-12-07 09:00',
        end_date: '2024-12-07 23:59',
        text: 'Single day meeting'
      }
    ]);

    // Event handler to send data to API when an event is saved, created, or updated
    scheduler.attachEvent('onEventSave', async (id, event) => {
      const eventData = {
        id,
        lead_type:2,
        user_id:getdata.getByOne[0]?.user_uuid,
        // user_id:getdata.getByOne[0]?.user_uuid,
        lead_id:getdata.getByOne[0]?.pearl_id,
        meeting_description: event.text,
        completed_by_user:0,
        start_date: event.start_date,
        end_date: event.end_date,
      };
      console.log(eventData, "eventData");

      try {
        const response = await fetch('https://srv626615.hstgr.cloud/save-meeting', {
          method: 'POST', // Change to 'PUT' if updating an existing event
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (response.ok) {
          console.log('Event successfully saved',response);
        } else {
          console.error('Failed to save event');
        }
      } catch (error) {
        console.error('Error sending event data to API', error);
      }

      return true; // Allow the event to be saved in the scheduler
    });

    // Event handler to send data to API when an event is moved (dragged to another date)
    scheduler.attachEvent('onEventChanged', async (id, event) => {
      const eventData = {
        id,
        name: event.text,
        start_date: event.start_date,
        end_date: event.end_date,
      };
      console.log(eventData, "evsadasentData");

      try {
        const response = await fetch('/api/meetings', {
          method: 'PUT', // Use 'PUT' because this is an update to an existing event
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (response.ok) {
          console.log('Event successfully updated');
        } else {
          console.error('Failed to update event');
        }
      } catch (error) {
        console.error('Error sending updated event data to API', error);
      }

      return true; // Allow the event to be updated in the scheduler
    });

  }, []);

  return <div ref={schedulerContainerRef} className="dhx_cal_container" style={{ width: '100%', height: '100%' }} />;
};

export default SchedulerComponent;
