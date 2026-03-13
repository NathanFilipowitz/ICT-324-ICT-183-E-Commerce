import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Header, Content, Footer, Nav, Navbar, Card, Button, TagGroup, Tag, Text } from "rsuite";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import 'rsuite/dist/rsuite.min.css';

function ProductCard({ product, onAddToCart }) {
    const inStock = product.stock > 0;
    return (
        <Card width={320} shaded style={{ margin: '10px' }}>
            <img
                src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974"
                alt="Shadow"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Card.Header>
                <Text size="lg" bold="true">
                    {product.name}
                </Text>
            </Card.Header>
            <Card.Body>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>${product.price}</p>
                <Button 
                    onClick={() => onAddToCart(product)} 
                    startIcon={<AddOutlineIcon />}
                    appearance="primary"
                    disabled={!inStock}
                > 
                    Add to Cart
                </Button>
            </Card.Body>
            <Card.Footer>
                <TagGroup>
                    <Tag color={inStock ? "green" : "red"} size="sm">
                        {inStock ? "In Stock" : "Out of Stock"}
                    </Tag>
                    <Tag size="sm">{product.stock} left</Tag>
                </TagGroup>
            </Card.Footer>
        </Card>
    );
}

export default function HomePage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([
            { id: 1, name: "Wireless Mouse", price: 29.99, stock: 10 },
            { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 5 },
            { id: 3, name: "Gaming Monitor", price: 199.99, stock: 0 },
        ]);
    }, []);

    const handleAddToCart = (product) => {
        console.log(`Controller: Adding product ${product.id} to cart`);
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div>
            <header style={{ textAlign: 'center' }}>
                <h1>SecureShop </h1>
                <p>The most secured and well handled E-commerce website.</p>
            </header>

            <Navbar>
                <Navbar.Brand>SecureShop</Navbar.Brand>
                <Nav>
                    <Nav.Item onClick={() => navigate("/product")}>All Products</Nav.Item>
                    <Nav.Item onClick={() => navigate("/login")}>Login</Nav.Item>
                </Nav>
            </Navbar>

            

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart} 
                    />
                ))}
            </div>
        </div>
    );
}