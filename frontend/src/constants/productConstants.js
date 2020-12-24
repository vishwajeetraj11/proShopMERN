export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

//This state only exists so that yoy don't see the previous state if viewing in slow internet connection
// what happended is that i clicked on one of the product and it stayed there and next time i click on
// other product it was there and then took time to bring the loader and fetch next product
export const PRODUCT_DETAILS_CLEAR_REDUX_STORE = 'PRODUCT_DETAILS_CLEAR_REDUX_STORE'