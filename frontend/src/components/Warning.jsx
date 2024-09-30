import { Link } from "react-router-dom";

const Warning = ({label,to,text}) => {
    return (
        <div className="py-2 flex text-sm justify-center">
            <div className="font-medium">{label}</div>
            <Link className=" font-medium pointer underline pl-2 cursor-pointer" to={to}>{text}</Link>
        </div>
    );
}
 
export default Warning;