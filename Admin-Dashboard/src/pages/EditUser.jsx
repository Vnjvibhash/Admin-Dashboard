import React, { useState, useEffect } from 'react';

const EditUser = ({ userId }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        address: "",
        profession: "",
        department: "",
        image: "",
    });
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add User</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name <spam className="text-danger">*</spam>
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
                        <label htmlFor="inputEmail4" className="form-label">
                            Email <spam className="text-danger">*</spam>
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
                        <label htmlFor="inputPassword4" className="form-label">
                            Password <spam className="text-danger">*</spam>
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
                        <label htmlFor="inputDOB" className="form-label">
                            Date of Birth <spam className="text-danger">*</spam>
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputDOB"
                            placeholder="06/12/1996"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, dob: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address <spam className="text-danger">*</spam>
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
                        <label htmlFor="inputProfession" className="form-label">
                            Profession
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputProfession"
                            placeholder="Your Profession"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, profession: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Department
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputDepartment"
                            placeholder="Department"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, department: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="inputGroupFile01" className="form-label">
                            Select Image <spam className="text-danger">*</spam>
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

export default EditUser;