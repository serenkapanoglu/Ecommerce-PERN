import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import Lipsticks from "../api/api";

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [editId, setEditId] = useState("");
  const [description, setDescription] = useState("");
  const [count_in_stock, setCount_in_stock] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await Lipsticks.getProducts();
    setProducts(result);
  };

  const addProduct = async () => {

    const newProduct = { name, price: +price, description, count_in_stock: +count_in_stock, imgUrl };
    await Lipsticks.addProduct(newProduct);

    getProducts();
    setName("");
    setPrice("");
    setImgUrl("");
    setDescription("")

  };

  const editProduct = async (id) => {
    const updatedProduct = { id, name, price: +price, description, count_in_stock: +count_in_stock, imgUrl };
    await Lipsticks.updateProduct(updatedProduct.id, updatedProduct);
    getProducts();
    setName("");
    setPrice("");
    setImgUrl("");
    setDescription("");
    setEditId("");
  };
  
  const deleteProduct = async (id) => {
    await Lipsticks.deleteProduct(id);
    getProducts();
  };
  return (
    <div>
      <h1>Admin Page</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="count_in_stock">
          <Form.Label>Count in stock</Form.Label>
          <Form.Control
            type="number"
            value={count_in_stock}
            onChange={(e) => setCount_in_stock(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </Form.Group>

        {editId ? (
          <Button variant="primary" 
          onClick={() => editProduct(editId)}
          >
            Update
          </Button>
        ) : (
          <Button variant="primary" onClick={addProduct}>
            Add
          </Button>
        )}
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <img src={product.imgUrl} alt={product.name} width="50" />
                </td>
                <td>
                    <Button variant="primary" onClick={() => setEditId(product.id)}>
                    Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                    Delete
                    </Button>
                </td>
                </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductAdmin;