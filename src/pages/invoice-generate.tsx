import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaArrowLeft } from "react-icons/fa";

interface InvoiceRow {
  "Sr No": number;
  "Part Name": string;
  "Part No": number;
  "Quantity": number;
  "Rate": number;
  "Amount": number;
  "Sales Tax": number;
  "Net Amount": number;
}

export default function GenerateInvoice() {
  const [data, setData] = useState<InvoiceRow[]>([]);
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const wb = XLSX.read(evt.target?.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<InvoiceRow>(ws);
        setData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleConfirm = () => {
    alert("Invoice Data Sent to API (Dummy Process)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-pink-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-5xl w-full">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-purple-800">Digital Invoice Generator</h2>
          <button onClick={() => navigate("/dashboard")} className="flex items-center bg-blue-600 text-white px-5 py-2 rounded hover:scale-105">
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input type="file" accept=".xlsx" onChange={handleFile} className="border border-gray-300 p-2 w-full rounded" />
        </div>

        {data.length > 0 && (
          <div className="bg-white border p-8 shadow-inner w-[794px] h-[1123px] mx-auto overflow-auto">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="font-bold text-xl">Progressive Auto Engineering (Pvt.) Ltd.</h2>
                <p>Elam Din Block, Sharaqpur Road, Bagumkot, Shahdera, Lahore</p>
                <p>NTN: B322387-7 &nbsp;&nbsp; STN: 32 77 8763 235 17</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">SALES TAX INVOICE</h3>
                <p>MILLAT TRACTORS LIMITED</p>
                <p>9-KM Sheikhupura Road, Lahore</p>
                <p>NTN 0801437-0</p>
                <p>Phone 042-111 200 786</p>
                <p>Vendor Code 117</p>
              </div>
            </div>

            <div className="flex justify-end text-sm mb-4">
              <div>
                <p>Inv No. 314</p>
                <p>Date: 19/06/2025</p>
                <p>DC No. 314</p>
                <p>PO No. 20904</p>
              </div>
            </div>

            <table className="w-full border text-sm mb-4">
              <thead>
                <tr>
                  <th className="border p-1">Sr No</th>
                  <th className="border p-1">Part Name</th>
                  <th className="border p-1">Part No</th>
                  <th className="border p-1">Quantity</th>
                  <th className="border p-1">Rate</th>
                  <th className="border p-1">Amount</th>
                  <th className="border p-1">Sales Tax</th>
                  <th className="border p-1">Net Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border p-1 text-center">{row["Sr No"]}</td>
                    <td className="border p-1">{row["Part Name"]}</td>
                    <td className="border p-1">{row["Part No"]}</td>
                    <td className="border p-1 text-center">{row["Quantity"]}</td>
                    <td className="border p-1 text-right">{row["Rate"]}</td>
                    <td className="border p-1 text-right">{row["Amount"]}</td>
                    <td className="border p-1 text-right">{row["Sales Tax"]}</td>
                    <td className="border p-1 text-right">{row["Net Amount"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mb-4">
              <div>
                <h4 className="font-bold">Unit Summary</h4>
                <p>PCS {data.reduce((acc, row) => acc + row["Quantity"], 0)}</p>
              </div>
              <div className="text-right">
                <p>Sub Total: Rs. {data.reduce((acc, row) => acc + row["Amount"], 0).toFixed(2)}</p>
                <p>GST: Rs. {data.reduce((acc, row) => acc + row["Sales Tax"], 0).toFixed(2)}</p>
                <p className="font-bold text-lg">Total: Rs. {data.reduce((acc, row) => acc + row["Net Amount"], 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold">Notes:</h4>
              <p>Shipping Address:</p>
              <p>Amount in Words: One Hundred Ten Thousand Five Hundred Sixty-one Only.</p>
            </div>

            <div className="mt-16 text-center">
              <p>__________________________</p>
              <p className="font-bold">Muhammad Umair</p>
              <p>Authorized Signature</p>
            </div>

            <div className="text-center mt-8">
              <button onClick={handleConfirm} className="bg-green-600 text-white px-5 py-2 rounded hover:scale-105">
                Confirm & Generate Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}