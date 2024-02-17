import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add User</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Enter Password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                        <label for="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => setUser({ ...user, category_id: e.target.value })}>
                            {category.map((c) => {
                                return <option value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label" for="inputGroupFile01">
                            Select Image
                        </label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;