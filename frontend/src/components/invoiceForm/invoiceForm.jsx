import React, { useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";

import "./invoiceForm.scss";
import TextArea from "antd/es/input/TextArea";
import store from "../../flux/stores/postStores";
const InvoiceForm = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [customerName, setCustomerName] = useState("");
  const [customerAddressLine1, setCustomerAddressLine1] = useState("");
  const [customerAddressLine2, setCustomerAddressLine2] = useState("");
  const [customerAddressLine3, setCustomerAddressLine3] = useState("");

  const [consultingHours, setConsultingHours] = useState(0);
  const [customerNumber, setCustomerNumber] = useState(0);
  const [materialWeight, setMaterialWeight] = useState(0);
  const [paymentType, setPaymentType] = useState("Cash");

  const [laborHours, setLaborHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const validate = () => {
    if (customerName === "") {
      alert("Please enter a customer name");
      return false;
    }
    if (customerAddressLine1 === "") {
      alert("Please enter a customer address line 1");
      return false;
    }
    if (consultingHours === 0) {
      alert("Please enter a consulting hours");
      return false;
    }
    if (customerNumber === 0) {
      alert("Please enter a customer number");
      return false;
    }
    if (materialWeight === 0) {
      alert("Please enter a material weight");
      return false;
    }
    if (dueDate === null) {
      alert("Please select a due date");
      return false;
    }
    if (paymentType === "") {
      alert("Please select a payment type");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const invoiceData = {
      dueDate,
      customerName,
      customerAddressLine1,
      customerAddressLine2,
      customerAddressLine3,
      consultingHours,
      laborHours,
      notes,
      customerNumber,
      materialWeight,
      createdDate: new Date(),
      paymentType,
    };
    if (validate()) {
      store.addInvoice(invoiceData);
      setModalOpen(false);
      window.location.reload();
    } else {
      alert("Please Fill All Details");
    }
  };

  return (
    <div className="invoice">
      <Button className="crt-invc" onClick={() => setModalOpen(true)}>
        Create New{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>{" "}
      </Button>
      <Modal
        open={modalOpen}
        className="modal"
        onCancel={(e) => setModalOpen(false)}
      >
        <Form
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{}}
          className="invoice-form"
        >
          <div className="invoice-form-section-heading">Contact Details</div>
          <Form.Item label="Customer Name">
            <Input
              placeholder="Name"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label=" Address Line 1 ">
            <Input
              placeholder="eg. House Name / Plot No. etc "
              onChange={(e) => setCustomerAddressLine1(e.target.value)}
            />
          </Form.Item>
          <Form.Item label=" Address Line 2">
            <Input
              placeholder="eg. City,District"
              onChange={(e) => setCustomerAddressLine2(e.target.value)}
            />
          </Form.Item>{" "}
          <Form.Item label=" Pincode ">
            <Input
            type="number"
              placeholder="Pincode"
              onChange={(e) => setCustomerAddressLine3(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Contact No">
            <Input
              type="number"
              placeholder="Contact No"
              onChange={(e) => setCustomerNumber(e.target.value)}
            />
          </Form.Item>
          <div className="invoice-form-section-heading">
            Consulting Charges
            <div className="invoice-form-section-items">
              <Form.Item label="Time">
                <Input
                  type="number"
                  onChange={(e) => setConsultingHours(e.target.value)}
                />
                Rs200/hour
              </Form.Item>
              <Form.Item label="Total">{consultingHours * 200}</Form.Item>
            </div>
          </div>
          <div className="invoice-form-section-heading">
            Labour Cost
            <div className="invoice-form-section-items">
              <Form.Item label="Time">
                <Input
                  type="number"
                  onChange={(e) => setLaborHours(e.target.value)}
                />
                Rs150/hour
              </Form.Item>
              <Form.Item label="Total">{laborHours * 150} </Form.Item>
            </div>
          </div>
          <div className="invoice-form-section-heading">
            Material Cost - Iron
            <div className="invoice-form-section-items">
              <Form.Item label="Weight">
                <Input
                  type="number"
                  onChange={(e) => setMaterialWeight(e.target.value)}
                />
                Rs70/kg
              </Form.Item>
              <Form.Item label="Total">{materialWeight * 70} </Form.Item>
            </div>
          </div>{" "}
          <div className="invoice-form-section-heading">
            Due Date
            <div className="invoice-form-section-items">
              <Form.Item label="Date">
                <DatePicker
                  style={{ width: "10vw" }}
                  format="DD/MM/YYYY"
                  onChange={(e) => {
                    setDueDate(e.format("DD/MM/YYYY"));
                  }}
                  // defaultValue={moment('01/01/2015', 'DD/MM/YYYY')}
                />
              </Form.Item>
            </div>
          </div>{" "}
          <div className="invoice-form-section-heading">
            Payment Type
            <div className="invoice-form-section-items">
              <Select
                style={{
                  width: 200,
                }}
                defaultValue="Cash"
                onChange={(e) => setPaymentType(e)}
                placeholder="Select Payment Type"
                options={[
                  {
                    options: [
                      {
                        label: "Cash",
                        value: "Cash",
                      },
                      {
                        label: "UPI",
                        value: "upi",
                      },
                      {
                        label: "Debit Card",
                        value: "Debit Card",
                      },
                      {
                        label: "Credit Card",
                        value: "Credit Card",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>{" "}
          <div className="invoice-form-section-heading">
            Note
            <div className="invoice-form-section-items">
              <TextArea onChange={(e) => setNotes(e.target.value)}></TextArea>{" "}
            </div>
          </div>
          <div className="btns">
            <Button onClick={(e) => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceForm;
