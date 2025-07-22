import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuperAdmin from "./pages/SuperAdmin";
import GenerateInvoice from "./pages/invoice-generate";
import PrivateRoute from "./routes/route";
import FbrTokenList from "./features/fbrToken/FbrTokenList";


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<GenerateInvoice />} />
        <Route path="/fbr-tokens" element={<FbrTokenList />} />
        <Route path="/admin" element={<SuperAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}