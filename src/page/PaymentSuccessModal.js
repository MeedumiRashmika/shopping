import React from 'react';
import { jsPDF } from 'jspdf';

const PaymentSuccessModal = ({ isOpen, onClose, receiptData }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Payment Receipt', 105, 20, null, null, 'center');

    // Body content (multiline support)
    const lines = doc.splitTextToSize(receiptData, 180);
    doc.setFontSize(12);
    doc.text(lines, 15, 40);

    // Save PDF
    doc.save('receipt.pdf');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="mb-4 text-xl font-bold text-green-600 sm:text-2xl">Payment Successful ✅</h2>
        <p className="mb-5 text-sm text-gray-700 sm:text-base">
          Your payment was completed successfully!
        </p>

        <button
          onClick={handleDownload}
          className="w-full px-4 py-2 mb-3 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 sm:w-auto"
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

export default PaymentSuccessModal;
