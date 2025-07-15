import Footer from "../Footer/footer";
import Navbar_Page from "../Navbar/NavbarPage";
import React from "react";

const products = [
  {
    id: 1,
    name: "Tshirt(Half Sleeve)",
    image: "../../assets/images/testi-img/a.png",
    sizeChart: [
      { size: "S", length: 27, chest: 38 },
      { size: "M", length: 28, chest: 40 },
      { size: "L", length: 29, chest: 42 },
      { size: "XL", length: 30, chest: 44 },
      { size: "XXL", length: 31, chest: 46 },
    ],
  },
  {
    id: 2,
    name: "Tote bag",
    image: "../../assets/images/testi-img/b.png",
    description: "",
    sizeChart: [
      { size: "S", height: 10, width: 8 },
      { size: "M", height: 13, width: 11 },
      { size: "L", height: 16, width: 14 },
      { size: "XL", height: 18, width: 16 },
    ],
  },
  {
    id: 3,
    name: "Hoodie",
    image: "../../assets/images/testi-img/c.png",
    description: "",
    sizeChart: [
      { size: "S", chest: 38, length: 27 },
      { size: "M", chest: 40, length: 28 },
      { size: "L", chest: 42, length: 29 },
      { size: "XL", chest: 44, length: 30 },
      { size: "XXL", chest: 46, length: 31 },
    ],
  },
  {
    id: 4,
    name: "Poster",
    image: "../../assets/images/testi-img/d.png",
    description: "Matte/Glossy Lamination",
    sizeChart: [
      { size: "A4(12X8)" },
      { size: "A3(12X18 or 12X16)" },
      { size: "A2(18X24 or 16X24)" },
      { size: "36X24" },
    ],
  },
  {
    id: 5,
    name: "Sticker",
    image: "../../assets/images/testi-img/e.png",
    sizeChart: [
      { size: "1X1 inch", Shape: "Round" },
      { size: "2X2 inch", Shape: "Square" },
      { size: "3X3 inch", Shape: "Triangle" },
      { size: "4X4 inch", Shape: "Rectangular" },
    ],
  },
  {
    id: 6,
    name: "Mug",
    image: "../../assets/images/testi-img/f.png",
    description: "Sublimation Print",
    sizeChart: [],
  },
];

const Catalog = () => {
  return (
    <React.Fragment>
      <Navbar_Page />
      <div className="container py-8 ">
        <h1 className="text-3xl font-bold mb-4">Catalog</h1>
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 grid-cols-2 gap-3 sm:mt-16 mb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-md h-[440px] overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                <p className="text-sm ">{product.description}</p>
                <div className="w-full h-56 md:text-sm  lg:text-sm xl:text-sm text-[6px]">
                  {product.name !== "Mug" && (
                    <table className="border-collapse border w-full border-gray-300 mt-1 pb-2">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2">
                            Size
                          </th>
                          {product.sizeChart.map((sizeData, index) => (
                            <td
                              key={index}
                              className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                            >
                              {sizeData.size}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.name !== "Sticker" &&
                          product.name !== "Poster" && (
                            <tr>
                              <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2">
                                {product.name === "Tote bag"
                                  ? "Height"
                                  : product.name === "Hoodie"
                                  ? "Length"
                                  : product.name === "Tshirt(Half Sleeve)"
                                  ? "Chest"
                                  : ""}
                              </th>
                              {product.sizeChart.map((sizeData, index) => (
                                <td
                                  key={index}
                                  className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                                >
                                  {product.name === "Tote bag"
                                    ? sizeData.height
                                    : product.name === "Hoodie"
                                    ? sizeData.length
                                    : sizeData.chest}
                                </td>
                              ))}
                            </tr>
                          )}
                        {product.name === "Sticker" && (
                          <tr>
                            <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2">
                              Shape
                            </th>
                            {product.sizeChart.map((sizeData, index) => (
                              <td
                                key={index}
                                className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                              >
                                {sizeData.Shape}
                              </td>
                            ))}
                          </tr>
                        )}
                        {product.name === "Hoodie" && (
                          <tr>
                            <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2">
                              Chest
                            </th>
                            {product.sizeChart.map((sizeData, index) => (
                              <td
                                key={index}
                                className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                              >
                                {sizeData.chest}
                              </td>
                            ))}
                          </tr>
                        )}
                        {product.name === "Tshirt(Half Sleeve)" && (
                          <tr>
                            <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-1 mb-2">
                              Length
                            </th>
                            {product.sizeChart.map((sizeData, index) => (
                              <td
                                key={index}
                                className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                              >
                                {sizeData.length}
                              </td>
                            ))}
                          </tr>
                        )}
                        {product.name === "Tote bag" && (
                          <tr>
                            <th className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2">
                              Width
                            </th>
                            {product.sizeChart.map((sizeData, index) => (
                              <td
                                key={index}
                                className="border border-gray-300 md:px-2 xl:px-2 lg:px-2 px-1 py-2"
                              >
                                {sizeData.width}
                              </td>
                            ))}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Catalog;
