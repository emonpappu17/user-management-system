import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://user-management-system-server-ashy.vercel.app/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your User has been deleted.",
                                icon: "success"
                            });
                            const remaining = users.filter(user => user._id !== id)
                            setUsers(remaining)
                        }
                    })
            }
        });
    }

    return (
        <div className="md:p-10 p-4">
            <Link to="/"><button className="btn mb-5">New User <FaUser />
            </button></Link>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td className="flex items-center"><Link to={`/users/${user._id}`}><button className="btn mr-2"><MdOutlineModeEdit />
                                </button></Link><button onClick={() => { handleDelete(user._id) }} className="btn">X</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;