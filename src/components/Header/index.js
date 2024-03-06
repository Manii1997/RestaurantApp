import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <button type="button" className="cart-icon-button" data-testid="cart">
        <AiOutlineShoppingCart className="cart-icon" />
      </button>
      <div>
        <p className="cart-count-badge">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <div className="header">
      <div className="header-main-container container">
        <Link to="/" className="restaurant-name">
          <h1 className="header-heading">{restaurantName}</h1>
        </Link>
        <div className="header-cart-container">
          <Link to="/cart" className="my-order-link">
            <div className="my-order-container">
              <p className="header-cart-name">My Orders</p>
              {renderCartIcon()}
            </div>
          </Link>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
