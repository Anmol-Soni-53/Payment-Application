import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";
const Appbar = ({user}) => {
    const value=String(user);
    const navigate=useNavigate();
    function HandleLogout(){
        localStorage.removeItem("token");
        navigate('/signin');
    }
    return (
        <div className="shadow h-16 flex justify-between ">
            <div className=" p-2">PaySafe</div>
            <div className="flex justify-evenly mr-2 w-56">
                <div className="p-2">Hello {user}</div>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{value[0]}</span>
                </div>
                <button className="p-2 bg-slate-900 h-11 rounded-lg text-white " onClick={HandleLogout}>Logout</button>
            </div>
        </div>
    );
}
 
export default Appbar;