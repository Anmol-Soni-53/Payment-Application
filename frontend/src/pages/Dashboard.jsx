import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    const [balance,setBalance]=useState(0);
    const [name,setName]=useState();
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
    const UserDetails=async ()=>{
        try {
            const response=await axios.get("http://localhost:3000/api/v1/user/detail",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setName(response.data.firstName);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }
    useEffect(()=>{
        GetBalance();
        UserDetails();
    },[])

    useEffect(()=>{
        if(!token){
            navigate('/signin')
        }
    },[token])



    return (
        <div className="p-3">
            <Appbar user={name}></Appbar>
            <Balance value={balance} name={name}></Balance>
            <Search token={token}></Search>
        </div>
    );
}
 
export default Dashboard;