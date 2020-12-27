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

// redux-thunk --> middleware allows us to make asynchronous 
function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
    <Container>
    <Route path='/' exact component={HomeScreen} />
    <Route path='/product/:id' exact component={ProductScreen} />
    <Route path='/shipping' exact component={ShippingScreen} />
    <Route path='/login' exact component={LoginScreen} />
    <Route path='/signup' exact component={SignupScreen} />
    <Route path='/profile' exact component={ProfileScreen} />
    {/* Adding ? after :id like /card/:id? makes the id optional like if the user goes to the cart screen he should be able to go that screen without aṇy id.  */}
    <Route path='/cart/:id?' exact component={CartScreen} />
    </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
