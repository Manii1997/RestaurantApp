import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="cart-empty-container">
      <img
        src="https://asset.ccbp.in/frontend/react-js/nxt-trenz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-img"
      />
      <p className="empty-description">Your cart is Empty</p>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-body-container">
        <h1 className="cart-items-header">Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>

        <ul>
          {cartList.map(dish => (
            <CartItem key={dish.dishId} cartItemDetails={dish} />
          ))}
        </ul>
      </div>
    </>
  )

  return (
    <div className="cart-page-container">
      <Header />
      <div>{cartList.length === 0 ? renderEmptyView() : renderCartItems()}</div>
    </div>
  )
}

export default Cart
