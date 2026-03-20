import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, TagGroup, Tag, Text } from "rsuite";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import {AppNavbar} from "../frontend/components/navbar.jsx"
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
    // const [searchParams] = useSearchParams();

    useEffect(() => {
        async function getAllProducts() {
            try {
                const result = await fetch(`/api/product`);
                const data = await result.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load catalog:", error);
            }
        }
        getAllProducts();
    }, []); // Empty dependency since we want the whole catalog once

    const handleAddToCart = async (product) => {
        // Check if user is logged in (not secured because user can modify this data himself easily !)
        const storedUser = localStorage.getItem("userId");

        if (!storedUser) {
            // Redirect to login if no user found
            alert("Please login to add items to your cart!");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    clientId: parseInt(storedUser), 
                    productId: product.id 
                })
            });

            if (!response.ok) throw new Error("Failed to add to cart");
            alert(`Added ${product.name} to your cart!`);
        } catch (error) {
            console.error("Cart Error:", error);
        }
    };

    return (
        <div>
            <header style={{ textAlign: 'center' }}>
                <h1>SecureShop </h1>
                <p>The most secured and well handled E-commerce website.</p>
            </header>
            <AppNavbar/>
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