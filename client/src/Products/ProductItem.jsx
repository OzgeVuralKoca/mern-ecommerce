import { MdStarRate } from "react-icons/md"
import './ProductItem.css'
import axios from "axios";
import { notifySuccess } from "../UI/Toastify";
import { ToastContainer } from "react-toastify";


const ProductItem = ({ product, fetchData }) => {
  const { _id, imageUrl, name, rate, price } = product;

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

  const rateStars = () => {
    if (rate === 5) {
      return (<div>
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
        <MdStarRate size={23} className="text-warning" />
      </div>)
    }
    if (rate >= 4) {
      return (<div>
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-secondary" />
      </div>)
    }
    if (rate >= 3) {
      return (<div>
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
      </div>)
    }
    if (rate >= 2) {
      return (<div>
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
      </div>)
    }
    if (rate >= 1) {
      return (<div>
        <MdStarRate size={20} className="text-warning" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
      </div>)
    }
    if (rate < 1) {
      return (<div>
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
        <MdStarRate size={20} className="text-secondary" />
      </div>)
    }
  }

  return (
    <div className="card rounded-4 product-card mx-auto my-3">
      <img height="200"
        src={'http://localhost:5000/' + imageUrl} className="product-img rounded-top-4" alt={name} />
      <div className="card-body d-flex flex-column" >
        <h6 className="card-text product-name">{name}</h6>
        <div className="text-dark mt-1">
          <h6 className="text-muted pb-3 product-stock">{rateStars()}</h6>
          <h5 className="card-text product-price fw-semibold">{price} TL</h5>
        </div>
        <div className='d-flex gap-2'>
          {product.stock > 0
            ?
            <button
              className="btn btn-sm btn-info w-50 fw-semibold rounded-3"
              onClick={() => addToCart(product._id)}
            >
              Sepete Ekle
            </button>
            :
            <button
              className="btn btn-sm btn-info w-50 fw-semibold rounded-3"
              disabled
            >
              Stokta Yok!
            </button>
          }
          <button
            className="btn btn-sm btn-outline-info fw-semibold w-50 rounded-3"
            onClick={() => window.location = `detail/${_id}`}
          >
            Detaylar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProductItem