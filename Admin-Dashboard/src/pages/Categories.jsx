import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/style.css'
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
    // Your code for fetching and displaying categories goes here
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:3000/api/category')
            .then(result => {
                if (result.data.Status) {
                    setCategorys(result.data.data);
                } else {
                    console.log(result.data.Error)
                }
            })
    };

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_user" className="btn btn-success">
                Add Category
            </Link>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Desciption</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.description}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleDelete(e.id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
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

export default Categories;