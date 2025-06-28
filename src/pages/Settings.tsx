import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { saveCredential } from "../api/dummyApi"; 

export default function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (apiKey && apiSecret) {
      saveCredential("testUser", apiKey, apiSecret); 
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("apiSecret", apiSecret);
      navigate("/credential-status");
    } else {
      alert("Please enter both fields");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-fuchsia-500">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        <div className="p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500 mb-6">
            API Credential Setup
          </h1>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
            Securely connect your FBR Digital Invoice API by providing valid credentials.
          </p>
          <div className="flex items-center border border-indigo-300 rounded-lg mb-5 p-3 bg-gray-50">
            <FaKey className="text-indigo-400 mr-3" />
            <input className="outline-none flex-1 text-base" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <div className="flex items-center border border-indigo-300 rounded-lg mb-8 p-3 bg-gray-50">
            <FaLock className="text-indigo-400 mr-3" />
            <input className="outline-none flex-1 text-base" placeholder="API Secret" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} />
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={handleSave}
            className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white w-full py-3 rounded-lg font-semibold text-base shadow-md">
            Save & Continue
          </motion.button>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-50 to-fuchsia-50">
          <img src="https://cdn-icons-png.flaticon.com/512/711/711284.png" alt="API Illustration" className="w-3/5 h-auto object-contain" />
        </div>
      </motion.div>
    </div>
  );
}
