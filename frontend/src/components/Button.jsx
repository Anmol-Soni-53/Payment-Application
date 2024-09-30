const Button = ({title}) => {
    return (
        <button className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 mt-5 "  >{title}</button>
    );
}
 
export default Button;