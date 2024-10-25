
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import LeadsUserDeatils from "@/component/LeadsUserDeatils";


const page = async({params}:any) => {
  console.log(params.id,"searchParams");
  
  const api: any = {
    url: `https://srv626615.hstgr.cloud/get_one_audience?pearlId=${params.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api);
  console.log(data,"data");
  
  return (
   <div className="">
    <LeadsUserDeatils data={data}/>
   </div>
  )
}

export default page