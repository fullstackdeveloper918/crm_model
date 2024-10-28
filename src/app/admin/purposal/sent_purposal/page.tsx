import { fetchFromServer } from '@/app/actions/fetchFromServer';
import Sent_Purposal from '@/component/Sent_Purposal'
import React from 'react'

const page = async() => {
  // console.log(searchParam?.id,"fgsdfsdf");
  const api1: any = {
    url: "https://srv626615.hstgr.cloud/field-list",
    method: "GET",
    // body: { key: 'value' }
  };

  const data1 = await fetchFromServer(api1);
  console.log(data1,"imported-meta-list");
  return (
    <div>
        <Sent_Purposal data1={data1}/>
    </div>
  )
}

export default page