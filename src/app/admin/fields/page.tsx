import Fields from '@/component/Fields'
import React from 'react'

const page = ({searchParams}:any) => {
  console.log(searchParams.type,"gjgjg");
  const searchData=searchParams.type
  return (
    <div>
      <Fields searchData={searchData}/>
    </div>
  )
}

export default page