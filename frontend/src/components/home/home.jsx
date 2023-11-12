import React, { useEffect, useState } from "react";
import "./home.scss";

import { Button, Col, Row } from "antd";
import InvoiceForm from "../invoiceForm/invoiceForm";
import store from "../../flux/stores/postStores";
import dispatcher from "../../flux/dispatchers/appDispatcher";
import actionTypes from "../../flux/actions/actionTypes";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import UserLogo from "../../user.png";
const Home = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [details, getDetails] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  useEffect(() => {
    setInvoicesData(store.getInvoices());
  }, []);

  const onChange = () => {
    store.addInvoice({ name: "shubham" });
    setInvoicesData(store.getInvoices());
  };
  const updateInvoiceField = () => {
    store.updateInvoice(1699765877826, "name", "suraj");
    setInvoicesData(store.getInvoices());
  };
  const invoiceDetails = (id) => {
    queryParam.append("id", id);
    // getDetails(store.getInvoiceById(id));
    navigate(`/details?id=${id}`);
  };
  const overDueStatus = (idx) => {
    const date1 = moment(new Date().toLocaleDateString(), "DD/MM/YYYY");
    const date2 = moment(invoicesData?.[idx].dueDate, "DD/MM/YYYY");

    const differenceInDays = moment.duration(date2.diff(date1)).asDays();
    if (differenceInDays > -1) {
      return "No";
    } else {
      return "Yes";
    }
  };

  return (
    <div className="home-page">
      <div className="header">
        <span onClick={() => updateInvoiceField()}>Infinite Analytics</span>{" "}
        <img src={UserLogo} alt="User" className="logo"></img>
      </div>
      <div className="menu-items">
        <span className="title" onClick={() => onChange()}>
          Invoices
        </span>{" "}
        <InvoiceForm></InvoiceForm>
      </div>
      <Row className="row-heading">
        <Col span={7}>Customer Name</Col>
        <Col span={4}>Invoice No</Col>
        <Col span={3}>Created On</Col>
        <Col span={3}>Due Date</Col>
        <Col span={3}>Payment Type</Col>
        <Col span={2}>Status</Col>
        <Col span={2}>Over Due</Col>
      </Row>
      <div className="scrolling">
        {invoicesData?.map((e, idx) => {
          return (
            <Row className="row-datasource">
              <Col span={7}>{e.customerName}</Col>
              <Col
                span={4}
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => invoiceDetails(e?.id)}
              >
                {e.id}
              </Col>
              <Col span={3}>{new Date(e.createdDate).toLocaleDateString()}</Col>
              <Col span={3}>{e.dueDate}</Col>
              <Col span={3}>{e.paymentType}</Col>
              <Col span={2}>{e.status}</Col>
              <Col span={2}>{overDueStatus(idx)}</Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
