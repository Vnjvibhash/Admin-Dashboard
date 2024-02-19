import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        await axios
            .get("http://localhost:3000/api/users",{ withCredentials: true })
            .then((result) => {
                if (result.data.Status) {
                    setUsers(result.data.data);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
        }
    
    const handleDelete = async (id) => {
        await axios.delete('http://localhost:3000/api/delete_user/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>User List</h3>
            </div>
            <Link to="/dashboard/add_user" className="btn btn-success">
                Add User
            </Link>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>DOB</th>
                            <th rowSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/images/profile/` + e.profile_pic}
                                        className="user_image"
                                    />
                                </td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.dob}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_user/` + e.id}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleDelete(e.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
