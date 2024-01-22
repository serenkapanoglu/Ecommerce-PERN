import React, {useContext, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom';
import Lipsticks from '../api/api'
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from "../login/UserContext";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import ProductCard from './ProductCard';

function ProductDetail() {
  const {currentUser} = useContext(UserContext);
  const [product, setProduct] = useState(null)
  const [productComments, setProductComments] = useState([])
  const [qty, setQty] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState({
    username: currentUser.username,
    comment: ""
  });
  const {id} = useParams()
  const initialState = {
    username: currentUser.username,
    comment: ""
  }
  useEffect(function getProductAfterLoad() {

    async function getProduct() {
      setProduct(await Lipsticks.getProduct(id))
    };
    getProduct()

    async function getProductComments() {
      const res = await Lipsticks.getProductComment(id)
      setProductComments(res)
    }

    getProductComments()
  }, [id]);

  console.log('PRODCUT', product);
  if (!product) return <LoadingSpinner/>;

  async function handleSubmit(e) {
    e.preventDefault();
    await Lipsticks.addProductComment(id, comment)
    setComment(initialState)
    const res = await Lipsticks.getProductComment(id)
    setProductComments(res)
  }

  async function handleDelete(commentId) {
    await Lipsticks.deleteProductComment(id, commentId)
    setProductComments(comments => comments.filter(c => c.id !== commentId))
  }

  function handleAddToCart() {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartItem = {
      productId: product.id,
      name: product.name,
      image: product.imgUrl,
      price: product.price,
      quantity: qty
    };
    let itemAlreadyInCart = false;
    const updatedCartItems = existingCartItems.map(item => {
      if (item.productId === newCartItem.productId) {
        item.quantity += newCartItem.quantity;
        itemAlreadyInCart = true;
      }
      return item;
    });
    if (!itemAlreadyInCart) {
      updatedCartItems.push(newCartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }

  async function handleSaveProduct() {
    try {
      await Lipsticks.saveProduct(id, currentUser.username);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container fluid className='px-5 pt-5'>
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product.imgUrl}
                alt={product.name}
                className='fade-in'
                fluid
              />
            </Col>

            <Col md={{span: 3, offset: 3}}>
              <Card className='rounded'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.count_in_stock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                    {product.count_in_stock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <Form>
                              <Form.Control
                                as='select'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.count_in_stock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ),
                                )}
                              </Form.Control>
                            </Form>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Col className='d-grid gap-2'>
                      <Button
                        onClick={handleAddToCart}
                        className='btn-block rounded'
                        type='button'
                        disabled={product.count_in_stock === 0}
                        variant='secondary'
                      >
                        Add To Cart
                      </Button>
                      <Button
                        onClick={handleSaveProduct}
                        className="btn-block rounded"
                        type="button"
                        disabled={isSaved}
                        variant='secondary'
                      >
                        {isSaved ? "Saved!" : "Save Product"}
                      </Button>
                    </Col>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='me-3 '>
            <Card style={{minHeight: "50px"}} className='rounded p-3 m-3'>
              Description: {product.description}
            </Card>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {productComments && productComments.length ? (
                <ListGroup variant='flush'>
                  {productComments.map((p) => (
                    <ListGroup.Item key={p.id}>
                      <Row>
                        <Col md={10}>
                          <h3>{p.comment}</h3>
                        </Col>
                        <Col md={2}>
                          {currentUser && currentUser.username === p.username && (
                            <Button
                              variant='danger'
                              className='rounded'
                              onClick={() => handleDelete(p.id)}
                            >

                              X
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <h2>No reviews for this product</h2>
              )}
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {currentUser ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          onChange={(e) => {
                            setComment(data => ({...data, comment: e.target.value}))
                          }}
                          value={comment.comment}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='secondary'
                        className='my-3 rounded'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <div>
                      Please <Link to='/login'>sign in</Link> to write a review{" "}
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>


        </>

      </Container>
    </>
  )
}

export default ProductDetail
