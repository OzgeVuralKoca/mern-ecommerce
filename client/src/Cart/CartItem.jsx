import { MdDelete } from 'react-icons/md'

const CartItem = ({ product, removeFromCart, cartItem }) => {

    return (
        <div className="d-flex py-3 gap-3 my-auto border-bottom">
            <img src={'http://localhost:5000/' + product.imageUrl} width="150" alt="" />
            <h5 className='my-auto'>{product.name}</h5>
            <h5 className="text-info my-auto">{product.price}<span className='ms-1 text-white my-auto'>TL</span></h5>
            <p className='my-auto'>x</p>
            <p className='my-auto'>{cartItem.amount}</p>
            <button
                className="btn btn-sm text-danger my-auto"
                onClick={() => {removeFromCart(cartItem._id)}}
            >
                <MdDelete size={25} />
            </button>
        </div>
    )
}

export default CartItem