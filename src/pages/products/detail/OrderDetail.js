import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import OverlayNavbar from "../../OverlayNavbar";
import verifyToken from "../../verifyToken";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { access } = useAuth() || {};
  const { invoiceNo } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [sellerPayment, setSellerPayment] = useState(0);
  const [error, setError] = useState(0);
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
              process.env.REACT_APP_BASE_URL +
                `/api/order_details/${invoiceNo}`,
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
              <p>no response</p>;
            }
          } catch (error) {
            console.error("Failed:", error);
          }
        }
      }
    };
    GetSeller_payment();

    fetchData();
  }, [invoiceNo, navigate]);
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  const GetSeller_payment = async () => {
    const accessToken = await verifyToken();
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/seller_payment",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) setSellerPayment(response.data);
      else setError("No Seller Payment details available");
    } catch (error) {
      console.error("Failed:", error);
      setError(
        `An error occurred trying to fetch payment details: ${error.message}`
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_BASE_URL + `/api/order_details/${invoiceNo}`,
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
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
      {!isPrintButtonHovered && <OverlayNavbar />}
      <Container className={`bg-[#F9F9F9] text-lg ${isPrintButtonHovered ? "pl-0 " : "pl-20"}`}>
        <div className="flex justify-between mt-1">
          <div>
            <h1 className="mt-0 text-2xl font-semibold text-[#6A9A33] mb-0">
              Order details
            </h1>
          </div>
          <div className="d-flex justify-content-end mb-3 mt-3">
            <Button
              onClick={handlePrint}
              variant="primary"
              onMouseEnter={() => handlePrintButtonHover(true)}
              onMouseLeave={() => handlePrintButtonHover(false)}
            >
              Print
            </Button>
          </div>
        </div>

        {orderDetails ? (
          <Form className="">
            <Row style={{ marginBottom: "-10px" }}>
              <Col>
                <Form.Group controlId="invoiceNo">
                  <Form.Label>Invoice No</Form.Label>
                  <Form.Control
                    type="text"
                    name="invoice_no"
                    value={orderDetails.invoice_no}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="user">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="text"
                    name="user"
                    value={orderDetails.user}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="product">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={orderDetails.product}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px" }} className="mt-3">
              <Col>
                <Form.Group controlId="orderType">
                  <Form.Label>Order Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="order_type"
                    value={orderDetails.order_type}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="productType">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="product_type"
                    value={orderDetails.product_type}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="deliveryMethod">
                  <Form.Label>Delivery Method</Form.Label>
                  <Form.Control
                    type="text"
                    name="delivery_method"
                    value={orderDetails.delivery_method}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px" }} className="mt-3">
              <Col>
                <Form.Group controlId="designName">
                  <Form.Label>Design Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="design_name"
                    value={orderDetails.design_name}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="deliveryAddress">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="delivery_address"
                    value={orderDetails.delivery_address}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="contactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_number"
                    value={orderDetails.contact_number}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px" }} className="mt-3">
              <Col>
                <Form.Group controlId="paymentOption">
                  <Form.Label>Payment Option</Form.Label>
                  <Form.Control
                    type="text"
                    name="payment_option"
                    value={orderDetails.payment_option === "" ? "Cash On Delivery" : orderDetails.payment_option}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
                <div className="bg-gray-300 mt-2 font-bold text-center">
                  {orderDetails.payment_option === "bkash"
                    ? sellerPayment[0].bkash
                    : orderDetails.payment_option === "rocket"
                    ? sellerPayment[0].rocket
                    : orderDetails.payment_option === "nagad"
                    ? sellerPayment[0].nagad
                    : orderDetails.payment_option === "Cash On Delivery" }
                </div>
              </Col>

              <Col>
                <Form.Group controlId="paymentStatus">
                  <Form.Label>Payment Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="payment_status"
                    value={orderDetails.payment_status}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="orderStatus">
                  <Form.Label>Order Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="order_status"
                    value={orderDetails.order_status}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>

              {/* <Col>
                <Form.Group controlId="size">
                  <Form.Label>GSM</Form.Label>
                  {orderDetails.size && orderDetails.size.length > 0 && (
                    <Form.Control
                      as="textarea"
                      rows={1} // Specify the number of rows as per your design
                      name="size"
                      value={orderDetails.size
                        .map((size) => size.gsm)
                        .join(", ")} // Join all sizes into a string
                      readOnly // To make it read-only
                    />
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="size">
                  <Form.Label>Product Size</Form.Label>
                  {orderDetails.size && orderDetails.size.length > 0 && (
                    <Form.Control
                      as="textarea"
                      rows={1} // Specify the number of rows as per your design
                      name="size"
                      value={orderDetails.size
                        .map((size) => size.size)
                        .join(", ")} // Join all sizes into a string
                      readOnly // To make it read-only
                    />
                  )}
                </Form.Group>
              </Col> */}
            </Row>
            <div className=    {`flex  mt-3 mb-5 ${isPrintButtonHovered ? "gap-2 ml-0 " : "gap-4 ml-10"}`}>
              <div>
                <table className="border-collapse border border-gray-200 w-full h-48">
                  <thead>
                    <tr>
                      <th
                        className="border border-gray-200 px-2 py-2"
                        colSpan="2"
                      >
                        Product Size
                      </th>
                      <th
                        className="border border-gray-200 px-2 py-2"
                        colSpan="2"
                      >
                        Product GSM
                      </th>
                      <th
                        className="border border-gray-200 px-2 py-2"
                        colSpan="2"
                      >
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.size && orderDetails.size.length > 0 && (
                      <tr>
                        <td className= {`border-2 py-2 ${isPrintButtonHovered ? "px-2 " : "px-4"}`} colSpan="2">
                          <ul>
                            {orderDetails.size.map((size, index) => (
                              <li key={index} className="border-1">
                                {size.size}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="border-2 px-4 py-2" colSpan="2">
                          <ul>
                            {orderDetails.size.map((size, index) => (
                              <li key={index} className="border-1">
                                {size.gsm}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="border-2 px-4 py-2" colSpan="2">
                          <ul>
                            {orderDetails.size.map((size, index) => (
                              <li key={index} className="border-1">
                                {size.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <table className="border-collapse border border-gray-200 w-full h-48">
                  <thead>
                    <tr>
                      <th
                        className="border border-gray-200 px-4 py-2"
                        colSpan="2"
                      >
                        Print Size
                      </th>
                      <th
                        className="border border-gray-200 px-4 py-2"
                        colSpan="2"
                      >
                        Pringting Side
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.print_size &&
                      orderDetails.print_size.length > 0 && (
                        <tr>
                          <td className="border-2 px-4 py-2" colSpan="2">
                            <ul>
                              {orderDetails.print_size.map((size, index) => (
                                <li key={index} className="border-1">
                                  {size.size}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="border-2 px-4 py-2" colSpan="2">
                            <ul>
                              {orderDetails.printing_attribute.map(
                                (size, index) => (
                                  <li key={index} className="border-1">
                                    {size.section}
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
              <div className="w-48 h-48 text-center">
                <img
                  src={
                    process.env.REACT_APP_BASE_URL + `/${orderDetails.mockup}`
                  }
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-15"
                />
                <span className="font-bold ">Mockup Picture</span>
              </div>
            </div>

            <Row style={{ marginBottom: "-10px" }}>
              {/* <Col>
                <Form.Group controlId="size">
                  <Form.Label>Print Size</Form.Label>
                  {orderDetails.print_size &&
                    orderDetails.print_size.length > 0 && (
                      <Form.Control
                        as="textarea"
                        rows={1} // Specify the number of rows as per your design
                        name="size"
                        value={orderDetails.print_size
                          .map((print_size) => print_size.size)
                          .join(", ")} // Join all sizes into a string
                        readOnly // To make it read-only
                      />
                    )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="size">
                  <Form.Label>Printing Side</Form.Label>
                  {orderDetails.printing_attribute &&
                    orderDetails.printing_attribute.length > 0 && (
                      <Form.Control
                        as="textarea"
                        rows={1} // Specify the number of rows as per your design
                        name="size"
                        value={orderDetails.printing_attribute
                          .map(
                            (printing_attribute) => printing_attribute.section
                          )
                          .join(", ")} // Join all sizes into a string
                        readOnly // To make it read-only
                      />
                    )}
                </Form.Group>
              </Col> */}
              <Col>
                <Form.Group controlId="color">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={orderDetails.color}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="totalQuantity">
                  <Form.Label>Total Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_quantity"
                    value={orderDetails.total_quantity}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="totalPrice">
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_price"
                    value={orderDetails.total_price}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full h-8 "
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Row className="mt-5" style={{ marginBottom: "-10px" }}>
                <Col xs="auto" className="position-relative ">
                  <div className="w-48 h-48 text-center">
                    {orderDetails.printing_attribute &&
                    orderDetails.printing_attribute.length > 0 ? (
                      <>
                        <img
                          src={
                            process.env.REACT_APP_BASE_URL +
                            `/${orderDetails.product_image_1}`
                          }
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
                </Col>
                <Col xs="auto" className="position-relative ">
                  <div className="w-48 h-48 text-center">
                    {orderDetails.printing_attribute &&
                    orderDetails.printing_attribute.length > 0 ? (
                      <>
                        <img
                          src={
                            process.env.REACT_APP_BASE_URL +
                            `/${orderDetails.product_image_2}`
                          }
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
                </Col>
                <Col xs="auto" className="position-relative ">
                  <div className="w-48 h-48 text-center">
                    {orderDetails.printing_attribute &&
                    orderDetails.printing_attribute.length > 0 ? (
                      <>
                        <img
                          src={
                            process.env.REACT_APP_BASE_URL +
                            `/${orderDetails.product_image_3}`
                          }
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
                </Col>

                <Col xs="auto" className="position-relative ">
                  <div className="w-48 h-48 text-center">
                    {orderDetails.printing_attribute &&
                    orderDetails.printing_attribute.length > 0 ? (
                      <>
                        <img
                          src={
                            process.env.REACT_APP_BASE_URL +
                            `/${orderDetails.product_image_4}`
                          }
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
                </Col>
              </Row>
            </Row>
            {/* <Row>
              <Col md={6} className="mb-8">
                <Form.Group controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="note"
                    value={orderDetails.note}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Update
                </Button>
              </Col>
            </Row> */}
          </Form>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default OrderDetail;
