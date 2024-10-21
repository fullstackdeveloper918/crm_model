import React, { Fragment, ReactNode, useEffect } from "react";
import MainLayout from "../../component/Layout/layout";

const AdminLayout = ({children}:{children:ReactNode}) => {
  
  return (
    <Fragment>
     
      <MainLayout>
      {children}
      </MainLayout>
    </Fragment>
  );
};

export default AdminLayout;
