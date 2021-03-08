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
    <Route path='/' exact component={HomeScreen} />
    <Route path='/order/:id' exact component={OrderScreen} />
    <Route path='/product/:id' exact component={ProductScreen} />
    <Route path='/placeorder' exact component={PlaceOrderScreen} />
    <Route path='/payment' exact component={PaymentScreen} />
    <Route path='/shipping' exact component={ShippingScreen} />
    <Route path='/login' exact component={LoginScreen} />
    <Route path='/signup' exact component={SignupScreen} />
    <Route path='/profile' exact component={ProfileScreen} />
    {/* Adding ? after :id like /card/:id? makes the id optional like if the user goes to the cart screen he should be able to go that screen without aṇy id.  */}
    <Route path='/cart/:id?' exact component={CartScreen} />
    <Route path='/admin/userlist' exact component={UserListScreen} />
    <Route path='/admin/productlist' exact component={ProductListScreen} />
    <Route path='/admin/orderlist' exact component={OrderListScreen} />
    <Route path='/admin/users/:id/edit' exact component={UserEditScreen} />
    <Route path='/admin/product/:id/edit' exact component={ProductEditScreen} />
    </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
