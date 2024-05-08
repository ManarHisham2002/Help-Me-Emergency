import { removeAuthUser } from "./Storage.js";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    removeAuthUser();
    navigate('/master');
}
export default LogOut;