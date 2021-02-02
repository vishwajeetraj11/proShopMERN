import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, } from "react-bootstrap"
import { listProductDetails } from "../actions/productActions"
import Rating from "../components/Rating"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {PRODUCT_DETAILS_CLEAR_REDUX_STORE} from "../constants/productConstants"
// import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const productId = match.params.id
  const dispatch = useDispatch();
  const productDetail = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetail;
  useEffect(() => {
   dispatch(listProductDetails(productId))
   return () => {
     dispatch({type: PRODUCT_DETAILS_CLEAR_REDUX_STORE});
   }
  }, [productId, dispatch])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? ( 
        <Loader />
        ): error ? (
        <Message variant='danger'>{error}</Message>
        ) : (<Row>
          <Col md={6}>
            {/* To stop overflow of image outside pass fluid to Image tag */}
            <Image draggable="false" src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: Rs {product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            {/*varient flush removes the border */}
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {
                  product.countInStock > 0 && (
                    <ListGroup.Item>
                    <Row>
                    <Col>Qty</Col>
                    </Row>
                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                   { [...Array(product.countInStock).keys()].map(e => (
                      <option key={e+1} value={e+1}>{e+1}</option>
                    ))}
                    </Form.Control>
                    </ListGroup.Item>
                  )
                }

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>)}
    </>
  )
}

export default ProductScreen
