import { useNavigate } from "react-router-dom";
import { Card, Button, TagGroup, Tag, Text } from "rsuite";
import AddOutlineIcon from "@rsuite/icons/AddOutline";

export function ProductCard({ product, onAddToCart }) {
    const navigate = useNavigate();
    const inStock = product.stock > 0;

    const handleProductClick = () => {
        navigate(`/product?id=${product.id}`);
    };

    return (
        <Card 
            width={320} 
            shaded 
            style={{ margin: '10px', cursor: 'pointer' }}
            onClick={handleProductClick}
        >
            <img
                src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974"
                alt={product.name}
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }} 
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