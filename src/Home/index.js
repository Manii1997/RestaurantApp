import {useState, useEffect} from 'react'
import Header from '../Header'
import DishesItems from '../DishesItems'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const getUpdatedData = tabDetails =>
    tabDetails.map(eachItem => ({
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      menuCategoryImage: eachItem.menu_category_image,
      categoryDishes: eachItem.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  useEffect(() => {
    const fetchRestaurentApi = async () => {
      const ApiResponse = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      const data = await ApiResponse.json()
      const updatedData = getUpdatedData(data[0].table_menu_list)
      setResponse(updatedData)
      setActiveCategoryId(updatedData[0].menuCategoryId)
      setIsLoading(false)
    }
    fetchRestaurentApi()
  }, [])

  const onUpdateActiveCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryId(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-btn">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const category = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )
    return category ? (
      <ul className="dishes-item-container">
        {category.categoryDishes.map(ItemDetails => (
          <DishesItems
            key={ItemDetails.dishId}
            ItemDetails={ItemDetails}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    ) : (
      <p>No dishes available for the selected category.</p>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status">
        {' '}
      </div>
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="resto-app-container">
      <Header cartItems={cartItems} />
      <div className="dishes-container">
        <ul className="tab-menu-list">{renderTabMenuList()}</ul>
        <div>
          {response.length > 0 ? renderDishes() : <p>No data available.</p>}
        </div>
      </div>
    </div>
  )
}

export default Home
