import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_DETAILS_CLEAR_REDUX_STORE } from '../constants/productConstants';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const productId = match.params.id;
	const dispatch = useDispatch();

	const productDetail = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetail;

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	);
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
		}
		if (!product._id || product._id !== productId) {
			dispatch(listProductDetails(productId));
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		return () => {
			dispatch({ type: PRODUCT_DETAILS_CLEAR_REDUX_STORE });
		};
		// eslint-disable-next-line
	}, [productId, dispatch, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							{/* To stop overflow of image outside pass fluid to Image tag */}
							<Image
								draggable='false'
								src={product.image}
								alt={product.name}
								fluid
							/>
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
								<ListGroup.Item>
									Price: Rs {product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
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
												<strong>
													Rs {product.price}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												<strong>
													{product.countInStock > 0
														? 'In Stock'
														: 'Out Of Stock'}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
											</Row>
											<Form.Control
												as='select'
												value={qty}
												onChange={(e) =>
													setQty(e.target.value)
												}
											>
												{[
													...Array(
														product.countInStock
													).keys(),
												].map((e) => (
													<option
														key={e + 1}
														value={e + 1}
													>
														{e + 1}
													</option>
												))}
											</Form.Control>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											disabled={
												product.countInStock === 0
											}
										>
											Add to Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							{product.reviews.length === 0 && (
								<Message>No Reviews</Message>
							)}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>
											{review.createdAt.substring(0, 10)}
										</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && (
										<Message variant='success'>
											Review submitted successfully
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant='danger'>
											{errorProductReview}
										</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) =>
														setRating(
															e.target.value
														)
													}
												>
													<option value=''>
														Select...
													</option>
													<option value='1'>
														1 - Poor
													</option>
													<option value='2'>
														2 - Fair
													</option>
													<option value='3'>
														3 - Good
													</option>
													<option value='4'>
														4 - Very Good
													</option>
													<option value='5'>
														5 - Excellent
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) =>
														setComment(
															e.target.value
														)
													}
												></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type='submit'
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please{' '}
											<Link to='/login'>sign in</Link> to
											write a review{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
