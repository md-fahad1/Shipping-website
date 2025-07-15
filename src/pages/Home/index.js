import React, { Component } from "react";
import NavbarPage from "../../components/Navbar/NavbarPage";
import HomeBanner from "../../components/HomeBanner/Section";
import Performance from "../../components/Performance/Performance";
import Experience from "../../components/Experience/Experience";
import Services from "../../components/Services/Services";
import Selling from "../../components/Selling/Selling";
import Footer from "../../components/Footer/footer";

class Index1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "navbar-white"
        };
    }

    render() {
        return (
            <React.Fragment>
                {/* Importing Navbar */}
                <NavbarPage navClass={this.state.navClass} />

                {/* Importing Home Banner */}
                <HomeBanner />

                {/* Importing Services */}
                <Performance />


                {/* Importing Experience */}
               
                <Experience />

                {/* Importing Services */}
                <Services />

                <Selling />

                {/* Importing Get Footer */}
                <Footer />
            </React.Fragment>
        );
    }
}

export default Index1;
