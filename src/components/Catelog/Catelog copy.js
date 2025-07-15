import Navbar_Page from "../Navbar/NavbarPage"
import React from "react"

const products = [
    { id: 1, name: "Product 1", image: "../../assets/images/testi-img/b.png" },
    { id: 2, name: "Product 2", image: "../../assets/images/testi-img/a.png" },
    { id: 3, name: "Product 3", image: "../../assets/images/testi-img/d.png" },
    // Add more products as needed
  ];
const Catelog = () => {
    
  return (
    <React.Fragment>
      <Navbar_Page /> 
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Catalog</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-md overflow-hidden shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
        
  
    
  )
}

export default Catelog