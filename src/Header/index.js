import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = ({cartItems}) => {
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="header">
      <div className="header-main-container container">
        <h1 className="header-heading">UNI Resto Cafe</h1>
        <div className="header-cart-container">
          <p className="header-cart-name">My Orders</p>
          <AiOutlineShoppingCart className="header-cart-icon" />
          <p className="cart-count">{getCartItemsCount()}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
