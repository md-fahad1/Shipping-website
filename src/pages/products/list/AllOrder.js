import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { FiChevronLeft } from "react-icons/fi";
import OverlayNavbar from "../../OverlayNavbar";
import { useAuth } from "../../AuthContext";
import { useOrderDetail } from "../../OrderDetailsContext";
import { useNavigate } from "react-router-dom";
import SessionCheck from "../../session";
import verifyToken from "../../verifyToken";
const AllOrder = () => {
  const { access } = useAuth() || {};
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [Error, setError] = useState(null);
  const { setInvoiceNo } = useOrderDetail();

  useEffect(() => {
    // Get();
  }, []);

  const Get = async () => {
    const accessToken = await verifyToken();

    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/user_orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        setPost(response.data);
      } else {
        setError("No products available");
      }
    } catch (error) {
      console.error("Failed:", error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };
  const handleOrderClick = (invoiceNo) => {
    // Navigate to the order detail page with the invoice_no in the URL
    navigate(`/details/${invoiceNo}`);
  };

  const title = "Order List";

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <SessionCheck /> */}
      <OverlayNavbar />
      <div className="container  mx-auto py-2 px-4">
        <h1 className="text-3xl ml-12 text-green-600 mb-2">{title}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ml-8">
            <thead className="bg-gray-50 2xl:text-[15px] lg:text-[14px] md:text-[12px] xl:text-[15px]  text-[8px]">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  DEMO PICTURE
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  DESIGN NAME
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  PRODUCT TYPE
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  QUANTITY
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  PRICE
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-bold text-gray-500 uppercase tracking-wider"
                >
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {post.map((p) => (
                <tr key={p.invoice_no} className="hover:bg-gray-50">
                  <td className="px-2 py-2 whitespace-nowrap">
                    <img
                      src={process.env.REACT_APP_BASE_URL + `/${p.mockup}`}
                      alt="product"
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
                    {p.total_price}
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
