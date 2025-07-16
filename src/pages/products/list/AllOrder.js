import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayNavbar from "../../OverlayNavbar";

const AllOrder = () => {
  const navigate = useNavigate();

  const [post] = useState([
    {
      invoice_no: "INV-001",
      design_name: "Abstract Wave",
      product: "T-Shirt",
      total_quantity: 3,
      total_price: 900,
      order_status: "Pending",
      mockup: "https://source.unsplash.com/100x100/?tshirt",
    },
    {
      invoice_no: "INV-002",
      design_name: "Sunset Graphic",
      product: "Hoodie",
      total_quantity: 2,
      total_price: 1600,
      order_status: "Success",
      mockup: "https://source.unsplash.com/100x100/?hoodie",
    },
    {
      invoice_no: "INV-003",
      design_name: "Minimal Line Art",
      product: "Mug",
      total_quantity: 5,
      total_price: 1000,
      order_status: "Cancelled",
      mockup: "https://source.unsplash.com/100x100/?mug",
    },
    {
      invoice_no: "INV-004",
      design_name: "Tech Pattern",
      product: "Notebook",
      total_quantity: 1,
      total_price: 450,
      order_status: "Pending",
      mockup: "https://source.unsplash.com/100x100/?notebook",
    },
    {
      invoice_no: "INV-005",
      design_name: "Retro Style",
      product: "Cap",
      total_quantity: 4,
      total_price: 800,
      order_status: "Success",
      mockup: "https://source.unsplash.com/100x100/?cap",
    },
    {
      invoice_no: "INV-006",
      design_name: "Digital Glitch",
      product: "Mousepad",
      total_quantity: 2,
      total_price: 600,
      order_status: "Pending",
      mockup: "https://source.unsplash.com/100x100/?mousepad",
    },
    {
      invoice_no: "INV-007",
      design_name: "Floral Art",
      product: "Phone Case",
      total_quantity: 6,
      total_price: 1200,
      order_status: "Success",
      mockup: "https://source.unsplash.com/100x100/?phone-case",
    },
    {
      invoice_no: "INV-008",
      design_name: "Cityscape",
      product: "Canvas",
      total_quantity: 1,
      total_price: 2000,
      order_status: "Pending",
      mockup: "https://source.unsplash.com/100x100/?canvas",
    },
    {
      invoice_no: "INV-009",
      design_name: "Cyber Cat",
      product: "Sticker Pack",
      total_quantity: 10,
      total_price: 500,
      order_status: "Cancelled",
      mockup: "https://source.unsplash.com/100x100/?sticker",
    },
    {
      invoice_no: "INV-010",
      design_name: "Galaxy Fade",
      product: "Tote Bag",
      total_quantity: 2,
      total_price: 700,
      order_status: "Success",
      mockup: "https://source.unsplash.com/100x100/?bag",
    },
  ]);

  const handleOrderClick = (invoiceNo) => {
    navigate(`/details/${invoiceNo}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <OverlayNavbar />
      <div className="container mx-auto py-2 px-4">
        <h1 className="text-3xl ml-12 text-green-600 mb-2">Order List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ml-8">
            <thead className="bg-gray-50 text-[12px] md:text-[14px] lg:text-[15px]">
              <tr>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Demo Picture
                </th>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Design Name
                </th>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Product Type
                </th>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-3 py-3 text-left font-bold text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {post.map((p) => (
                <tr key={p.invoice_no} className="hover:bg-gray-50">
                  <td className="px-2 py-2 whitespace-nowrap">
                    <img
                      src={p.mockup}
                      alt={p.design_name}
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => handleOrderClick(p.invoice_no)}
                    />
                  </td>
                  <td
                    className="px-1 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleOrderClick(p.invoice_no)}
                  >
                    {p.design_name}
                  </td>
                  <td
                    className="px-1 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleOrderClick(p.invoice_no)}
                  >
                    {p.product}
                  </td>
                  <td
                    className="px-1 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleOrderClick(p.invoice_no)}
                  >
                    {p.total_quantity}
                  </td>
                  <td
                    className="px-1 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleOrderClick(p.invoice_no)}
                  >
                    {p.total_price} TK
                  </td>
                  <td
                    className="px-1 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleOrderClick(p.invoice_no)}
                  >
                    {p.order_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrder;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import { Row, Col, Card } from "react-bootstrap";
// import { FiChevronLeft } from "react-icons/fi";
// import OverlayNavbar from "../../OverlayNavbar";
// import { useAuth } from "../../AuthContext";
// import { useOrderDetail } from "../../OrderDetailsContext";
// import { useNavigate } from "react-router-dom";
// import SessionCheck from "../../session";
// import verifyToken from "../../verifyToken";
// const AllOrder = () => {
//   const { access } = useAuth() || {};
//   const [post, setPost] = useState([]);
//   const navigate = useNavigate();
//   const [Error, setError] = useState(null);
//   const { setInvoiceNo } = useOrderDetail();

//   useEffect(() => {
//     // Get();
//   }, []);

//   const Get = async () => {
//     const accessToken = await verifyToken();

//     try {
//       const response = await axios.get(
//         process.env.REACT_APP_BASE_URL + "/api/user_orders",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.data) {
//         setPost(response.data);
//       } else {
//         setError("No products available");
//       }
//     } catch (error) {
//       console.error("Failed:", error);
//       setError(`An error occurred trying to fetch products: ${error.message}`);
//     }
//   };
//   const handleOrderClick = (invoiceNo) => {
//     // Navigate to the order detail page with the invoice_no in the URL
//     navigate(`/details/${invoiceNo}`);
//   };

//   const title = "Order List";

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* <SessionCheck /> */}
//       <OverlayNavbar />
//       <div className="container  mx-auto py-2 px-4">
//         <h1 className="text-3xl ml-12 text-green-600 mb-2">{title}</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 ml-8">
//             <thead className="bg-gray-50 2xl:text-[15px] lg:text-[14px] md:text-[12px] xl:text-[15px]  text-[8px]">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   DEMO PICTURE
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   DESIGN NAME
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   PRODUCT TYPE
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   QUANTITY
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   PRICE
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
//                 >
//                   STATUS
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {post.map((p) => (
//                 <tr key={p.invoice_no} className="hover:bg-gray-50">
//                   <td className="px-2 py-2 whitespace-nowrap">
//                     <img
//                       src={process.env.REACT_APP_BASE_URL + `/${p.mockup}`}
//                       alt="product"
//                       className="w-16 h-16 object-cover cursor-pointer"
//                       onClick={() => handleOrderClick(p.invoice_no)}
//                     />
//                   </td>
//                   <td
//                     className="px-1 py-2 whitespace-nowrap cursor-pointer"
//                     onClick={() => handleOrderClick(p.invoice_no)}
//                   >
//                     {p.design_name}
//                   </td>
//                   <td
//                     className="px-1 py-2 whitespace-nowrap cursor-pointer"
//                     onClick={() => handleOrderClick(p.invoice_no)}
//                   >
//                     {p.product}
//                   </td>
//                   <td
//                     className="px-1 py-2 whitespace-nowrap cursor-pointer"
//                     onClick={() => handleOrderClick(p.invoice_no)}
//                   >
//                     {p.total_quantity}
//                   </td>
//                   <td
//                     className="px-1 py-2 whitespace-nowrap cursor-pointer"
//                     onClick={() => handleOrderClick(p.invoice_no)}
//                   >
//                     {p.total_price}
//                   </td>
//                   <td
//                     className="px-1 py-2 whitespace-nowrap cursor-pointer"
//                     onClick={() => handleOrderClick(p.invoice_no)}
//                   >
//                     {p.order_status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrder;
