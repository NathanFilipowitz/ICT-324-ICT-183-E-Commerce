import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
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

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const {id} = useParams();

    const handlePayment = async () => {
        try {
            const response = await fetch('/api/order/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'Processing',
                    address: "Rue Cathédrale 24, 1000 Lausanne, Switzerland",
                    clientId: id,
                })
            });

            const order = await response.json()

            if (!response.ok) throw new Error("Failed to create command");
            alert(`Order is successful !`);
            navigate(`/order/${order.order_id}`);
        } catch (error) {
            console.error("Order Error:", error);
        }
    }

    useEffect(() => {
        // Method to call async function in useEffect
        async function getCart() {
            const result = await fetch(`/api/cart/${id}`);
            const product = await result.json()
            setCart(product);
        }

        getCart();
    }, [id])

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