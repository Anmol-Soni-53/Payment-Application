import User from "./User";
import InputBox from "./InputBox";
import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = ({ token }) => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.user);
            setUsers(response.data.user);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        if (!filter) {
            fetchUsers();
        }
    }, []);

    useEffect(() => {
        fetchUsers(); 
    }, [filter, token]);


    const UserComponent = ({ user }) => {
        return (
            <div className="flex justify-between items-end mt-4">
                <div className="flex text-center justify-center items-center h-full " >
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user.firstName[0]}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>
                <div>                    
                        <Button  title={"Send Money"} onClick={()=>{
                            navigate(`/send?id=${user._id}&name=${user.firstName}`);

                        }} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="text-2xl font-bold">Users</div>
            <InputBox
                onChange={(e) => setFilter(e.target.value)}
                type={"text"}
                placeholder={"Search Users..."}
            />
            <div className="py-2">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    users.length === 0 ? (
                        <div>No users found</div>
                    ) : (
                        users.map(user => <UserComponent key={user._id} user={user} />)
                    )
                )}
            </div>
        </div>
    );
};

export default Search;
