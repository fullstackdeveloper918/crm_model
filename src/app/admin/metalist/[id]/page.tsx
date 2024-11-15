import { fetchFromServer } from '@/app/actions/fetchFromServer';
import MetaListDetails from '@/component/MetaListDetails'
import React from 'react'

const page =async ({params}:any) => {
      
  const api: any = {
    url: `https://srv626615.hstgr.cloud/imported-meta-single-list?user_uuid=${params.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api,undefined);
  console.log(data,"qweedd");
  
  return (
    <div>
        <MetaListDetails data={data}/>
    </div>
  )
}

export default page