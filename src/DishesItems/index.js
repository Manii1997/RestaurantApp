import './index.css'

const DishesItems = ({
  ItemDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    addonCat,
    dishDescription,
    dishAvailability,
    dishType,
  } = ItemDetails

  const onIncrementQuantity = () => addItemToCart(ItemDetails)
  const onDecrementQuantity = () => removeItemFromCart(ItemDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControllerButton = () => (
    <div className="customize-btn">
      <button type="button" className="minus-btn" onClick={onDecrementQuantity}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
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
          <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}>
            {' '}
          </div>
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

export default DishesItems
