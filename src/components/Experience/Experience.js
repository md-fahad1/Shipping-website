import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import Img1 from "../../assets/images/testi-img/a.png";
import Img2 from "../../assets/images/testi-img/b.png";
import Img3 from "../../assets/images/testi-img/c.png";
import Img4 from "../../assets/images/testi-img/d.png";
import Img5 from "../../assets/images/testi-img/e.png";
import Img6 from "../../assets/images/testi-img/f.png";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        {
          id: 1,
          img: Img1,
          name: "T-Shirt (Half Sleeve)",
          details: {
            colorBlob: [
              "#000000", // Black
              "#FFFFFF", // White
              "#FF0000", // Red
              "#FFC0CB", // Baby Pink
              "#FFFF00", // Yellow
              "#ADD8E6", // Light Blue
            ],
            gsm: [170, 190, 200],
            fabric: "100% Cotton",
            sizeChart: [
              { size: "S", length: 27, chest: 38 },
              { size: "M", length: 28, chest: 40 },
              { size: "L", length: 29, chest: 42 },
              { size: "XL", length: 30, chest: 44 },
              { size: "XXL", length: 31, chest: 46 },
            ],
          },
        },
        {
          id: 2,
          img: Img2,
          name: "Tote bag",
          details: {
            colorBlob: ["#ffffff", "#000000"],
            sizeChart: [
              { size: "S", height: 10, width: 8 },
              { size: "M", height: 13, width: 11 },
              { size: "L", height: 16, width: 14 },
              { size: "XL", height: 18, width: 16 },
            ],
          },
        },
        {
          id: 3,
          img: Img3,
          name: "Hoodie",
          details: {
            colorBlob: ["Black", "gray"],
            sizeChart: [
              { size: "S", chest: 38, length: 27 },
              { size: "M", chest: 40, length: 28 },
              { size: "L", chest: 42, length: 29 },
              { size: "XL", chest: 44, length: 30 },
              { size: "XXL", chest: 46, length: 31 },
            ],
            gsm: [350],
            fabric: "Fleece",
          },
        },
        {
          id: 4,
          img: Img4,
          name: "Poster",
          
          details: {
            colorBlob: [""],
            Quality: "HD Matte",
            description: "Matte/Glossy Lamination",
            sizeChart: [
              { size: "A4(12X8)" },
              { size: "A3(12X18 or 12X16)" },
              { size: "A2(18X24 or 16X24)" },
              { size: "36X24" },
            ],
          },
        },
        {
          id: 5,
          img: Img5,
          name: "Sticker",
          details: {
            colorBlob: ["Black", "Gray"],

            fabric: "Matte",
            sizeChart: [
              { size: "1X1 inch", Shape: "Round" },
              { size: "2X2 inch", Shape: "Square" },
              { size: "3X3 inch", Shape: "Triangle" },
              { size: "4X4 inch", Shape: "Rectangular" },
            ],
          },
        },
        {
          id: 6,
          img: Img6,
          name: "Mug",
          details: {
            colorBlob: ["White"],

            description: "Submilation print",
            sizeChart: [
              { size: "S", chest: 38 },
              { size: "M", chest: 40 },
              { size: "L", chest: 42 },
              { size: "XL", chest: 44 },
              { size: "XXL", chest: 46 },
            ],
          },
        },
      ],
    };
  }

  render() {
    const settings = {
      autoplay: true,
      dots: true,
      speed: 300,
      infinite: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const teamSlides = this.state.teams.map((team, teamIndex) => {
      return (
        <div className="p-4 " key={teamIndex}>
          <div className="bg-white min-h-[490px] p-6 rounded-lg  items-center">
            <div className="">
              <h5 className="text-lg sm:text-xl font-semibold">{team.name}</h5>
              {team.details && (
                <div className="mt-4">
                  <div className="flex">
                    <div className="w-1/2">
                      <h6 className="font-semibold">Details:</h6>
                      {team.details.colorBlob && (
                        <div className="mt-2 ">
                          {team.name === "Poster" ? "" : <p>Color:</p>}

                          <div
                            className={`flex ${
                              team.name === "Poster"
                                ? "bg-white"
                                : "bg-gray-200"
                            } w-36 p-0.5`}
                          >
                            {team.details.colorBlob.map((color, index) => (
                              <span
                                key={index}
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: color }}
                              ></span>
                            ))}
                          </div>
                        </div>
                      )}

                      {team.details.gsm && (
                        <div>
                          <p>GSM: {team.details.gsm.join(", ")}</p>
                        </div>
                      )}
                      {team.details.fabric && (
                        <p>
                          {team.name === "Sticker"
                            ? team.details.fabric
                            : `Fabric: ${team.details.fabric}`}
                        </p>
                      )}

                      {team.details.description && (
                        <p>
                            <p>Material: {team.details.description}</p>
                          {/* {team.name === "Poster"
                            ? `Material: ${team.details.description}`
                            : ""} */}
                        </p>
                      )}
                      {team.details.Quality && (
                        <p>
                            <p>Quality: {team.details.Quality}</p>
                          {/* {team.name === "Poster"
                            ? `Material: ${team.details.description}`
                            : ""} */}
                        </p>
                      )}
                    </div>

                    <div className="lg:w-60 md:w-60 sm:w-40 flex justify-end">
                      <img
                        src={team.img}
                        alt=""
                        className="lg:w-60 lg:h-60 md:w-60 md:h-60  sm:w-36 sm:h-36   rounded-md"
                      />
                    </div>
                  </div>

                  {team.details.sizeChart && (
                    <div className="mt-1">
                      {team.name !== "Mug" && (
                        <div>
                          <h6 className="font-semibold">Size Chart:</h6>
                          <table className="2xl:w-full sm:w-full xl:w-full w-full  border-collapse border border-gray-300 mt-2">
                            <tbody>
                              <tr>
                                <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                  Size
                                </th>
                                {team.details.sizeChart.map(
                                  (sizeData, index) => (
                                    <td
                                      key={index}
                                      className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5"
                                    >
                                      {sizeData.size}
                                    </td>
                                  )
                                )}
                              </tr>
                              {team.name !== "Sticker" &&
                                team.name !== "Poster" && (
                                  <tr>
                                    <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                      {team.name === "Tote bag"
                                        ? "Height"
                                        : team.name === "Hoodie"
                                        ? "Length"
                                        : team.name === "T-Shirt (Half Sleeve)"
                                        ? "Chest"
                                        : ""}
                                    </th>
                                    {team.details.sizeChart.map(
                                      (sizeData, index) => (
                                        <td
                                          key={index}
                                          className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2  px-0.5 py-1.5"
                                        >
                                          {team.name === "Tote bag"
                                            ? sizeData.height
                                            : team.name === "Hoodie"
                                            ? sizeData.length
                                            : sizeData.chest}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                )}
                              {team.name === "Sticker" && (
                                <tr>
                                  <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                    Shape
                                  </th>
                                  {team.details.sizeChart.map(
                                    (sizeData, index) => (
                                      <td
                                        key={index}
                                        className="border text-[14px]  border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5"
                                      >
                                        {sizeData.Shape}
                                      </td>
                                    )
                                  )}
                                </tr>
                              )}
                              {team.name === "Hoodie" && (
                                <tr>
                                  <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                    Chest
                                  </th>
                                  {team.details.sizeChart.map(
                                    (sizeData, index) => (
                                      <td
                                        key={index}
                                        className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5"
                                      >
                                        {sizeData.chest}
                                      </td>
                                    )
                                  )}
                                </tr>
                              )}
                              {team.name === "T-Shirt (Half Sleeve)" && (
                                <tr>
                                  <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                    Length
                                  </th>
                                  {team.details.sizeChart.map(
                                    (sizeData, index) => (
                                      <td
                                        key={index}
                                        className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5"
                                      >
                                        {sizeData.length}
                                      </td>
                                    )
                                  )}
                                </tr>
                              )}
                              {team.name === "Tote bag" && (
                                <tr>
                                  <th className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5">
                                    Width
                                  </th>
                                  {team.details.sizeChart.map(
                                    (sizeData, index) => (
                                      <td
                                        key={index}
                                        className="border text-[14px] border-gray-300 md:px-2 xl:px-2 lg:px-2 px-0.5 py-1.5"
                                      >
                                        {sizeData.width}
                                      </td>
                                    )
                                  )}
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="bg-light py-3">
        <section className="section" id="team">
          <div className="container mx-auto">
            <Slider {...settings}>{teamSlides}</Slider>
            <div class="flex justify-center  mt-2">
              <Button
                type="button"
                color="outline-secondary"
                class="navbar-btn  btn-sm waves-effect ml-2 md:ml-3"
              >
                <Link to="/login">Log In to See Price </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
