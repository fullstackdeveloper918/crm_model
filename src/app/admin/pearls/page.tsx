import { fetchFromServer } from '@/app/actions/fetchFromServer'
import Pearl_diver_leads from '@/component/Pearl_diver_leads'
import axios from 'axios'
import React from 'react'

const page = async() => {

  const api: any = {
    url: "http://srv626615.hstgr.cloud:3000/leads-api",
    method: "GET",
    // body: { key: 'value' }
    // comment only
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