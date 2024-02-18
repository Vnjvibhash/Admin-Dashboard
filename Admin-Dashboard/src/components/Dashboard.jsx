import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation();

  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout', { 
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/')
        }
      })
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With Vnj
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className={`nav-link text-white px-0 align-middle ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <i className="fs-4 bi-speedometer2 ms-2 me-2"></i>Dashboard
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/users"
                  className={`nav-link px-0 align-middle text-white ${location.pathname === '/dashboard/users' ? 'active' : ''}`}
                >
                  <i className="fs-4 bi-people ms-2 me-2"></i>Users
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/categories"
                  className={`nav-link px-0 align-middle text-white ${location.pathname === '/dashboard/categories' ? 'active' : ''}`}
                >
                  <i className="fs-4 bi-columns ms-2 me-2"></i>Categories
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/products"
                  className={`nav-link px-0 align-middle text-white ${location.pathname === '/dashboard/products' ? 'active' : ''}`}
                >
                  <i className="fs-4 bi-archive ms-2 me-2"></i>Products
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className={`nav-link px-0 align-middle text-white ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}
                >
                  <i className="fs-4 bi-person ms-2 me-2"></i>Profile
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2 me-2"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>User Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
