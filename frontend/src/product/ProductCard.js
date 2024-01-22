import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "./ProductCard.css"

const ProductCard = ({ id, name, imgUrl,price }) => {
  const handleAddCart = (e) => {
    console.log('clicking to the cart')
    e.preventDefault();
    console.log('clicked to the add to cart');
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartItem = {
      productId: id,
      name: name,
      image: imgUrl,
      price: price,
      quantity:1
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
 
  return (
    <Card className="my-3 p-3 rounded" style={{ width: '18rem'}}>
      
     <Link className='cardtitle' to={`/products/${id}`}>
      <Card.Img variant="top" src={imgUrl} style={{ height: '200px', objectFit: 'scale-down' }} />
      <Card.Body>

          <Card.Title as="h4">{name}</Card.Title>

        <Button variant="secondary" className="mt-2" onClick={handleAddCart} >
          Add to Cart
        </Button>
      </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;