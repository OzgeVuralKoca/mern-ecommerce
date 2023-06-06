import { SlBasket } from 'react-icons/sl'
import { Link } from 'react-router-dom'

const HeaderCartButton = ({user, cart}) => {

    const totalItemsInCart = cart?.length

    return (
        <Link to={user ? '/cart' : '/login'}
          className="border-bottom border-info py-2"
          type="submit"
        >
            <SlBasket className='' />
            <span className='mx-1 text-info'>Sepetim</span>
            <span className="badge text-white rounded-5 bg-danger">{totalItemsInCart}</span>
        </Link>
    )
}

export default HeaderCartButton