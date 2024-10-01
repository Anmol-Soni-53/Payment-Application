const Appbar = ({user}) => {
    return (
        <div className="shadow h-16 flex justify-between ">
            <div className=" p-2">PaySafe</div>
            <div className="flex justify-evenly mr-2  ">
                <div className="p-2">Hello</div>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{user[0]}</span>
                </div>
            </div>
        </div>
    );
}
 
export default Appbar;