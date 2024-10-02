import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import User from "../components/User";
import Warning from "../components/Warning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Send = () => {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const [amount,setAmount]=useState(0);
    async function HandleTransfer() {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/account/transfer`,
                {
                    amount:amount*100, 
                    to: id,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            navigate(`/dashboard`);
        } catch (error) {
            console.error("Error during transfer:", error);
        }
    }
    
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
            <div className="rounded-lg flex flex-col justify-center bg-white w-96 p-2 text-center  h-max px-4 shadow-xl">
                    <Heading label={"Send Money"}  />   
                    <User Name={name}/>
                    <InputBox type="number" label="Amount (in Rs)" placeholder="Enter Amount" onChange={(e)=>{
                        setAmount(e.target.value);
                    }} />
                    <button onClick={HandleTransfer} className="w-full text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-3 mt-5 "  >Initiate Transfer</button>
                </div>
            </div>
        </div>
    );
}
 
export default Send;