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

export default function OrderResumePage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const {id} = useParams();
    const clientToken = localStorage.getItem("JWT");

    useEffect(() => {
        // Method to call async function in useEffect
        async function getOrder() {
            if (clientToken === "") {
                return Error("No client found...")
            }

            const response = await fetch(`/api/order/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${clientToken}`
                }
            });

            const order = await response.json()
            setOrder(order.products);
        }

        getOrder();
    }, [id])

    return (
        <Container>
            <Header>
                <VStack alignItems={'center'} marginBottom={50}>
                    <Heading marginBottom={10} level={1}>Thank you for your order !</Heading>
                    <Heading marginBottom={10} level={5}>Order n°{id}</Heading>
                    <Heading marginBottom={10} level={3}>Products</Heading>
                </VStack>
            </Header>
            <Content>
                <VStack alignItems={'center'}>
                    <List>
                        {order && order.map((product, index) => (
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
                        onClick={() => navigate("/home")}
                    >Home</Button>
                </VStack>
            </Content>
        </Container>
    )
}