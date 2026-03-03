import { useNavigate } from "react-router-dom";

export default function ProductPage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Product Page</h1>
            <button
                onClick={() => navigate("/home")}
                style={{ padding: '10px 20px' }}
            >
                Back to Home
            </button>
        </div>
    );
}