import CartItem from "./CartItem"
import './Cart.css'
import DeliveryDate from "../ProductDetails/DeliveryDate"
import { Link } from "react-router-dom"
import products from '../images/techproducts.jpg'
import axios from "axios"
import { useEffect, useState } from "react"

const Cart = ({ cart, setCart }) => {

    const [totalAmount, setTotalAmount] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const hasItems = cart.length > 0

    const getTheCart = async () => {
        let model = { userId: user._id };
        let response = await axios.post("http://localhost:5000/api/cart/", model);

        const groupedCartItems = groupCartItems(response.data);
        setCart(groupedCartItems);

        let totalC = 0;
        for (let i = 0; i < groupedCartItems.length; i++) {
            totalC += groupedCartItems[i].products[0].price * groupedCartItems[i].amount;
        }
        setTotalAmount(totalC);
    };

    useEffect(() => {
        getTheCart();
    }, [])

    const groupCartItems = (cartItems) => {
        const groupedItems = [];
        cartItems.forEach((item) => {
            console.log(groupedItems)
            console.log(item)
            const existingItem = groupedItems.find((groupedItem) => groupedItem.productId === item.productId);
            if (existingItem) {
                existingItem.amount += 1; // Aynı ürün varsa miktarı artır
            } else {
                item.amount = 1; // Yeni bir ürün ekleniyorsa miktarı 1 olarak ayarla
                groupedItems.push(item);
            }
        });
        return groupedItems;
    };

    const removeFromCart = async (_id) => {
        let confirm = window.confirm("Sepetteki ürünü silmek istiyor musunuz?")
        if (confirm) {
            let model = { _id: _id };
            await axios.post("http://localhost:5000/api/cart/remove", model);
            getTheCart();
        }
    }

    // const addOrder = async () => {
    //     let model = {userId: user._id};
    //     await axios.post("http://localhost:5000/orders/add", model);
    //     getTheCart();
    // }

    const cartProducts = (
        <div className="mb-3">
            {
                cart.map((cartItem) => (
                    <CartItem
                        key={cartItem._id}
                        product={cartItem.products[0]}
                        cartItem={cartItem}
                        removeFromCart={removeFromCart} />
                ))
            }
        </div>
    )

    return (
        <div className="cart-head container text-white">
            <div className="d-flex">
                <h4 className="text-info mb-3">
                    Sepetim
                </h4>
                <span className="text-white-50 mt-1 ms-3">
                    ({cart.length} Ürün)
                </span>
            </div>
            <div className="row">
                {
                    hasItems ?
                        (
                            <>
                                <div className="col-md-8">
                                    {cartProducts}
                                </div>
                                <div className="col-md-4">
                                    <div className="border p-3">
                                        <h5 className="mb-4">Sipariş Özeti</h5>
                                        <div className="d-flex justify-content-between mb-3 border-bottom">
                                            <p>Toplam Tutar:</p>
                                            <p>{totalAmount?.toFixed(2)} ₺</p>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <DeliveryDate />
                                        </div>
                                        <div className="d-flex justify-content-between gap-3">
                                            <button
                                                type="button"
                                                className="btn btn-info rounded-3 w-50"
                                                disabled={!hasItems}
                                            >
                                                Satın Al
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger rounded-3 w-50"
                                                disabled={!hasItems}
                                            >
                                                Temizle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-white text-center">
                                <img src={products} className="mt-5" width="150px" alt="technologyproducts" />
                                <h5 className="my-3">Alışveriş Sepetin Boş</h5>
                                <Link onClick={() => window.scrollTo(0, 0)} to='/' className="text-decoration-none btn btn-info">Alışverişe Başla</Link>
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export default Cart