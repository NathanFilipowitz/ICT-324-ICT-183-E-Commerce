import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Home Page</h1>
            <div>
                <button
                    onClick={() => navigate("/login")}
                    style={{ padding: '10px 20px' }}
                >
                    Back to Login
                </button>
                <button
                    onClick={() => navigate("/product")}
                    style={{ padding: '10px 20px' }}
                >
                    Go to Products
                </button>
            </div>
        </div>
    );
}