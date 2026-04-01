import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import HomePage from './frontend/home'
import LoginPage from './frontend/login'
import ProductPage from './frontend/product'
import CheckoutPage from './frontend/checkout'
import OrderResumePage from "./frontend/order-resume";
import RegisterPage from "./frontend/register";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export function App() {
    useEffect(() => {
        const token = localStorage.getItem("JWT");
        if (token) {
            const { exp } = jwtDecode(token);
            if (exp && Date.now() >= exp * 1000) {
                localStorage.removeItem("JWT");
            }
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderResumePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    );
}

export default App;
