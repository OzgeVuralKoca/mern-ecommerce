import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"
import Header from "./Layout/Header"
import Products from "./Products/Products"
import CartProvider from "./Context/CartProvider"
import Detail from "./ProductDetails/Detail"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import Orders from "./Orders/Orders"
import ProductList from "./Admin/ProductList"
import ProductAdd from "./Admin/ProductAdd"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products")
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CartProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Header cart={cart} />}>
            <Route path="" element={<Products products={products} fetchData={fetchData} />} />
            <Route path="detail/:_id" element={<Detail products={products} fetchData={fetchData}/>} />
            <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="orders" element={<Orders />} />
            {user && (user.isAdmin &&
              <>
                <Route path="products" element={
                  <ProductList
                    products={products}
                    fetchData={fetchData}
                  />
                } />
                <Route path="products/add" element={
                  <ProductAdd fetchData={fetchData} />
                } />
              </>)
            }

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <footer className="text-center text-white py-3 mt-5 border-top">
          <h6>Created By <a style={{ textDecoration: "none" }} className="text-info" target="_blank" href="https://ozgevuralkoca.github.io/portfolio" rel="noreferrer">ozgevuralkoca</a> | © 2023 All rights reserved</h6>
        </footer>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
