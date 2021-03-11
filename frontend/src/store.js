import { createStore, combineReducers, applyMiddleware } from "redux"
// applyMiddleware allows us to apply thunk which is a middleware

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from "./reducers/userReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer
} from "./reducers/orderReducer"
const middleware = [thunk]

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer, 
  productCreate: productCreateReducer, 
  productUpdate: productUpdateReducer, 
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  userUpdate: userUpdateReducer,
  productTopRated: productTopRatedReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
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
