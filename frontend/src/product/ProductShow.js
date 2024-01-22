import React, { useEffect, useState } from 'react'
import Lipsticks from '../api/api'
import ProductCard from './ProductCard'
import LoadingSpinner from "../common/LoadingSpinner";
import { Row, Col, Container } from "react-bootstrap";

function ProductShow() {
    const [products,setProducts] = useState(null)

    useEffect(function getProductsAfterLoad() {
        allProducts();
    },[]);

    async function allProducts(){
        let products = await Lipsticks.getProducts()
        setProducts(products)
    }
    if(!products) return <LoadingSpinner />;

    return (
        <>
        <Container fluid className='px-5 pt-3'>
        {(
        <>
        <Row>
            {products.map(p=>(
                <Col key={p.id} sm={12} md={6} lg={4} xl={3}>
                    <ProductCard
                    name={p.name}
                    description={p.description}
                    price={`$${p.price}`}
                    imgUrl={p.imgUrl}
                    id={p.id}
                    />
                </Col>
            ))}
        </Row>
        </>
        )}
        </Container>
        </>
    )
}

export default ProductShow