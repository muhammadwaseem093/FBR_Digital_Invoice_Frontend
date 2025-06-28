import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../auth/token";

export default function PrivateRoute(){
    return getToken() ? <Outlet /> : <Navigate to="/" />;
}