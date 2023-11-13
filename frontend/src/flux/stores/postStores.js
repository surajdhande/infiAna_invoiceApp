import { EventEmitter } from "events";
import dispatcher from "../dispatchers/appDispatcher";
import actionTypes from "../actions/actionTypes";
const CHANGE_EVENT = "newChange";

let invoices = [];

class InvoiceStore extends EventEmitter {
  constructor() {
    super();

    const invoicesData = localStorage.getItem("invoices");

    if (invoicesData) {
      invoices = JSON.parse(invoicesData);
    } else {
      invoices = [];
    }
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getInvoices() {
    return [...invoices];
  }

  addInvoice(invoiceData) {
    invoiceData.id = Date.now();
    invoiceData.status = "Unpaid";
    invoiceData.paidDate = "-";
    invoices.push(invoiceData);
    this.emitChange();
    this.saveToLocalStorage();
  }
  getInvoiceById(id) {
    console.log(id);
    const data = invoices?.find((invoice) => invoice.id === id);
    console.log(data);
    return data;
  }
  updateInvoice(id, fieldName, newValue) {
    const invoice = invoices.find((invoice) => invoice.id === id);

    if (invoice) {
      invoice[fieldName] = newValue;
      this.emitChange();
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    const invoicesData = JSON.stringify(invoices);
    localStorage.setItem("invoices", invoicesData);
  }
}

const store = new InvoiceStore();

dispatcher.register((action) => {
  switch (action.actionTypes) {
    case actionTypes.GET_INVOICES:
      invoices = action.invoices;
      store.emitChange();
      break;
    default:
  }
});

export default store;
