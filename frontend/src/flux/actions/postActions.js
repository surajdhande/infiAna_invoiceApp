import dispatcher from "../dispatchers/appDispatcher";
import actionTypes from "./actionTypes";

var invoices = [
  {
    name: "invoice 1",
  },
  {
    name: "invoice 3",
  },
  {
    name: "invoice 3",
  },
];

export function getInvoices() {
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_INVOICES,
    invoices: invoices[0],
  });
  
}
