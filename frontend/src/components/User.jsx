const User = ({ Name }) => {
    const firstCharacter = Name.charAt(0); // Extract the first character
    return (
        <div className="flex">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{firstCharacter}</span>
            </div>
            <div className="font-bold text-2xl py-1 pl-3">
            {Name}
            </div>
        </div>
    );
};

export default User;
