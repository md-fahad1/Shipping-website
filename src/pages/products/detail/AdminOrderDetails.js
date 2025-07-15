import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import OverlayNavbar from "../../OverlayNavbar";
import verifyToken from "../../verifyToken";
import { useNavigate } from "react-router-dom";
import OverlayNavbarAdmin from "../../OverlayNavbarAdmin";

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const { access } = useAuth() || {};
  const { invoiceNo } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPrintButtonHovered, setIsPrintButtonHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await verifyToken();
      if (!accessToken) {
        navigate("/login");
      } else {
        if (invoiceNo) {
          try {
            const response = await axios.get(
              process.env.REACT_APP_BASE_URL +`/api/order_details/${invoiceNo}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.data) {
              setOrderDetails(response.data);
            } else {
              console.log("No details available");
            }
          } catch (error) {
            console.error("Failed:", error);
          }
        }
      }
    };

    fetchData();
  }, [invoiceNo, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/order_details/${invoiceNo}`,
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handlePrintButtonHover = (isHovered) => {
    setIsPrintButtonHovered(isHovered);
  };
  const handlePrint = () => {
    // Set printClicked to true when print button is clicked
    window.print();
  };
  return (
    <div>
      {!isPrintButtonHovered && <OverlayNavbarAdmin />}
      <div className="bg-gray-100 pl-20 text-lg">
        <div className="flex justify-between mt-1">
          <div>
            <h1 className="mt-0 text-2xl font-semibold text-green-600 mb-0">
              Order details
            </h1>
          </div>
          <div className="flex justify-end mb-3 mt-3">
            <button
              onClick={handlePrint}
              onMouseEnter={() => handlePrintButtonHover(true)}
              onMouseLeave={() => handlePrintButtonHover(false)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold mr-5 py-2 px-4 rounded"
            >
              Print
            </button> 
          </div>
        </div>

        {orderDetails ? (
          <div className={isPrintButtonHovered ? "flex-col" : "flex"}>
            <div className="">
              <div className=" gap-1 mb-2">
                <table style={{ borderCollapse: "collapse" }}>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      Invoice No:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.invoice_no}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      User:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.user}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      Product:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.product}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      Delivery Address:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.delivery_address}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      Contact Number:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.contact_number}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "2px solid black", padding: "8px" }}
                      className="font-semibold"
                    >
                      Color:
                    </td>
                    <td style={{ border: "2px solid black", padding: "8px" }}>
                      {orderDetails.color}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="flex gap-4">
                <div className="w-36 h-36 text-center">
                  {orderDetails.printing_attribute &&
                  orderDetails.printing_attribute.length > 0 ? (
                    <>
                      <img
                        src={process.env.REACT_APP_BASE_URL +`/${orderDetails.product_image_1}`}
                        alt="product"
                        className="card-img card-img-horizontal sw-11 h-15"
                      />
                      <span className="font-bold ">
                        {(() => {
                          try {
                            return orderDetails.printing_attribute[0].section;
                          } catch (error) {
                            console.error("Error accessing section:", error);
                            return "No Picuture";
                          }
                        })()}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">No picture</span>
                  )}
                </div>
                <div className="w-36 h-36 text-center">
                  {orderDetails.printing_attribute &&
                  orderDetails.printing_attribute.length > 1 ? (
                    <>
                      <img
                        src={process.env.REACT_APP_BASE_URL +`/${orderDetails.product_image_2}`}
                        alt="product"
                        className="card-img card-img-horizontal sw-11 h-15"
                      />
                      <span className="font-bold ">
                        {(() => {
                          try {
                            return orderDetails.printing_attribute[1].section;
                          } catch (error) {
                            console.error("Error accessing section:", error);
                            return "No Picuture";
                          }
                        })()}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">No picture</span>
                  )}
                </div>
                <div className="w-36 h-36 text-center">
                  {orderDetails.printing_attribute &&
                  orderDetails.printing_attribute.length > 1 ? (
                    <>
                      <img
                        src={process.env.REACT_APP_BASE_URL +`/${orderDetails.product_image_3}`}
                        alt="product"
                        className="card-img card-img-horizontal sw-11 h-15"
                      />
                      <span className="font-bold ">
                        {(() => {
                          try {
                            return orderDetails.printing_attribute[2].section;
                          } catch (error) {
                            console.error("Error accessing section:", error);
                            return "No Picuture";
                          }
                        })()}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">No picture</span>
                  )}
                </div>
                <div className="w-36 h-36 text-center">
                  {orderDetails.printing_attribute &&
                  orderDetails.printing_attribute.length > 1 ? (
                    <>
                      <img
                        src={process.env.REACT_APP_BASE_URL +`/${orderDetails.product_image_4}`}
                        alt="product"
                        className="card-img card-img-horizontal sw-11 h-15"
                      />
                      <span className="font-bold ">
                        {(() => {
                          try {
                            return orderDetails.printing_attribute[3].section;
                          } catch (error) {
                            console.error("Error accessing section:", error);
                            return "No Picuture";
                          }
                        })()}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">No picture</span>
                  )}
                </div>
              </div>
            </div>

                
            <div className={isPrintButtonHovered ? "mt-8" : "mt-0"}>
          
              <div className="w-[420px] h-[420px] mb-3  ml-5 text-center">
                <img
                  src={process.env.REACT_APP_BASE_URL +`/${orderDetails.mockup}`}
                  alt="product"
                  className="object-fit w-full h-full"
                />
                <span className="font-semibold">Mockup Picture</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
