import { fetchFromServer } from '@/app/actions/fetchFromServer';
import MetaListDetails from '@/component/MetaListDetails'
import React from 'react'

const page =async ({params}:any) => {
      
  const api: any = {
    url: `https://srv626615.hstgr.cloud/single-meta-list/${params.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api,undefined);
  console.log(data,"qweedd");
  const api1: any = {
    // url: `https://srv626615.hstgr.cloud/get-meta-activity/67aa1f24-3994-46c0-b4e8-d7173b08ab62`,
    url: `https://srv626615.hstgr.cloud/get-meta-activity/${params.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data1 = await fetchFromServer(api1,undefined);
  console.log(data1,"werwe");
  
  return (
    <div>
        <MetaListDetails data={data} activity={data1}/>
    </div>
  )
}

export default page