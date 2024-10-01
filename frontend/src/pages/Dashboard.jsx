import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    const [balance,setBalance]=useState(0);
    const GetBalance=async ()=>{
        try {
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }
    useEffect(()=>{
        GetBalance();
    },[])

    useEffect(()=>{
        if(!token){
            navigate('/signin')
        }else{
            GetBalance();
        }
    },[token])



    return (
        <div className="p-3">
            <Appbar user={"Anmol"}></Appbar>
            <Balance value={balance}></Balance>
            <Search token={token}></Search>
        </div>
    );
}
 
export default Dashboard;