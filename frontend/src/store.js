import { createStore, combineReducers, applyMiddleware } from "redux"
// applyMiddleware allows us to apply thunk which is a middleware

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {userLoginReducer, userSignupReducer, userDetailsReducer, userUpdateProfileReducer} from "./reducers/userReducers"

const middleware = [thunk]

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer 
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {userInfo: userInfoFromStorage}
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

/*
{
  state: {
    productList: {
      products
    }
  }
}
*/