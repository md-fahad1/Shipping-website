import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios"; // Import axios
import verifyToken from "../../pages/verifyToken";

const Navbar_Page = ({ navClass }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [admin, setAdmin] = useState(null);

  const toggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await verifyToken();
        setAccessToken(token);
        
        const adminResponse = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/is_staff",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setAdmin(adminResponse.data.status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          transition: "background-color 0.3s ease",
          backgroundColor: isOpenMenu ? "#699633" : "white",
        }}
        className={`${navClass} navbar xl:h-24 lg:h-24 md:h-20 h-32  navbar-expand-lg fixed-top navbar-custom sticky-dark`}
        id="navbar"
      >
        <div className="flex container mp:flex-col">
          <div className="text-gray-700">
            <Link to="/" className="navbar-brand logo text-uppercase flex ">
              <img
                src="../../assets/images/navlogo.png"
                alt="Profile"
                className="rounded-circle mt-[0px] mr-3"
                style={{
                  width: "40px",
                  height: "50px",
                 
                }}
              />
              <span className="text-gray-800 mt-2"> Shob Artist</span>
            </Link>
          </div>

          <div className=" mx-auto flex justify-between items-center">
            {/* <button className="navbar-toggler " type="button" onClick={toggle}>
              <i className="mdi mdi-menu"></i>
            </button> */}

            <div
              // className={`${
              //   isOpenMenu ? "block" : "hidden"
              // } md:flex md:items-center md:justify-end md:flex-1`}
            >
              <ul className="navbar-nav mr-auto text-gray-800 mt-0">
                <li className="nav-item">
                  <Link to="/howItWorks" className="nav-link">
                    How It Works
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/catalog" className="nav-link">
                    Catalog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {!accessToken ? (
            <div className=" mt-0">
              <Button
                type="button"
                color="outline-secondary"
                className="navbar-btn btn-sm waves-effect ml-2 md:ml-3"
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                type="button"
                color="primary"
                className="navbar-btn btn-sm waves-effect waves-light ml-2 md:ml-3"
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              color="primary"
              className="navbar-btn btn-sm waves-effect waves-light ml-2 md:ml-3"
            >
              <Link to={admin ? "/admin/allOrder" : "/Dashboard"}>
                Dashboard
              </Link>
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar_Page;
