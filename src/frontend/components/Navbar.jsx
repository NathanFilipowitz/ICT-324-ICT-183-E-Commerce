/*
* Filename: navbar.jsx
* Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
* Date: 2026-03-17
* Purpose: Reusable Navbar component
*/
import { Navbar, Nav } from 'rsuite';
import { useNavigate } from "react-router-dom";

export function AppNavbar({}) {
    const navigate = useNavigate();
    return (
        <Navbar>
            <Navbar.Brand>SecureShop</Navbar.Brand>
            <Nav>
                <Nav.Item onClick={() => navigate("/home")}>All Products</Nav.Item>
                <Nav.Item onClick={() => navigate("/login")}>Login</Nav.Item>
            </Nav>
        </Navbar>
    )
}