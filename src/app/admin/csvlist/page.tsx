"use client";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import AddCsvData from "@/component/AddCsvData";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  // const api: any = {
  //     url: "https://srv626615.hstgr.cloud/imported-file-path",
  //     method: "GET",
  //     // body: { key: 'value' }
  //     // comment only
  //   };

  //   const data = await fetchFromServer(api);
  //   console.log(data,"qwerty");

  const [state, setState] = useState<any>();
  const getData = async () => {
    const res = await axios.get(
      `https://srv626615.hstgr.cloud/imported-file-path`
    );
    console.log(res, "check");
    setState(res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <AddCsvData />
    </div>
  );
};

export default page;
