import React, { useState, useEffect } from "react";
import Truck from "../assets/white.png";


const Invoice1 = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (index, value) => {
    let input = value;
    input = input.replace(/[^0-9/]/g, '');

    if (input.length === 2 && !input.includes('/')) {
      input += '/';
    } else if (input.length === 5 && input.split('/').length - 1 === 1) {
      input += '/';
    }

    handleInputChange(index, "date", input);
  };
  
  const [rows, setRows] = useState([
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
    { date: "", type: "", quantity: "", price: "", amount: "" },
  ]);
  const [total, setTotal] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [advance, setAdvance] = useState(0);

  // Function to print the page
  const print = () => {
    window.print();
  };

  // Handle input changes for each row
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(updatedRows[index].quantity) || 0;
      const price = parseFloat(updatedRows[index].price) || 0;
      updatedRows[index].amount = (quantity * price).toFixed(2);
    }
    setRows(updatedRows);
  };

  // Handle advance input change
  const handleAdvanceChange = (value) => {
    const advanceValue = parseFloat(value) || 0;
    setAdvance(advanceValue);
  };

  // Calculate total amount and pending balance whenever rows or advance change
  useEffect(() => {
    const totalAmount = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
    setTotal(totalAmount);
    setPendingBalance((totalAmount - advance).toFixed(2));
  }, [rows, advance]);

  // Function to format numbers as currency
  const formatCurrency = (num) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "INR" });
  };

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
      <div className="border-2 border-gray-300 p-2 rounded-lg">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
          <img
            src={Truck}
            alt="Truck icon"
            className="h-32 sm:h-32 mr-0 sm:mr-4 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold font-serif text-orange-500 max-sm:text-2xl mb-1">
              Shri Swami Samarth Suppliers
            </h1>
            <p className="text-sm mb-1 font-semibold">
              A/P Wasunde Tal-Daund Dist-Pune Pin-412219
            </p>
            <p className="text-sm mb-2 font-semibold">
              Plaster Sand, Crush Sand 20mm, 10mm, 6mm, 40/60
            </p>
            <div className="flex space-x-3">
              <p className="text-sm font-bold">Vijay Khomane - 8087675100</p>
              <p className="text-sm font-bold">Vikas Khomane - 9075397634</p>
            </div>
          </div>
        </div>

        {/* Bank Info Section */}
        <div className="flex flex-col sm:flex-row justify-between text-lg mb-3 p-2 font-bold font-mono border border-gray-700 rounded-lg">
          <h3 className="mb-1 sm:mb-0">BANK AC NO : 50100506534011</h3>
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
                  Quantity
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

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base max-w-32 min-w-28">
                    {/* <input
                      type="date"
                      value={row.date || ""}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Date for row ${index + 1}`}
                    /> */}
                    {/* <input
                    type="text"
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                     */}

                    <input
                      type="text"
                      // placeholder="dd/mm/yyyy"
                      value={row.date}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                      maxLength="10"
                      
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                      aria-label={`Date for row ${index + 1}`}
                    />

                  </td>

                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base min-w-40">
                    <input
                      type="text"
                      value={row.type || ""}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Type of Material for row ${index + 1}`}
                      placeholder="Material Type"
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      aria-label={`Quantity for row ${index + 1}`}
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      className="text-center w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Rate for row ${index + 1}`}
                    />
                  </td>
                  <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                    {row.amount ? formatCurrency(parseFloat(row.amount)) : "₹0.00"}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base"
                >
                  Total
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {formatCurrency(total)}
                </td>
              </tr>

              {/* Advance Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base"
                >
                  Advance
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={advance}
                    onChange={(e) => handleAdvanceChange(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    aria-label="Advance Payment"
                  />
                </td>
              </tr>

              {/* Pending Balance Row */}
              <tr className="bg-gray-200 font-semibold">
                <td
                  colSpan={5}
                  className="text-center border border-gray-600 p-2 text-sm md:text-base"
                >
                  Pending Balance
                </td>
                <td className="text-center border border-gray-600 p-2 text-sm md:text-base">
                  {formatCurrency(parseFloat(pendingBalance) || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Optional Total Table (Visible on Medium and Larger Screens) */}
        <div className="flex justify-start mt-4 md:block">
          {/* <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-4 font-semibold">Total</td>
                <td>{formatCurrency(total)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Advance</td>
                <td>{formatCurrency(advance)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Pending Balance</td>
                <td>{formatCurrency(parseFloat(pendingBalance) || 0)}</td>
              </tr>
            </tbody>
          </table> */}

          <div className="flex flex-row justify-end">
            <div className="flex flex-col mr-2">
              <h3>Total</h3>
              <h3>Advance</h3>
              <h3>pending</h3>
            </div>
            <div className="flex flex-col">
              <h3>{formatCurrency(total)}</h3>
              <h3>{formatCurrency(advance)}</h3>
              <h3>{formatCurrency(parseFloat(pendingBalance) || 0)}</h3>

            </div>
          </div>



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

export default Invoice1;
