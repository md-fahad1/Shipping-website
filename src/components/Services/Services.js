import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Testimonial Box
import PerformanceItem from "./PerformanceItem";

class Services extends Component {
    state = {
        items: [
            {
                id: 1,
                image: "assets/images/services/img-1.png",
                name: "Custom Products",
                cmpName: "CREATE",
                message: " Make a design for your niche and add the design to our wide product range"
            },
            {
                id: 2,
                image: "assets/images/services/img-2.png",
                name: "On Your Terms",
                cmpName: "Sell",
                message: "You choose the products, sale price, and where to sell"
            },
            {
                id: 3,
                image: "assets/images/services/img-3.png",
                name: "Fulfillment",
                cmpName: "We handle",
                message: "Once an order is placed, we automatically handle all the printing and delivery logistics"
            }
        ]
    };
    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <Container>
                        <Row>
                            {/* render testimonials box */}
                            {this.state.items.map((item, key) => (
                                <PerformanceItem key={key} item={item} />
                            ))}
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Services;
