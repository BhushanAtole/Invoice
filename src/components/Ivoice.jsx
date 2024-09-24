import React, { useState, useEffect } from "react";
import Truck from "../assets/truck.webp";

const Invoice = () => {
  const [rows, setRows] = useState([
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
    { quantity: "", price: "", amount: "" },
  ]);
  const [total, setTotal] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

  // Function to print the page
  const print = () => {
    window.print();
  };

  // Handle input changes for each row
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    if (field === "quantity" || field === "price") {
      updatedRows[index].amount =
        (parseFloat(updatedRows[index].quantity) || 0) *
        (parseFloat(updatedRows[index].price) || 0);
    }
    setRows(updatedRows);
  };

  // Calculate total amount whenever rows change
  useEffect(() => {
    const totalAmount = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
    setTotal(totalAmount);
    setPendingBalance(totalAmount); // Update pending balance if applicable
  }, [rows]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Print Button */}
      <div className="flex justify-end mb-4">
      <button
  onClick={print}
  className="print-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
>
  Print
</button>

      </div>

      {/* Invoice Container */}
      <div className="border-2 border-gray-300 p-4 rounded-lg">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
          <img
            src={Truck}
            alt="Truck icon"
            className="h-24 sm:h-24 mr-0 sm:mr-4 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold font-serif text-orange-500 max-sm:text-2xl">
              Shri Swami Samarth Suppliers
            </h1>
            <p className="text-sm mb-1 font-semibold font-">
              A/P Wasunde Tal-Daund Dist-Pune Pin-412219
            </p>
            <p className="text-sm mb-2 font-semibold">
              Plaster Sand, Crush Sand 20mm, 10mm, 6mm, 40/60
            </p>
            <div className="flex mb-4 space-x-3">
              <p className="text-sm font-bold">
                Vijay Khomane -  8087675100 
              </p>
              <p className="text-sm font-bold">
                |    
              </p>
              <p className="text-sm font-bold">
              Vikas Khomane  -  9075397634
              </p>
              
            </div>
          </div>
        </div>

        {/* Bank Info Section */}
        <div className="flex flex-col sm:flex-row justify-between text-lg mb-6 p-4 font-bold font-mono border border-gray-700 rounded-lg">
          <h3 className="mb-2 sm:mb-0">BANK AC NO : 50100506534011</h3>
          <h3>IFSC CODE : HDFC0002089</h3>
        </div>

        {/* Table Container with Horizontal Scroll on Small Screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  S.N.
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  Date
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  Type of Material
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  Brass
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base w-24">
                  Rate
                </th>
                <th className="text-center border border-gray-600 p-2 text-sm md:text-base w-24">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    {index + 1}
                  </td>

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="date"
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="text"
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      className="text-center w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    {row.amount}
                  </td>
                </tr>
              ))}
              {/* Total and Pending Balance Rows */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base"
                >
                  Total
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {total}
                </td>
              </tr>
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base"
                >
                  Pending Balance
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {pendingBalance}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Optional Total Table (Visible on Medium and Larger Screens) */}
        <div className="flex justify-end mt-4 hidden md:block">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-4 font-semibold">Total</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Pending Balance</td>
                <td>{pendingBalance}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signatory Section */}
        <div className="mt-8 flex justify-end">
          <div className="text-center">
            <div className="w-32 h-1 border-b border-black mb-2"></div>
            <p className="text-sm">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
