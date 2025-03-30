import React, { useState, useEffect } from 'react';
import { FaCcPaypal, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

// ✅ Payment Success Modal
const PaymentSuccessModal = ({ isOpen, onClose, receiptData }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Dark gray
    //doc.setFont('helvetica', 'bold');
    doc.text(' Payment Receipt', 105, 20, null, null, 'center');

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(15, 25, 195, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black

    const receiptLines = receiptData.split('\n');
    let y = 40;

    // Body content
    receiptLines.forEach((line) => {
      if (line.trim() !== '') {
        doc.text(line, 20, y);
        y += 10;
      }
    });

    // Footer line
    doc.setLineWidth(0.1);
    doc.line(15, y + 10, 195, y + 10);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for shopping with us!', 105, y + 20, null, null, 'center');

    doc.save('receipt.pdf');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="mb-4 text-xl font-bold text-black sm:text-2xl">Payment Successful</h2>
        <p className="mb-5 text-sm text-gray-700 sm:text-base">
          Your payment was completed successfully!
        </p>

        <button
          onClick={handleDownload}
          className="w-full px-4 py-2 mb-3 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue3 sm:w-auto"
        >
          Download Receipt (PDF)
        </button>

        <br />

        <button
          onClick={onClose}
          className="text-sm text-red-600 underline hover:text-red-800 sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ✅ Main Payment Page Component
const PaymentPage = () => {
  const [form, setForm] = useState({
    cardType: '',
    cardNumber: '',
    name: '',
    year: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});
  const [cartData, setCartData] = useState({ total: 0, totalItems: 0 });
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cartTotal'));
    if (data) setCartData(data);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
  
    // Card Type
    if (!form.cardType) {
      newErrors.cardType = 'Select a card type';
    }
  
    // Card Number
    if (!/^\d{16}$/.test(form.cardNumber)) {
      newErrors.cardNumber = 'Enter a 16-digit card number';
    }
  
    // Cardholder Name
    if (!form.name.trim()) {
      newErrors.name = 'Enter cardholder name';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }
  
    // Expiry Year (MM/YYYY)
    if (!form.year || !/^\d{2}\/\d{4}$/.test(form.year)) {
      newErrors.year = 'Enter valid expiry (MM/YYYY)';
    } else {
      const [month, year] = form.year.split('/');
      const mm = parseInt(month);
      const yyyy = parseInt(year);
      if (mm < 1 || mm > 12) {
        newErrors.year = 'Enter a valid month (01–12)';
      }
      // Optional: Check if expiry is not in the past
      const now = new Date();
      const expiryDate = new Date(`${yyyy}-${mm}-01`);
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      if (expiryDate < currentMonthStart) {
        newErrors.year = 'Card has expired';
      }
    }
  
    // CVC
    if (!/^\d{3,4}$/.test(form.cvc)) {
      newErrors.cvc = 'Enter valid 3 or 4 digit CVC';
    }
  
    // Set errors and return
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const generateReceipt = () => {
    const date = new Date().toLocaleString();
    return `Receipt\nDate: ${date}\nCardholder: ${form.name}\nCard Type: ${form.cardType}\nAmount Paid: Rs ${cartData.total.toFixed(2)}\nItems: ${cartData.totalItems}`;
  };

  const saveToPaymentHistory = (receiptText) => {
    const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    history.push({ receipt: receiptText, timestamp: new Date().toISOString() });
    localStorage.setItem('paymentHistory', JSON.stringify(history));
  };

  const handleSubmit = () => {
    if (validate()) {
      const receiptText = generateReceipt();
      setReceipt(receiptText);
      saveToPaymentHistory(receiptText);
      setShowModal(true);
      localStorage.removeItem('cartTotal');
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto mt-10 bg-white shadow-md sm:p-8 rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold text-center">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[{ type: 'PayPal', icon: <FaCcPaypal className="text-2xl text-blue-600" /> },
          { type: 'Visa', icon: <FaCcVisa className="text-2xl text-blue-800" /> },
          { type: 'MasterCard', icon: <FaCcMastercard className="text-2xl text-red-600" /> },
          { type: 'Cash on Delivery', icon: null }].map(({ type, icon }) => (
          <label
            key={type}
            className="flex items-center p-3 space-x-2 border rounded cursor-pointer hover:shadow-md"
          >
            <input
              type="radio"
              name="cardType"
              value={type}
              onChange={handleChange}
              checked={form.cardType === type}
            />
            {icon && <span>{icon}</span>}
            <span className="text-sm sm:text-base">{type}</span>
          </label>
        ))}
      </div>
      {errors.cardType && <p className="mb-2 text-red-500">{errors.cardType}</p>}

      {/* Input Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            maxLength="16"
             placeholder="XXXXXXXXXXXXXXXX"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">Cardholder Name</label>
          <input
            type="text"
            name="name"
             placeholder="Enter Your Name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">CVC</label>
          <input
            type="text"
            name="cvc"
            maxLength="3"
             placeholder="xxxx"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.cvc && <p className="text-sm text-red-500">{errors.cvc}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">Year (MM/YYYY)</label>
          <input
            type="text"
            name="year"
            placeholder="MM/YYYY"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
        </div>
      </div>

      {/* Summary & Button */}
      <div className="pt-4 mt-6 border-t">
        <p className="font-semibold">Subtotal: Rs {cartData.total.toFixed(2)}</p>
        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-4 text-white rounded bg-blue2 hover:bg-blue3"
        >
          Confirm Payment
        </button>
      </div>

      {/* ✅ Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        receiptData={receipt}
      />
    </div>
  );
};

export default PaymentPage;
