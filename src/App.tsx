import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import HomePage from './frontend/home'
import LoginPage from './frontend/login'
import ProductPage from './frontend/product'

export function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
