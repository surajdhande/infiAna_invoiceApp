import logo from './logo.svg';
import './App.css';
import InvoiceForm from './components/invoiceForm/invoiceForm';
import { Route,  Routes } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Details from './components/invoiceDetails/invoiceDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route Component={InvoiceForm} path="/invoiceForm"/>
        <Route Component={Login} path="/"/>
        <Route Component={Home} path="/home"/>
        <Route Component={Details} path="/details"/>



      </Routes>
      
    </div>
  );
}

export default App;
