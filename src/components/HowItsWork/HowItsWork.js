import React from "react";
import { FaUserPlus, FaMoneyBill, FaHome } from "react-icons/fa";
import Navbar_Page from "../Navbar/NavbarPage";
import Footer from "../Footer/footer";

const HowItsWork = () => {
  const iconColor = "#2FB261";

  return (
    <div className="h-screen">
      <Navbar_Page />
      <div className="mt-28 pl-8 pr-8">
        <div className="gap-4 flex w-full text-center mt-3 bg-[#F8F9FA] pt-4 pb-4">
          {/* Logo and name for each step */}
          <div className="w-1/3 flex flex-col items-center text-gray-700">
            <FaUserPlus size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Page Create</span>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <FaMoneyBill size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Sell</span>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <FaHome size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Deliver from Home</span>
          </div>
        </div>
        <h3 className="text-center mt-4 text-xl font-bold">Order Processing</h3>
        <p className="mt-3 text-lg">
          We accept orders in two ways. One is cash on delivery, while the other
          is advance payment. In the Cash on Delivery process, you will place
          your order without making any payment. We will then finalize the order
          by delivering the products to the customer and collecting the payment
          from them. We will then provide you the money you earned after
          deducting our product and delivery costs.{" "}
        </p>
        <p className="mt-2 text-lg">
          The Advance Payment method allows you to order and pay for the
          products you've ordered as well as the delivery price. Following that,
          we will finish the delivery and you will be responsible for collecting
          payment from your customer. For both processes, every stage of an
          order is trackable from the system.
        </p>

        <div className="bg-[#F8F9FA] pt-2">
        <h2 className="text-center mt-4 text-xl font-bold">Why Choose ShobArtist</h2>
        
        <div className="gap-4 flex mt-3 w-full text-center bg-[#F8F9FA]">
        
          {/* Logo and name for each reason */}
          <div className="w-1/3 flex flex-col items-center ">
            <FaMoneyBill size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Maximum Profit</span>
            <span className="mt-2">We maintain low prices so you may maintain large profit margins.</span>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <FaUserPlus size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Grow Your Business</span>
            <span className="mt-2">ShobArtist provides all the resources you require to grow your company.</span>
          </div>
          <div className="w-1/3 flex flex-col items-center mb-4">
            <FaHome size={50} color={iconColor} />
            <span className="mt-2 font-bold text-lg text-gray-700">Manage Business from Home</span>
            <span className="mt-2">You will manage your overall business from home, without any hassle!</span>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItsWork;
