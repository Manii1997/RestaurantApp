import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = ({dishDetails}) => {
  const {
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    addonCat,
    dishDescription,
    dishAvailability,
    dishType,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncrementQuantity = () => setQuantity(prevState => prevState + 1)

  const onDecrementQuantity = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const onAddItemToCart = () => addCartItem({...dishDetails, quantity})

  const renderControllerButton = () => (
    <div className="customize-btn">
      <button type="button" className="minus-btn" onClick={onDecrementQuantity}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button type="button" className="plus-btn" onClick={onIncrementQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dishes-list-items">
      <div className="dish-list">
        <div
          className={`veg-border dish-type ${
            dishType === 1 ? 'non-veg-border' : ''
          }`}
        >
          <div
            className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}
          />
        </div>
        <div className="name-currency-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="currency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="description">{dishDescription}</p>
          {dishAvailability && renderControllerButton()}
          {!dishAvailability && <p>Not Available</p>}
          {addonCat.length !== 0 && (
            <p className="customization-text">Customizations available</p>
          )}
          {quantity > 0 && (
            <button type="button" className="add-btn" onClick={onAddItemToCart}>
              ADD TO CART
            </button>
          )}
        </div>
        <div className="calories-container">
          <p className="calories">{dishCalories} calories</p>
        </div>
        <div className="img-container">
          <img src={dishImage} alt={dishName} className="dish-img" />
        </div>
      </div>
    </li>
  )
}

export default DishItem
