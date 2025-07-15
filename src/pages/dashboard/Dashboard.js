import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import OverlayNavbar from "../OverlayNavbar";
import {
  AiOutlineDollar,
  AiOutlineOrderedList,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";

const Dashboard = () => {
  const [username] = useState("fahad"); // default username
  const iconSize = 36;

  // Dummy Data (you can later fetch it again)
  const [order_value] = useState(4500);
  const [order] = useState(10);
  const [success] = useState(8);
  const [cancelled] = useState(1);
  const [pending] = useState(1);
  const [total_due] = useState(1000);
  const [totalpaid] = useState(3500);

  const [lastorder] = useState({
    invoice_no: "INV-001",
    product: "Smartwatch",
    order_type: "Online",
    contact_number: "01712345678",
    total_quantity: 2,
  });

  return (
    <>
      <OverlayNavbar />
      <div className="bg-[#F9F9F9] ml-2">
        <div className="ml-20">
          <h4 className="mb-2 pb-0 text-2xl ml-5">Welcome, {username}</h4>

          <Row className="mb-5 g-3 align-middle justify-center">
            <Col xs="6" md="4" lg="2">
              <Card className="mt-6 h-[220px] w-[200px] cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div
                    className="rounded-xl mb-4 mt-4"
                    style={{
                      backgroundColor: "#2FB261",
                      width: iconSize,
                      height: iconSize,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AiOutlineDollar size={32} color="#fff" />
                  </div>
                  <div>DUE PAYMENT</div>
                  <div className="text-[#2FB261]">{total_due} TK</div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs="6" md="4" lg="2">
              <Card className="mt-6 h-[220px] w-[200px] cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div
                    className="rounded-xl mb-4 mt-4"
                    style={{
                      backgroundColor: "#2FB261",
                      width: iconSize,
                      height: iconSize,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BiDollarCircle size={32} color="#fff" />
                  </div>
                  <div>CURRENT WALLET</div>
                  <div className="text-[#2FB261]">{totalpaid} TK</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-5 g-3 align-middle justify-center">
            <Col xs="6" md="4" lg="2">
              <Card className="h-100 cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <AiOutlineDollar size={24} color="#2FB261" className="mb-2" />
                  <div>TOTAL ORDER VALUE</div>
                  <div className="text-[#2FB261]">{order_value} TK</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" md="4" lg="2">
              <Card className="h-100 cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <AiOutlineOrderedList
                    size={24}
                    color="#2FB261"
                    className="mb-2"
                  />
                  <div>TOTAL ORDER</div>
                  <div className="text-[#2FB261]">{order}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" md="4" lg="2">
              <Card className="h-100 cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <AiOutlineUser size={24} color="#2FB261" className="mb-2" />
                  <div>SUCCESSFUL ORDER</div>
                  <div className="text-[#2FB261]">{success}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" md="4" lg="2">
              <Card className="h-100 cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <AiOutlineClockCircle
                    size={24}
                    color="#2FB261"
                    className="mb-2"
                  />
                  <div>PENDING ORDER</div>
                  <div className="text-[#2FB261]">{pending}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" md="4" lg="2">
              <Card className="h-100 cursor-pointer card-hover">
                <Card.Body className="d-flex flex-column align-items-center">
                  <AiOutlineCloseCircle
                    size={24}
                    color="#2FB261"
                    className="mb-2"
                  />
                  <div>CANCELLED ORDER</div>
                  <div className="text-[#2FB261]">{cancelled}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="text-[#2FB261] text-lg font-semibold mb-3 ml-10">
            Latest Order
          </h2>
          <div className="overflow-x-auto pl-10 pr-10 pb-5">
            <table className="w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 uppercase">
                    Invoice No
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 uppercase">
                    Order Type
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 uppercase">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-3 py-2">{lastorder.invoice_no}</td>
                  <td className="px-3 py-2">{lastorder.product}</td>
                  <td className="px-3 py-2">{lastorder.order_type}</td>
                  <td className="px-3 py-2">{lastorder.contact_number}</td>
                  <td className="px-3 py-2">{lastorder.total_quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Row, Col, Dropdown, Card, Badge } from "react-bootstrap";
// import Rating from "react-rating";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import verifyToken from "../verifyToken";
// import { useNavigate } from "react-router-dom";
// import { TiShoppingCart } from 'react-icons/ti';
// import { MdPayment } from 'react-icons/md';
// import { RiMoneyDollarCircleLine } from
// 'react-icons/ri';
// import { BiDollarCircle } from 'react-icons/bi';
// import { FiLogOut } from 'react-icons/fi';

// // import HtmlHead from 'components/html-head/HtmlHead';
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import {
//   AiOutlineDollar,
//   AiOutlineOrderedList,
//   AiOutlineUser,
//   AiOutlineClockCircle,
//   AiOutlineCloseCircle,
// } from "react-icons/ai";

// import PerformanceChart from "./components/PerformanceChart";
// import OverlayNavbar from "../OverlayNavbar";
// import SessionCheck from "../session";
// import Cookies from "js-cookie";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [order_value, setorder_value] = useState(0);
//   const [order, setorder] = useState(0);
//   const [success, setsuccess] = useState(0);
//   const [cancelled, setcancelled] = useState(0);
//   const [pending, setpending] = useState(0);
//   const [lastorder, setlastorder] = useState(0);
//   const [total_due, settotaldue] = useState(0);
//   const [total_dueinvoice, settotaldueinvoice] = useState(0);
//   const [total_paidinvoice, settotalpaidinvoice] = useState(0);
//   const [totalpaid, settotalpaid] = useState(0);

//   let username = Cookies.get('username',null)

//   useEffect(() => {
//     const verifyAccessToken = async () => {
//       const accessToken = await verifyToken();

//       if (!accessToken) {
//         navigate("/login"); // Redirect to the login page if access token is null
//       } else {
//         GetLatesOrder();
//     Get();
//       }
//     };

//     verifyAccessToken();
//   }, [navigate]);

//   const Get = async () => {
//     const accessToken = await verifyToken();
//     try {
//       const response = await axios.get(process.env.REACT_APP_BASE_URL +"/api/stats", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//      ;
//       if (response.data) {
//         setorder_value(response.data.total_order_value);
//         setsuccess(response.data.success);
//         setorder(response.data.orders);
//         setcancelled(response.data.cancelled);
//         setpending(response.data.pending_orders);
//         settotaldue(response.data.total_due);
//         settotaldueinvoice(response.data.total_due.invoice_no);
//         settotalpaidinvoice(response.data.total_paid.invoice_no);
//         settotalpaid(response.data.total_paid);

//       } else {
//         console.log("No products available");
//         // setError('No products available');
//       }
//     } catch (error) {
//       // Log the entire error object for more details
//       console.error("Failed:", error);
//     }
//   };

//   const GetLatesOrder = async () => {
//     const accessToken = await verifyToken();

//     try {
//       const response = await axios.get(process.env.REACT_APP_BASE_URL +"/api/last_order", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       // Check for a successful response (HTTP status code 200)
//       if (response.data) {

//         setlastorder(response.data);
//       } else {
//         console.log("No products available");
//         // setError('No products available');
//       }
//     } catch (error) {
//       console.error("Failed:", error);
//     }
//   };
//   // console.log("lastorder " +lastorder.data.username);

//   const title = "Dashboard";
//   const description = "Ecommerce Dashboard Page";
//   const iconSize = 36;

//   return (
//     <>
//       <SessionCheck />
//       <OverlayNavbar />

//       <div className="bg-[#F9F9F9] ml-2">
//         {/* Title Start */}
//         <div className="ml-20">
//           <div className="page-title-container">
//             <NavLink
//               className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
//               to="/"
//             >
//               <span className="align-middle text-small ms-1">&nbsp;</span>
//             </NavLink>
//             <h4 className="mb-2 pb-0 text-2xl ml-5" id="title">
//               Welcome, {username}
//             </h4>
//           </div>
//           <Row className="mb-5 g-3 align-middle justify-center">
//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className=" mt-6 h-[220px] w-[200px] cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover mt-4"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineDollar size={32} color="#fff" />
//                   </div>
//                   <div className="mb-1  d-flex align-items-center text-alternate text-small lh-1-25">
//                     DUE PAYMENT
//                   </div>

//                   <div className="text-[#2FB261] cta-4">{(!total_due)?"0":total_due} TK</div>
//                   <h2 className="text-blue-500 font-semibold">{(!total_dueinvoice) ? "":total_dueinvoice}</h2>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="  ml-3 mt-6 h-[220px] w-[200px] mb-1 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-10 sh-10 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover mt-4"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <BiDollarCircle size={32} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     YOUR CURRENT WALLET
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{(!totalpaid)?"0":totalpaid} TK</div>
//                   <h2 className="text-blue-500 font-semibold">{(!total_paidinvoice) ? "":total_paidinvoice }</h2>
//                 </Card.Body>
//               </Card>
//             </Col>
//              <Col xl="5" className="ml-6 mt-[40px]">
//             <Card className=" h-2xl-[200px]-card">
//               <Card.Body className="h-[220px]">
//                 <div className="h-[200px] mb-5">
//                   <PerformanceChart />
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>

//           </Row>

//           <Row className="mb-5 g-3 align-middle justify-center">
//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="h-100 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineDollar size={24} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     TOTAL ORDER VALUE
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{order_value} TK</div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="h-100 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineOrderedList size={24} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     TOTAL ORDER
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{order}</div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="h-100 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineUser size={24} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     SUCCESSFUL ORDER
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{success}</div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="h-100 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineClockCircle size={24} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     PENDING ORDER
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{pending}</div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs="6" md="4" lg="2">
//               <Card
//                 className="h-100 cursor-pointer card-hover"
//                 style={{ backgroundColor: "transparent" }}
//               >
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <div
//                     className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4 icon-hover"
//                     style={{
//                       backgroundColor: "#2FB261",
//                       width: iconSize,
//                       height: iconSize,
//                     }}
//                   >
//                     <AiOutlineCloseCircle size={24} color="#fff" />
//                   </div>
//                   <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">
//                     CANCELLED ORDER
//                   </div>
//                   <div className="text-[#2FB261] cta-4">{cancelled}</div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//           {/* Stats End */}

//           <h2 className="text-[#2FB261] text-lg font-semibold mb-3 ml-10">Latest Orders</h2>
//     <div className="overflow-x-auto pl-10 pr-10 pb-5">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th scope="col" className="px-3 py-3 text-left text-sm font-bolc text-gray-500 uppercase tracking-wider">Invoice No</th>
//             <th scope="col" className="px-3 py-3 text-left text-sm font-bolc text-gray-500 uppercase tracking-wider">Product</th>
//             <th scope="col" className="px-3 py-3 text-left text-sm font-bolc text-gray-500 uppercase tracking-wider">Order Type</th>
//             <th scope="col" className="px-3 py-3 text-left text-sm font-bolc text-gray-500 uppercase tracking-wider">Contact Number</th>
//             <th scope="col" className="px-3 py-3 text-left text-sm font-bolc text-gray-500 uppercase tracking-wider">Total Quantity</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           <tr className="hover:bg-gray-50">
//             <td className="px-3 py-2 whitespace-nowrap">
//               {/* <NavLink to="/orders/detail/${invoiceNo}">{lastorder.invoice_no}</NavLink> */}
//               {lastorder.invoice_no}
//             </td>
//             <td className="px-3 py-2 whitespace-nowrap">{lastorder.product}</td>
//             <td className="px-3 py-2 whitespace-nowrap">{lastorder.order_type}</td>
//             <td className="px-3 py-2 whitespace-nowrap">{lastorder.contact_number}</td>
//             <td className="px-3 py-2 whitespace-nowrap">{lastorder.total_quantity}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//           <Row>
//             <Col
//               xs="12"
//               xxl="12"
//               className="mb-5 justify-center align-middle ml-10"
//             >
//               <h2 className="small-title text-[#2FB261] mb-3">Tips</h2>
//               <Card className="h-100-card  w-[95%] ">
//                 <Card.Body className="d-flex flex-column justify-content-between align-items-start">
//                   <div>
//                     <div className="cta-3">More sales?</div>
//                     <div className="mb-3 cta-3 text-[#2FB261]">
//                       Create a new order!
//                     </div>
//                     <div className="text-muted mb-4">

//                     </div>
//                   </div>
//                   <NavLink
//                     to="/createOrder"
//                     className="btn btn-icon btn-icon-start btn-primary "
//                   >
//                     <span
//                       className="iconify"
//                       data-icon="bx:bx-add-to-queue"
//                       data-inline="false"
//                     ></span>
//                     <span className="ms-2">Create Order</span>
//                   </NavLink>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Tips End */}
//           </Row>

//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
