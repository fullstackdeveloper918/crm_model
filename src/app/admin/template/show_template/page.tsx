import ShowTemplate from "@/component/ShowTemplate";
import React from "react";

const page = ({searchParams}:any) => {
  console.log(searchParams.email_type,"searchParams");
  
  return (
  <ShowTemplate searchQuery={searchParams.email_type}/>
  );
};
export default page;