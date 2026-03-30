/*
 * Filename: home.jsx
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-03-17
 * Purpose: Home page view
 */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppNavbar } from "../frontend/components/navbar.jsx";
import { ProductCard } from "../frontend/components/product-card.jsx";
import 'rsuite/dist/rsuite.min.css';

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
        const storedUser = localStorage.getItem("user_id");

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