import { useParams } from "react-router-dom"
import { MdStarRate } from "react-icons/md"
import { ToastContainer } from 'react-toastify';
import DeliveryDate from './DeliveryDate';
import { notifySuccess } from "../UI/Toastify";
import axios from "axios";

const Detail = ({ products, fetchData }) => {
  const { _id } = useParams()

  const rate = (rating) => {
    if (rating === 5) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
      </div>)
    }
    if (rating >= 4) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-secondary" />
      </div>)
    }
    if (rating >= 3) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
      </div>)
    }
    if (rating >= 2) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
      </div>)
    }
    if (rating >= 1) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
      </div>)
    }
    if (rating < 1) {
      return (<div>
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
        <MdStarRate size={23} className="text-secondary" />
      </div>)
    }
  }

  const addToCart = async (productId) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let model = {productId: productId, userId: user._id};
      const response = await axios.post('http://localhost:5000/api/cart/add', model);
      notifySuccess(response.data.message);
      fetchData()
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {products
        .filter((product) => product._id === _id)
        .map((product) => (
          <div className="container py-5" key={product._id}>
            <div className="row pt-5">
              <div className="col-lg-7 mb-4">
                <img
                  src={'http://localhost:5000/' + product.imageUrl}
                  alt={product.name}
                  className="w-100 object-fit-contain rounded-4"
                />
              </div>
              <div className="col-lg-5">
                <h2 className="text-white">{product.name}</h2>
                <div className="text-white d-flex">
                  {rate(product.rate)} <p className="ms-2 fs-5">{product.rate}</p>
                </div>
                <br />
                <h3 className="text-info">$ {product.price}</h3>
                <p className="text-white fs-5">Kalan Stok: {product.stock}</p>
                <p className="text-white-50">#{product.category} #{product.category2}</p>
                <br />
                {product.stock > 0
                  ?
                  <button
                    className="btn btn-info w-100 fw-semibold"
                    onClick={() => addToCart(product._id)}
                  >
                    Sepete Ekle
                  </button>
                  :
                  <button
                    className="btn btn-info w-100 fw-semibold" 
                    disabled
                  >
                    Ürün Stokta Yok!
                  </button>
                }

                <div className="text-white mt-3 border rounded-3 px-3 pt-3">
                  <DeliveryDate />
                </div>
              </div>
            </div>
            <div className="text-light mt-3">
              <h5>Ürün Açıklaması:</h5>
              <p>{product.description}</p>
            </div>
          </div>
        ))}

      <ToastContainer />
    </>
  );
}

export default Detail