import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Warning from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const HandleSignUp =async ()=>{
        console.log()
      const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
            username,
            firstName,
            lastName,
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
                    <Heading label={"Sign up"} />   
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e)=>{
                        setFirstName(e.target.value)
                    }} type="text" label="First Name"  placeholder="John"/>
                    <InputBox onChange={(e)=>{
                        setLastName(e.target.value)
                    }} type="text" label="Last Name" placeholder="Doe" />
                    <InputBox onChange={(e)=>{
                        setUserName(e.target.value)
                    }} type="email" label="Email" placeholder="test@gmail.com" />
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value)
                    }} type="password" label="Password" />
                    <Button onClick ={HandleSignUp}  title="Sign Up"/>
                    <Warning label="Already have an account?" to="/signin" text="Login" />
                </div>
            </div>
        </div>
    );
}
 
export default Signup;