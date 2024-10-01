import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
    
    const navigate = useNavigate();    
    
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const HandleSignIn=async ()=>{
        const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,
              password
        })
        console.log(response);
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard");
    }

    return ( 
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
            <div className="rounded-lg flex flex-col justify-evenly bg-white w-80 p-2 text-center  h-max px-4">
                    <Heading label={"Sign In"} />   
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={(e)=>{
                        setUserName(e.target.value)
                    }} type="email" label="Email" placeholder="test@gmail.com" />
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value)
                    }} type="password" label="Password" />
                    <Button onClick ={HandleSignIn}  title="Sign In"/>
                    <Warning label="Dont't have an account?" to="/signup" text="Sign Up" />
                </div>
            </div>
        </div>
    );
}
 
export default Signin;