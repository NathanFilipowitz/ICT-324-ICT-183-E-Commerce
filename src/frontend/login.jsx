import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Login Page</h1>
            <button
                onClick={() => navigate("/home")}
                style={{ padding: '10px 20px' }}
            >
                Login
            </button>
        </div>
    );
}