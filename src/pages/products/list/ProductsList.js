import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  Card,
  Badge,
  Pagination,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
// import HtmlHead from 'components/html-head/HtmlHead';
import {
  FiChevronLeft,
  FiPlus,
  FiSearch,
  FiPrinter,
  FiDownload,
  FiSort,
} from "react-icons/fi";
import OverlayNavbar from "../../OverlayNavbar";
// import CheckAll from 'components/check-all/CheckAll';

const ProductsList = () => {
  const title = "Product List";
  // const description = 'Ecommerce Product List Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  // const toggleCheckAll = (allSelect) => {
  //   if (allSelect) {
  //     setSelectedItems(allItems);
  //   } else {
  //     setSelectedItems([]);
  //   }
  // };

  return (
    <>
    <OverlayNavbar />
      <div className="pl-32 pr-16 bg-[#F9F9F9]">
        
        <div className="page-title-container ">
          <Row className="g-0">
            {/* Title Start */}
            <Col className="col-auto mb-3 mb-sm-0 me-auto mt-2">
              <NavLink
                className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
                to="/"
              >
                <FiChevronLeft size={13} />
                <span className="align-middle text-small ms-1 text-blue-400">
                  Home
                </span>
              </NavLink>
              <h1 className="mb-0 pb-0 text-2xl text-gray-500" id="title">
                {title}
              </h1>
            </Col>
            {/* Title End */}

            {/* Top Buttons Start */}
            <Col
              xs="12"
              sm="auto"
              className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3"
            >
              <Button
                variant="outline-primary"
                className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto flex "
              >
                <FiPlus className="mt-1 text-lg" /> <span>Add Product</span>
              </Button>
              <Button
                variant="outline-primary"
                className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none"
              >
                {/* <FiSort /> */}
              </Button>
              <div className="btn-group ms-1 check-all-container">
                {/* <CheckAll
              allItems={allItems}
              selectedItems={selectedItems}
              onToggle={toggleCheckAll}
              inputClassName="form-check"
              className="btn btn-outline-primary btn-custom-control py-0"
            /> */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    className="dropdown-toggle dropdown-toggle-split"
                    variant="outline-primary"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item>Move</Dropdown.Item>
                    <Dropdown.Item>Archive</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            {/* Top Buttons End */}
          </Row>
        </div>

        {/* Second Row */}
        <Row className="mb-3">
          <Col md="5" lg="3" xxl="2" className="mb-1">
            {/* Search Start */}
            <div className="  me-1  search-input-container w-48 shadow bg-foreground">
              <div className="position-relative">
                <Form.Control type="text" placeholder="Search" />
                <span className="position-absolute top-50 start-0 translate-middle-y ms-40 text-lg text-gray-500">
                  <FiSearch />
                </span>
                <span className="search-delete-icon d-none">
                  {/* <FiClose /> */}
                </span>
              </div>
            </div>

            {/* Search End */}
          </Col>
          <Col md="7" lg="9" xxl="10" className="mb-1 text-end gap-4 mt-2">
            {/* Print Button Start */}
            <OverlayTrigger
              delay={{ show: 1000, hide: 0 }}
              placement="top"
              overlay={<Tooltip id="tooltip-top">Print</Tooltip>}
            >
              <Button
                variant="foreground-alternate"
                className="btn-icon btn-icon-only shadow"
              >
                <FiPrinter />
              </Button>
            </OverlayTrigger>
           
            {/* Print Button End */}

            <OverlayTrigger
              delay={{ show: 1000, hide: 0 }}
              placement="top"
              overlay={<Tooltip id="tooltip-top">Print</Tooltip>}
            >
              <Button
                variant="foreground-alternate"
                className="btn-icon btn-icon-only shadow"
              >
                <FiDownload className="text-sm" />
              </Button>
            </OverlayTrigger>
            {/* Export Dropdown End */}

            {/* Length Start */}
            <Dropdown align={{ xs: "end" }} className="d-inline-block ms-1">
              <OverlayTrigger
                delay={{ show: 1000, hide: 0 }}
                placement="top"
                overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}
              >
                <Dropdown.Toggle
                  variant="foreground-alternate"
                  className="shadow sw-13"
                >
                  10 Items
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu className="shadow dropdown-menu-end">
                <Dropdown.Item href="#">5 Items</Dropdown.Item>
                <Dropdown.Item href="#">10 Items</Dropdown.Item>
                <Dropdown.Item href="#">20 Items</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Length End */}
          </Col>
        </Row>

        {/* List Header Start */}
        <Row className="g-0 mb-2 d-none d-lg-flex ml-20 text-sm">
          <Col xs="auto" className="sw-11 d-none d-lg-flex" />
          <Col>
            <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
              <Col xs="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                <div className="text-muted text-small cursor-pointer sort">
                  TITLE
                </div>
              </Col>
              <Col
                xs="2"
                lg="3"
                className="d-flex flex-column pe-1 justify-content-center"
              >
                <div className="text-muted text-sm cursor-pointer sort">
                  STOCK
                </div>
              </Col>
              <Col
                xs="2"
                lg="3"
                className="d-flex flex-column pe-1 justify-content-center"
              >
                <div className="text-muted text-small cursor-pointer sort">
                  PRICE
                </div>
              </Col>
              <Col
                xs="2"
                lg="3"
                className="d-flex flex-column pe-1 justify-content-center"
              >
                <div className="text-muted text-small cursor-pointer sort">
                  STATUS
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* List Header End */}

        {/* List Items Start */}
        <Card className={`mb-2 ${selectedItems.includes(1) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-1.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Anpan
                    <div className="text-small text-muted text-truncate">
                      #2342
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">2.511</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 62.20</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                >
                  <Badge bg="outline-primary">SALE</Badge>
                </Col>
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(1)}
                    onChange={() => checkItem(1)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(2) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-2.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Bagel
                    <div className="text-small text-muted text-truncate">
                      #2567
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">352</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 41.15</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                >
                  <Badge bg="outline-primary">SALE</Badge>
                </Col>
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(2)}
                    onChange={() => checkItem(2)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(3) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-3.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Bannock
                    <div className="text-small text-muted text-truncate">
                      #1831
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">1.531</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 7.50</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                />
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(3)}
                    onChange={() => checkItem(3)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(4) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-4.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Cholermüs
                    <div className="text-small text-muted text-truncate">
                      #1558
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">729</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 18.00</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                />
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(4)}
                    onChange={() => checkItem(4)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(5) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-5.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Fougasse
                    <div className="text-small text-muted text-truncate">
                      #1179
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">917</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 18.00</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                >
                  <Badge bg="outline-quaternary">LOW STOCK</Badge>
                </Col>
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(5)}
                    onChange={() => checkItem(5)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(6) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-6.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Kulcha
                    <div className="text-small text-muted text-truncate">
                      #5622
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">592</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 52.50</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                />
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(6)}
                    onChange={() => checkItem(6)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(7) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-7.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Mohnflesserl
                    <div className="text-small text-muted text-truncate">
                      #3457
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">2.849</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 14.10</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                />
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(7)}
                    onChange={() => checkItem(7)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(8) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-8.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Pistolet
                    <div className="text-small text-muted text-truncate">
                      #4832
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">902</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 32.60</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                >
                  <Badge bg="outline-secondary">NEW</Badge>
                </Col>
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(8)}
                    onChange={() => checkItem(8)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(9) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-9.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Rieska
                    <div className="text-small text-muted text-truncate">
                      #2611
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">614</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 19.15</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                >
                  <Badge bg="outline-secondary">NEW</Badge>
                </Col>
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(9)}
                    onChange={() => checkItem(9)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className={`mb-2 ${selectedItems.includes(10) && "selected"}`}>
          <Row className="g-0 h-100 sh-lg-9 position-relative">
            <Col xs="auto" className="positio-relative">
              <NavLink to="/products/detail">
                <img
                  src="/img/product/small/product-10.webp"
                  alt="product"
                  className="card-img card-img-horizontal sw-11 h-100"
                />
              </NavLink>
            </Col>
            <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col
                  xs="11"
                  lg="3"
                  className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center"
                >
                  <NavLink to="/products/detail">
                    Zopf
                    <div className="text-small text-muted text-truncate">
                      #3470
                    </div>
                  </NavLink>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3"
                >
                  <div className="lh-1 text-alternate">1.852</div>
                </Col>
                <Col
                  lg="3"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4"
                >
                  <div className="lh-1 text-alternate">$ 68.00</div>
                </Col>
                <Col
                  lg="2"
                  className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5"
                />
                <Col
                  xs="1"
                  className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center"
                >
                  <Form.Check
                    className="form-check mt-2 ps-7 ps-md-2"
                    type="checkbox"
                    checked={selectedItems.includes(10)}
                    onChange={() => checkItem(10)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        {/* List Items End */}

        {/* Pagination Start */}
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev className="shadow" disabled>
              {/* <CsLineIcons icon="chevron-left" /> */}
            </Pagination.Prev>
            <Pagination.Item className="shadow" active>
              1
            </Pagination.Item>
            <Pagination.Item className="shadow">2</Pagination.Item>
            <Pagination.Item className="shadow">3</Pagination.Item>
            <Pagination.Next className="shadow">
              {/* <CsLineIcons icon="chevron-right" /> */}
            </Pagination.Next>
          </Pagination>
        </div>
        {/* Pagination End */}
      </div>
    </>
  );
};

export default ProductsList;
