// OrderDetailContext.js
import { createContext, useContext, useState } from 'react';

const OrderDetailContext = createContext();

export const useOrderDetail = () => {
  return useContext(OrderDetailContext);
};

export const OrderDetailProvider = ({ children }) => {
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(null);

  const setInvoiceNo = (invoiceNo) => {
    setSelectedInvoiceNo(invoiceNo);
  };
  console.log('setInvoiceNo', setInvoiceNo);

  return (
    <OrderDetailContext.Provider value={{ selectedInvoiceNo, setInvoiceNo }}>
      {children}
    </OrderDetailContext.Provider>
  );
};
