/*
 * Filename: navbar.jsx
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-03-17
 * Purpose: Reusable Navbar component
 */
import { useState, useEffect } from "react";
import { Nav, Navbar, Drawer, SegmentedControl, ButtonToolbar, Button, Placeholder, Box } from "rsuite";
import { useNavigate } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

export function AppNavbar({userCart}) {
    const navigate = useNavigate();
    const [size, setSize] = useState();
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const handleOpen = value => {
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
                        <Drawer.Title>Hello bro</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)} appearance="primary">
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Placeholder.Paragraph rows={8} />
                    </Drawer.Body>
                </Drawer>
            </Nav>
        </Navbar>
    )
}