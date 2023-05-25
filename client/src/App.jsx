import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart/Cart"
import Header from "./Layout/Header"
import Products from "./Products/Products"
import CartProvider from "./Context/CartProvider"
import Detail from "./ProductDetails/Detail"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import Orders from "./Orders/Orders"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="" element={<Products />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
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
