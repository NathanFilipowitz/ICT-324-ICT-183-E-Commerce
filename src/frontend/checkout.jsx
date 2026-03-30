import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Container,
    Header,
    Content,
    Button,
    VStack,
    Heading,
    Text,
    HStack, List, Avatar
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {jwtDecode} from "jwt-decode";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("JWT"))
    const [client, setClient] = useState(jwtDecode(token))

    const handlePayment = async () => {
        try {
            if (!Number.isInteger(client.id)) {
                return Error("No client id found...")
            }
            const response = await fetch('/api/order/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'Processing',
                    address: "Rue Cathédrale 24, 1000 Lausanne, Switzerland",
                    clientId: client.id,
                })
            });

            const order = await response.json()

            if (!response.ok) throw new Error("Failed to create command");
            navigate(`/order/${order.order_id}`);
        } catch (error) {
            console.error("Order Error:", error);
        }
    }

    useEffect(() => {
        // Method to call async function in useEffect
        async function getCart() {
            const result = await fetch(`/api/cart/${client.id}`);
            const product = await result.json()
            setCart(product);
        }

        getCart();
    }, [token])

    return (
        <Container>
            <Header>
                <VStack alignItems={'center'} marginBottom={50}>
                    <Heading marginBottom={10} level={1}>Confirm checkout</Heading>
                    <Heading marginBottom={10} level={3}>Products</Heading>
                </VStack>
            </Header>
            <Content>
                <VStack alignItems={'center'}>
                    <List>
                        {cart.map((product, index) => (
                            <List.Item key={index}>
                                <HStack spacing={15} alignItems="center">
                                    <Avatar src={product.avatar} alt={product.sender} circle/>
                                    <HStack.Item flex={1}>
                                        <HStack justifyContent="space-between">
                                            <Text>{product.name}</Text>
                                            <Text muted size="sm">
                                                {product.quantity}pcs
                                            </Text>
                                        </HStack>
                                        <Text>{product.price} CHF</Text>
                                    </HStack.Item>
                                </HStack>
                            </List.Item>
                        ))}
                    </List>
                    <Button
                        appearance={'primary'}
                        onClick={() => handlePayment()}
                    >Pay</Button>
                </VStack>
            </Content>
        </Container>
    )
}