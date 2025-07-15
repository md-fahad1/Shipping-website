import React, { Component } from "react";
import "./App.css";
import "./assets/css/materialdesignicons.min.css";
import "./assets/scss/themes.scss";

import routes from "./routes";
import withRouter from "./components/withRouter";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./pages/AuthContext";
import { OrderDetailProvider } from "./pages/OrderDetailsContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            
            <AuthProvider>
                <OrderDetailProvider>
            <React.Fragment>
                <Routes>  
                    
                    {routes.map((route, idx) => (
                        <Route path={route.path} element={route.component} key={idx} />
                    ))}
                    
                </Routes>
            </React.Fragment>
            </OrderDetailProvider>
            </AuthProvider>

        );
    }
}

export default withRouter(App);
