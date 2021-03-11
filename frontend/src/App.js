import {Container} from "react-bootstrap"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from './screens/ProductlistScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

// redux-thunk --> middleware allows us to make asynchronous 
function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
    <Container>
    <Route path='/order/:id' component={OrderScreen} />
    <Route path='/product/:id' component={ProductScreen} />
    <Route path='/placeorder' component={PlaceOrderScreen} />
    <Route path='/payment' component={PaymentScreen} />
    <Route path='/shipping' component={ShippingScreen} />
    <Route path='/login' component={LoginScreen} />
    <Route path='/signup' component={SignupScreen} />
    <Route path='/profile' component={ProfileScreen} />
    {/* Adding ? after :id like /card/:id? makes the id optional like if the user goes to the cart screen he should be able to go that screen without aṇy id.  */}
    <Route path='/cart/:id?' component={CartScreen} />
    <Route path='/admin/userlist' component={UserListScreen} />
    <Route path='/admin/productlist' component={ProductListScreen} exact />
    <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
    <Route path='/admin/orderlist' component={OrderListScreen} />
    <Route path='/admin/users/:id/edit' component={UserEditScreen} />
    <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
    <Route path='/search/:keyword' component={HomeScreen} exact />
    <Route path='/page/:pageNumber' component={HomeScreen} />
    <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
    <Route path='/' exact component={HomeScreen} />
    </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
