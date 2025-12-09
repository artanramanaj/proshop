import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message.jsx";
import {
  Form,
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: createReviewLoading }] =
    useCreateReviewMutation();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState();
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, []);

  console.log("product", product);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const body = {
        rating,
        comment,
      };
      const res = await createReview({
        id: productId,
        data: body,
      }).unwrap();
      toast.success(res.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message);
    }
  };
  if (isLoading || createReviewLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        Error loading product: {error?.data?.message || "something went wrong"}
      </Message>
    );

  if (!product) return <Message variant="danger">Product not found</Message>;

  return (
    <div className="d-flex flex-column gap-4">
      <Link to={"/"}>
        <Button variant="light" className="py-2 align-self-start">
          Go Back
        </Button>
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} fluid alt="productimage" />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>

            <ListGroupItem>
              <h5>Price: ${product.price} </h5>
            </ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <h5>${product.price}</h5>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <h5>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </h5>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Qty:</Col>

                  <Col>
                    {product.qty > 0 && (
                      <Form.Control
                        value={qty}
                        as="select"
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    )}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className={`btn-block ${
                    product.countInStock === 0
                      ? "pe-none cursor-not-allowed"
                      : ""
                  }`}
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={() => {
                    dispatch(addToCart({ ...product, qty }));
                    navigate("/cart");
                  }}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem style={{ backgroundColor: "#f2f2f2" }}>
                <h2>Reviews</h2>
              </ListGroupItem>
              {product.review.length === 0 ? (
                <Message variant="danger">No reviews</Message>
              ) : (
                product.review.map((el, index) => {
                  return (
                    <Row key={el._id}>
                      <Col>
                        <ListGroup variant="flush" className="border-bottom">
                          <ListGroupItem>
                            <p>{el.name}</p>
                            {[1, 2, 3, 4, 5].map((star) =>
                              el.rating >= star ? (
                                <FaStar key={star} />
                              ) : (
                                <FaRegStar key={star} />
                              )
                            )}
                            <p>{el.updatedAt.split("T")[0]}</p>
                            <p>{el.comment}</p>
                          </ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                  );
                })
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {userInfo && (
        <Row>
          <Col>
            <Card>
              {" "}
              <ListGroup variant="flush">
                <ListGroupItem style={{ backgroundColor: "#f2f2f2" }}>
                  <h2>Write a review</h2>
                </ListGroupItem>
              </ListGroup>
              <ListGroup variant="flush">
                <Form onSubmit={submitReview} className="p-1">
                  <Form.Group controlId="rating" className="my-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={5}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-2">
                    Submit Review
                  </Button>
                </Form>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {!userInfo && <Message>Sign in to make a review</Message>}
    </div>
  );
};

export default ProductScreen;
