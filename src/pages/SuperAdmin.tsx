import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/token";

export default function SuperAdmin(){
    const navigate = useNavigate();
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">SuperAdmin Dashboard</h2>
            <button className="bg-red-500 text-white px-4 py2" onClick={() => {clearToken(); navigate("/"); }}>Logout</button>
        </div>
    );
}