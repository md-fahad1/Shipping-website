import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  MdLocalGroceryStore,
  MdMail,
  MdAssignmentTurnedIn,
} from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import verifyToken from "./verifyToken";
import { FiLogOut } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";

const OverlayNavbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  // useEffect(() => {
  //   const verifyAccessToken = async () => {
  //     const accessToken = await verifyToken();
  //     if (!accessToken) {
  //       navigate("/login"); // Redirect to the login page if access token is null
  //     }
  //   };

  //   verifyAccessToken();
  // }, [navigate]);

  const logActivity = async () => {
    const accessToken = await verifyToken();
    axios.post(
      process.env.REACT_APP_BASE_URL + "/api/activity_log",
      {
        message: "Logout Activity",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const handleLogout = () => {
    // logActivity().then(() => {
    // Clear cookies
    // Cookies.remove("username");
    // Cookies.remove("accessToken");
    // Cookies.remove("refreshToken");
    // Redirect to login page
    //   navigate("/login");
    // });
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#2FB261",
          width: isHovered ? "200px" : "70px",
          transition: "0.6s ",
        }}
        className="flex-column h-screen z-1 fixed border rounded-r-3xl "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-center mb-3 mt-10  object-cover justify-center content-center   ">
          <NavLink to="/">
            <img
              src="../assets/images/logo.png"
              alt="Profile"
              style={{
                width: "50px",
                height: "60px",
                marginLeft: "5px",
              }}
            />
          </NavLink>
        </div>

        <Nav className="mr-auto flex-column justify-center align-middle ml-5 mt-8">
          <NavLink
            to="/Dashboard"
            className={`text-white ${
              selectedLink === "Dashboard" ? "selected" : ""
            }`}
            onClick={() => handleLinkClick("Dashboard")}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <RiDashboardFill
                    size={28}
                    className="mb-4 mt-1 text-white"
                    color="blue"
                  />
                </div>
                <div className="ml-2 text-xl ">Dashboard</div>
              </div>
            ) : (
              <RiDashboardFill size={28} className="mb-4 mt-1" />
            )}
          </NavLink>
          <NavLink
            to="/createOrder"
            className={`text-white ${
              selectedLink === "createOrder" ? "selected" : ""
            }`}
            onClick={() => handleLinkClick("createOrder")}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <MdLocalGroceryStore className="mb-4 mt-1" size={20} />
                </div>
                <div className="ml-2 text-xl ">Create Order</div>
              </div>
            ) : (
              <MdLocalGroceryStore size={28} className="mb-4 mt-1" />
            )}
          </NavLink>

          <NavLink
            to="/allOrder"
            className={`text-white ${
              selectedLink === "allOrder" ? "selected" : ""
            }`}
            onClick={() => handleLinkClick("allOrder")}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <MdAssignmentTurnedIn className="mb-4 mt-1" size={20} />
                </div>
                <div className="ml-2 text-xl ">All Order</div>
              </div>
            ) : (
              <MdAssignmentTurnedIn size={28} className="mb-4 mt-1" />
            )}
          </NavLink>

          <NavLink
            to="/contactUs"
            className={`text-white ${
              selectedLink === "contactUs" ? "selected" : ""
            }`}
            onClick={() => handleLinkClick("contactUs")}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <MdMail className="mb-4 mt-1" size={20} />
                </div>
                <div className="ml-2 text-xl">Contact Us</div>
              </div>
            ) : (
              <MdMail size={28} className="mb-4 mt-1" />
            )}
          </NavLink>

          <NavLink
            to="/faq"
            className={`text-white ${selectedLink === "faq" ? "selected" : ""}`}
            onClick={() => handleLinkClick("faq")}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <AiOutlineQuestionCircle className="mb-4 mt-1" size={20} />
                </div>
                <div className="ml-2 text-xl ">FAQ</div>
              </div>
            ) : (
              <AiOutlineQuestionCircle size={28} className="mb-4 mt-1" />
            )}
          </NavLink>
          <NavLink
            to="/"
            className={`text-white ${
              selectedLink === "login" ? "selected" : ""
            }`}
            onClick={handleLogout}
            style={{ whiteSpace: "nowrap" }}
          >
            {isHovered ? (
              <div className="flex flex-row">
                <div>
                  <FiLogOut className="mb-4 mt-1" size={20} />
                </div>
                <div className="ml-2 text-xl ">Logout</div>
              </div>
            ) : (
              <FiLogOut size={28} className="mb-4 mt-1" />
            )}
          </NavLink>
          {/* <NavLink onClick={handleLogout} to="/login" className={'mr-4 text-white font-bold'}>Logout</NavLink> */}
        </Nav>
      </Navbar>
    </>
  );
};

export default OverlayNavbar;
