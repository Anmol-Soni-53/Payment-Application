import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Warning from "../components/Warning";
const Signin = () => {
    return ( 
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
            <div className="rounded-lg flex flex-col justify-evenly bg-white w-80 p-2 text-center  h-max px-4">
                    <Heading label={"Sign In"} />   
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox type="email" label="Email" placeholder="test@gmail.com" />
                    <InputBox type="password" label="Password" />
                    <Button title="Sign Up"/>
                    <Warning label="Dont't have an account?" to="/signup" text="Sign Up" />
                </div>
            </div>
        </div>
    );
}
 
export default Signin;