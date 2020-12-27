import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { signup } from "../actions/userActions"
import FormContainer from "../components/FormContainer"

const SignupScreen = ({ location, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
        setMessage('Password do not match')
    } else {
        dispatch(signup(name, email, password))
    }
  }
  const dispatch = useDispatch()
  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error, userInfo } = userSignup
  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  return (
    <FormContainer>
      <h1>SIgn Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          </Form.Group>

        <Form.Group controlId='confirm_password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>

          <Button type='submit' className='mt-4' variant='primary'>
            Sign Up
          </Button>
        </Form.Group>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignupScreen
