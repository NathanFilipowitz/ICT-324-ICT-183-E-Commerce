/*
 * Filename: navbar.jsx
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-03-17
 * Purpose: Reusable Navbar component
 */
import { useState, useEffect } from "react";
import {Nav, Navbar, Drawer, List, HStack, Avatar, Text, Button} from "rsuite";
import { useNavigate } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

export function AppNavbar({userCart, clientId}) {
    const navigate = useNavigate();
    const [size, setSize] = useState();
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [cart, setCart] = useState([]);


    const fetchCart = async () => {
        if (!clientId) return;
        try {
            const response = await fetch(`/api/cart/${clientId}`);
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    const handleOpen = value => {
        fetchCart();
        setSize(value);
        setOpen(true);
    };

    return (
        <Navbar>
            <Navbar.Brand>SecureShop</Navbar.Brand>
            <Nav>
                <Nav.Item onClick={() => navigate("/product")}>All Products</Nav.Item>
                <Nav.Item onClick={() => navigate("/login")}>Login</Nav.Item>
                <Nav.Item onClick={() => handleOpen()}>Cart</Nav.Item>

                <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                        <Drawer.Title>$user_name Cart</Drawer.Title>
                        {/*<Drawer.Actions>*/}
                        {/*    <Button onClick={() => setOpen(false)}>Cancel</Button>*/}
                        {/*    <Button onClick={() => setOpen(false)} appearance="primary">*/}
                        {/*        Confirm*/}
                        {/*    </Button>*/}
                        {/*</Drawer.Actions>*/}
                    </Drawer.Header>
                    <Drawer.Body>
                        <List>
                            {cart.map(product => (
                                <List.Item key={product.id}>
                                    <HStack spacing={15} alignItems="center">
                                        <Avatar src={product.avatar} alt={product.sender} circle />
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
                            marginTop={30}
                            appearance={'primary'}
                            onClick={() => navigate(`/checkout/${clientId}`)}
                        >
                            Checkout
                        </Button>
                    </Drawer.Body>
                </Drawer>
            </Nav>
        </Navbar>
    )
}