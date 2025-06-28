import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import SuperAdmin from "./pages/SuperAdmin";
import GenerateInvoice from "./pages/invoice-generate";
import ViewCredential from "./pages/ViewCredential";
import PrivateRoute from "./routes/route";


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<GenerateInvoice />} />
        <Route path="/credential-status" element={<ViewCredential />} />
        <Route path="/admin" element={<SuperAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}