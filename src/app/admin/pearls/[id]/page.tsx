
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import LeadsUserDeatils from "@/component/LeadsUserDeatils";


const page = async({params}:any) => {
  console.log(params.id,"searchParams");
  
  const api: any = {
    url: `https://srv626615.hstgr.cloud/get_one_audience?pearlId=${params.id}`,
    method: "GET",
  };

  const data = await fetchFromServer(api,undefined);
  console.log(data,"qwqwqwqw");
  const api1: any = {
    url: `https://srv626615.hstgr.cloud/leads-api`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data1 = await fetchFromServer(api1,undefined);
  console.log(data1,"qwerty");

  const newStr = data?.getByOne[0]?.user_uuid.replace(/user_uuid: '.*?',/, '');

  const api2: any = {
    url: `https://srv626615.hstgr.cloud/user-activity-list?user_uuid=${newStr}`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data2 = await fetchFromServer(api2,undefined);
  console.log(data2,"1234567");
  // data?.getByOne[0]?.user_uuid
  return (
   <div className="">
    <LeadsUserDeatils data={data} data1={data1}/>
   </div>
  )
}

export default page