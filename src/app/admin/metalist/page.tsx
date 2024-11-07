import React, { Fragment } from 'react'
import { fetchFromServer } from '../../actions/fetchFromServer';
import MetaList from '@/component/MetaList';
import { Button, Card, Col, Divider, Row, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

const page = async({ searchParams }: { searchParams: any }) => {
  const currentPage = searchParams.page ? Number(searchParams.page) : 1; 
    const api: any = {
        url: `https://srv626615.hstgr.cloud/imported-meta-list?page=${currentPage}`,
        method: "GET",
        // body: { key: 'value' }
      };
    
      const data = await fetchFromServer(api);
    const api1: any = {
        url: "https://srv626615.hstgr.cloud/field-list",
        method: "GET",
        // body: { key: 'value' }
      };
    
      const data1 = await fetchFromServer(api);
      console.log(data1,"imported-meta-list");
     
  return (
    // imported-meta-list
    <div>
      <MetaList data={data}/>
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
  )
}

export default page