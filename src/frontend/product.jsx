import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    Container,
    Header,
    NumberInput,
    InputGroup,
    Button,
    Grid,
    Row,
    Col,
    VStack,
    Center,
    Image,
    Heading,
    Text,
    HStack
} from 'rsuite';
import {FaPlus, FaMinus} from 'react-icons/fa';
import {loremIpsum} from 'react-lorem-ipsum';
import {AppNavbar} from "./components/navbar.jsx";
import 'rsuite/dist/rsuite.min.css';
import {jwtDecode} from "jwt-decode";

export default function ProductPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const productId = searchParams.get('id');
    const [token, setToken] = useState(localStorage.getItem("JWT"))
    const [client, setClient] = useState(jwtDecode(token))

    const handleAddToCart = async (product) => {
        if (!token || token === "") {
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
                    clientId: client.id,
                    productId: product.id,
                    quantity: quantity
                })
            });

            if (!response.ok) throw new Error("Failed to add to cart");
            alert(`Added ${product.name} to your cart!`);
        } catch (error) {
            console.error("Cart Error:", error);
        }
    };

    const handleMinus = () => {
        setQuantity(parseInt(quantity, 10) - 1);
    };
    
    const handlePlus = () => {
        setQuantity(parseInt(quantity, 10) + 1);
    };

    useEffect(() => {
        // Method to call async function in useEffect
        async function getProduct() {
            const result = await fetch(`/api/product/${productId}`);
            const product = await result.json()
            setProduct(product);
        }

        getProduct();
    }, [productId])

    return (
        <>
            <Button
                appearance='ghost'
                onClick={() => navigate("/home")}
                marginTop={20}
                position={'absolute'}
                top={70}
                left={50}
            >
                Back
            </Button>
            <Container minHeight={'100vh'} style={{ padding: '20px 50px' }}>
                <Header marginBottom={50}>
                    <AppNavbar
                        position={'sticky'}
                        top={0}
                    />
                </Header>
                <Grid fluid>
                    <Row gutter={[50, 10]}>
                        <Col span={12}>
                            <Center>
                                <Image
                                    src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=416"
                                    alt="black and white short coated dog"
                                    style={{width: '30vw'}}
                                />
                            </Center>
                        </Col>
                        <Col span={12}>
                            <VStack spacing={20}>
                                <Heading marginBottom={10} level={1}>{product.name}</Heading>
                                <Heading marginBottom={1} level={3}>{product.price} CHF</Heading>
                                <Text>Stock: {product.stock}</Text>
                                <Text>
                                    {loremIpsum()}
                                </Text>
                                <InputGroup inside style={{width: '100px'}}>
                                    <InputGroup.Button onClick={handleMinus} appearance="default">
                                        <FaMinus size={10}/>
                                    </InputGroup.Button>
                                    <NumberInput value={quantity} onChange={setQuantity} controls={false}/>
                                    <InputGroup.Button onClick={handlePlus} appearance="default">
                                        <FaPlus size={10}/>
                                    </InputGroup.Button>
                                </InputGroup>
                                <Button
                                    appearance='default'
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to cart
                                </Button>
                            </VStack>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    );
}
