import Home from "./pages/Home";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import PasswordForget from "./pages/Auth/password_forget";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/dashboard/Dashboard";
// import ProductsList from "./pages/products/list/ProductsList";
import ProductsList from "./pages/products/list/ProductsList";
import CreateOrder from "./pages/products/list/CreateOrder";
import AllOrder from "./pages/products/list/AllOrder";
import ContactUs from "./pages/dashboard/ContactUs";
import FAQs from "./pages/dashboard/FAQs";
import OrderDetail from "./pages/products/detail/OrderDetail";
import RequestService from "./pages/products/list/RequestService";
import Performance from "./components/Performance/Performance";

import Services from "./components/Services/Services";
import Footer from "./components/Footer/footer";
import Catelog from "./components/Catelog/Catelog";
import HowItsWork from "./components/HowItsWork/HowItsWork";
import AdminAllorder from "./pages/products/list/AdminAllorder";
import AdminOrderDetails from "./pages/products/detail/AdminOrderDetails";
import Reset_password from "./pages/Auth/reset_password";
// import Product from "./pages/products/product";


const routes = [
    //Auth
    { path: "/signup", component: <SignUp /> },
    { path: "/login", component: <Login /> },
    { path: "/password_forget", component: <PasswordForget /> },
    { path: "/", component: <Home /> },
    { path: "/adminDashboard", component: <AdminDashboard /> },
    { path: "/Dashboard", component: <Dashboard /> },
    { path: "/productList", component: <ProductsList /> },
    { path: "/createOrder", component: <CreateOrder /> },
    { path: "/allOrder", component: <AllOrder /> },
    { path: "/admin/allOrder", component: <AdminAllorder /> },
    { path: "/contactUs", component: <ContactUs /> },
    { path: "/abc", component: <RequestService /> },
    { path: "/faq", component: <FAQs /> },
    { path: "/about", component: <Performance /> },
    { path: "/contact", component: <Footer />},
    { path: "/services", component: <Services /> },
    { path: "/catalog", component: <Catelog /> },
    { path: "/howItWorks", component: <HowItsWork /> },
    { path: "/details/:invoiceNo", component: <OrderDetail /> },
    { path: "/detail/:invoiceNo", component: <AdminOrderDetails /> },
    { path: "/reset_password/:token", component: <Reset_password />},
    // { path: "/product", component: <Product /> }

];

export default routes;
