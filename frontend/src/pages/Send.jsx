import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import User from "../components/User";
import Warning from "../components/Warning";
const Send = () => {
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center ">
            <div className="rounded-lg flex flex-col justify-center bg-white w-96 p-2 text-center  h-max px-4 shadow-xl">
                    <Heading label={"Send Money"}  />   
                    <User Name={"Anmol"}/>
                    <InputBox type="number" label="Amount (in Rs)" placeholder="Enter Amount" />
                    <button className="w-full text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-3 mt-5 "  >Initiate Transfer</button>
                </div>
            </div>
        </div>
    );
}
 
export default Send;