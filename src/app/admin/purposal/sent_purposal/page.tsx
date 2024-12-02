import { fetchFromServer } from '@/app/actions/fetchFromServer';
import Sent_Purposal from '@/component/Sent_Purposal'
import React from 'react'

const page = async({ searchParams }: { searchParams: any }) => {
  console.log(searchParams.pearls_lead_id,"fgsdfsdf");
  const api1: any = {
    url: "https://srv626615.hstgr.cloud/field-list",
    method: "GET",
    // body: { key: 'value' }
  };

  const data1 = await fetchFromServer(api1,undefined);
  console.log(data1,"imported-meta-list");


  const api: any = {
    url: `https://srv626615.hstgr.cloud/get_one_audience?pearlId=${searchParams.pearls_lead_id}`,
    method: "GET",
  };

  const data = await fetchFromServer(api,undefined);
  console.log(data,"qwqwqwqw");
 
  return (
    <div>
        <Sent_Purposal data1={data1} data={data}/>
    </div>
  )
}

export default page