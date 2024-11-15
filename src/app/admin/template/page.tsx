import { fetchFromServer } from '@/app/actions/fetchFromServer'
import Pearl_diver_leads from '@/component/Pearl_diver_leads'
import PearlsSelectUsers from '@/component/PearlsSelectUsers'
import axios from 'axios'
import React from 'react'

const page = async({ searchParams }: { searchParams: any },) => {
  console.log(searchParams, "params");
  // console.log(params,"ioioioio");
  
  const currentPage = searchParams.page ? Number(searchParams.page) : 1; // Default to 1 if not found
  console.log(currentPage, "currentPage");
const currentFilter=searchParams?.filter
const currentSearch=searchParams?.search
  console.log(currentFilter,"currentFilter");
  console.log(currentSearch,"currentSearch");
  const statusMap: { [key: string]: string } = {
    // all: "",
    non_potential: "0",
    potential: "1",
    priority: "2",
    call_lead:"3",
    mail:"4",
    sms:"5"
    // call: "4" // Assuming 'call' is the last option
  };
  const sendStatus = statusMap[currentFilter] || "0"; 
  console.log(sendStatus,"sendStatus");
  
  const api: any = {
    url:currentFilter === "all" 
    ? `https://srv626615.hstgr.cloud/leads-api?page=${currentPage}${currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ''}`
    : `https://srv626615.hstgr.cloud/leads-api?page=${currentPage}&pearl_status=${sendStatus}${currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ''}`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data = await fetchFromServer(api,undefined);
  console.log(data,"sdfasdffasd");
  const apiUrl: any = {
    url: `https://srv626615.hstgr.cloud/count-leads`,
    method: "GET",
    // body: { key: 'value' }
  };
  const fetchData= await fetchFromServer(apiUrl,undefined)
  console.log(fetchData,"yyuyyu");
  const apiUrl1: any = {
    url: `https://srv626615.hstgr.cloud/recent-leads`,
    method: "GET",
    // body: { key: 'value' }
  };
  const fetchData1= await fetchFromServer(apiUrl1,undefined)
  console.log(fetchData1,"fetchData1");
  
  return (
   <>
   <PearlsSelectUsers data={data} fetchData={fetchData} fetchData1={fetchData1} sendStatus={currentFilter} currentSearch={currentSearch}/>
   </>
  )
}

export default page