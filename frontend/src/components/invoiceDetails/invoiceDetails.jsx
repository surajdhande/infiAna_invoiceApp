import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./invoiceDetails.scss";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import store from "../../flux/stores/postStores";
import { Button, Col, Row } from "antd";
// import nodemailer from 'nodemailer';

const Details = () => {
  const [details, getDetails] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  let id = queryParam?.get("id");
  useEffect(() => {
    getDetails(store.getInvoiceById(parseInt(id)));
  }, []);
  const payBill = () => {
    store.updateInvoice(parseInt(id), "status", "Paid");
    store.updateInvoice(
      parseInt(id),
      "paidDate",
      new Date().toLocaleDateString()
    );

    window.location.reload();
  };
  //   const sendEmail = async (recipient, subject, body, pdfFile) => {
  //     const transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: 'your_email_address@gmail.com',
  //         pass: 'your_email_password',
  //       },
  //     });

  //     const mailOptions = {
  //       from: 'your_email_address@gmail.com',
  //       to: recipient,
  //       subject: subject,
  //       text: body,
  //       attachments: [{
  //         filename: 'invoice.pdf',
  //         content: pdfFile,
  //       }],
  //     };

  //     await transporter.sendMail(mailOptions);
  //   };
  //   const sendPdf = async () => {
  //     const pdfFile = await pdfView();
  //     const emailSent = await sendEmail('recipient@example.com', 'Subject', 'Body', pdfFile);

  //     if (emailSent) {
  //       // Success!
  //     } else {
  //       // Error sending email
  //     }
  //   };
  const date = new Date(details?.createdDate);
  //   const PDFView = () => {
  // const pdfView = (
  //   <Document page="A4">
  //     <Page>
  //       <View>
  //         <div className="invoice-details">
  //           <div className="details-sender">
  //             <section className="details-sender-from">
  //               <h2>Infinite Analytics</h2>
  //               <p>XYZ</p>
  //               <p>Mumbai</p>
  //               <p>Bandra East, Mumbai - 40051</p>
  //               <p>India</p>
  //             </section>
  //             <section className="details-sender-label">
  //               <label>INVOICE</label>
  //             </section>
  //           </div>
  //           <div className="details-receiver">
  //             <section className="details-receiver-to">
  //               <h3>Bill To</h3>
  //               <p>{details?.customerName}</p>
  //               <p>Mumbai</p>
  //               <p>Bandra East, Mumbai - 40051</p>
  //               <p>India</p>
  //             </section>
  //             <section className="details-receiver-to">
  //               <h4>
  //                 Invoice No :- <label>INFA{details?.id}</label>
  //               </h4>
  //               <h4>
  //                 Invoice Date :-{" "}
  //                 <label>{date.toLocaleDateString("en-US")}</label>
  //               </h4>
  //               <h4>
  //                 Due Date :- <label>{details?.dueDate}</label>
  //               </h4>
  //             </section>
  //           </div>
  //           <div className="details-costSummary">
  //             <h3>Cost Summary</h3>
  //             <Row className="row-heading">
  //               <Col span={6}>Item Description</Col>
  //               <Col span={6}>Quantity</Col>
  //               <Col span={6}>Rate</Col>
  //               <Col span={6}>Amount</Col>
  //             </Row>
  //             <Row className="items">
  //               <Col span={6}>Consulting Cost</Col>
  //               <Col span={6}>{details?.consultingHours}</Col>
  //               <Col span={6}>200/hr</Col>
  //               <Col span={6}>{details?.consultingHours * 200}</Col>
  //             </Row>
  //             <Row className="items">
  //               <Col span={6}>Labour Cost</Col>
  //               <Col span={6}>{details?.laborHours}</Col>
  //               <Col span={6}>150/hr</Col>
  //               <Col span={6}>{details?.laborHours * 150}</Col>
  //             </Row>
  //             <Row className="items">
  //               <Col span={6}>Material Cost</Col>
  //               <Col span={6}>{details?.materialWeight}</Col>
  //               <Col span={6}>70/kg</Col>
  //               <Col span={6}>{details?.materialWeight * 70}</Col>
  //             </Row>
  //             <Row className="row-heading">
  //               <Col span={6}></Col>
  //               <Col span={6}></Col>
  //               <Col span={6}>Total</Col>
  //               <Col span={6}>
  //                 {details?.materialWeight * 70 +
  //                   details?.laborHours * 150 +
  //                   details?.consultingHours * 200}
  //               </Col>
  //             </Row>
  //           </div>
  //           <div className="details-note">
  //             <h3>Payment type </h3> {details?.paymentType}
  //           </div>
  //           <div className="details-note">
  //             <h3>Note </h3> {details?.notes}
  //           </div>
  //           <div className="details-terms-condition">
  //             <h3>Terms and Conditions </h3> Please make the payment by the
  //             due date.
  //           </div>
  //           <div className="details-btns">
  //             <Button onClick={() => navigate(-1)}>Back </Button>
  //             {details?.status !== "Paid" ? (
  //               <Button onClick={() => payBill()}>Pay Now</Button>
  //             ) : (
  //               <Button disabled style={{ backgroundColor: "green" }}>
  //                 Bill Paid{" "}
  //               </Button>
  //             )}
  //           </div>
  //         </div>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  //     const blob = new Blob([pdfView], { type: "application/pdf" });
  //     const url = window.URL.createObjectURL(blob);

  //     const anchor = document.createElement("a");
  //     anchor.href = url;
  //     anchor.download = "invoice.pdf";
  //     anchor.click();

  //     window.URL.revokeObjectURL(url);
  //   };
  return (
    <div className="invoice">
      <div className="invoice-details">
        <div className="details-sender">
          <section className="details-sender-from">
            <h2>Infinite Analytics</h2>
            <p>XYZ</p>
            <p>Mumbai</p>
            <p>Bandra East, Mumbai - 40051</p>
            <p>India</p>
          </section>
          <section className="details-sender-label">
            <label>INVOICE</label>
          </section>
        </div>
        <div className="details-receiver">
          <section className="details-receiver-to">
            <h3>Bill To</h3>
            <p>{details?.customerName}</p>
            <p>
              {details?.customerAddressLine1},{details?.customerAddressLine2} -{" "}
              {details?.customerAddressLine3}
            </p>
            <p>India</p>
          </section>
          <section className="details-receiver-to">
            <h4>
              Invoice No :- <label>INFA{details?.id}</label>
            </h4>
            <h4>
              Invoice Date :- <label>{date.toLocaleDateString()}</label>
            </h4>
            <h4>
              Due Date :- <label>{details?.dueDate}</label>
            </h4>
          </section>
        </div>
        <div className="details-costSummary">
          <h3>Cost Summary</h3>
          <Row className="row-heading">
            <Col span={6}>Item Description</Col>
            <Col span={6}>Quantity</Col>
            <Col span={6}>Rate</Col>
            <Col span={6}>Amount</Col>
          </Row>
          <Row className="items">
            <Col span={6}>Consulting Cost</Col>
            <Col span={6}>{details?.consultingHours}</Col>
            <Col span={6}>200/hr</Col>
            <Col span={6}>{details?.consultingHours * 200}</Col>
          </Row>
          <Row className="items">
            <Col span={6}>Labour Cost</Col>
            <Col span={6}>{details?.laborHours}</Col>
            <Col span={6}>150/hr</Col>
            <Col span={6}>{details?.laborHours * 150}</Col>
          </Row>
          <Row className="items">
            <Col span={6}>Material Cost</Col>
            <Col span={6}>{details?.materialWeight}</Col>
            <Col span={6}>70/kg</Col>
            <Col span={6}>{details?.materialWeight * 70}</Col>
          </Row>
          <Row className="row-heading">
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}>Total</Col>
            <Col span={6}>
              {details?.materialWeight * 70 +
                details?.laborHours * 150 +
                details?.consultingHours * 200}
            </Col>
          </Row>
        </div>
        <div className="details-note">
          <h3>Payment type </h3> {details?.paymentType}
        </div>
        <div className="details-note">
          <h3>Note </h3> {details?.notes}
        </div>
        <div className="details-terms-condition">
          <h3>Terms and Conditions </h3> Please make the payment by the due
          date.
        </div>
        <div className="details-btns">
          <Button onClick={() => navigate(-1)}>Back </Button>
          {details?.status !== "Paid" ? (
            <Button onClick={() => payBill()}>Pay Now</Button>
          ) : (
            <Button disabled style={{ backgroundColor: "green" }}>
              Bill Paid{" "}
            </Button>
          )}
        </div>
      </div>
      {/* <Button onClick={PDFView} style={{backgroundColor:"black",color:"white"}}>Download PDF</Button>{" "} */}
      <Button
        /* onClick={sendPdf} */ style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        Send Mail
      </Button>{" "}
    </div>
  );
};
export default Details;
