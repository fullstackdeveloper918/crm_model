
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import LeadsUserDeatils from "@/component/LeadsUserDeatils";


const page = async({params}:any) => {
  console.log(params.id,"searchParams");
  
  const api: any = {
    url: `https://srv626615.hstgr.cloud/get_one_audience?pearlId=${params.id}`,
    method: "GET",
  };

  const data = await fetchFromServer(api);
  console.log(data,"data");
  const api1: any = {
    url: `https://srv626615.hstgr.cloud/leads-api`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data1 = await fetchFromServer(api1);
  console.log(data1,"qwerty");
  return (
   <div className="">
    <LeadsUserDeatils data={data} data1={data1}/>
   </div>
  )
}

export default page