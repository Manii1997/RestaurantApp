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
      <Link to="/cart">
        <button type="button" className="cart-icon-button">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
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
          <p className="header-cart-name">My Orders</p>
          {renderCartIcon()}
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
