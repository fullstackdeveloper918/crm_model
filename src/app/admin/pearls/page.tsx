import { fetchFromServer } from '@/app/actions/fetchFromServer'
import Pearl_diver_leads from '@/component/Pearl_diver_leads'
import axios from 'axios'
import React from 'react'

const page = async({ searchParams }: { searchParams: any }) => {
  console.log(searchParams, "params");
  
  const currentPage = searchParams.page ? Number(searchParams.page) : 1; // Default to 1 if not found
  console.log(currentPage, "currentPage");

  
  const api: any = {
    url: `https://srv626615.hstgr.cloud/leads-api?page=${currentPage}limit:100`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data = await fetchFromServer(api);
  console.log(data,"sdfasdffasd");
  
  return (
   <>
   <Pearl_diver_leads data={data}/>
   </>
  )
}

export default page