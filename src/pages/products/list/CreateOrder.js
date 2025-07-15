import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import OverlayNavbar from "../../OverlayNavbar";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import verifyToken from "../../verifyToken";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const CreateOrder = () => {
  let username = Cookies.get("username", null);

  const navigate = useNavigate();
  const [formList, setFormList] = useState([
    {
      product_size: "",
      price: "",
      product_size_gsm: "",
      gsmprice: 0,
      quantity: 0,
    },
  ]);
  const [printList, setPrintList] = useState([
    { psize: "", sizeprice: 0, pasection: "", image: null, sectionprice: 0 },
  ]);
  const [product, setProduct] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [sellerPayment, setSellerPayment] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(0);

  const [formErrors, setFormErrors] = useState({
    product: "",
    order_type: "",
    product_type: "",
    delivery_method: "",
    delivery_address: "",
    design_name: "",
    contact_number: "",
    unit_price: "",
    mockup: null,
  });
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [imageFile4, setImageFile4] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    order_type: "",
    product_type: "",
    delivery_method: "",
    delivery_address: "",
    design_name: "",
    contact_number: "",
    payment_option: "",
    color: "",
    total_price: 0,
    total_quantity: 0,
    unit_price: 0,
    size: [{ size: "", gsm: 0, price: 0, quantity: 0 }],
    print_size: [{ size: "", price: 0 }],
    attributes: [{ section: "", price: 0 }],
    mockup: null,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const handleShowNumberClick = () => {
    setShowNumber(!showNumber);
  };

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors({
      ...formErrors,
      [name]: "",
    });

    if (name === "delivery_method") {
      // Find the index of the selected delivery method
      const deliveryMethodIndex = e.target.selectedIndex - 1;

      // Retrieve the corresponding delivery price based on the index
      const deliveryPrice =
        product.processing_details.delivery_pricing[deliveryMethodIndex]
          .delivery_price;

      // Update the state with the selected delivery price
      setFormData((prevData) => ({
        ...prevData,
        delivery_price: deliveryPrice,
      }));
    } else if (name === "product") {
      const productIndex = e.target.selectedIndex - 1;
      setSelectedProductIndex(productIndex);
      const basePrice =
        product.product_details[productIndex].product.base_price;
      setTotalPrice(basePrice);
    }
  };

  const handleImageChange4 = (e) => {
    const file = e.target.files[0];
    setImageFile4(file);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      mockup: "",
    }));
  };

  const handleChange = (index, fieldName, value) => {
    setFormList((prevList) => {
      const newList = [...prevList];
      if (fieldName === "product_size") {
        newList[index][fieldName] = value;
        console.log(value);
        const selectedProductSize = product.product_details[
          selectedProductIndex
        ].product_size.find((product_size) => product_size.size === value);
        console.log(selectedProductSize);
        if (selectedProductSize) {
          newList[index].price = selectedProductSize.price;
        } else {
          newList[index].price = 0;
        }
      } else if (fieldName === "product_size_gsm") {
        newList[index][fieldName] = value; // Parse GSM to an integer
        console.log(value);
        const selectedPrintSize = product.product_details[
          selectedProductIndex
        ].product_gsm.find((printSize) => printSize.gsm === parseInt(value));

        console.log(selectedPrintSize);
        if (selectedPrintSize) {
          newList[index].gsmprice = selectedPrintSize.price;
        } else {
          newList[index].gsmprice = 30; // Default price if GSM size is not found
        }
      } else if (fieldName === "quantity") {
        newList[index][fieldName] = parseInt(value); // Parse the quantity to an integer
      } else {
        newList[index] = value;
      }
      // Update formData.gsmprice if it's the relevant field
      // if (fieldName === "product_size_gsm") {
      //   formData.gsmprice = newList[index].gsmprice;
      // }
      return newList;
    });
  };

  const handleChangePrint = (index, fieldName, value) => {
    setPrintList((prevList) => {
      const newList = [...prevList];
      if (fieldName === "psize") {
        newList[index][fieldName] = value;
        console.log(value);
        const selectedPrintSize = product.product_details[
          selectedProductIndex
        ].print_size.find((printSize) => printSize.size === value);
        console.log(selectedPrintSize);
        if (selectedPrintSize)
          newList[index].sizeprice = selectedPrintSize.price;
        else newList[index].sizeprice = 0;
      } else if (fieldName === "pasection") {
        newList[index][fieldName] = value;
        const selectedAttribute = product.product_details[
          selectedProductIndex
        ].attributes.find((attr) => attr.section === value);
        if (selectedAttribute)
          newList[index].sectionprice = selectedAttribute.price;
        else newList[index].sectionprice = 0;
      } else newList[index] = value;
      return newList;
    });
  };

  const handleImageChange = (index, imageFile) => {
    const newList = [...printList];
    newList[index].image = imageFile;
    setPrintList(newList);
  };

  // Inside handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const accessToken = await verifyToken();

    let isValid = true;
    const newFormErrors = { ...formErrors };
    if (formData.product.trim() === "") {
      newFormErrors.product = ": product is required";
      isValid = false;
    }
    if (formData.delivery_address.trim() === "") {
      newFormErrors.delivery_address = " : Delivery address is required";
      isValid = false;
    }
    if (formData.product_type.trim() === "") {
      newFormErrors.product_type = " : Product type is required";
      isValid = false;
    }
    if (formData.order_type.trim() === "") {
      newFormErrors.order_type = " : Order type is required";
      isValid = false;
    }
    if (formData.delivery_method.trim() === "") {
      newFormErrors.delivery_method = " : Delivery method is required";
      isValid = false;
    }
    if (formData.design_name.trim() === "") {
      newFormErrors.design_name = " : Design name is required";
      isValid = false;
    }

    const phoneNumberRegex = /^\d{11}$/;
    const expectedCountryCode = "01";
    const minPhoneNumberLength = 11; // Adjust as needed
    const maxPhoneNumberLength = 15; // Adjust as needed

    if (formData.contact_number.trim() === "") {
      newFormErrors.contact_number = "Phone number is required";
      isValid = false;
    } else if (!phoneNumberRegex.test(formData.contact_number.trim())) {
      newFormErrors.contact_number = "Invalid phone number format";
      isValid = false;
    } else if (isNaN(formData.contact_number.trim())) {
      newFormErrors.contact_number = "Phone number must contain only numbers";
      isValid = false;
    } else if (
      formData.contact_number.trim().length < minPhoneNumberLength ||
      formData.contact_number.trim().length > maxPhoneNumberLength
    ) {
      newFormErrors.contact_number = `Phone number must be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} digits`;
      isValid = false;
    } else if (
      !formData.contact_number.trim().startsWith(expectedCountryCode)
    ) {
      newFormErrors.contact_number = `Phone number must start with ${expectedCountryCode}`;
      isValid = false;
    }

    // if (formData.color.trim() === "") {
    //   newFormErrors.color = " : Color is required";
    //   isValid = false;
    // }
    if (
      formData.unit_price === 0 &&
      formData.order_type !== "Advance Payment"
    ) {
      newFormErrors.unit_price = " : Unit price is required";
      isValid = false;
    }
    const totalprice = calculateTotalPrice();
    console.log(totalprice);

    if (
      formData.unit_price <= totalprice &&
      formData.order_type !== "Advance Payment"
    ) {
      newFormErrors.unit_price = "Must be greater than total price";
      isValid = false;
    }

    if (formData.delivery_address.trim() === "") {
      newFormErrors.delivery_address = " : Delivery address is required";
      isValid = false;
    }
    if (!imageFile4) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        mockup: "Mockup image is required",
      }));
      return;
    }

    if (!isValid) {
      setFormErrors(newFormErrors);
      setLoading(false);
      return;
    }
    if (isValid) {
      Swal.fire({
        title: "Success!",
        text: "Your order has been placed. Please wait for confirmation.",
        icon: "success",
        confirmButtonColor: "#2FB261", // Green color
        confirmButtonText: "OK",
      });
    }

    try {
      const sizeData = formList.map((formData) => ({
        size: formData.product_size,
        gsm: formData.product_size_gsm,
        price: formData.price,
        quantity: formData.quantity,
      }));
      const printsizeData = printList.map((formData) => ({
        size: formData.psize,
      }));
      const sectiondata = printList.map((obj) => ({ section: obj.pasection }));
      const formDataObj = new FormData(); // Renamed formData to formDataObj
      formDataObj.append("product", formData.product);
      formDataObj.append("order_type", formData.order_type);
      formDataObj.append("product_type", formData.product_type);
      formDataObj.append("delivery_method", formData.delivery_method);
      formDataObj.append("delivery_address", formData.delivery_address);
      formDataObj.append("design_name", formData.design_name);
      formDataObj.append("contact_number", formData.contact_number);
      formDataObj.append("payment_option", formData.payment_option);
      formDataObj.append("unit_total_price", formData.unit_price);
      formDataObj.append("total_quantity", calculateTotalQuantity());
      formDataObj.append("total_price", calculateTotalPrice());
      formDataObj.append("user", username);
      formDataObj.append("size", JSON.stringify(sizeData));
      formDataObj.append("printing_attribute", JSON.stringify(sectiondata));
      formDataObj.append("color", formData.color);
      formDataObj.append("mockup", imageFile4);
      formDataObj.append("print_size", JSON.stringify(printsizeData));
      printList.forEach((printData, index) => {
        if (printData.image) {
          formDataObj.append(`product_image_${index + 1}`, printData.image);
        }
      });

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/create_order",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) navigate("/Dashboard");
      else {
        setFormData({
          product: "",
          order_type: "",
          product_type: "",
          delivery_method: "",
          delivery_address: "",
          contact_number: "",
          payment_option: "",
        });
        navigate("./");
      }
    } catch (error) {
      console.error("Failed:", error);
      if (error.response) setError(`Server error: ${error.response.status}`);
      else if (error.request) setError("Request to the server failed.");
      else setError("Something went wrong.");
    }
  };

  useEffect(() => {
    // const verifyAccessToken = async () => {
    //   const accessToken = await verifyToken();
    //   if (!accessToken) {
    //     navigate("/login"); // Redirect to the login page if access token is null
    //   } else {
    GetProduct();
    GetSeller_payment();
    //   }
    // };

    // verifyAccessToken();
  });
  //  }, [navigate]);

  const addForm = () => {
    setFormList([
      ...formList,
      {
        product_size: "",
        price: 0,
        product_size_gsm: "",
        gsmprice: 0,
        quantity: 0,
      },
    ]);
  };

  const addPrintForm = () => {
    setPrintList([
      ...printList,
      { psize: "", sizeprice: 0, pasection: "", image: null, sectionprice: 0 },
    ]);
  };
  const removeForm = (index) => {
    const newFormList = [...formList];
    newFormList.splice(index, 1);
    setFormList(newFormList);
  };
  const removePrint = (index) => {
    const newPrintList = [...printList];
    newPrintList.splice(index, 1);
    setPrintList(newPrintList);
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

  const GetProduct = async () => {
    const accessToken = await verifyToken();
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/products",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (
        response.data &&
        response.data.product_details &&
        response.data.product_details.length > 0
      )
        setProduct(response.data);
      else setError("No products available");
    } catch (error) {
      console.error("Failed:", error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };

  const calculateTotalQuantity = () => {
    let totalquantityFromList = 0;
    formList.forEach((item) => {
      totalquantityFromList += item.quantity;
    });
    return totalquantityFromList;
  };

  const calculateTotalPrice = () => {
    let totalPriceFromPrintList = 0;
    printList.forEach((item) => {
      totalPriceFromPrintList +=
        parseFloat(item.sizeprice) + parseFloat(item.sectionprice) || 0;
    });

    let totalPriceFromList = 0;
    formList.forEach((item) => {
      totalPriceFromList +=
        parseFloat(item.price) + parseInt(item.gsmprice) || 0;
    });
    let totalquantityFromList = 0;
    formList.forEach((item) => {
      totalquantityFromList += parseInt(item.quantity) || 0;
    });
    let delivery = 0;
    if (
      formData.delivery_price !== undefined &&
      formData.delivery_price !== null &&
      formData.delivery_price !== ""
    ) {
      delivery = parseFloat(formData.delivery_price);
    }

    var lastprice =
      (parseInt(totalPriceFromPrintList) +
        parseInt(totalPriceFromList) +
        parseInt(totalPrice)) *
        parseInt(totalquantityFromList) || 0;
    return lastprice + delivery;
  };

  return (
    <div className="h-screen">
      <OverlayNavbar />
      <div className="pl-32 pr-16 bg-[#F9F9F9] ">
        <h2 className="mt-3 text-xl text-[#2FB261] mb-3">Order Form</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-3"></Row>
          <Row className="">
            <span className="text-sm md:text-sm  text-red-400">
              For home delivery please input the holding address and accurate
              area name
            </span>

            <Col lg={4}>
              <Form.Group controlId="formProduct">
                <Form.Label>
                  Product{" "}
                  {formErrors.product && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.product}
                    </span>
                  )}
                </Form.Label>
                {product.product_details &&
                product.product_details.length > 0 ? (
                  <Form.Select
                    name="product"
                    type="dropdown"
                    value={formData.product}
                    onChange={handle}
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {product.product_details &&
                      product.product_details.map((details, index) => (
                        <option key={index} value={details.product.product}>
                          {details.product.product}
                        </option>
                      ))}
                  </Form.Select>
                ) : (
                  <span className="text-red-500"> :No product avaialble</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="formProductType">
                <Form.Label>
                  Product Type{" "}
                  {formErrors.product_type && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.product_type}
                    </span>
                  )}
                </Form.Label>
                <Form.Select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handle}
                >
                  <option value="" disabled selected>
                    Select Product Type
                  </option>
                  {product.product_details &&
                    product.product_details.length > 0 &&
                    product.product_details[
                      selectedProductIndex
                    ].product.product_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="deliveryAddress">
                <Form.Label>
                  Delivery Address{" "}
                  {formErrors.delivery_address && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.delivery_address}
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="delivery_address"
                  value={formData.delivery_address}
                  onChange={handle}
                  className="w-full h-10"
                  placeholder=""

                  // Adjust font size and line height as needed
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="">
            <Col lg={4}>
              <Form.Group controlId="formDeliveryMethod">
                <Form.Label>
                  Delivery Method:{" "}
                  <span className="text-red-500 text-xs">
                    [Delivery price will be added later]
                  </span>
                </Form.Label>
                <Form.Select
                  name="delivery_method"
                  value={formData.delivery_method}
                  onChange={handle}
                >
                  <option value="" disabled selected>
                    Select Delivery Method
                  </option>
                  {product.processing_details &&
                    product.processing_details.delivery_pricing &&
                    product.processing_details.delivery_pricing.map(
                      (deliveryOption, index) => (
                        <option
                          key={index}
                          value={deliveryOption.delivery_method}
                        >
                          {deliveryOption.delivery_method}
                        </option>
                      )
                    )}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formdelivery_price">
                <Form.Control
                  type="hidden"
                  name="delivery_price"
                  value={formData.delivery_price}
                  readOnly={true}
                  className="w-20 h-10 "
                />
              </Form.Group>
            </Col>

            <Col lg={4}>
              <Form.Group controlId="formbase_price">
                <Form.Label>
                  {" "}
                  Design name{" "}
                  {formErrors.design_name && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.design_name}
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  name="design_name"
                  type="text"
                  value={formData.design_name}
                  onChange={handle}
                  className="w-full h-10 "
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="formbase_price">
                <Form.Label>
                  Customer Contact Number{" "}
                  {formErrors.contact_number && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.contact_number}
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  name="contact_number"
                  type="text"
                  value={formData.contact_number}
                  onChange={handle}
                  className="w-full h-10"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className=" mt-0 md:mt-3">
            <span className="text-sm md:text-sm text-red-400">
              Make sure you are providing an accurate mockup. We prefer you to
              provide the mockup you have shown to your customer
            </span>
          </Row>
          <Row className="mt-3">
            {product.product_details &&
            product.product_details[selectedProductIndex].color &&
            product.product_details[selectedProductIndex].color.length > 0 ? (
              <Col lg={6}>
                <Form.Group controlId="formColor">
                  <Form.Label>
                    Color{" "}
                    {/* {formErrors.color && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.color}
                    </span>
                  )} */}
                  </Form.Label>
                  <Form.Select
                    name="color"
                    value={formData.color}
                    onChange={handle}
                  >
                    <option value="" disabled selected>
                      Select Color
                    </option>
                    {product.product_details &&
                      product.product_details[selectedProductIndex].color &&
                      product.product_details[selectedProductIndex].color.map(
                        (colorOption, index) => (
                          <option key={index} value={colorOption.name}>
                            {colorOption.name}
                          </option>
                        )
                      )}
                  </Form.Select>
                </Form.Group>
              </Col>
            ) : null}
            <Col lg={6}>
              <Form.Group controlId="formImage">
                <Form.Label>
                  Add Mockup Image{" "}
                  {formErrors.mockup && (
                    <span className="text-red-500 text-sm mt-1">
                      {formErrors.mockup}
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange4}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="bg-gray-200 p-2 text-sm">
            {printList.map((formData, index) => (
              <Row key={index} className="">
                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].print_size &&
                  product.product_details[selectedProductIndex].print_size
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="formattributes">
                        <Form.Label>Print Size</Form.Label>
                        <Form.Select
                          name="psize"
                          type="dropdown"
                          value={formData.psize}
                          onChange={(e) =>
                            handleChangePrint(index, "psize", e.target.value)
                          }
                          className="w-full h-10 text-sm"
                        >
                          <option value="" disabled selected>
                            Select Print Size
                          </option>
                          {product.product_details[
                            selectedProductIndex
                          ].print_size.map((printSize, index) => (
                            <option key={index} value={printSize.size}>
                              {printSize.size}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  )}

                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].print_size &&
                  product.product_details[selectedProductIndex].print_size
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="attributePrice">
                        <Form.Label>Print Size Price</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={formData.sizeprice}
                          className="w-full h-10 text-sm"
                        />
                      </Form.Group>
                    </Col>
                  )}

                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].attributes &&
                  product.product_details[selectedProductIndex].attributes
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="formattributes">
                        <Form.Label>Printing Side</Form.Label>
                        <Form.Select
                          name="pasection"
                          type="dropdown"
                          value={formData.pasection}
                          onChange={(e) =>
                            handleChangePrint(
                              index,
                              "pasection",
                              e.target.value
                            )
                          }
                          className="w-full h-10"
                          required={!!formData.psize}
                        >
                          <option value="" disabled selected>
                            Select Printing Side
                          </option>
                          {product.product_details[
                            selectedProductIndex
                          ].attributes.map((attribute, sizeIndex) => {
                            const isSelected = printList
                              .slice(0, index)
                              .some(
                                (form, formIndex) =>
                                  form.pasection === attribute.section
                              );
                            if (!isSelected) {
                              return (
                                <option
                                  key={sizeIndex}
                                  value={attribute.section}
                                >
                                  {attribute.section}
                                </option>
                              );
                            }
                            return null;
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  )}

                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].attributes &&
                  product.product_details[selectedProductIndex].attributes
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="attributePrice">
                        <Form.Label>Section Price</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={formData.sectionprice}
                          className="w-full h-10"
                        />
                      </Form.Group>
                    </Col>
                  )}

                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].attributes &&
                  product.product_details[selectedProductIndex].attributes
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="formImage">
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                          className=" w-full h-10 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block text-[9px] font-bold"
                          required={!!formData.psize}
                        />
                      </Form.Group>
                    </Col>
                  )}

                <Col lg={2}>
                  <Button
                    variant="danger"
                    className="mt-[30px] w-32 h-10 text-sm"
                    onClick={() => removePrint(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="primary"
              className="mt-2 mb-2 w-32 h-10 text-sm"
              onClick={addPrintForm}
            >
              Add Print Size
            </Button>
          </div>
          <div className="bg-gray-200 mt-3 p-2 text-sm">
            {formList.map((formData, index) => (
              <Row key={index} className="">
                <Col lg={2}>
                  <Form.Group controlId="formProductSize">
                    <Form.Label>Product Size</Form.Label>
                    <Form.Select
                      name="product_size"
                      value={formData.product_size}
                      onChange={(e) =>
                        handleChange(index, "product_size", e.target.value)
                      }
                    >
                      <option value="" disabled selected>
                        Select Product Size
                      </option>
                      {product.product_details &&
                        product.product_details[selectedProductIndex]
                          .product_size &&
                        product.product_details[
                          selectedProductIndex
                        ].product_size.map((productSize, sizeIndex) => {
                          // Check if the current option has been selected in any previous form
                          const isSelected = formList
                            .slice(0, index) // Only check previous forms
                            .some(
                              (form, formIndex) =>
                                form.product_size === productSize.size
                            );
                          // If the option is not selected in any previous form, render it
                          if (!isSelected) {
                            return (
                              <option key={sizeIndex} value={productSize.size}>
                                {productSize.size}
                              </option>
                            );
                          }
                          return null; // Otherwise, skip rendering this option
                        })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group controlId="formbase_price">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={formData.price}
                      className="w-full h-10 "
                    />
                  </Form.Group>
                </Col>

                {product.product_details &&
                product.product_details[selectedProductIndex].product_gsm
                  .length > 1 ? (
                  <Col lg={2}>
                    <Form.Group controlId={`formGSM_${index}`}>
                      <Form.Label>GSM</Form.Label>
                      <Form.Select
                        name="product_size_gsm"
                        value={formData.product_size_gsm}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "product_size_gsm",
                            e.target.value
                          )
                        }
                      >
                        <option value="" disabled selected>
                          Select Product GSM
                        </option>
                        {(() => {
                          try {
                            const gsmOptions =
                              product.product_details[selectedProductIndex]
                                .product_gsm;
                            return gsmOptions.map((sizeOption, index) => (
                              <option key={index} value={sizeOption.gsm}>
                                {sizeOption.gsm}
                              </option>
                            ));
                          } catch (error) {
                            console.error(
                              "Error occurred while accessing GSM options:",
                              error
                            );
                            return null;
                          }
                        })()}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                ) : null}
                {product.product_details &&
                  product.product_details[selectedProductIndex] &&
                  product.product_details[selectedProductIndex].product_gsm &&
                  product.product_details[selectedProductIndex].product_gsm
                    .length > 0 && (
                    <Col lg={2}>
                      <Form.Group controlId="attributePrice">
                        <Form.Label>GSM price</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={formData.gsmprice}
                          className="w-full h-10"
                        />
                      </Form.Group>
                    </Col>
                  )}
                <Col lg={2}>
                  <Form.Group controlId="formbase_price">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      name="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={(e) => {
                        handleChange(index, "quantity", e.target.value);
                      }}
                      className="w-full h-10 "
                    />
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Button
                    variant="danger"
                    className="mt-[30px] w-32 h-10 text-sm"
                    onClick={() => removeForm(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="primary"
              className="w-32 h-10 text-sm mt-0"
              onClick={addForm}
            >
              Add Size
            </Button>
          </div>
          <Row className=" mt-3">
            <Col lg={4}>
              <Form.Group controlId="formbase_price">
                <Form.Label>
                  {" "}
                  Total Selling Price
                  {formErrors.unit_price && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.unit_price}
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  name="unit_price"
                  type="number"
                  min="0"
                  value={
                    formData.order_type === "Advance Payment"
                      ? 0
                      : formData.unit_price
                  }
                  onChange={handle}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId={`formTotalPrice_`}>
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  name="total_price"
                  type="text"
                  value={calculateTotalPrice()}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId={`formTotalPrice_`}>
                <Form.Label>Total Quantity</Form.Label>
                <Form.Control
                  name="total_quantity"
                  type="text"
                  value={calculateTotalQuantity()}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Form.Group controlId="formbase_price">
                <Form.Label>
                  Order Type{" "}
                  {formErrors.order_type && (
                    <span className="text-red-500 text-sm mt-0">
                      {formErrors.order_type}
                    </span>
                  )}
                </Form.Label>
                <Form.Select
                  name="order_type"
                  type="dropdown"
                  value={formData.order_type}
                  onChange={handle}
                >
                  <option value="" disabled selected>
                    Select Order Type
                  </option>
                  <option value="Cash On delivery">Cash on Delivery</option>
                  <option value="Advance Payment">Advance Payment</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formSellerPayment">
                <div className=" flex-col xl:flex gap-4 mt-2">
                  <div>
                    {formData.order_type === "Advance Payment" && (
                      <div className="">
                        <h2>Select Payment Option</h2>
                        <div className="flex mt-1">
                          <div className="bg-gray-300">
                            <Form.Select
                              name="payment_option"
                              type="dropdown"
                              value={formData.payment_option}
                              onChange={handle}
                              className="w-40 h-8"
                            >
                              <option value="" disabled selected>
                                Select One
                              </option>
                              <option value="bkash">Bkash</option>
                              <option value="rocket">Rocket</option>
                              <option value="nagad">Nagad</option>
                            </Form.Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {formData.order_type === "Advance Payment" && (
                      <div className="">
                        <div className="flex mt-1">
                          {formData.payment_option === "bkash" && (
                            <div className="flex  bg-gray-300 p-2">
                              <img
                                src={
                                  process.env.REACT_APP_BASE_URL +
                                  `/${sellerPayment[1].bkash_image}`
                                }
                                className="w-16 h-16 m-auto p-1"
                                onClick={handleShowNumberClick}
                              />
                              <span className="mt-6 ml-2 pr-4 font-bold">
                                {sellerPayment[0].bkash}{" "}
                                <p className="text-red-500">
                                  Use this number for payment
                                </p>
                              </span>
                            </div>
                          )}
                          {formData.payment_option === "rocket" && (
                            <div className="flex  bg-gray-300 p-2">
                              <img
                                src={
                                  process.env.REACT_APP_BASE_URL +
                                  `/${sellerPayment[1].rocket_image}`
                                }
                                className="w-16 h-16 m-auto p-1"
                                onClick={handleShowNumberClick}
                              />
                              <span className="mt-6 ml-2 pr-4 font-bold">
                                {sellerPayment[0].rocket}{" "}
                                <p className="text-red-500">
                                  Use this number for payment
                                </p>
                              </span>
                            </div>
                          )}
                          {formData.payment_option === "nagad" && (
                            <div className="flex  bg-gray-300 p-2">
                              <img
                                src={
                                  process.env.REACT_APP_BASE_URL +
                                  `/${sellerPayment[1].nagad_image}`
                                }
                                className="w-16 h-16 m-auto p-1"
                                onClick={() =>
                                  handleShowNumberClick(sellerPayment[0].nagad)
                                }
                              />
                              <span className="mt-6 ml-2 pr-4 font-bold">
                                {sellerPayment[0].nagad}{" "}
                                <p className="text-red-500">
                                  Use this number for payment
                                </p>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mb-2 mt-4">
            Submit Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrder;
