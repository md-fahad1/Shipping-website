import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Testimonial Box
import PerformanceItem from "./PerformanceItem";

class Performance extends Component {
    state = {
        items: [
            {
                id: 1,
                image: "assets/images/profite1.png",
                name: "Higher Profits",
                cmpName: "Shob Artist",
                message: "Unlike other businesses, we encourage artists to make more money. We can maintain a cheap pricing while providing the best quality and service thanks to our quantity-based profit model."
            },
            {
                id: 2,
                image: "assets/images/scale2.png",
                name: " Quick setup",
                cmpName: "Shob Artist",
                message: "You may launch your company with our dropshipping concept in as little as thirty minutes. Just imagine it, and we'll make it reality."
            },
            {
                id: 3,
                image: "assets/images/best.png",
                name: "Best Selection",
                cmpName: "Shob Artist",
                message: "We source from the best suppliers and connect your business with products that are ready to sell directly to your customers."
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

export default Performance;
