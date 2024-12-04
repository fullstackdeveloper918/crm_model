import React, { Fragment } from "react";
import { fetchFromServer } from "../../actions/fetchFromServer";
import MetaList from "@/component/MetaList";
import { Button, Card, Col, Divider, Row, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

const page = async ({ searchParams }: { searchParams: any }) => {
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const currentSearch = searchParams?.search;
  console.log(searchParams, "currentSearch");
  const chamber=searchParams?.chamber
  const filter=searchParams?.filter
  console.log(chamber,"chadfddddmber");
  

  const currentFilter = searchParams?.filter;

  const statusMap: { [key: string]: string } = {
    // all: "",
    // non_potential: "0",
    // potential: "1",
    // priority: "2",
    call_lead:"6",
    mail:"5",
    sms:"4"
    // call: "4" // Assuming 'call' is the last option
  };
  const sendStatus = statusMap[currentFilter] || "0"; 
  console.log(sendStatus,"sendStatus");
  // const api: any = {
  //   url: `https://srv626615.hstgr.cloud/meta-list?page=${currentPage}${
  //     currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ""
  //   }${chamber? `&chamber=${encodeURIComponent(chamber)}`:""}`,
  //   // url: `https://srv626615.hstgr.cloud/imported-meta-list?page=${currentPage}`,
  //   method: "GET",
  //   // body: { key: 'value' }
  // };
  const api: any = {
    url: `https://srv626615.hstgr.cloud/meta-list?page=${currentPage}${
      currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ""
    }${chamber? `&chamber=${encodeURIComponent(chamber)}`:""}${filter? `&filter=${sendStatus}`:""}`,
    // url: `https://srv626615.hstgr.cloud/imported-meta-list?page=${currentPage}`,
    method: "GET",
    // body: { key: 'value' }
  };

  const data = await fetchFromServer(api, undefined);
  const api1: any = {
    url: "https://srv626615.hstgr.cloud/metachamber-columns",
    method: "GET",
    // body: { key: 'value' }
  };

  const data1 = await fetchFromServer(api1, undefined);
  console.log(data, "checkdata");

  return (
    // imported-meta-list
    <div>
      <MetaList
        data={data}
        sendStatus={currentFilter}
        currentSearch={currentSearch}
        data1={data1}
      />
      {/* <Fragment>
    <section>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card className="common-card">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              <h4 className="m-0 fw-bold">
                Lead List
              </h4>
            </div>
            <Divider />
            <div className="tabs-wrapper my-4">
              
              <>
                <Table
                  className="tableBox"
                //   dataSource={dataSource}
                  columns={columns}
                //   pagination={{
                //     position: ["bottomCenter"],
                //   }}
                />
              </>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  </Fragment> */}
    </div>
  );
};

export default page;
