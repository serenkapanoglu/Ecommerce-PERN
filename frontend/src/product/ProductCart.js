import React, { useState, useEffect } from "react";
import { Button, Alert, Row, Col, Container } from "react-bootstrap";

function ProductCart() {
  const [cartItems, setCartItems] = useState([]);

  /*useEffect(() => {
    const items = localStorage.getItem("cartItems") || "[]";
    setCartItems(JSON.parse(items));
  }, []);*/
  useEffect(() => {
    const items = localStorage.getItem("cartItems") || "[]";
    const parsedItems = JSON.parse(items);
    console.log("Parsed Items:", parsedItems);
    setCartItems(parsedItems);
  }, []);
  

  const handleRemoveItem = (id) => {
    const newItems = cartItems.filter((item) => item.productId !== id);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    setCartItems(newItems);
  };

  const getTotalCost = () => {
    console.log(cartItems);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="warning">Your cart is empty.</Alert>
          ) : (
            <>
              <Row className="mb-3">
                <Col>
                  <h3>Your Cart</h3>
                </Col>
              </Row>
              {cartItems.map((item) => (
                <Row className="mb-2" key={item.productId}>
                  <Col md={3}>
                    <img src={item.image} alt={item.name} width="100%" />
                  </Col>
                  <Col md={6}>
                    <h5>{item.name}</h5>
                    <p>${item.price}</p>
                  </Col>
                  <Col md={2}>
                    <p>{item.quantity}</p>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Row className="justify-content-end">
                <Col md={4}>
                  <p>Total: ${getTotalCost()}</p>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductCart;