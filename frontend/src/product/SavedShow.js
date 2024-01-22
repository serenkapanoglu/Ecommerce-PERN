import React, { useContext, useEffect, useState } from 'react'
import Lipsticks from '../api/api'
import ProductCard from './ProductCard'
import { Row, Col, Container } from "react-bootstrap";
import UserContext from "../login/UserContext";

function SavedShow() {
    const [products, setProducts] = useState(null)
    const { currentUser } = useContext(UserContext);
    useEffect(function getProductAfterLoad(){

        allProducts();

    },[]);

async function allProducts(){
    let products = await Lipsticks.getSavedProducts(currentUser.username)
    setProducts(products)
}

if(!products) return <h3>Couldn't find a saved product</h3>

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
                    imgUrl={p.img_url}
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


export default SavedShow